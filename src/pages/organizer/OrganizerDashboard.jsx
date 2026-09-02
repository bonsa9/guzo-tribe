import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Star, 
  Plus, 
  FileText, 
  CreditCard, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Menu, 
  Printer, 
  Check 
} from 'lucide-react';
import { sampleBookings } from '../../data/bookingsData';
import { Link } from 'react-router-dom';
import CreateTripModal from './CreateTripModal';
import PassengerManifestModal from './PassengerManifestModal';
import PayoutModal from './PayoutModal';
import HostSidebar from './components/HostSidebar';
import DataTable from '../../components/common/DataTable';
import { useToast } from '../../context/ToastContext';

export default function OrganizerDashboard({ trips, onTripCreated, lang }) {
  const { addToast } = useToast();
  const [organizerTrips, setOrganizerTrips] = useState(
    trips.filter((t) => t.organizerId === 'addis-hikers' || t.id.startsWith('trip-'))
  );
  const [selectedTripForManifest, setSelectedTripForManifest] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('departures'); // 'departures' | 'manifests' | 'payouts' | 'fleet' | 'checklist'
  const [checkedInPassengers, setCheckedInPassengers] = useState(['BK-8842-01']);

  const handleCreateNewTrip = (newTrip) => {
    setOrganizerTrips((prev) => [newTrip, ...prev]);
    if (onTripCreated) onTripCreated(newTrip);
  };

  const handleToggleCheckIn = (bookingId) => {
    const isChecked = checkedInPassengers.includes(bookingId);
    if (isChecked) {
      setCheckedInPassengers((prev) => prev.filter((id) => id !== bookingId));
      addToast(`Checked out passenger ${bookingId}`, 'info');
    } else {
      setCheckedInPassengers((prev) => [...prev, bookingId]);
      addToast(`Passenger ${bookingId} verified & checked in! 🚌`, 'success');
    }
  };

  // Stats
  const totalRevenue = 148200;
  const availablePayout = 48500;
  const totalHikers = 412;

  // Passenger Manifest Table Columns
  const manifestColumns = [
    {
      header: 'Booking Ref',
      accessor: 'id',
      sortable: true,
      render: (row) => <span className="font-mono font-bold text-amber-700">{row.id}</span>
    },
    {
      header: 'Passenger Details',
      accessor: 'passengerName',
      sortable: true,
      render: (row) => (
        <div>
          <strong className="block text-stone-900">{row.passengerName}</strong>
          <span className="text-[10px] text-sky-700 font-medium">{row.telegramHandle}</span>
        </div>
      )
    },
    {
      header: 'Trip Destination',
      accessor: 'tripTitle',
      sortable: true,
      render: (row) => <span className="font-semibold text-stone-700">{row.tripTitle}</span>
    },
    {
      header: 'Phone / Telebirr',
      accessor: 'phone',
      sortable: false,
      render: (row) => <span className="font-mono text-stone-600">{row.phone}</span>
    },
    {
      header: 'Seats',
      accessor: 'seats',
      sortable: true,
      cellClassName: 'text-center',
      render: (row) => (
        <span className="font-black text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-full">
          {row.seats}
        </span>
      )
    },
    {
      header: 'Amount Paid',
      accessor: 'totalAmountETB',
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-stone-900">
          {row.totalAmountETB.toLocaleString()} ETB
        </span>
      )
    },
    {
      header: 'Check-in Status',
      accessor: 'id',
      sortable: false,
      render: (row) => {
        const isChecked = checkedInPassengers.includes(row.id);
        return (
          <button
            onClick={() => handleToggleCheckIn(row.id)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              isChecked
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
            }`}
          >
            {isChecked ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{isChecked ? 'Boarded' : 'Check In'}</span>
          </button>
        );
      }
    }
  ];

  // Escrow Payouts Table Data
  const payoutLedgerData = [
    {
      id: 'PAY-ETH-9921',
      tripTitle: 'Wenchi Crater Lake Hike & Boat',
      completionDate: '2026-08-30',
      passengers: 28,
      grossETB: 61600,
      feeETB: 4928,
      netETB: 56672,
      account: '0911482910 (Telebirr)',
      status: 'SETTLED'
    },
    {
      id: 'PAY-ETH-9922',
      tripTitle: 'Menagesha Suba Forest Eco-Walk',
      completionDate: '2026-08-24',
      passengers: 22,
      grossETB: 39600,
      feeETB: 3168,
      netETB: 36432,
      account: '1000284910294 (CBE)',
      status: 'SETTLED'
    },
    {
      id: 'PAY-ETH-9923',
      tripTitle: 'Debre Libanos Gorge & Monastery',
      completionDate: '2026-09-01',
      passengers: 25,
      grossETB: 60000,
      feeETB: 4800,
      netETB: 55200,
      account: '0911482910 (Telebirr)',
      status: 'READY'
    }
  ];

  const payoutColumns = [
    {
      header: 'Payout ID',
      accessor: 'id',
      sortable: true,
      render: (row) => <span className="font-mono font-bold text-amber-700">{row.id}</span>
    },
    {
      header: 'Trip Name',
      accessor: 'tripTitle',
      sortable: true,
      render: (row) => (
        <div>
          <strong className="block text-stone-900">{row.tripTitle}</strong>
          <span className="text-[10px] text-stone-400">Completed: {row.completionDate} ({row.passengers} Pax)</span>
        </div>
      )
    },
    {
      header: 'Gross (ETB)',
      accessor: 'grossETB',
      sortable: true,
      render: (row) => <span className="font-mono">{row.grossETB.toLocaleString()} ETB</span>
    },
    {
      header: '8% Platform Fee',
      accessor: 'feeETB',
      sortable: true,
      render: (row) => <span className="font-mono text-amber-700">-{row.feeETB.toLocaleString()} ETB</span>
    },
    {
      header: 'Net Payout',
      accessor: 'netETB',
      sortable: true,
      render: (row) => <span className="font-mono font-black text-emerald-800">{row.netETB.toLocaleString()} ETB</span>
    },
    {
      header: 'Destination Account',
      accessor: 'account',
      sortable: false,
      render: (row) => <span className="font-mono text-stone-600 text-[11px]">{row.account}</span>
    },
    {
      header: 'Settlement',
      accessor: 'status',
      sortable: true,
      render: (row) => (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
          row.status === 'SETTLED'
            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
            : 'bg-amber-100 text-amber-900 border border-amber-300'
        }`}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-800 font-sans flex flex-col">
      
      {/* Top Host Bar */}
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
                  Addis Hikers Club
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold">
                  🛡️ Verified Host #884
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">
                Manage weekend departures, generate checkpoint manifests & withdraw Telebirr escrow payouts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPayoutModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Available:</span>
              <strong className="font-mono text-emerald-800">{availablePayout.toLocaleString()} ETB</strong>
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Trip</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main 2-Column Sidebar + Content Shell */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Left Sidebar */}
        <HostSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          onOpenPayoutModal={() => setIsPayoutModalOpen(true)}
          availablePayout={availablePayout}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          organizerTripsCount={organizerTrips.length}
        />

        {/* Right Dynamic Tab Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl">
          
          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Total Sales</span>
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-extrabold text-stone-900 font-mono">{totalRevenue.toLocaleString()} ETB</span>
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700"><DollarSign className="w-4 h-4" /></span>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18% this month
              </span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Available Escrow</span>
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-800 font-mono">{availablePayout.toLocaleString()} ETB</span>
                <span className="p-2 rounded-xl bg-amber-50 text-amber-700"><CheckCircle2 className="w-4 h-4" /></span>
              </div>
              <span className="text-[10px] text-stone-500">Ready for Telebirr payout</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Total Travelers</span>
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-extrabold text-stone-900 font-mono">{totalHikers}</span>
                <span className="p-2 rounded-xl bg-sky-50 text-sky-700"><Users className="w-4 h-4" /></span>
              </div>
              <span className="text-[10px] text-stone-500">18 departures safely completed</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Host Rating</span>
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-extrabold text-stone-900 flex items-center gap-1 text-amber-600 font-mono">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.92
                </span>
                <span className="p-2 rounded-xl bg-purple-50 text-purple-700"><Sparkles className="w-4 h-4" /></span>
              </div>
              <span className="text-[10px] text-stone-500">142 verified reviews</span>
            </div>
          </div>

          {/* ==================== TAB 1: ACTIVE DEPARTURES ==================== */}
          {activeTab === 'departures' && (
            <div className="space-y-4 animate-slide-up">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-stone-900 font-serif">
                  Active Listed Departures ({organizerTrips.length})
                </h3>
                <span className="text-xs text-stone-500 font-semibold">Live in GuzoTribe Catalog</span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {organizerTrips.map((trip) => {
                  const bookedCount = trip.totalSpots - trip.spotsLeft;
                  const percentBooked = Math.round((bookedCount / trip.totalSpots) * 100);

                  return (
                    <div
                      key={trip.id}
                      className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px]">
                            ● Active Departure
                          </span>
                          <span className="text-stone-500 font-mono text-[11px]">
                            {trip.durationText}
                          </span>
                        </div>

                        <h4 className="font-bold text-base text-stone-900 line-clamp-1">{trip.title}</h4>
                        <p className="text-xs text-stone-500 mb-3">{trip.location} • {trip.pickupLocation?.split(',')[0] || 'Addis Ababa'}</p>

                        {/* Booking Pool Bar */}
                        <div className="space-y-1.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-stone-600">{bookedCount} of {trip.totalSpots} Seats Booked</span>
                            <span className="text-emerald-800 font-bold">{percentBooked}%</span>
                          </div>
                          <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                            <div style={{ width: `${percentBooked}%` }} className="h-full bg-emerald-600 rounded-full" />
                          </div>
                          <span className="text-[10px] text-amber-700 font-bold block mt-1">
                            🔥 Only {trip.spotsLeft} seats remaining
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-stone-100">
                        <button
                          onClick={() => setSelectedTripForManifest(trip)}
                          className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Manifest ({bookedCount} Pax)</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==================== TAB 2: MANIFESTS (DATA TABLE) ==================== */}
          {activeTab === 'manifests' && (
            <div className="space-y-4 animate-slide-up">
              <DataTable
                title="Security Checkpoint Passenger Manifests"
                subtitle="Official passenger manifest required at regional transport checkpoints across Oromia, Amhara, and Afar"
                data={sampleBookings}
                columns={manifestColumns}
                searchKeys={['id', 'passengerName', 'tripTitle', 'phone', 'telegramHandle']}
                searchPlaceholder="Search passenger by name, #Ref, destination, or phone..."
                exportFileName="GuzoTribe_Passenger_Manifest"
                actions={
                  <div className="flex items-center gap-2">
                    <Link
                      to="/manifest/wenchi-crater-lake-day-hike"
                      className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-300" />
                      <span>Official MoT Clearance Sheet</span>
                    </Link>
                    <button
                      onClick={() => window.print()}
                      className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Raw Table</span>
                    </button>
                  </div>
                }
              />
            </div>
          )}

          {/* ==================== TAB 3: PAYOUTS (DATA TABLE) ==================== */}
          {activeTab === 'payouts' && (
            <div className="space-y-6 animate-slide-up">
              <DataTable
                title="Escrow Balance & Payout Settlement Ledger"
                subtitle="GuzoTribe automatically holds passenger funds in trust and deducts 8% platform fee upon completion."
                data={payoutLedgerData}
                columns={payoutColumns}
                searchKeys={['id', 'tripTitle', 'account', 'status']}
                searchPlaceholder="Search payout records..."
                filterKey="status"
                filterOptions={[
                  { label: 'All Records', value: 'ALL' },
                  { label: 'Settled', value: 'SETTLED' },
                  { label: 'Ready for Release', value: 'READY' }
                ]}
                exportFileName="GuzoTribe_Payout_Ledger"
                actions={
                  <button
                    onClick={() => setIsPayoutModalOpen(true)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                    <span>Request Telebirr Transfer</span>
                  </button>
                }
              />
            </div>
          )}

          {/* ==================== TAB 4: FLEET & GUIDES ==================== */}
          {activeTab === 'fleet' && (
            <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-7 space-y-6 animate-slide-up">
              <div>
                <h3 className="font-bold text-lg text-stone-900 font-serif">Certified Guides & Vehicle Fleet</h3>
                <p className="text-xs text-stone-500">
                  Verified equipment, wilderness first-aid certifications, and licensed Toyota Coaster buses.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-stone-900 text-sm">Toyota Coaster Bus (28 Seats)</strong>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Inspected</span>
                  </div>
                  <p className="text-stone-500">Plate: <strong>ET-3-84920 AA</strong> • AC & High-Clearance Suspension</p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-stone-900 text-sm">Lead Guide: Yonas Bekele</strong>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Wilderness First Aid</span>
                  </div>
                  <p className="text-stone-500">8 Years Experience • Fluent in Amharic, Afaan Oromoo & English</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: PRE-DEPARTURE CHECKLIST ==================== */}
          {activeTab === 'checklist' && (
            <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-7 space-y-4 animate-slide-up">
              <div>
                <h3 className="font-bold text-lg text-stone-900 font-serif">Pre-Departure Safety Checklist</h3>
                <p className="text-xs text-stone-500">Standard operating procedure for Ethiopian group tour departures.</p>
              </div>

              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-emerald-700 focus:ring-emerald-600" />
                  <span>Printed Checkpoint Passenger Manifest ready with national IDs & emergency contacts</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-emerald-700 focus:ring-emerald-600" />
                  <span>High-altitude medical kit (Acetazolamide, O2 canister, thermal blankets) on board</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-emerald-700 focus:ring-emerald-600" />
                  <span>Local armed community scout coordination confirmed for park trail entry</span>
                </label>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* Modals */}
      <CreateTripModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTripCreated={handleCreateNewTrip}
        lang={lang}
      />

      <PassengerManifestModal
        isOpen={!!selectedTripForManifest}
        onClose={() => setSelectedTripForManifest(null)}
        trip={selectedTripForManifest}
        lang={lang}
      />

      <PayoutModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        availableBalance={availablePayout}
        lang={lang}
      />

    </div>
  );
}
