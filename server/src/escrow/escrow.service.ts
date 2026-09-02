import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EscrowService {
  private readonly logger = new Logger(EscrowService.name);

  // Dynamic organizer commission tiers (can be maximized or minimized per host)
  private organizerFeeTiers: Map<string, { percent: number; tier: string }> = new Map([
    ['org-muller-outdoors', { percent: 6, tier: 'VIP Pioneer Partner (6%)' }],
    ['org-wild-abyssinia', { percent: 5, tier: 'Diamond Expedition Tier (5%)' }],
    ['org-shewa-hikers', { percent: 7, tier: 'Community Partner Tier (7%)' }],
    ['default', { percent: 8, tier: 'Standard Host Tier (8%)' }]
  ]);

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

  getFeeTier(organizerId: string) {
    const config = this.organizerFeeTiers.get(organizerId) || this.organizerFeeTiers.get('default')!;
    return {
      organizerId,
      feePercentage: config.percent,
      tierName: config.tier,
      minAllowedPercent: 1,
      maxAllowedPercent: 20
    };
  }

  updateFeeTier(organizerId: string, feePercent: number, tierName?: string) {
    if (feePercent < 1 || feePercent > 20) {
      throw new BadRequestException('Platform fee percentage must be between 1% and 20%');
    }

    const calculatedTier = tierName || (
      feePercent <= 5 ? `Pioneer Partner (${feePercent}%)` :
      feePercent <= 7 ? `Verified Partner (${feePercent}%)` :
      feePercent <= 10 ? `Standard Host (${feePercent}%)` :
      `Managed Marketing Tier (${feePercent}%)`
    );

    this.organizerFeeTiers.set(organizerId, {
      percent: feePercent,
      tier: calculatedTier
    });

    this.logger.log(`[Fee Tier Updated] Organizer: ${organizerId} | New Fee: ${feePercent}% (${calculatedTier})`);

    return {
      success: true,
      organizerId,
      feePercentage: feePercent,
      tierName: calculatedTier
    };
  }

  async releasePayout(organizerId: string, amountETB: number, customFeePercent?: number) {
    const config = this.organizerFeeTiers.get(organizerId) || this.organizerFeeTiers.get('default')!;
    
    // Allow custom negotiated fee rate if passed (clamped between 1% and 20%)
    let effectivePercent = config.percent;
    let tierName = config.tier;

    if (customFeePercent !== undefined && customFeePercent >= 1 && customFeePercent <= 20) {
      effectivePercent = customFeePercent;
      tierName = `Custom Negotiated Rate (${customFeePercent}%)`;
    }

    const platformFee = Math.round(amountETB * (effectivePercent / 100));
    const netPayout = amountETB - platformFee;

    this.logger.log(`[Escrow Release] Organizer: ${organizerId} | Gross: ${amountETB} ETB | Fee: ${effectivePercent}% (${platformFee} ETB) | Net Payout: ${netPayout} ETB`);

    return {
      success: true,
      organizerId,
      grossAmountETB: amountETB,
      feePercentage: effectivePercent,
      tierName,
      platformFeeETB: platformFee,
      netPayoutETB: netPayout,
      payoutMethod: 'Telebirr Merchant Payout / CBE Direct',
      payoutReference: `PAYOUT-ET-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'SETTLED',
      settledAt: new Date().toISOString()
    };
  }
}
