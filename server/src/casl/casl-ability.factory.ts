import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility, MongoAbility, ExtractSubjectType, InferSubjects } from '@casl/ability';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete'
}

export type Subjects = 
  | 'Trip' 
  | 'Booking' 
  | 'CoasterSeat' 
  | 'GroupSplit' 
  | 'EscrowPayout' 
  | 'CheckpointManifest' 
  | 'User' 
  | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

export interface CaslUser {
  id: string;
  role: 'traveler' | 'host' | 'admin';
  phone?: string;
  email?: string;
}

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: CaslUser): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.role === 'admin') {
      // Platform Admin: Full governance, dispute resolution & escrow approval
      can(Action.Manage, 'all');
    } else if (user.role === 'host') {
      // Tour Operator / Host: Manage own trips, view checkpoint manifests, request escrow payouts
      can([Action.Create, Action.Read, Action.Update], 'Trip');
      can(Action.Read, 'Booking');
      can(Action.Read, 'CheckpointManifest');
      can([Action.Create, Action.Read], 'EscrowPayout');
      can(Action.Read, 'User');
      cannot(Action.Delete, 'Trip');
      cannot(Action.Delete, 'Booking');
    } else {
      // Traveler: Browse trips, manage own bookings & group splits
      can(Action.Read, 'Trip');
      can([Action.Create, Action.Read, Action.Delete], 'Booking');
      can([Action.Create, Action.Read, Action.Update], 'GroupSplit');
      can(Action.Read, 'CheckpointManifest');
      cannot(Action.Manage, 'EscrowPayout');
      cannot(Action.Create, 'Trip');
    }

    return build({
      detectSubjectType: (item: any) => item?.constructor as ExtractSubjectType<Subjects>
    });
  }
}
