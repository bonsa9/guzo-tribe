import React from 'react';

export default function AdminCorridorsTab({ 
  corridors, 
  onToggleCorridorStatus 
}) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-serif">Ethiopian Regional Safety & Road Corridors</h2>
          <p className="text-xs text-stone-400">
            Live monitoring of checkpoints, road conditions, and security clearance for tour convoys.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {corridors.map((c) => (
          <div
            key={c.id}
            className="bg-stone-900 p-6 rounded-3xl border border-stone-800 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-stone-500 uppercase">{c.region} Region</span>
                <h3 className="font-bold text-base text-white">{c.route}</h3>
                <span className="text-[11px] text-stone-400">Verified: {c.lastVerified}</span>
              </div>

              <button
                onClick={() => onToggleCorridorStatus(c.id)}
                className={`px-3 py-1 rounded-full text-xs font-black uppercase border cursor-pointer transition-transform hover:scale-105 ${
                  c.status === 'CLEAR' ? 'bg-emerald-950 text-emerald-300 border-emerald-600' :
                  c.status === 'CAUTION' ? 'bg-amber-950 text-amber-300 border-amber-600' :
                  'bg-rose-950 text-rose-300 border-rose-600'
                }`}
                title="Click to toggle status"
              >
                {c.status === 'CLEAR' ? '🟢 CLEAR' : c.status === 'CAUTION' ? '🟡 CAUTION' : '🔴 RESTRICTED'}
              </button>
            </div>

            <div className="space-y-2 text-xs bg-stone-950 p-4 rounded-2xl border border-stone-800/80 text-stone-300">
              <div>
                <strong className="text-stone-400 block">Checkpoints:</strong>
                <span>{c.checkpointPassage}</span>
              </div>
              <div>
                <strong className="text-stone-400 block">Required Convoy / Vehicle:</strong>
                <span>{c.recommendedVehicle}</span>
              </div>
              <div>
                <strong className="text-stone-400 block">Security Notes:</strong>
                <span className="text-stone-300">{c.notes}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
              <span>Click status pill to toggle (CLEAR ➔ CAUTION ➔ RESTRICTED)</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
