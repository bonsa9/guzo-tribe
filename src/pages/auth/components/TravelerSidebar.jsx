import React from 'react';
import { 
  QrCode, 
  Heart, 
  ShieldCheck, 
  Compass, 
  LogOut, 
  X, 
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TravelerSidebar({
  user,
  activeTab,
  setActiveTab,
  ticketCount,
  wishlistCount,
  onLogout,
  isMobileOpen,
  onCloseMobile
}) {
  const navItems = [
    {
      id: 'tickets',
      icon: QrCode,
      label: 'My Booked E-Tickets',
      badge: `${ticketCount} Passes`,
      badgeColor: 'bg-emerald-100 text-emerald-900'
    },
    {
      id: 'wishlist',
      icon: Heart,
      label: 'Saved Wishlist',
      badge: `${wishlistCount} Trips`,
      badgeColor: 'bg-rose-100 text-rose-800'
    },
    {
      id: 'safety',
      icon: ShieldCheck,
      label: 'Checkpoint Manifest Profile',
      badge: 'Ready',
      badgeColor: 'bg-stone-100 text-stone-700'
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-4 sm:p-5 space-y-6 text-xs bg-white border-r border-stone-200">
      
      {/* Traveler Profile Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-amber-500 to-red-500 p-0.5 shadow-md shrink-0">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'}
                alt={user?.name}
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-black text-stone-900 tracking-tight font-serif truncate">
                {user?.name || 'Traveler'}
              </h2>
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                <UserCheck className="w-3 h-3 text-emerald-600" />
                <span>Verified Traveler</span>
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

        {/* Quick Identity Box */}
        <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80 space-y-1 text-[11px] text-stone-600">
          <div className="flex justify-between">
            <span className="text-stone-400">Phone:</span>
            <span className="font-mono font-bold text-stone-800">{user?.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-400">Member:</span>
            <span className="text-stone-800">{user?.joinedDate || 'September 2026'}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
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

      {/* Bottom Actions */}
      <div className="space-y-2 pt-3 border-t border-stone-100">
        
        {/* Explore More Trips CTA */}
        <Link
          to="/trips"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-all shadow-xs text-xs"
        >
          <Compass className="w-4 h-4 text-amber-300" />
          <span>Browse New Trips</span>
        </Link>

        {/* Exit & Sign Out */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold transition-all text-xs cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>

      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sticky Left Sidebar */}
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
