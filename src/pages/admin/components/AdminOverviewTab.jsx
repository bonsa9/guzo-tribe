import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Lock, 
  Building, 
  CheckCircle2, 
  CreditCard, 
  Users, 
  ChevronRight 
} from 'lucide-react';

export default function AdminOverviewTab({ 
  metrics, 
  liveFeed, 
  payouts, 
  onNavigateTab 
}) {
  return (
    <div className="space-y-8 animate-slide-up">
      
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Platform GMV */}
        <div className="bg-stone-900 p-5 rounded-3xl border border-stone-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-stone-400 text-xs font-bold">
            <span>Total Platform GMV</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
              {(metrics.totalGMV_ETB / 1000000).toFixed(2)}M <span className="text-sm font-sans font-bold text-stone-400">ETB</span>
            </h3>
            <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <span>${metrics.totalGMV_USD.toLocaleString()} USD</span>
              <span className="text-stone-500">• All 9 Regions</span>
            </p>
          </div>
        </div>

        {/* Card 2: 8% Platform Commission */}
        <div className="bg-stone-900 p-5 rounded-3xl border border-stone-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-stone-400 text-xs font-bold">
            <span>GuzoTribe 8% Take Rate</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <h3 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight font-mono">
              {(metrics.platformCommission_ETB / 1000000).toFixed(2)}M <span className="text-sm font-sans font-bold text-stone-400">ETB</span>
            </h3>
            <p className="text-xs text-amber-400/80 font-semibold">
              ${metrics.platformCommission_USD.toLocaleString()} USD Net Platform Revenue
            </p>
          </div>
        </div>

        {/* Card 3: Escrow In Custody */}
        <div className="bg-stone-900 p-5 rounded-3xl border border-stone-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-stone-400 text-xs font-bold">
            <span>Escrow In Custody</span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <h3 className="text-2xl sm:text-3xl font-black text-sky-300 tracking-tight font-mono">
              {(metrics.escrowInCustody_ETB / 1000000).toFixed(2)}M <span className="text-sm font-sans font-bold text-stone-400">ETB</span>
            </h3>
            <p className="text-xs text-sky-400/80 font-semibold">
              Protected in Telebirr & CBE Escrow
            </p>
          </div>
        </div>

        {/* Card 4: Verified Organizers & Travelers */}
        <div className="bg-stone-900 p-5 rounded-3xl border border-stone-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-stone-400 text-xs font-bold">
            <span>Verified Tour Clubs</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
              {metrics.totalVerifiedOrganizers} <span className="text-sm font-sans font-bold text-stone-400">Clubs</span>
            </h3>
            <p className="text-xs text-purple-300 font-semibold">
              {metrics.totalBookings.toLocaleString()} Verified Passenger Bookings
            </p>
          </div>
        </div>

      </div>

      {/* Middle Grid: Live Booking Stream & Quick Action Center */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Live Marketplace Ticker */}
        <div className="lg:col-span-7 bg-stone-900 p-6 sm:p-7 rounded-3xl border border-stone-800 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-bold text-base text-white">Live Platform Activity Stream</h3>
            </div>
            <span className="text-[11px] font-mono text-stone-400">Telebirr / Chapa Gateway</span>
          </div>

          <div className="space-y-3">
            {liveFeed.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800/80 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    item.type === 'booking' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    item.type === 'chapa' ? 'bg-sky-950 text-sky-400 border border-sky-800' :
                    item.type === 'escrow' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-purple-950 text-purple-400 border border-purple-800'
                  }`}>
                    {item.type === 'booking' ? <CheckCircle2 className="w-4 h-4" /> :
                     item.type === 'chapa' ? <CreditCard className="w-4 h-4" /> :
                     item.type === 'escrow' ? <Lock className="w-4 h-4" /> :
                     <Users className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-200">{item.desc}</p>
                    <span className="text-[10px] text-stone-500">{item.time}</span>
                  </div>
                </div>
                <span className="font-bold font-mono text-emerald-400 shrink-0">
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Platform Action Items Queue */}
        <div className="lg:col-span-5 bg-stone-900 p-6 sm:p-7 rounded-3xl border border-stone-800 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="font-bold text-base text-white">Pending Operations Queue</h3>
            <span className="text-[11px] font-bold text-amber-400">Action Required</span>
          </div>

          <div className="space-y-3">
            {/* Action 1: Pending KYC */}
            <div
              onClick={() => onNavigateTab('kyc')}
              className="p-4 rounded-2xl bg-amber-950/30 border border-amber-700/50 hover:bg-amber-950/50 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  {metrics.pendingKYCCount}
                </div>
                <div>
                  <h4 className="font-bold text-stone-100 text-xs">Organizer KYC Submissions</h4>
                  <p className="text-[11px] text-stone-400">Tour licenses awaiting verification</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </div>

            {/* Action 2: Trip Moderation */}
            <div
              onClick={() => onNavigateTab('trips')}
              className="p-4 rounded-2xl bg-sky-950/30 border border-sky-700/50 hover:bg-sky-950/50 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  {metrics.pendingTripsCount}
                </div>
                <div>
                  <h4 className="font-bold text-stone-100 text-xs">Trip Itineraries in Queue</h4>
                  <p className="text-[11px] text-stone-400">Safety & pricing moderation</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </div>

            {/* Action 3: Payout Releases */}
            <div
              onClick={() => onNavigateTab('payouts')}
              className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-700/50 hover:bg-emerald-950/50 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  {payouts.filter(p => p.status === 'ready_to_release').length}
                </div>
                <div>
                  <h4 className="font-bold text-stone-100 text-xs">Escrow Payout Batches</h4>
                  <p className="text-[11px] text-stone-400">Completed weekend trip departures</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
