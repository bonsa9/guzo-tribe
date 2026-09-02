import React, { useState, useEffect } from 'react';
import { X, DollarSign, Smartphone, Building, CheckCircle2, Sliders, ShieldCheck, Sparkles } from 'lucide-react';

export default function PayoutModal({ isOpen, onClose, availableBalance = 48500, lang: _lang }) {
  const [method, setMethod] = useState('telebirr');
  const [accountNumber, setAccountNumber] = useState('0911482910');
  const [amount, setAmount] = useState(availableBalance);
  const [feePercent, setFeePercent] = useState(6); // Dynamic host fee rate (default 6% VIP partner tier)
  const [tierName, setTierName] = useState('Pioneer Partner Tier');
  const [payoutResult, setPayoutResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Fetch organizer fee tier from backend
  useEffect(() => {
    async function fetchTier() {
      try {
        const res = await fetch('/api/escrow/fee-tier/org-muller-outdoors');
        const json = await res.json();
        if (json?.data) {
          setFeePercent(json.data.feePercentage);
          setTierName(json.data.tierName);
        }
      } catch {
        // fallback
      }
    }
    if (isOpen) {
      fetchTier();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const platformFee = Math.round(amount * (feePercent / 100));
  const netPayout = amount - platformFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/escrow/release', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': 'host'
        },
        body: JSON.stringify({
          organizerId: 'org-muller-outdoors',
          amountETB: amount,
          customFeePercent: feePercent
        })
      });
      const data = await res.json();
      setPayoutResult(data);
    } catch {
      // ignore
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setPayoutResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Request Earnings Payout</h3>
              <p className="text-[11px] text-stone-400">Direct Telebirr & CBE Payouts • Dynamic Host Tier</p>
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
              <h3 className="text-lg font-bold text-stone-900">Payout Settlement Dispatched!</h3>
              
              {/* Financial Breakdown Card */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Gross Escrow Amount:</span>
                  <span className="font-bold text-stone-900 font-mono">{amount.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between text-amber-700">
                  <span>Platform Fee ({feePercent}% - {tierName}):</span>
                  <span className="font-bold font-mono">-{platformFee.toLocaleString()} ETB</span>
                </div>
                <div className="border-t border-stone-200 pt-2 flex justify-between text-emerald-900 font-bold text-sm">
                  <span>Net Payout Dispatched:</span>
                  <span className="font-mono text-base">{netPayout.toLocaleString()} ETB</span>
                </div>
                <div className="text-[11px] text-stone-500 pt-1">
                  Destination: <span className="font-semibold text-stone-800">{method.toUpperCase()} ({accountNumber})</span>
                </div>
                {payoutResult?.payoutReference && (
                  <div className="text-[11px] text-emerald-700 font-mono">
                    Reference: {payoutResult.payoutReference}
                  </div>
                )}
              </div>

              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-all cursor-pointer shadow-sm"
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
                <span className="text-[11px] bg-emerald-800 text-white px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Ready to Withdraw
                </span>
              </div>

              {/* Dynamic Host Commission Slider & Tier Selector */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                    <Sliders className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Host Commission Rate:</span>
                  </div>
                  <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                    {feePercent}% Commission
                  </span>
                </div>

                <input
                  type="range"
                  min="3"
                  max="15"
                  step="1"
                  value={feePercent}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setFeePercent(val);
                    if (val <= 5) setTierName(`VIP Diamond Partner (${val}%)`);
                    else if (val <= 7) setTierName(`Pioneer Partner (${val}%)`);
                    else if (val <= 10) setTierName(`Standard Host (${val}%)`);
                    else setTierName(`Managed Expedition Tier (${val}%)`);
                  }}
                  className="w-full accent-emerald-700 cursor-pointer"
                />

                <div className="flex justify-between text-[10px] font-bold text-stone-500">
                  <span>3% (Min / Partner)</span>
                  <span className="text-emerald-800 font-semibold">{tierName}</span>
                  <span>15% (Managed / Max)</span>
                </div>
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

              {/* Live Calculation Preview */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>Gross Withdrawal:</span>
                  <span className="font-mono">{amount.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between text-amber-700 font-medium">
                  <span>Platform Fee ({feePercent}%):</span>
                  <span className="font-mono">-{platformFee.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between text-emerald-900 font-bold border-t border-stone-200 pt-1 text-sm">
                  <span>You Receive (Net):</span>
                  <span className="font-mono">{netPayout.toLocaleString()} ETB</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Confirm Payout ({netPayout.toLocaleString()} ETB Net)</span>
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
