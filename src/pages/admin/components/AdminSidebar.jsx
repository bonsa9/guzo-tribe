import React from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Compass, 
  CreditCard, 
  AlertTriangle, 
  AlertCircle, 
  Lock, 
  ArrowLeft,
  X,
  Database,
  Bot
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminSidebar({
  lang,
  activeTab,
  setActiveTab,
  metrics,
  corridors,
  isMobileOpen,
  onCloseMobile
}) {
  const navItems = [
    {
      id: 'overview',
      icon: TrendingUp,
      label: lang === 'am' ? 'አጠቃላይ ገጽታ' : 'Overview & GMV',
      badge: null
    },
    {
      id: 'kyc',
      icon: Users,
      label: lang === 'am' ? 'የአስጎብኚዎች ማረጋገጫ' : 'Organizer KYC',
      badge: metrics.pendingKYCCount > 0 ? metrics.pendingKYCCount : null,
      badgeColor: 'bg-amber-500 text-stone-950'
    },
    {
      id: 'trips',
      icon: Compass,
      label: lang === 'am' ? 'የጉዞዎች ፍተሻ' : 'Trip Moderation',
      badge: metrics.pendingTripsCount > 0 ? metrics.pendingTripsCount : null,
      badgeColor: 'bg-sky-500 text-stone-950'
    },
    {
      id: 'payouts',
      icon: CreditCard,
      label: lang === 'am' ? 'የEscrow ክፍያዎች' : 'Escrow Releases',
      badge: null
    },
    {
      id: 'corridors',
      icon: AlertTriangle,
      label: lang === 'am' ? 'የደህንነት መስመር' : 'Regional Corridors',
      badge: `${corridors.filter(c => c.status === 'CLEAR').length}/${corridors.length}`,
      badgeColor: 'bg-stone-800 text-stone-300'
    },
    {
      id: 'disputes',
      icon: AlertCircle,
      label: lang === 'am' ? 'አቤቱታዎች እና ተመላሽ' : 'Disputes & Refunds',
      badge: metrics.activeDisputesCount > 0 ? metrics.activeDisputesCount : null,
      badgeColor: 'bg-rose-500 text-white'
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-4 sm:p-5 space-y-6 text-xs">
      
      {/* Brand Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-amber-500 to-red-600 p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-black text-white tracking-tight font-serif truncate">
                Admin Console
              </h2>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Bole Ops HQ
              </span>
            </div>
          </div>

          {/* Close mobile button */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-xl bg-stone-800 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 pt-2">
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
                    ? 'bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-md shadow-emerald-950/40'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black font-mono shrink-0 ${item.badgeColor || 'bg-stone-800 text-stone-300'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Internal Developer Sandbox Links */}
        <div className="pt-2 border-t border-stone-800/80">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block px-2 mb-1.5">
            Internal Sandboxes
          </span>
          <div className="space-y-0.5">
            <Link
              to="/escrow-simulator"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-stone-400 hover:text-amber-300 hover:bg-stone-800/60 transition-colors text-[11px]"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Escrow Simulator</span>
            </Link>
            <Link
              to="/database-admin"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-stone-400 hover:text-indigo-300 hover:bg-stone-800/60 transition-colors text-[11px]"
            >
              <Database className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Postgres Schema DDL</span>
            </Link>
            <Link
              to="/telegram-bot-demo"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-stone-400 hover:text-sky-300 hover:bg-stone-800/60 transition-colors text-[11px]"
            >
              <Bot className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Telegram Bot Playground</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Vault Widget & Exit Link */}
      <div className="space-y-3 pt-3 border-t border-stone-800">
        
        {/* Escrow Custody Mini Card */}
        <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/90 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-stone-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Escrow Vault</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">100% Protected</span>
          </div>
          <p className="text-sm font-black font-mono text-amber-300">
            {(metrics.escrowInCustody_ETB / 1000000).toFixed(2)}M ETB
          </p>
          <span className="text-[10px] text-stone-500 block font-mono">
            Telebirr & CBE Birr Pool
          </span>
        </div>

        {/* Back to Public Site Link */}
        <Link
          to="/"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-stone-800 hover:bg-stone-800 text-stone-300 font-bold transition-all text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Site</span>
        </Link>

      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sticky Left Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-stone-900 border-r border-stone-800 min-h-[calc(100vh-5rem)] sticky top-20 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Out Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="w-72 bg-stone-900 border-r border-stone-800 h-full shadow-2xl animate-slide-right">
            {sidebarContent}
          </div>
          <div className="flex-1" onClick={onCloseMobile} />
        </div>
      )}
    </>
  );
}
