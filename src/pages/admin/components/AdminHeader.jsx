import React from 'react';
import { 
  ShieldCheck, 
  Menu, 
  Lock, 
  Activity, 
  Search,
  Bell
} from 'lucide-react';

export default function AdminHeader({ 
  lang, 
  metrics, 
  onOpenMobileMenu 
}) {
  return (
    <div className="border-b border-stone-800 bg-stone-900/90 backdrop-blur-xl sticky top-16 sm:top-20 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Hamburger Toggle & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
              title="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-white tracking-tight font-serif">
                  Platform Operations
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/80 hidden sm:inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Bole HQ
                </span>
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                {lang === 'am'
                  ? 'የጉዞትራይብ አጠቃላይ ቁጥጥር፣ የፍቃድ ማረጋገጫ እና የክፍያ መልቀቂያ ማዕከል'
                  : 'License Verification, Escrow Releases, Regional Security & Passenger Protection'}
              </p>
            </div>
          </div>

          {/* Quick Stats & System Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-stone-800/80 border border-stone-700/80 text-xs font-semibold flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-stone-300 hidden md:inline">Escrow Vault:</span>
              <strong className="text-amber-300 font-mono text-xs">
                {(metrics.escrowInCustody_ETB / 1000000).toFixed(2)}M ETB
              </strong>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-xs font-semibold flex items-center gap-1.5 text-emerald-300">
              <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">Telebirr B2C: Active</span>
              <span className="sm:hidden">Active</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
