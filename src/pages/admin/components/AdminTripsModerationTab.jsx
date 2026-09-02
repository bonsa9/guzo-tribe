import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminTripsModerationTab({ 
  tripsQueue, 
  onApproveTrip, 
  onRequestEdits 
}) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-serif">Tour Itinerary Moderation Queue</h2>
          <p className="text-xs text-stone-400">
            Verify pricing transparency, high altitude safety plans, and scout allocations before publishing.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {tripsQueue.map((trip) => {
          const isPending = trip.status === 'pending_review';

          return (
            <div
              key={trip.id}
              className="bg-stone-900 p-6 rounded-3xl border border-stone-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono text-stone-500">{trip.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 text-[10px] font-bold">
                    {trip.organizerName}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[10px] font-bold">
                    {trip.difficulty}
                  </span>
                  <span className="text-amber-400 text-xs font-bold">
                    {trip.priceETB.toLocaleString()} ETB (${trip.priceUSD} USD)
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white">{trip.title}</h3>
                <p className="text-xs text-stone-400">
                  📍 <strong>Destination:</strong> {trip.destination} • 🏔️ <strong>Altitude:</strong> {trip.elevationMeters}m • 📅 <strong>Departure:</strong> {trip.departureDate} ({trip.totalSeats} seats)
                </p>

                <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 text-xs text-stone-300">
                  🛡️ <strong>Safety Review Notes:</strong> {trip.safetyReviewNotes}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isPending ? (
                  <>
                    <button
                      onClick={() => onRequestEdits(trip.id)}
                      className="px-4 py-2.5 rounded-xl border border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-bold transition-all cursor-pointer"
                    >
                      Request Edits
                    </button>
                    <button
                      onClick={() => onApproveTrip(trip.id)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Publish to Live Site</span>
                    </button>
                  </>
                ) : (
                  <span className="px-4 py-2 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Live in Catalog</span>
                  </span>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
