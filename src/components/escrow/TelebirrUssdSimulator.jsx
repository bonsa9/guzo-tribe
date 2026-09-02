import React from 'react';
import { Smartphone, CheckCircle2 } from 'lucide-react';

export default function TelebirrUssdSimulator({
  phonePrompt,
  userPin,
  setUserPin,
  isProcessing,
  onSubmitPin,
  onCancel
}) {
  if (!phonePrompt) return null;

  return (
    <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl text-white shadow-2xl relative overflow-hidden animate-slide-up max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-4 text-xs font-bold text-amber-400">
        <Smartphone className="w-4 h-4" />
        <span>Simulated USSD Push Screen</span>
      </div>

      <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            {phonePrompt.ussdCode || '*127#'}
          </span>
          <h4 className="font-bold text-sm text-white">{phonePrompt.ussdPrompt}</h4>
          <p className="text-xs text-stone-400">
            Amount: <strong className="text-emerald-400">{phonePrompt.amount?.toLocaleString()} ETB</strong>
          </p>
        </div>

        <form onSubmit={onSubmitPin} className="space-y-3">
          <input
            type="password"
            maxLength={6}
            required
            autoFocus
            value={userPin}
            onChange={(e) => setUserPin(e.target.value)}
            placeholder="Enter 4-digit PIN (e.g. 1234)"
            className="w-full text-center tracking-widest text-lg font-mono px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={onCancel}
              className="py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold transition-all cursor-pointer shadow-md flex items-center justify-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isProcessing ? 'Verifying...' : 'Confirm'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
