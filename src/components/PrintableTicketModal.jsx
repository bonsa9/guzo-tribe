import React from 'react';
import { 
  X, 
  Printer, 
  QrCode, 
  MapPin 
} from 'lucide-react';

export default function PrintableTicketModal({
  isOpen,
  onClose,
  ticket,
  user
}) {
  if (!isOpen || !ticket) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-slide-up relative text-stone-800">
        
        {/* Modal Action Bar */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3 no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-extrabold text-stone-900 text-sm sm:text-base font-serif">
              Official Ethiopian Group Travel E-Ticket Pass
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Boarding Stub</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Boarding Pass Frame */}
        <div className="border-2 border-dashed border-stone-300 rounded-3xl p-6 sm:p-7 space-y-5 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden">
          
          {/* Top Brand & Security Header */}
          <div className="flex items-start justify-between border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl text-stone-900 font-serif">GuzoTribe</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  ጉዞትራይብ
                </span>
              </div>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold mt-0.5">
                Verified Escrow Protected Boarding Pass
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-stone-400 block font-mono">Booking Reference</span>
              <strong className="text-sm sm:text-base font-mono font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                {ticket.bookingRef}
              </strong>
            </div>
          </div>

          {/* Passenger & Trip Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-stone-400 uppercase block font-bold">Passenger Full Name</span>
              <strong className="text-sm text-stone-900 block">{user?.name || 'Bethlehem Tadesse'}</strong>
              <span className="text-[11px] text-stone-500 font-mono">National ID: {user?.nationalId || 'ET-AA-0928419'}</span>
            </div>

            <div>
              <span className="text-[10px] text-stone-400 uppercase block font-bold">Tour Operator Host</span>
              <strong className="text-sm text-emerald-900 block">{ticket.organizerName}</strong>
              <span className="text-[11px] text-stone-500 font-mono">License: #ETH-TOUR-884</span>
            </div>

            <div>
              <span className="text-[10px] text-stone-400 uppercase block font-bold">Destination & Departure</span>
              <strong className="text-xs text-stone-900 block">{ticket.tripTitle}</strong>
              <span className="text-[11px] text-emerald-700 font-bold font-mono">📅 {ticket.departureDate}</span>
            </div>

            <div>
              <span className="text-[10px] text-stone-400 uppercase block font-bold">Seats & Total Paid</span>
              <strong className="text-xs text-stone-900 block">{ticket.seats} Passenger Seat(s)</strong>
              <span className="text-[11px] text-emerald-800 font-black font-mono">
                {ticket.totalPaidETB?.toLocaleString()} ETB (Verified Telebirr)
              </span>
            </div>
          </div>

          {/* Pickup & Bus Info */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-950">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>Pickup Landmark & Boarding Time:</span>
            </div>
            <p className="text-xs font-semibold text-stone-800 pl-5">
              {ticket.pickupLocation || 'Meskel Square (In front of Tourist Hotel), Addis Ababa (06:00 AM)'}
            </p>
          </div>

          {/* QR Code & Bus Check-in Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-stone-200">
            <div className="space-y-1 text-center sm:text-left text-[11px] text-stone-500">
              <span className="font-bold text-stone-800 block">Checkpoint Security Ready</span>
              <p className="leading-tight">
                Present this pass to the tour bus coordinator at pickup. Registered on official regional checkpoint manifest.
              </p>
            </div>

            <div className="bg-white p-2.5 rounded-2xl border border-stone-200 shadow-xs shrink-0 text-center">
              <QrCode className="w-20 h-20 text-stone-900 mx-auto" />
              <span className="text-[9px] font-mono text-stone-400 block mt-0.5">SCAN TO BOARD</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
