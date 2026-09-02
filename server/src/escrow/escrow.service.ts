import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EscrowService {
  private readonly logger = new Logger(EscrowService.name);

  constructor(private readonly db: DatabaseService) {}

  async handleTelebirrWebhook(payload: {
    outTradeNo: string;
    totalAmount: number;
    tradeNo: string;
    tradeStatus: 'Completed' | 'Failed';
  }) {
    this.logger.log(`[Telebirr Webhook] Trade: ${payload.tradeNo} | OutTrade: ${payload.outTradeNo} | Status: ${payload.tradeStatus}`);

    const booking = this.db.inMemoryBookings.find(b => b.id === payload.outTradeNo || b.telebirrTxn === payload.tradeNo);
    if (booking) {
      booking.paymentStatus = payload.tradeStatus === 'Completed' ? 'escrow_secured' : 'payment_failed';
      booking.status = payload.tradeStatus === 'Completed' ? 'confirmed' : 'pending';
    }

    return {
      code: 0,
      message: 'Telebirr escrow notification processed',
      data: { tradeNo: payload.tradeNo, status: 'SECURED_IN_ESCROW' }
    };
  }

  async releasePayout(organizerId: string, amountETB: number) {
    const feePercentage = 0.08; // 8% GuzoTribe platform fee
    const platformFee = Math.round(amountETB * feePercentage);
    const netPayout = amountETB - platformFee;

    this.logger.log(`[Escrow Release] Organizer: ${organizerId} | Gross: ${amountETB} ETB | Net Payout: ${netPayout} ETB`);

    return {
      success: true,
      organizerId,
      grossAmountETB: amountETB,
      platformFeeETB: platformFee,
      netPayoutETB: netPayout,
      payoutMethod: 'Telebirr Merchant Payout / CBE Direct',
      payoutReference: `PAYOUT-ET-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'SETTLED',
      settledAt: new Date().toISOString()
    };
  }
}
