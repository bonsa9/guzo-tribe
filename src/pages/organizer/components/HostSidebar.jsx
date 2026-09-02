import React from 'react';
import { 
  Bus, 
  FileText, 
  CreditCard, 
  Compass, 
  CheckCircle2, 
  Plus, 
  ShieldCheck, 
  MapPin, 
  Send, 
  X, 
  ArrowLeft,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HostSidebar({
  activeTab,
  setActiveTab,
  onOpenCreateModal,
  onOpenPayoutModal,
  availablePayout,
  isMobileOpen,
  onCloseMobile,
  organizerTripsCount
}) {
  const navItems = [
    {
      id: 'departures',
      icon: Bus,
      label: 'Active Departures',
      badge: `${organizerTripsCount} Trips`,
      badgeColor: 'bg-emerald-100 text-emerald-900'
    },
    {
      id: 'manifests',
      icon: FileText,
      label: 'Passenger Manifests',
      badge: 'Checkpoints',
      badgeColor: 'bg-amber-100 text-amber-900'
    },
    {
      id: 'payouts',
      icon: CreditCard,
      label: 'Escrow Payouts & Fees',
      badge: `${(availablePayout / 1000).toFixed(1)}k ETB`,
      badgeColor: 'bg-emerald-800 text-white'
    },
    {
      id: 'fleet',
      icon: Compass,
      label: 'Guides & Bus Fleet',
      badge: 'Verified',
      badgeColor: 'bg-stone-100 text-stone-700'
    },
    {
      id: 'checklist',
      icon: CheckCircle2,
      label: 'Pre-Departure Protocol',
      badge: null
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-4 sm:p-5 space-y-6 text-xs bg-white border-r border-stone-200">
      
      {/* Club Identity Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-700 to-amber-500 text-white flex items-center justify-center font-extrabold text-base shadow-md">
              AH
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-black text-stone-900 tracking-tight font-serif truncate">
                Addis Hikers Club
              </h2>
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Verified Tour Host</span>
              </div>
            </div>
          </div>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-xl bg-stone-100 text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Details Box */}
        <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80 space-y-1 text-[11px] text-stone-600">
          <div className="flex justify-between">
            <span className="text-stone-400">License:</span>
            <span className="font-mono font-bold text-stone-800">#ETH-TOUR-884</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-400">Telegram:</span>
            <span className="text-sky-600 font-medium">@addishikers</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-400">Base:</span>
            <span className="text-stone-800">Bole, Addis Ababa</span>
          </div>
        </div>

        {/* Primary CTA: Publish Trip */}
        <button
          onClick={() => {
            onOpenCreateModal();
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-all shadow-md shadow-emerald-900/15 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Publish New Departure</span>
        </button>

        {/* Navigation Tabs */}
        <nav className="space-y-1 pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono shrink-0 ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Payout Widget & Exit Link */}
      <div className="space-y-3 pt-3 border-t border-stone-100">
        
        {/* Available Escrow Payout Pill */}
        <div className="p-3.5 rounded-2xl bg-emerald-900/5 border border-emerald-700/20 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-stone-500">
            <span>Available to Withdraw</span>
            <span className="text-[10px] text-emerald-700 font-bold">Telebirr / CBE</span>
          </div>
          <p className="text-base font-black font-mono text-emerald-900">
            {availablePayout.toLocaleString()} ETB
          </p>
          <button
            onClick={() => {
              onOpenPayoutModal();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-400" />
            <span>Withdraw to Telebirr</span>
          </button>
        </div>

        {/* Back Link */}
        <Link
          to="/"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold transition-all text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Catalog</span>
        </Link>

      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 min-h-[calc(100vh-5rem)] sticky top-20 z-30 shadow-xs">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Out Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-72 h-full shadow-2xl animate-slide-right">
            {sidebarContent}
          </div>
          <div className="flex-1" onClick={onCloseMobile} />
        </div>
      )}
    </>
  );
}
