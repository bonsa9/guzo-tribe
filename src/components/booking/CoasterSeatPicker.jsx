import React, { useState, useMemo, useEffect } from 'react';
import { 
  Check, 
  User, 
  Sparkles, 
  RotateCcw, 
  Mic, 
  Disc, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { 
  COASTER_SEAT_LAYOUT, 
  ALL_COASTER_SEATS, 
  getTripOccupiedSeats 
} from '../../data/coasterBusData';

export default function CoasterSeatPicker({
  tripId,
  ticketCount,
  selectedSeats,
  onSeatsChange,
  lang
}) {
  const occupiedSeats = useMemo(() => getTripOccupiedSeats(tripId), [tripId]);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  useEffect(() => {
    if (selectedSeats.length === 0 || selectedSeats.length !== ticketCount) {
      const autoPicked = [];
      for (const seat of ALL_COASTER_SEATS) {
        if (!occupiedSeats.includes(seat.id)) {
          autoPicked.push(seat.id);
          if (autoPicked.length === ticketCount) break;
        }
      }
      onSeatsChange(autoPicked);
    }
  }, [occupiedSeats, ticketCount, selectedSeats.length, onSeatsChange]);

  const handleSeatClick = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      // Deselect
      onSeatsChange(selectedSeats.filter((id) => id !== seatId));
    } else {
      // If already reached limit, replace the oldest or alert
      if (selectedSeats.length < ticketCount) {
        onSeatsChange([...selectedSeats, seatId]);
      } else {
        // Shift: remove first, add new
        const updated = [...selectedSeats.slice(1), seatId];
        onSeatsChange(updated);
      }
    }
  };

  const handleAutoSelectBest = () => {
    const available = ALL_COASTER_SEATS.filter((s) => !occupiedSeats.includes(s.id));
    // Prefer window seats or consecutive seats in the same row
    const picked = available.slice(0, ticketCount).map((s) => s.id);
    onSeatsChange(picked);
  };

  const isSelectionComplete = selectedSeats.length === ticketCount;

  return (
    <div className="space-y-4">
      {/* Header & Quota Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-extrabold text-sm sm:text-base text-stone-900">
              {lang === 'am' ? 'የኮስተር መቀመጫዎን ይምረጡ' : 'Select Your Toyota Coaster Seats'}
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              28 Seats
            </span>
          </div>
          <p className="text-xs text-stone-500">
            {lang === 'am' 
              ? `${ticketCount} መቀመጫዎችን ይምረጡ (${selectedSeats.length} ተመርጧል)`
              : `Choose ${ticketCount} seat${ticketCount > 1 ? 's' : ''} (${selectedSeats.length}/${ticketCount} selected)`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAutoSelectBest}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'am' ? 'ምርጥ ቦታዎችን ምረጥ' : 'Auto-Pick Best'}</span>
          </button>

          {selectedSeats.length > 0 && (
            <button
              type="button"
              onClick={() => onSeatsChange([])}
              className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all cursor-pointer"
              title="Reset Selection"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Coaster Bus Blueprint Container */}
      <div className="p-4 sm:p-6 bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100 rounded-3xl border-2 border-stone-300 relative overflow-hidden shadow-inner max-w-lg mx-auto">
        
        {/* Front Bus Cabin: Windshield & Crew Station */}
        <div className="mb-4">
          <div className="w-full h-8 bg-stone-900 rounded-t-3xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-stone-400 border-b border-stone-700 relative">
            <span className="flex items-center gap-1">
              <span>▲</span>
              <span>{lang === 'am' ? 'የአውቶቡሱ ፊት ለፊት (Front)' : 'Front Windshield (Toyota Coaster)'}</span>
              <span>▲</span>
            </span>
          </div>

          {/* Driver & Tour Guide Cockpit Row */}
          <div className="flex items-center justify-between pt-3 px-3 pb-2 border-b border-dashed border-stone-300 bg-white/70 rounded-b-xl">
            {/* Driver Cockpit (Left) */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shadow-sm">
                <Disc className="w-5 h-5 animate-spin-slow" />
              </div>
              <div className="leading-tight">
                <span className="text-[11px] font-bold text-stone-900 block">Captain ሹፌር</span>
                <span className="text-[9px] text-emerald-700 font-bold font-mono">Licensed Tour Driver</span>
              </div>
            </div>

            {/* Middle Aisle Passage */}
            <div className="text-[9px] font-bold uppercase tracking-wider text-stone-400 font-mono">
              AISLE / መተላለፊያ
            </div>

            {/* Tour Lead Guide Station & Passenger Entrance Door (Right) */}
            <div className="flex items-center gap-2">
              <div className="text-right leading-tight">
                <span className="text-[11px] font-bold text-stone-900 block">Lead Guide</span>
                <span className="text-[9px] text-amber-600 font-bold font-mono flex items-center justify-end gap-1">
                  <span>Entrance</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-emerald-100 flex items-center justify-center shadow-sm">
                <Mic className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Coaster Seating Grid */}
        <div className="space-y-2.5 py-1">
          {COASTER_SEAT_LAYOUT.map((rowObj) => {
            // Row 7 is the continuous 5-seat Back Bench ("ድጋፉ")
            if (rowObj.isBackBench) {
              return (
                <div key={rowObj.row} className="pt-2 border-t-2 border-stone-300">
                  <div className="flex items-center justify-between mb-1 px-1 text-[10px] text-stone-400 font-bold">
                    <span>Row 7</span>
                    <span className="text-amber-700 font-semibold">{lang === 'am' ? 'ድጋፉ (The Back Crew)' : 'The Back Crew (ድጋፉ)'}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {rowObj.seats.map((seat) => renderSeatButton(seat))}
                  </div>
                </div>
              );
            }

            // Standard Rows 1 to 6 (Left 2 seats, Aisle, Right 1 or 2 seats)
            return (
              <div key={rowObj.row} className="flex items-center justify-between gap-2">
                {/* Left Side Seats (2 seats) */}
                <div className="flex items-center gap-1.5 flex-1 justify-start">
                  {rowObj.seatsLeft.map((seat) => renderSeatButton(seat))}
                </div>

                {/* Center Aisle Spacer */}
                <div className="w-8 text-center text-[10px] font-bold text-stone-300 select-none">
                  {rowObj.row}
                </div>

                {/* Right Side Seats (1 seat for Row 1, 2 seats for Rows 2-6) */}
                <div className="flex items-center gap-1.5 flex-1 justify-end">
                  {rowObj.seatsRight.map((seat) => renderSeatButton(seat))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Back of Bus bumper */}
        <div className="mt-4 w-full h-3 bg-stone-300 rounded-b-2xl border-t border-stone-400/50" />

      </div>

      {/* Hover Seat Details Card */}
      {hoveredSeat && (
        <div className="p-2.5 rounded-xl bg-stone-900 text-white text-xs flex items-center justify-between animate-fade-in shadow-md">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-amber-300 text-sm font-mono">{hoveredSeat.id}</span>
            <span>•</span>
            <span className="font-semibold">{hoveredSeat.feature}</span>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">
            {hoveredSeat.isWindow ? 'Window View 🪟' : 'Aisle Freedom 🚶'}
          </span>
        </div>
      )}

      {/* Legend & Seat Types */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-stone-600 pt-1">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md bg-white border-2 border-emerald-500 shadow-2xs" />
          <span>{lang === 'am' ? 'ክፍት (Available)' : 'Available'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md bg-emerald-700 text-white flex items-center justify-center font-bold text-[9px]">
            ✓
          </div>
          <span>{lang === 'am' ? 'የተመረጠ (Selected)' : 'Selected'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md bg-stone-300 text-stone-500 flex items-center justify-center text-[9px]">
            ✕
          </div>
          <span>{lang === 'am' ? 'የተያዘ (Booked)' : 'Occupied'}</span>
        </div>
      </div>

      {/* Selected Seats Summary Chips */}
      {selectedSeats.length > 0 && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-emerald-950">
              {lang === 'am' ? 'የተመረጡ መቀመጫዎች:' : 'Your Seats:'}
            </span>
            {selectedSeats.map((seatId) => {
              const seatObj = ALL_COASTER_SEATS.find((s) => s.id === seatId);
              return (
                <span
                  key={seatId}
                  className="px-2.5 py-1 rounded-xl bg-white border border-emerald-300 text-emerald-900 font-mono font-bold text-xs flex items-center gap-1 shadow-2xs"
                >
                  <span>Seat {seatId}</span>
                  <span className="text-[10px] text-stone-400">
                    {seatObj?.isWindow ? '🪟' : '🚶'}
                  </span>
                </span>
              );
            })}
          </div>

          {!isSelectionComplete && (
            <div className="flex items-center gap-1 text-xs font-bold text-amber-800">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>
                {lang === 'am'
                  ? `ተጨማሪ ${ticketCount - selectedSeats.length} ቦታ ይምረጡ`
                  : `Select ${ticketCount - selectedSeats.length} more seat(s)`}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Safety & Comfort Note */}
      <div className="flex items-center gap-2 text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          {lang === 'am'
            ? 'ሁሉም የኮስተር አውቶቡሶች በኢትዮጵያ ቱሪዝም ሚኒስቴር ፈቃድ ያላቸው እና የደህንነት ቀበቶ የተገጠመላቸው ናቸው።'
            : 'All Toyota Coasters are MoT certified with seatbelts and passenger insurance coverage.'}
        </span>
      </div>
    </div>
  );

  // Helper render for individual seat button
  function renderSeatButton(seat) {
    const isOccupied = occupiedSeats.includes(seat.id);
    const isSelected = selectedSeats.includes(seat.id);

    return (
      <button
        key={seat.id}
        type="button"
        disabled={isOccupied}
        onClick={() => handleSeatClick(seat.id)}
        onMouseEnter={() => setHoveredSeat(seat)}
        onMouseLeave={() => setHoveredSeat(null)}
        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl font-bold font-mono text-xs flex flex-col items-center justify-center transition-all relative cursor-pointer select-none ${
          isOccupied
            ? 'bg-stone-200 text-stone-400 border border-stone-300 cursor-not-allowed'
            : isSelected
            ? 'bg-gradient-to-tr from-emerald-800 to-emerald-700 text-white border-2 border-amber-400 shadow-md scale-105 ring-2 ring-emerald-600/30'
            : 'bg-white text-stone-800 border-2 border-emerald-500/80 hover:border-emerald-700 hover:bg-emerald-50 hover:scale-105 shadow-2xs'
        }`}
        title={`Seat ${seat.id} - ${seat.feature}`}
      >
        {isOccupied ? (
          <User className="w-3.5 h-3.5 text-stone-400" />
        ) : isSelected ? (
          <>
            <span className="text-[10px] leading-tight font-black">{seat.label}</span>
            <Check className="w-3 h-3 text-amber-300" />
          </>
        ) : (
          <>
            <span className="text-[10px] leading-tight font-bold">{seat.label}</span>
            <span className="text-[8px] text-stone-400 font-sans">
              {seat.isWindow ? 'Win' : 'Ais'}
            </span>
          </>
        )}
      </button>
    );
  }
}
