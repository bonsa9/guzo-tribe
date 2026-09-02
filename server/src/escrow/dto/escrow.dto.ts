import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TelebirrWebhookDto {
  @ApiProperty({ example: 'GZ-2026-8812', description: 'GuzoTribe booking reference number' })
  outTradeNo: string;

  @ApiProperty({ example: 'TLB-984210948', description: 'Telebirr official transaction ID' })
  tradeNo: string;

  @ApiProperty({ example: 4400, description: 'Amount paid in ETB' })
  totalAmount: number;

  @ApiProperty({ example: 'Completed', enum: ['Completed', 'Failed'] })
  tradeStatus: 'Completed' | 'Failed';
}

export class TelebirrWebhookResponseDto {
  @ApiProperty({ example: 0 })
  code: number;

  @ApiProperty({ example: 'Telebirr escrow notification processed' })
  message: string;

  @ApiProperty({
    example: { tradeNo: 'TLB-984210948', status: 'SECURED_IN_ESCROW' }
  })
  data: {
    tradeNo: string;
    status: string;
  };
}

export class ReleaseEscrowPayoutDto {
  @ApiProperty({ example: 'org-muller-outdoors', description: 'Tour operator identifier' })
  organizerId: string;

  @ApiProperty({ example: 12000, description: 'Gross booking revenue to be settled in ETB' })
  amountETB: number;

  @ApiPropertyOptional({
    example: 6,
    description: 'Custom platform fee percentage (1% to 20%). If omitted, organizer configured tier is used.'
  })
  customFeePercent?: number;
}

export class UpdateFeeTierDto {
  @ApiProperty({ example: 'org-muller-outdoors' })
  organizerId: string;

  @ApiProperty({ example: 6, description: 'New commission percentage (e.g. 5 for 5%, 10 for 10%)' })
  feePercent: number;

  @ApiPropertyOptional({ example: 'Pioneer Partner Tier (6%)' })
  tierName?: string;
}

export class EscrowPayoutResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'org-muller-outdoors' })
  organizerId: string;

  @ApiProperty({ example: 12000, description: 'Gross passenger earnings in escrow' })
  grossAmountETB: number;

  @ApiProperty({ example: 6, description: 'Effective platform commission percentage applied' })
  feePercentage: number;

  @ApiProperty({ example: 'Pioneer Partner Tier (6%)' })
  tierName: string;

  @ApiProperty({ example: 720, description: 'GuzoTribe platform service fee deducted' })
  platformFeeETB: number;

  @ApiProperty({ example: 11280, description: 'Net settlement payout released to operator' })
  netPayoutETB: number;

  @ApiProperty({ example: 'Telebirr Merchant Payout / CBE Direct' })
  payoutMethod: string;

  @ApiProperty({ example: 'PAYOUT-ET-988262' })
  payoutReference: string;

  @ApiProperty({ example: 'SETTLED', enum: ['SETTLED', 'PENDING', 'HELD'] })
  status: string;

  @ApiProperty({ example: '2026-09-02T18:07:28.114Z' })
  settledAt: string;
}
