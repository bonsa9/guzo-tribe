import React from 'react';
import { Lock, Send, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { EscrowStatus, calculatePayoutBreakdown } from '../../services/escrowService';

export default function EscrowLedgerTable({
  escrowVault,
  onReleaseEscrow,
  onRefundEscrow
}) {
  return (
    <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-700" />
          <h3 className="font-bold text-base sm:text-lg text-stone-900">
            Active Escrow Custody Ledger (8% Platform Commission)
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
          {escrowVault.length} Active Records
        </span>
      </div>

      <div className="space-y-3">
        {escrowVault.map((item) => {
          const breakdown = calculatePayoutBreakdown(item.amountETB);
          const isLocked = item.status === EscrowStatus.HELD_IN_ESCROW;
          const isReleased = item.status === EscrowStatus.RELEASED_TO_ORGANIZER;
          const isRefunded = item.status === EscrowStatus.REFUNDED_TO_TRAVELER;

          return (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-3 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/60 pb-2.5">
                <div>
                  <span className="font-mono text-[11px] font-bold text-amber-700">{item.bookingRef}</span>
                  <h4 className="font-bold text-sm text-stone-900">{item.tripTitle}</h4>
                  <p className="text-stone-500 text-[11px]">
                    Traveler: <strong className="text-stone-700">{item.travelerName}</strong> ({item.travelerPhone}) • Host: {item.organizerName}
                  </p>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider w-fit ${
                  isLocked ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                  isReleased ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                  'bg-rose-100 text-rose-900 border border-rose-300'
                }`}>
                  {item.status.replace(/_/g, ' ')}
                </span>
              </div>

              {/* 8% Platform Fee Breakdown */}
              <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-stone-200 text-center font-mono">
                <div>
                  <span className="text-[10px] text-stone-400 block font-sans">Total Traveler Paid</span>
                  <strong className="text-stone-900 text-xs">{item.amountETB?.toLocaleString()} ETB</strong>
                </div>
                <div>
                  <span className="text-[10px] text-amber-600 block font-sans">GuzoTribe 8% Fee</span>
                  <strong className="text-amber-700 text-xs">+{breakdown.platformFeeETB?.toLocaleString()} ETB</strong>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-600 block font-sans">Organizer Net Payout</span>
                  <strong className="text-emerald-700 text-xs">{breakdown.organizerPayoutETB?.toLocaleString()} ETB</strong>
                </div>
              </div>

              {/* Action Buttons */}
              {isLocked && (
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => onRefundEscrow(item.id)}
                    className="px-3.5 py-1.5 rounded-xl border border-rose-300 hover:bg-rose-50 text-rose-700 font-bold transition-all cursor-pointer flex items-center gap-1 text-[11px]"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Issue 100% Refund</span>
                  </button>
                  <button
                    onClick={() => onReleaseEscrow(item.id)}
                    className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1 text-[11px]"
                  >
                    <Send className="w-3 h-3 text-amber-300" />
                    <span>Release Net Payout</span>
                  </button>
                </div>
              )}

              {isReleased && (
                <div className="text-right text-emerald-700 font-bold text-[11px] flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Settled: Net funds transferred to {item.organizerAccount}</span>
                </div>
              )}

              {isRefunded && (
                <div className="text-right text-rose-700 font-bold text-[11px] flex items-center justify-end gap-1">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Refunded: 100% principal returned to traveler</span>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}
