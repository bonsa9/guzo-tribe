import { Controller, Post, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { EscrowService } from './escrow.service';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';
import { Action } from '../casl/casl-ability.factory';
import { 
  TelebirrWebhookDto, 
  TelebirrWebhookResponseDto, 
  ReleaseEscrowPayoutDto, 
  EscrowPayoutResponseDto,
  UpdateFeeTierDto
} from './dto/escrow.dto';

@ApiTags('Escrow')
@Controller('escrow')
export class EscrowController {
  constructor(private readonly escrowService: EscrowService) {}

  @Post('telebirr-webhook')
  @ApiOperation({ summary: 'Simulate or receive Telebirr USSD push payment notification' })
  @ApiBody({ type: TelebirrWebhookDto })
  @ApiResponse({ status: 200, description: 'Escrow payment processed and funds held in trust', type: TelebirrWebhookResponseDto })
  async telebirrWebhook(@Body() body: TelebirrWebhookDto): Promise<TelebirrWebhookResponseDto> {
    return await this.escrowService.handleTelebirrWebhook(body);
  }

  @Get('fee-tier/:organizerId')
  @ApiOperation({ summary: 'Get current platform commission fee tier and rate for an organizer' })
  @ApiResponse({ status: 200, description: 'Organizer commission fee tier details' })
  getFeeTier(@Param('organizerId') organizerId: string) {
    return {
      success: true,
      data: this.escrowService.getFeeTier(organizerId)
    };
  }

  @Patch('fee-tier')
  @ApiBearerAuth()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Manage, 'all'))
  @ApiOperation({ summary: 'Adjust (increase or decrease) platform fee percentage (1% to 20%) for an organizer (RBAC: Admin only)' })
  @ApiBody({ type: UpdateFeeTierDto })
  @ApiResponse({ status: 200, description: 'Fee tier updated successfully' })
  updateFeeTier(@Body() body: UpdateFeeTierDto) {
    return this.escrowService.updateFeeTier(body.organizerId, body.feePercent, body.tierName);
  }

  @Post('release')
  @ApiBearerAuth()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Create, 'EscrowPayout'))
  @ApiOperation({ summary: 'Request / release escrow funds to tour operator with dynamic fee rate (RBAC: Host or Admin only)' })
  @ApiBody({ type: ReleaseEscrowPayoutDto })
  @ApiResponse({ status: 200, description: 'Escrow payout settlement approved and released', type: EscrowPayoutResponseDto })
  @ApiResponse({ status: 403, description: 'Forbidden: Travelers lack permission to release escrow funds' })
  async releasePayout(@Body() body: ReleaseEscrowPayoutDto): Promise<EscrowPayoutResponseDto> {
    return await this.escrowService.releasePayout(
      body.organizerId || 'org-muller-outdoors',
      body.amountETB || 12000,
      body.customFeePercent
    );
  }
}
