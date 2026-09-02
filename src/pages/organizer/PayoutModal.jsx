import React, { useState } from 'react';
import { X, DollarSign, Smartphone, Building, CheckCircle2 } from 'lucide-react';

export default function PayoutModal({ isOpen, onClose, availableBalance = 48500, lang: _lang }) {
  const [method, setMethod] = useState('telebirr');
  const [accountNumber, setAccountNumber] = useState('0911482910');
  const [amount, setAmount] = useState(availableBalance);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/escrow/release', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': 'host'
        },
        body: JSON.stringify({ organizerId: 'org-muller-outdoors', amountETB: amount })
      });
    } catch {
      // ignore
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Request Earnings Payout</h3>
              <p className="text-[11px] text-stone-400">Direct Telebirr & CBE Payouts</p>
            </div>
          </div>

          <button onClick={handleClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">Payout Request Submitted!</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {amount.toLocaleString()} ETB will be dispatched to your {method.toUpperCase()} account ({accountNumber}) within 2 hours.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Available Balance</span>
                  <span className="text-xl font-extrabold text-emerald-950">{availableBalance.toLocaleString()} ETB</span>
                </div>
                <span className="text-[11px] bg-emerald-800 text-white px-2 py-0.5 rounded-full font-bold">
                  Ready to Withdraw
                </span>
              </div>

              {/* Method Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">Withdrawal Destination</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMethod('telebirr')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      method === 'telebirr' ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 shadow-xs' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-amber-500" />
                    <span>Telebirr</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod('cbe')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      method === 'cbe' ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 shadow-xs' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Building className="w-4 h-4 text-purple-700" />
                    <span>CBE Bank</span>
                  </button>
                </div>
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {method === 'telebirr' ? 'Telebirr Phone Number' : 'CBE Account Number'} *
                </label>
                <input
                  type="text"
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Withdrawal Amount (ETB) *</label>
                <input
                  type="number"
                  required
                  min="1000"
                  max={availableBalance}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Confirm Payout Request
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
