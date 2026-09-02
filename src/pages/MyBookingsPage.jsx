import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bus, 
  Calendar, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Printer, 
  FileText, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  User,
  RotateCcw
} from 'lucide-react';
import { tripsData } from '../data/tripsData';
import PrintableTicketModal from '../components/PrintableTicketModal';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function MyBookingsPage({ lang, currency: _currency }) {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed'
  const [selectedTicketForPrint, setSelectedTicketForPrint] = useState(null);

  // Mock initial bookings stored for the user (can be hydrated from localStorage if present)
  const [bookings, setBookings] = useState([
    {
      bookingId: 'GZ-2026-8812',
      tripId: 'wenchi-crater-lake-day-hike',
      trip: tripsData[0],
      seats: ['2A (Window)', '2B (Aisle)'],
      passengerCount: 2,
      passengers: [
        { name: user?.name || 'Amanuel Tadesse', phone: user?.phone || '+251 911 482 109' },
        { name: 'Bethlehem Haile', phone: '+251 922 837 410' }
      ],
      pickupStation: {
        id: 'meskel-square',
        name: 'Meskel Square (መስቀል አደባባይ)',
        time: '06:00 AM',
        landmark: 'In front of Addis Ababa Museum / Tourist Info'
      },
      payment: {
        method: 'Telebirr',
        amountETB: tripsData[0].priceETB * 2,
        txnRef: 'TLB-984210948',
        status: 'escrow_secured'
      },
      departureDate: 'Saturday, Sep 6, 2026',
      departureTime: '06:00 AM',
      leadGuide: {
        name: 'Dawit Mengistu (Certified MoT Guide)',
        phone: '+251 911 234 567',
        telegram: '@DawitGuzoGuide'
      },
      status: 'confirmed'
    },
    {
      bookingId: 'GZ-2026-6140',
      tripId: 'bale-mountains-sanetti-plateau',
      trip: tripsData.find(t => t.id === 'bale-mountains-sanetti-plateau') || tripsData[1],
      seats: ['4C (Aisle)'],
      passengerCount: 1,
      passengers: [
        { name: user?.name || 'Amanuel Tadesse', phone: user?.phone || '+251 911 482 109' }
      ],
      pickupStation: {
        id: 'bole-medhanialem',
        name: 'Bole Medhanialem (ቦሌ መድኃኔዓለም)',
        time: '06:20 AM',
        landmark: 'Medhanialem Church Gate / In front of Edna Mall'
      },
      payment: {
        method: 'CBE Birr',
        amountETB: 12500,
        txnRef: 'CBE-398104812',
        status: 'escrow_secured'
      },
      departureDate: 'Friday, Sep 19, 2026',
      departureTime: '06:20 AM',
      leadGuide: {
        name: 'Selam Tesfaye (Mountain Ecologist)',
        phone: '+251 933 555 888',
        telegram: '@SelamBaleGuide'
      },
      status: 'confirmed'
    }
  ]);

  const pastBookings = [
    {
      bookingId: 'GZ-2026-1049',
      tripId: 'suba-menagesha-forest-hike',
      trip: tripsData.find(t => t.id === 'suba-menagesha-forest-hike') || tripsData[2],
      seats: ['3A (Window)'],
      passengerCount: 1,
      departureDate: 'Saturday, Aug 16, 2026',
      status: 'completed',
      payment: {
        method: 'Telebirr',
        amountETB: 1650,
        txnRef: 'TLB-210491823'
      }
    }
  ];

  const handleCancelBooking = (bookingId) => {
    const confirmed = window.confirm(
      lang === 'am'
        ? 'ይህንን ጉዞ መሰረዝ ይፈልጋሉ? ሙሉ ክፍያዎ በቴሌብር 100% ተመላሽ ይደረጋል።'
        : 'Are you sure you want to cancel this booking? Under our 100% Escrow Protection policy, full refund will be reversed to your Telebirr account.'
    );
    if (confirmed) {
      setBookings(prev => prev.filter(b => b.bookingId !== bookingId));
      addToast(
        lang === 'am'
          ? 'ጉዞው ተሰርዟል፤ ሙሉ ተመላሽ በቴሌብር ተፈጽሟል።'
          : 'Booking cancelled. Full refund reversed to your Telebirr wallet.',
        'info'
      );
    }
  };

  const handleOpenPrintModal = (b) => {
    setSelectedTicketForPrint({
      ticketId: b.bookingId,
      tripTitle: b.trip.title,
      organizer: b.trip.organizer,
      ticketCount: b.passengerCount,
      totalAmount: b.payment.amountETB,
      seats: b.seats,
      pickupStation: b.pickupStation,
      date: b.departureDate,
      pickupTime: b.pickupStation.time,
      destination: b.trip.destination || b.trip.title,
      departureTime: b.departureTime
    });
  };

  return (
    <div className="min-h-screen bg-[#fbfaf8] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'am' ? 'የተጓዥ ማዕከል' : 'Traveler Portal'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-serif">
              {lang === 'am' ? 'የእኔ የተያዙ ጉዞዎች' : 'My Trips & Boarding Passes'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {lang === 'am'
                ? 'የተያዙ መቀመጫዎች፣ የኮስተር አውቶቡስ መነሻ ሰዓት እና ይፋዊ የቦርዲንግ ፓስዎን እዚህ ይመልከቱ።'
                : 'Access your assigned Toyota Coaster seats, Addis pickup station schedules, and printable boarding passes.'}
            </p>
          </div>

          {/* Tab Filter */}
          <div className="flex p-1 bg-stone-200/80 rounded-2xl text-xs font-bold shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {lang === 'am' ? `ቀጣይ ጉዞዎች (${bookings.length})` : `Upcoming Trips (${bookings.length})`}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'completed'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {lang === 'am' ? `ያለፉ ጉዞዎች (${pastBookings.length})` : `Completed (${pastBookings.length})`}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* UPCOMING BOOKINGS TAB                                                     */}
        {/* ========================================================================= */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            {bookings.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                  <Bus className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg text-stone-900">
                  {lang === 'am' ? 'ምንም ያልተጓዙበት ጉዞ የለም' : 'No Active Bookings Yet'}
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  {lang === 'am'
                    ? 'የሳምንቱን መጨረሻ ጉዞዎች ያስሱ እና መቀመጫዎን በቴሌብር ይያዙ።'
                    : 'Discover upcoming weekend group hikes, reserve your Coaster seat, and start exploring Ethiopia.'}
                </p>
                <Link
                  to="/trips"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <span>{lang === 'am' ? 'ጉዞዎችን አስስ' : 'Explore All Trips'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              bookings.map((booking) => (
                <div 
                  key={booking.bookingId}
                  className="bg-white rounded-3xl border border-stone-200 shadow-md hover:shadow-lg transition-all overflow-hidden"
                >
                  {/* Top Notification Stripe */}
                  <div className="bg-emerald-950 text-emerald-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold">100% Escrow Protected Booking</span>
                      <span className="text-emerald-400/80">•</span>
                      <span className="font-mono text-emerald-300">ID: {booking.bookingId}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-semibold text-white">Confirmed Departure</span>
                    </div>
                  </div>

                  {/* Booking Card Main Body */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      
                      {/* Trip Info */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-extrabold font-mono uppercase">
                            {booking.trip.category}
                          </span>
                          <span className="text-xs text-stone-500 font-medium">
                            Organized by <strong className="text-stone-800">{booking.trip.organizer}</strong>
                          </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-serif">
                          {lang === 'am' ? booking.trip.amharicTitle : booking.trip.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 font-medium">
                          <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                            <Calendar className="w-4 h-4 text-emerald-700" />
                            <span>{booking.departureDate}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5 text-stone-700">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span>Departure at {booking.departureTime}</span>
                          </span>
                        </div>
                      </div>

                      {/* Payment & Passenger Counter Pill */}
                      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-right shrink-0">
                        <span className="text-[11px] text-stone-500 uppercase tracking-wider block mb-0.5">
                          Paid via {booking.payment.method}
                        </span>
                        <div className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
                          {booking.payment.amountETB.toLocaleString()} ETB
                        </div>
                        <span className="text-xs text-emerald-700 font-bold flex items-center justify-end gap-1 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Paid & Verified</span>
                        </span>
                      </div>

                    </div>

                    {/* Highlighted Coaster Bus & Addis Pickup Station Box */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80">
                      
                      {/* Left: Assigned Coaster Seats */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                          <Bus className="w-4 h-4 text-emerald-700" />
                          <span>28-Seat Toyota Coaster Reservation</span>
                        </span>

                        <div className="flex flex-wrap items-center gap-2">
                          {booking.seats.map((seat, sIdx) => (
                            <div 
                              key={sIdx}
                              className="px-3 py-1.5 rounded-xl bg-emerald-900 text-white font-mono font-black text-xs shadow-xs flex items-center gap-1.5"
                            >
                              <span>Seat {seat}</span>
                            </div>
                          ))}
                          <span className="text-xs text-stone-500 font-medium">
                            ({booking.passengerCount} reserved passenger seats)
                          </span>
                        </div>
                      </div>

                      {/* Right: Addis Pickup Station */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-amber-600" />
                          <span>Addis Ababa Morning Boarding Hub</span>
                        </span>

                        <div className="font-bold text-xs sm:text-sm text-stone-900">
                          {booking.pickupStation.name} — <span className="text-emerald-800 font-mono font-black">{booking.pickupStation.time} Sharp</span>
                        </div>

                        <p className="text-xs text-stone-500">
                          📍 {booking.pickupStation.landmark}
                        </p>
                      </div>

                    </div>

                    {/* Passenger Roster and Guide Contact */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-stone-200 text-xs">
                      
                      <div className="space-y-1">
                        <span className="font-bold text-stone-700 block">Travelers on Ticket:</span>
                        <div className="flex flex-wrap items-center gap-3 text-stone-600">
                          {booking.passengers.map((p, pIdx) => (
                            <span key={pIdx} className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-stone-400" />
                              <span>{p.name} ({p.phone})</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Lead Guide Info */}
                      <div className="flex items-center gap-2">
                        <span className="text-stone-500">Lead Guide:</span>
                        <a
                          href={`https://t.me/${booking.leadGuide.telegram.replace('@', '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-emerald-800 font-bold hover:underline"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-sky-600" />
                          <span>{booking.leadGuide.telegram}</span>
                        </a>
                      </div>

                    </div>

                    {/* Card Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
                      
                      <div className="flex items-center gap-2">
                        {/* 1-Click Print Boarding Pass */}
                        <button
                          type="button"
                          onClick={() => handleOpenPrintModal(booking)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                        >
                          <Printer className="w-4 h-4" />
                          <span>{lang === 'am' ? 'ይፋዊ ቦርዲንግ ፓስ አትም' : 'Print Official Boarding Pass'}</span>
                        </button>

                        {/* View Highway Checkpoint Manifest */}
                        <Link
                          to={`/manifest/${booking.tripId}`}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs transition-all"
                        >
                          <FileText className="w-3.5 h-3.5 text-stone-500" />
                          <span>{lang === 'am' ? 'የፍተሻ ማኒፌስት (Manifest)' : 'Checkpoint Manifest'}</span>
                        </Link>
                      </div>

                      {/* Cancel & Escrow Refund Policy */}
                      <button
                        type="button"
                        onClick={() => handleCancelBooking(booking.bookingId)}
                        className="text-stone-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{lang === 'am' ? 'ሰርዝና ተመላሽ ጠይቅ' : 'Cancel & Request Escrow Refund'}</span>
                      </button>

                    </div>

                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* COMPLETED BOOKINGS TAB                                                    */}
        {/* ========================================================================= */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            {pastBookings.map((pb) => (
              <div
                key={pb.bookingId}
                className="p-6 rounded-3xl bg-white border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-mono font-bold">
                      {pb.bookingId}
                    </span>
                    <span className="text-emerald-700 font-bold">Completed Expedition ✓</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900">
                    {pb.trip.title}
                  </h3>
                  <p className="text-stone-500">
                    Departed on {pb.departureDate} • Coaster Seat: {pb.seats.join(', ')}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-mono font-bold text-stone-800">
                    {pb.payment.amountETB.toLocaleString()} ETB
                  </span>
                  <Link
                    to={`/trips`}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold transition-all"
                  >
                    Book Again
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Escrow Assurance Footer Banner */}
        <div className="p-5 rounded-3xl bg-emerald-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <strong className="block text-sm text-white font-bold">
                100% Escrow Protection Guarantee
              </strong>
              <span className="text-emerald-200">
                Your payment is securely held until you board your Toyota Coaster. Direct organizer payouts release only upon departure confirmation.
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Printable Boarding Pass Modal */}
      {selectedTicketForPrint && (
        <PrintableTicketModal
          isOpen={!!selectedTicketForPrint}
          onClose={() => setSelectedTicketForPrint(null)}
          ticket={selectedTicketForPrint}
          user={user}
        />
      )}
    </div>
  );
}
