import React, { useState } from 'react';
import { 
  Compass, 
  Globe, 
  Sparkles, 
  Heart, 
  LayoutDashboard, 
  Menu, 
  X, 
  Phone, 
  Info, 
  Users, 
  Layers, 
  ShieldCheck,
  User,
  LogOut,
  QrCode,
  ChevronDown,
  MapPin,
  Camera,
  CheckSquare
} from 'lucide-react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ 
  currency, 
  setCurrency, 
  lang, 
  setLang, 
  onOpenPartnerModal: _onOpenPartnerModal, 
  isTelegramMode: _isTelegramMode, 
  setIsTelegramMode: _setIsTelegramMode,
  compareCount,
  onOpenCompare,
  wishlistCount
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-stone-200/80 transition-all shadow-xs tibeb-border-top">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Ethiopian Flag Motif */}
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-700 via-amber-500 to-red-600 p-0.5 shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-emerald-900/20">
              <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-stone-900 font-serif">
                  Guzo<span className="text-emerald-700">Tribe</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-gradient-to-r from-emerald-100 via-amber-100 to-red-100 text-stone-900 border border-amber-300 shadow-2xs font-ethiopic">
                  ጉዞትራይብ
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-stone-500 font-medium tracking-wider uppercase hidden xs:block">
                Ethiopian Group Travel Hub
              </p>
            </div>
          </Link>

          {/* Clean Public Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs lg:text-sm font-semibold text-stone-600">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-3 py-1.5 rounded-xl transition-all ${
                  isActive 
                    ? 'text-emerald-800 bg-emerald-50/80 font-bold border border-emerald-200/70 shadow-2xs' 
                    : 'hover:text-stone-900 hover:bg-stone-100/70'
                }`
              }
            >
              {lang === 'am' ? 'መነሻ' : 'Home'}
            </NavLink>

            <NavLink 
              to="/trips" 
              className={({ isActive }) => 
                `px-3 py-1.5 rounded-xl transition-all ${
                  isActive 
                    ? 'text-emerald-800 bg-emerald-50/80 font-bold border border-emerald-200/70 shadow-2xs' 
                    : 'hover:text-stone-900 hover:bg-stone-100/70'
                }`
              }
            >
              {lang === 'am' ? 'ጉዞዎች' : 'Explore Trips'}
            </NavLink>

            <NavLink 
              to="/map" 
              className={({ isActive }) => 
                `px-3 py-1.5 rounded-xl transition-all ${
                  isActive 
                    ? 'text-emerald-800 bg-emerald-50/80 font-bold border border-emerald-200/70 shadow-2xs' 
                    : 'hover:text-stone-900 hover:bg-stone-100/70'
                }`
              }
            >
              {lang === 'am' ? 'ካርታ' : 'Map'}
            </NavLink>

            <NavLink 
              to="/gear-guide" 
              className={({ isActive }) => 
                `px-3 py-1.5 rounded-xl transition-all ${
                  isActive 
                    ? 'text-emerald-800 bg-emerald-50/80 font-bold border border-emerald-200/70 shadow-2xs' 
                    : 'hover:text-stone-900 hover:bg-stone-100/70'
                }`
              }
            >
              {lang === 'am' ? 'የእቃ ዝርዝር' : 'Gear Guide'}
            </NavLink>

            <NavLink 
              to="/community" 
              className={({ isActive }) => 
                `px-3 py-1.5 rounded-xl transition-all ${
                  isActive 
                    ? 'text-emerald-800 bg-emerald-50/80 font-bold border border-emerald-200/70 shadow-2xs' 
                    : 'hover:text-stone-900 hover:bg-stone-100/70'
                }`
              }
            >
              {lang === 'am' ? 'ማህበረሰብ' : 'Community'}
            </NavLink>

            <NavLink 
              to="/partners" 
              className={({ isActive }) => 
                `px-3 py-1.5 rounded-xl transition-all ${
                  isActive 
                    ? 'text-emerald-800 bg-emerald-50/80 font-bold border border-emerald-200/70 shadow-2xs' 
                    : 'hover:text-stone-900 hover:bg-stone-100/70'
                }`
              }
            >
              {lang === 'am' ? 'አስጎብኚ ይሁኑ' : 'Partner with Us'}
            </NavLink>

            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `px-3 py-1.5 rounded-xl transition-all ${
                  isActive 
                    ? 'text-emerald-800 bg-emerald-50/80 font-bold border border-emerald-200/70 shadow-2xs' 
                    : 'hover:text-stone-900 hover:bg-stone-100/70'
                }`
              }
            >
              {lang === 'am' ? 'ያግኙን' : 'Contact'}
            </NavLink>

            <span className="w-px h-5 bg-stone-200 mx-1" />

            {/* Host Portal Link */}
            <NavLink 
              to="/organizer/dashboard" 
              className={({ isActive }) => 
                `flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all text-xs font-bold ${
                  isActive 
                    ? 'bg-stone-900 text-white shadow-xs' 
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                }`
              }
              title="Tour Club Dashboard"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-amber-500" />
              <span>Host</span>
            </NavLink>

            {/* Admin Portal Link */}
            <NavLink 
              to="/admin" 
              className={({ isActive }) => 
                `flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-extrabold transition-all ${
                  isActive 
                    ? 'bg-emerald-800 text-white border-emerald-700 shadow-xs' 
                    : 'bg-emerald-950/80 border-emerald-700/80 text-emerald-300 hover:bg-emerald-900 hover:text-white'
                }`
              }
              title="Platform Master Admin"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Admin</span>
            </NavLink>
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Wishlist Pill */}
            {wishlistCount > 0 && (
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 hover:scale-105 transition-all cursor-pointer shadow-2xs"
                title="Saved Wishlist"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
                <span className="text-xs">{wishlistCount}</span>
              </button>
            )}

            {/* Compare Drawer trigger */}
            {compareCount > 0 && (
              <button 
                onClick={onOpenCompare}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-all shadow-md cursor-pointer animate-pulse-subtle"
              >
                <Layers className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">{lang === 'am' ? 'አነጻጽር' : 'Compare'}</span>
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white text-emerald-800 text-[10px] sm:text-[11px] flex items-center justify-center font-extrabold">
                  {compareCount}
                </span>
              </button>
            )}

            {/* Currency Selector */}
            <div className="flex items-center bg-stone-100 p-0.5 sm:p-1 rounded-xl border border-stone-200 text-[11px] sm:text-xs font-semibold">
              <button 
                onClick={() => setCurrency('ETB')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  currency === 'ETB' 
                    ? 'bg-white text-emerald-900 shadow-xs font-bold' 
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                ETB
              </button>
              <button 
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  currency === 'USD' 
                    ? 'bg-white text-emerald-900 shadow-xs font-bold' 
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                USD
              </button>
            </div>

            {/* Language Toggle Pill */}
            <button
              onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-bold transition-all cursor-pointer"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'en' ? 'EN' : 'አማ'}</span>
            </button>

            {/* USER PROFILE DROPDOWN / SIGN IN */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 sm:pr-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200/80 border border-stone-200 transition-all cursor-pointer"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-xl object-cover"
                  />
                  <span className="text-xs font-bold text-stone-800 hidden md:inline truncate max-w-[100px]">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-stone-500" />
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-stone-200 shadow-xl p-2 space-y-1 text-xs animate-slide-up z-50"
                  >
                    <div className="p-2.5 border-b border-stone-100">
                      <strong className="block text-stone-900 font-bold truncate">{user.name}</strong>
                      <span className="text-[10px] text-stone-400 font-mono block truncate">{user.phone}</span>
                      <span className="text-[9px] font-black uppercase text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded mt-1 inline-block">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 font-semibold transition-all"
                    >
                      <QrCode className="w-4 h-4 text-emerald-700" />
                      <span>My Verified E-Tickets</span>
                    </Link>

                    {user.role === 'host' && (
                      <Link
                        to="/organizer/dashboard"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-stone-700 hover:bg-amber-50 hover:text-amber-900 font-semibold transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4 text-amber-600" />
                        <span>Host Dashboard</span>
                      </Link>
                    )}

                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 font-semibold transition-all"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <div className="border-t border-stone-100 pt-1">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold transition-all text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-md shadow-emerald-900/10 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>{lang === 'am' ? 'ግባ' : 'Sign In'}</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 transition-all cursor-pointer ml-1"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Clean Mobile Slide-Down Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-4 animate-slide-up shadow-2xl max-h-[85vh] overflow-y-auto">
          
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`p-3 rounded-2xl border flex items-center gap-2 ${
                location.pathname === '/' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              <span>🏠 Home</span>
            </Link>

            <Link
              to="/trips"
              onClick={closeMobileMenu}
              className={`p-3 rounded-2xl border flex items-center gap-2 ${
                location.pathname === '/trips' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              <span>🏔️ Explore Trips</span>
            </Link>

            <Link
              to="/map"
              onClick={closeMobileMenu}
              className={`p-3 rounded-2xl border flex items-center gap-2 ${
                location.pathname === '/map' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              <span>🗺️ Landmark Map</span>
            </Link>

            <Link
              to="/gear-guide"
              onClick={closeMobileMenu}
              className={`p-3 rounded-2xl border flex items-center gap-2 ${
                location.pathname === '/gear-guide' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              <span>🎒 Gear Guide</span>
            </Link>

            <Link
              to="/community"
              onClick={closeMobileMenu}
              className={`p-3 rounded-2xl border flex items-center gap-2 ${
                location.pathname === '/community' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              <span>📸 Community Feed</span>
            </Link>

            <Link
              to="/profile"
              onClick={closeMobileMenu}
              className={`p-3 rounded-2xl border flex items-center gap-2 ${
                location.pathname === '/profile' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              <span>🎫 My Tickets</span>
            </Link>

            <Link
              to="/partners"
              onClick={closeMobileMenu}
              className={`p-3 rounded-2xl border flex items-center gap-2 ${
                location.pathname === '/partners' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              <span>🤝 Partner with Us</span>
            </Link>

            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className={`p-3 rounded-2xl border flex items-center gap-2 ${
                location.pathname === '/contact' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              <span>📞 Contact Desk</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-stone-100 grid grid-cols-2 gap-2">
            <Link
              to="/organizer/dashboard"
              onClick={closeMobileMenu}
              className="p-3 rounded-2xl bg-stone-900 text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>Host Portal</span>
            </Link>

            <Link
              to="/admin"
              onClick={closeMobileMenu}
              className="p-3 rounded-2xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-extrabold flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Master Admin</span>
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}
