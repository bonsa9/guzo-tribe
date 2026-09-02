import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EscrowService } from './escrow.service';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';
import { Action } from '../casl/casl-ability.factory';

@ApiTags('Escrow')
@Controller('escrow')
export class EscrowController {
  constructor(private readonly escrowService: EscrowService) {}

  @Post('telebirr-webhook')
  @ApiOperation({ summary: 'Simulate or receive Telebirr USSD push payment notification' })
  @ApiResponse({ status: 200, description: 'Escrow payment processed and funds held in trust' })
  async telebirrWebhook(@Body() body: any) {
    return await this.escrowService.handleTelebirrWebhook(body);
  }

  @Post('release')
  @ApiBearerAuth()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Create, 'EscrowPayout'))
  @ApiOperation({ summary: 'Request / release escrow funds to tour operator minus 8% platform fee (RBAC: Host or Admin only)' })
  @ApiResponse({ status: 200, description: 'Escrow payout settlement approved and released' })
  @ApiResponse({ status: 403, description: 'Forbidden: Travelers lack permission to release escrow funds' })
  async releasePayout(@Body() body: { organizerId: string; amountETB: number }) {
    return await this.escrowService.releasePayout(body.organizerId || 'org-muller-outdoors', body.amountETB || 12000);
  }
}
