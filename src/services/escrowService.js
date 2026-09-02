/**
 * GuzoTribe Escrow Protection Service
 * Manages secure holding of funds between travelers and tour organizers.
 */

export const ESCROW_COMMISSION_RATE = 0.08; // 8% Platform fee

export const EscrowStatus = {
  HELD: 'HELD_IN_ESCROW',
  CONFIRMED: 'DEPARTURE_CONFIRMED',
  RELEASED: 'RELEASED_TO_ORGANIZER',
  REFUNDED: 'REFUNDED_TO_TRAVELER'
};

/**
 * Calculates earnings breakdown between organizer payout and platform revenue
 */
export function calculatePayoutBreakdown(grossAmountETB) {
  const platformFee = Math.round(grossAmountETB * ESCROW_COMMISSION_RATE);
  const netOrganizerPayout = grossAmountETB - platformFee;

  return {
    grossAmountETB,
    commissionRatePercent: ESCROW_COMMISSION_RATE * 100,
    platformFeeETB: platformFee,
    netOrganizerPayoutETB: netOrganizerPayout
  };
}

/**
 * Creates a new Escrow entry upon successful payment
 */
export function createEscrowEntry({
  bookingRef,
  travelerName,
  travelerPhone,
  tripId,
  tripTitle,
  organizerName,
  organizerAccount,
  amountETB
}) {
  const breakdown = calculatePayoutBreakdown(amountETB);

  return {
    escrowId: `ESC-${Math.floor(100000 + Math.random() * 900000)}`,
    bookingRef,
    travelerName,
    travelerPhone,
    tripId,
    tripTitle,
    organizerName,
    organizerAccount,
    grossAmountETB: amountETB,
    platformFeeETB: breakdown.platformFeeETB,
    netOrganizerPayoutETB: breakdown.netOrganizerPayoutETB,
    status: EscrowStatus.HELD,
    createdAt: new Date().toLocaleTimeString(),
    history: [
      {
        status: EscrowStatus.HELD,
        timestamp: new Date().toLocaleTimeString(),
        note: `Payment of ${amountETB.toLocaleString()} ETB locked in GuzoTribe Escrow.`
      }
    ]
  };
}
