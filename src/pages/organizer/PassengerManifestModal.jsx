import React, { useState } from 'react';
import { X, Printer, Download, Users, Phone, Send, CheckCircle2, AlertTriangle, ShieldCheck, MapPin, Calendar, Clock } from 'lucide-react';
import { sampleBookings } from '../../data/bookingsData';

export default function PassengerManifestModal({ isOpen, onClose, trip, lang }) {
  const [checkedInIds, setCheckedInIds] = useState(['BK-9412']);

  if (!isOpen || !trip) return null;

  // Filter bookings for this trip
  const tripBookings = sampleBookings.filter(b => b.tripId === trip.id);
  const totalPassengers = tripBookings.reduce((sum, b) => sum + b.seats, 0);
  const totalRevenue = tripBookings.reduce((sum, b) => sum + b.totalAmountETB, 0);

  const toggleCheckIn = (id) => {
    setCheckedInIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">
                  {lang === 'am' ? 'የተሳፋሪዎች ዝርዝር (Passenger Manifest)' : 'Official Checkpoint Passenger Manifest'}
                </h3>
                <span className="text-[10px] bg-emerald-950 border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                  Live Sync
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                {trip.title} • {trip.nextDeparture}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Manifest</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Manifest Body / Printable Sheet */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 print:p-0">
          
          {/* Printable Official Header Banner */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                Tourism & Checkpoint Transport Manifest
              </div>
              <h2 className="text-lg font-bold text-stone-900">{trip.title}</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 mt-1">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-700" /> {trip.pickupLocation.split(',')[0]}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-700" /> {trip.pickupTime}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-emerald-700" /> {trip.nextDeparture}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div className="p-3 bg-white rounded-xl border border-stone-200 text-center">
                <span className="text-[10px] text-stone-400 block font-bold">Booked Seats</span>
                <span className="text-base font-extrabold text-stone-900">{totalPassengers} / {trip.totalSpots}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200 text-center">
                <span className="text-[10px] text-stone-400 block font-bold">Verified Escrow</span>
                <span className="text-base font-extrabold text-emerald-800">{totalRevenue.toLocaleString()} ETB</span>
              </div>
            </div>
          </div>

          {/* Passenger Table */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[10px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Ref #</th>
                  <th className="py-3 px-4">Passenger Name</th>
                  <th className="py-3 px-4">Phone / Telebirr</th>
                  <th className="py-3 px-4">Emergency Contact</th>
                  <th className="py-3 px-4 text-center">Seats</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4 text-center print:hidden">Bus Check-In</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                {tripBookings.length > 0 ? (
                  tripBookings.map((b) => {
                    const isCheckedIn = checkedInIds.includes(b.id);
                    return (
                      <tr key={b.id} className={`hover:bg-stone-50/80 transition-colors ${isCheckedIn ? 'bg-emerald-50/30' : ''}`}>
                        <td className="py-3 px-4 font-mono text-stone-500 font-semibold">{b.id}</td>
                        <td className="py-3 px-4 font-bold text-stone-900">
                          <div>{b.passengerName}</div>
                          <span className="text-[10px] text-sky-700 font-medium">{b.telegramHandle}</span>
                        </td>
                        <td className="py-3 px-4 font-mono font-medium">{b.phone}</td>
                        <td className="py-3 px-4 text-stone-600">{b.emergencyContact}</td>
                        <td className="py-3 px-4 text-center font-extrabold text-emerald-900">{b.seats}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            ✓ {b.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center print:hidden">
                          <button
                            onClick={() => toggleCheckIn(b.id)}
                            className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                              isCheckedIn
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                            }`}
                          >
                            {isCheckedIn ? '✓ On Board' : 'Check In'}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-stone-400">
                      No bookings recorded for this departure yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Checkpoint Security Stamp & Lead Guide Signature */}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-stone-200 text-xs text-stone-500">
            <div>
              <span className="block font-bold text-stone-700 mb-1">Lead Guide / Driver In-Charge:</span>
              <p className="font-semibold text-stone-900">Dawit Tadesse (Addis Hikers Club)</p>
              <p className="text-[11px]">Tour Guide License: ETH-GUIDE-2024-884</p>
            </div>
            <div className="text-right">
              <span className="block font-bold text-stone-700 mb-1">Regional Checkpoint Verification:</span>
              <div className="h-10 border-b border-dashed border-stone-300 w-48 ml-auto" />
              <p className="text-[10px] text-stone-400 mt-1">Official Stamp / Officer Signature</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
