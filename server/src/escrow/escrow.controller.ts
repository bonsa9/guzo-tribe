import { Controller, Post, Body } from '@nestjs/common';
import { EscrowService } from './escrow.service';

@Controller('escrow')
export class EscrowController {
  constructor(private readonly escrowService: EscrowService) {}

  @Post('telebirr-webhook')
  async telebirrWebhook(@Body() body: any) {
    return await this.escrowService.handleTelebirrWebhook(body);
  }

  @Post('release')
  async releasePayout(@Body() body: { organizerId: string; amountETB: number }) {
    return await this.escrowService.releasePayout(body.organizerId || 'org-muller-outdoors', body.amountETB || 12000);
  }
}
