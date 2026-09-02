import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory, AppAbility, CaslUser } from './casl-ability.factory';
import { CHECK_POLICIES_KEY, PolicyHandler } from './check-policies.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler()
      ) || [];

    if (policyHandlers.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    // Extract role from token or default to traveler
    let role: 'traveler' | 'host' | 'admin' = 'traveler';
    let id = 'usr-anonymous';

    if (authHeader && authHeader.startsWith('Bearer gz_tok_')) {
      const parts = authHeader.split('_');
      if (parts.length >= 4) {
        id = parts[2];
        try {
          const decodedRole = Buffer.from(parts[3], 'base64').toString('utf8');
          if (decodedRole === 'host' || decodedRole === 'admin' || decodedRole === 'traveler') {
            role = decodedRole;
          }
        } catch {}
      }
    }

    // Also support role passed directly for quick API testing / dev
    if (request.headers['x-user-role']) {
      const customRole = request.headers['x-user-role'];
      if (customRole === 'host' || customRole === 'admin' || customRole === 'traveler') {
        role = customRole;
      }
    }

    const user: CaslUser = { id, role };
    const ability = this.caslAbilityFactory.createForUser(user);

    const isAllowed = policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability)
    );

    if (!isAllowed) {
      throw new ForbiddenException(
        `RBAC Access Denied: Role '${role}' lacks permission to perform this action.`
      );
    }

    return true;
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
