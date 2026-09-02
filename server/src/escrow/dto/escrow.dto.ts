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
}

export class EscrowPayoutResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'org-muller-outdoors' })
  organizerId: string;

  @ApiProperty({ example: 12000, description: 'Gross passenger earnings in escrow' })
  grossAmountETB: number;

  @ApiProperty({ example: 960, description: '8% GuzoTribe platform service fee' })
  platformFeeETB: number;

  @ApiProperty({ example: 11040, description: 'Net settlement payout released to operator' })
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
