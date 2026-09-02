import React, { useState } from 'react';
import { 
  User, 
  QrCode, 
  Heart, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Menu,
  LayoutGrid,
  Table as TableIcon,
  Printer
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import TravelerSidebar from './components/TravelerSidebar';
import DataTable from '../../components/common/DataTable';
import PrintableTicketModal from '../../components/PrintableTicketModal';

export default function ProfilePage({ lang: _lang, currency: _currency, wishlist, trips, onViewTrip, onBookTrip }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('tickets'); // 'tickets' | 'wishlist' | 'safety'
  const [ticketViewMode, setTicketViewMode] = useState('grid'); // 'grid' | 'table'
  const [selectedTicketForQr, setSelectedTicketForQr] = useState(null);
  const [selectedTicketForPrint, setSelectedTicketForPrint] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#faf9f6] pt-16 pb-24 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-lg text-center max-w-sm w-full space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <User className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Please Sign In</h2>
          <p className="text-xs text-stone-500">
            Sign in to view your verified e-tickets, checkpoint manifests, and saved trips.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const wishlistedTrips = trips ? trips.filter((t) => wishlist && wishlist.includes(t.id)) : [];

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'info');
    navigate('/login');
  };

  // E-Tickets Data Table Columns
  const ticketColumns = [
    {
      header: 'Booking Ref',
      accessor: 'bookingRef',
      sortable: true,
      render: (row) => <span className="font-mono font-bold text-amber-700">{row.bookingRef}</span>
    },
    {
      header: 'Destination Itinerary',
      accessor: 'tripTitle',
      sortable: true,
      render: (row) => (
        <div>
          <strong className="block text-stone-900">{row.tripTitle}</strong>
          <span className="text-[11px] text-stone-500">Host: {row.organizerName}</span>
        </div>
      )
    },
    {
      header: 'Departure Date',
      accessor: 'departureDate',
      sortable: true,
      render: (row) => <span className="font-semibold text-stone-800">{row.departureDate}</span>
    },
    {
      header: 'Pickup Spot',
      accessor: 'pickupLocation',
      sortable: false,
      render: (row) => <span className="text-xs text-stone-600 truncate max-w-xs block">{row.pickupLocation}</span>
    },
    {
      header: 'Seats',
      accessor: 'seats',
      sortable: true,
      cellClassName: 'text-center',
      render: (row) => <span className="font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-full">{row.seats}</span>
    },
    {
      header: 'Amount Paid',
      accessor: 'totalPaidETB',
      sortable: true,
      render: (row) => <span className="font-mono font-bold text-stone-900">{row.totalPaidETB?.toLocaleString()} ETB</span>
    },
    {
      header: 'QR Boarding Pass',
      accessor: 'id',
      sortable: false,
      render: (row) => (
        <button
          onClick={() => setSelectedTicketForQr(row)}
          className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Show QR</span>
        </button>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-800 font-sans flex flex-col">
      
      {/* Top Traveler Dashboard Bar */}
      <div className="bg-white border-b border-stone-200 sticky top-16 sm:top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-stone-900 font-serif">
                  {user.name}’s Traveler Dashboard
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold">
                  🎒 Verified Traveler
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">
                View verified QR passes, pickup locations, and checkpoint manifest readiness
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/trips')}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Explore New Trips</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main 2-Column Sidebar + Content Shell */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Left Sidebar */}
        <TravelerSidebar
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          ticketCount={user.tickets ? user.tickets.length : 0}
          wishlistCount={wishlistedTrips.length}
          onLogout={handleLogout}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Right Dynamic Tab Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl">
          
          {/* ==================== TAB 1: MY TICKETS ==================== */}
          {activeTab === 'tickets' && (
            <div className="space-y-4 animate-slide-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-stone-900 font-serif">
                    Verified Booking Passes ({user.tickets ? user.tickets.length : 0})
                  </h2>
                  <p className="text-xs text-stone-500">100% Protected by Telebirr & CBE Escrow</p>
                </div>

                {/* View Mode Toggle */}
                {user.tickets && user.tickets.length > 0 && (
                  <div className="bg-stone-100 p-1 rounded-xl flex items-center gap-1 text-xs self-start sm:self-auto border border-stone-200">
                    <button
                      onClick={() => setTicketViewMode('grid')}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                        ticketViewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-500'
                      }`}
                      title="Cards View"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setTicketViewMode('table')}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                        ticketViewMode === 'table' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-500'
                      }`}
                      title="Data Table View"
                    >
                      <TableIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {user.tickets && user.tickets.length > 0 ? (
                ticketViewMode === 'table' ? (
                  <DataTable
                    title="My Booking Passes"
                    subtitle="Official e-tickets for bus coordinator QR check-in"
                    data={user.tickets}
                    columns={ticketColumns}
                    searchKeys={['bookingRef', 'tripTitle', 'departureDate', 'organizerName']}
                    searchPlaceholder="Search passes by ref #, destination, or date..."
                    exportFileName="GuzoTribe_My_Tickets"
                  />
                ) : (
                  <div className="grid md:grid-cols-2 gap-5">
                    {user.tickets.map((tkt) => (
                      <div
                        key={tkt.id}
                        className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 hover:border-emerald-700 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded">
                              {tkt.bookingRef}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold">
                              ✓ {tkt.status}
                            </span>
                          </div>

                          <h3 className="font-bold text-base text-stone-900 font-serif">{tkt.tripTitle}</h3>
                          <p className="text-xs text-stone-500">
                            Tour Host: <strong className="text-stone-800">{tkt.organizerName}</strong>
                          </p>

                          <div className="space-y-1.5 text-xs text-stone-600 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-stone-400" />
                              <span>Departure Date: <strong>{tkt.departureDate}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Pickup Spot: {tkt.pickupLocation}</span>
                            </div>
                            <div className="flex justify-between pt-1 border-t border-stone-200 font-mono">
                              <span>Seats: {tkt.seats}</span>
                              <strong className="text-emerald-800 font-bold">{tkt.totalPaidETB?.toLocaleString()} ETB Paid</strong>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setSelectedTicketForQr(tkt)}
                            className="py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <QrCode className="w-4 h-4 text-emerald-700" />
                            <span>QR Code</span>
                          </button>
                          <button
                            onClick={() => setSelectedTicketForPrint(tkt)}
                            className="py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Printer className="w-4 h-4 text-amber-300" />
                            <span>Print Pass</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center space-y-4">
                  <QrCode className="w-10 h-10 text-stone-300 mx-auto" />
                  <h3 className="text-base font-bold text-stone-800">No Active Bookings Yet</h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Browse upcoming weekend hikes and cultural tours to book with Telebirr escrow protection.
                  </p>
                  <button
                    onClick={() => navigate('/trips')}
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Explore Upcoming Trips
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ==================== TAB 2: WISHLIST ==================== */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4 animate-slide-up">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-stone-900 font-serif">
                  Saved Bookmarks ({wishlistedTrips.length})
                </h2>
                <span className="text-xs text-stone-500 font-semibold">Quick 1-Click Checkout</span>
              </div>

              {wishlistedTrips.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {wishlistedTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3 flex flex-col justify-between hover:shadow-md transition-all"
                    >
                      <div className="space-y-2">
                        <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100">
                          <img src={trip.images[0]} alt={trip.title} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-bold text-sm text-stone-900 line-clamp-1">{trip.title}</h4>
                        <p className="text-xs text-stone-500">{trip.location} • {trip.durationText}</p>
                        <span className="text-base font-black text-emerald-800 font-mono block">
                          {trip.priceETB?.toLocaleString()} ETB
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                        <button
                          onClick={() => onViewTrip && onViewTrip(trip)}
                          className="py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                        >
                          Itinerary
                        </button>
                        <button
                          onClick={() => onBookTrip && onBookTrip(trip)}
                          className="py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 cursor-pointer shadow-xs"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center space-y-4">
                  <Heart className="w-10 h-10 text-stone-300 mx-auto" />
                  <h3 className="text-base font-bold text-stone-800">Your Wishlist is Empty</h3>
                  <p className="text-xs text-stone-500">
                    Tap the heart icon on any trip card to save departures for later.
                  </p>
                  <button
                    onClick={() => navigate('/trips')}
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Explore Trips
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ==================== TAB 3: SAFETY & CHECKPOINTS ==================== */}
          {activeTab === 'safety' && (
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6 animate-slide-up">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-900">Checkpoint Manifest Safety Profile</h3>
                  <p className="text-xs text-stone-500">
                    Pre-filled passenger details required at regional transport security checkpoints across Ethiopia.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Full Legal Name (as on Kebele/Passport)</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">National ID / Kebele Card Number</label>
                  <input
                    type="text"
                    defaultValue={user.nationalId || 'ET-AA-0928419'}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-mono text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Emergency Contact (Phone & Name)</label>
                  <input
                    type="text"
                    defaultValue={user.emergencyContact || '+251 922 113355 (Dawit Tadesse)'}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">City of Residence</label>
                  <input
                    type="text"
                    defaultValue={user.city || 'Addis Ababa'}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => addToast('Safety Manifest profile saved!', 'success')}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  Save Details
                </button>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* QR Code Pass Inspection Modal */}
      {selectedTicketForQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white p-7 rounded-3xl max-w-sm w-full space-y-5 text-center shadow-2xl animate-slide-up">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                {selectedTicketForQr.bookingRef}
              </span>
              <h3 className="font-extrabold text-lg text-stone-900 font-serif">{selectedTicketForQr.tripTitle}</h3>
              <p className="text-xs text-stone-500">Departure: {selectedTicketForQr.departureDate}</p>
            </div>

            {/* QR Mock */}
            <div className="w-48 h-48 mx-auto bg-stone-900 rounded-2xl p-4 flex flex-col items-center justify-center shadow-inner">
              <div className="w-full h-full bg-white p-2 rounded-xl flex items-center justify-center">
                <QrCode className="w-36 h-36 text-stone-900" />
              </div>
            </div>

            <p className="text-[11px] text-stone-500">
              Present this QR code to <strong className="text-stone-800">{selectedTicketForQr.organizerName}</strong> bus coordinator at pickup.
            </p>

            <button
              onClick={() => setSelectedTicketForQr(null)}
              className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs cursor-pointer"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}

      {/* Official Printable Boarding Pass Modal */}
      <PrintableTicketModal
        isOpen={!!selectedTicketForPrint}
        onClose={() => setSelectedTicketForPrint(null)}
        ticket={selectedTicketForPrint}
        user={user}
      />

    </div>
  );
}
