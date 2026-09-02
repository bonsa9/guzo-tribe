import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  Send, 
  QrCode, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  User,
  Phone,
  Lock,
  Tag,
  Gift,
  Printer,
  Bus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import PickupStationSelector from './booking/PickupStationSelector';
import CoasterSeatPicker from './booking/CoasterSeatPicker';
import PrintableTicketModal from './PrintableTicketModal';
import { ADDIS_PICKUP_STATIONS } from '../data/coasterBusData';

export default function BookingModal({
  trip,
  isOpen,
  onClose,
  currency,
  lang,
  user
}) {
  const { user: authUser } = useAuth();
  const activeUser = user || authUser;

  const [step, setStep] = useState(1); // 1: Info & Station, 2: Bus Seats, 3: Payment, 4: Confirmed
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedPickupId, setSelectedPickupId] = useState('meskel-square');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('telebirr'); // telebirr, cbe, chapa
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [formData, setFormData] = useState({
    fullName: activeUser?.name || '',
    phone: activeUser?.phone || '+251 9',
    telegramHandle: '@',
    emergencyContact: '',
    dietaryNotes: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen || !trip) return null;

  const unitPrice = currency === 'USD' ? trip.priceUSD : trip.priceETB;
  const rawSubtotal = unitPrice * ticketCount;

  // Auto group discount calculation
  let discountPercent = 0;
  if (trip.groupDiscount && ticketCount >= trip.groupDiscount.minSeats) {
    discountPercent = trip.groupDiscount.discountPercent;
  }
  if (promoApplied) {
    discountPercent = Math.max(discountPercent, 15);
  }

  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const finalTotal = rawSubtotal - discountAmount;

  const currentPickupStation = ADDIS_PICKUP_STATIONS.find((s) => s.id === selectedPickupId) || ADDIS_PICKUP_STATIONS[0];

  const formatPrice = (amount) => {
    if (currency === 'USD') return `$${amount}`;
    return `${amount.toLocaleString()} ETB`;
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'GUZO2026' || promoCode.trim().toUpperCase() === 'DIASPORA') {
      setPromoApplied(true);
      alert(lang === 'am' ? 'የ15% የማስተዋወቂያ ቅናሽ ተተግብሯል!' : '15% Promo Discount successfully applied!');
    } else {
      alert(lang === 'am' ? 'ልክ ያልሆነ የማስተዋወቂያ ኮድ። "GUZO2026" ይሞክሩ።' : 'Invalid promo code. Try "GUZO2026"');
    }
  };

  // Step 1 -> Step 2
  const handleNextToSeats = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || formData.phone.length < 9) {
      alert(lang === 'am' ? 'እባክዎ ሙሉ ስምዎንና ስልክ ቁጥርዎን ያስገቡ።' : 'Please fill in your Full Name and Phone Number.');
      return;
    }
    setStep(2);
  };

  // Step 2 -> Step 3
  const handleNextToPayment = () => {
    if (selectedSeats.length !== ticketCount) {
      alert(
        lang === 'am'
          ? `እባክዎ በትክክል ${ticketCount} መቀመጫዎችን ይምረጡ። (አሁን የመረጡት፡ ${selectedSeats.length})`
          : `Please select exactly ${ticketCount} seat(s) on the bus. Currently selected: ${selectedSeats.length}`
      );
      return;
    }
    setStep(3);
  };

  // Step 3 -> Step 4
  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedRef = `GZ-${Math.floor(1000 + Math.random() * 9000)}-ETH`;
      setBookingRef(generatedRef);
      setStep(4);

      try {
        confetti({
          particleCount: 110,
          spread: 85,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }, 1500);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setPromoApplied(false);
    setPromoCode('');
    setSelectedSeats([]);
    setIsPrintModalOpen(false);
    setFormData({
      fullName: user?.name || '',
      phone: user?.phone || '+251 9',
      telegramHandle: '@',
      emergencyContact: '',
      dietaryNotes: ''
    });
    onClose();
  };

  // Constructed ticket object for PrintableTicketModal
  const printableTicketData = {
    bookingRef,
    tripTitle: lang === 'am' ? trip.amharicTitle : trip.title,
    departureDate: trip.nextDeparture,
    seats: ticketCount,
    seatNumbers: selectedSeats.join(', '),
    totalPaidETB: currency === 'USD' ? finalTotal * 115 : finalTotal,
    organizerName: trip.organizerName,
    pickupLocation: `${currentPickupStation.name} (${currentPickupStation.landmark}), Addis Ababa`,
    boardingTime: currentPickupStation.time,
    paymentMethod: paymentMethod === 'telebirr' ? 'Telebirr' : paymentMethod === 'cbe' ? 'CBE Birr' : 'Chapa'
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto animate-fade-in">
        <div className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[92vh]">
          
          {/* Header */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-sm font-mono">
                {step}/4
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">
                  {step === 1 && (lang === 'am' ? 'ደረጃ 1፡ የተጓዥ እና መነሻ መረጃ' : 'Step 1: Traveler & Pickup Station')}
                  {step === 2 && (lang === 'am' ? 'ደረጃ 2፡ የኮስተር መቀመጫ ምርጫ' : 'Step 2: 28-Seat Coaster Bus Map')}
                  {step === 3 && (lang === 'am' ? 'ደረጃ 3፡ ክፍያ ይፈጽሙ' : 'Step 3: Escrow Payment Method')}
                  {step === 4 && (lang === 'am' ? 'ደረጃ 4፡ የተረጋገጠ የጉዞ ትኬት' : 'Step 4: Confirmed E-Ticket')}
                </h3>
                <p className="text-[11px] text-stone-400">
                  {lang === 'am' ? trip.amharicTitle : trip.title} ({trip.durationText})
                </p>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1">
            
            {/* STEP 1: Traveler Info & Addis Pickup Station Form */}
            {step === 1 && (
              <form onSubmit={handleNextToSeats} className="space-y-4">
                
                {/* Trip Mini Summary Banner */}
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-emerald-950 text-xs sm:text-sm">
                      {lang === 'am' ? trip.amharicTitle : trip.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-emerald-800 mt-0.5 font-medium">
                      <span>{trip.nextDeparture}</span>
                      <span>•</span>
                      <span>{trip.organizerName}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-900 block font-mono">
                      {formatPrice(unitPrice)} <span className="text-[10px] font-normal text-stone-500">/ person</span>
                    </span>
                  </div>
                </div>

                {/* Number of Seats Selection */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-stone-700">
                      {lang === 'am' ? 'የተጓዦች ብዛት (Number of Travelers)' : 'Number of Travelers (Seats to Reserve)'}
                    </label>
                    {trip.groupDiscount && (
                      <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {trip.groupDiscount.minSeats}+ Seats = {trip.groupDiscount.discountPercent}% OFF
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setTicketCount(num)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer font-mono ${
                          ticketCount === num
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Discount Applied Alert */}
                {discountAmount > 0 && (
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs font-bold text-amber-900">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-amber-600 animate-bounce" />
                      <span>Group Discount Applied ({discountPercent}% OFF!)</span>
                    </div>
                    <span className="text-emerald-800 font-mono">You Save: {formatPrice(discountAmount)}</span>
                  </div>
                )}

                {/* Contact Information Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {lang === 'am' ? 'ሙሉ ስም *' : 'Full Name *'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bethlehem Tadesse"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {lang === 'am' ? 'ስልክ ቁጥር (SMS ትኬት) *' : 'Phone Number (For SMS Ticket) *'}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+251 9..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {lang === 'am' ? 'የቴሌግራም አካውንት (ለጉዞው ግሩፕ)' : 'Telegram Username (For Group Coordination)'}
                  </label>
                  <div className="relative">
                    <Send className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="@username"
                      value={formData.telegramHandle}
                      onChange={(e) => setFormData({ ...formData, telegramHandle: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Addis Ababa Morning Pickup Hub Selector */}
                <div className="pt-2 border-t border-stone-100">
                  <PickupStationSelector
                    selectedStationId={selectedPickupId}
                    onSelectStation={setSelectedPickupId}
                    lang={lang}
                  />
                </div>

                {/* Advance to Step 2 */}
                <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-500 font-mono">{ticketCount} x {formatPrice(unitPrice)}</span>
                    <div className="text-base sm:text-lg font-black text-stone-900 font-mono">
                      {lang === 'am' ? 'ድምር፡ ' : 'Total: '} <span className="text-emerald-800">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <span>{lang === 'am' ? 'የአውቶቡስ መቀመጫ ይምረጡ' : 'Select Coaster Seats'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>
            )}

            {/* STEP 2: Interactive 28-Seat Toyota Coaster Bus Map */}
            {step === 2 && (
              <div className="space-y-4">
                {/* Station recap pill */}
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-amber-950 font-bold">
                    <Bus className="w-4 h-4 text-amber-700" />
                    <span>Boarding: {currentPickupStation.name} ({currentPickupStation.time})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-amber-800 hover:underline text-[11px] font-semibold cursor-pointer"
                  >
                    Change Stop
                  </button>
                </div>

                {/* Coaster Seat Blueprint */}
                <CoasterSeatPicker
                  tripId={trip.id}
                  ticketCount={ticketCount}
                  selectedSeats={selectedSeats}
                  onSeatsChange={setSelectedSeats}
                  lang={lang}
                />

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{lang === 'am' ? 'ተመለስ' : 'Back'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={selectedSeats.length !== ticketCount}
                    onClick={handleNextToPayment}
                    className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>
                      {lang === 'am' 
                        ? `ወደ ክፍያ ይቀጥሉ (${selectedSeats.length}/${ticketCount})`
                        : `Proceed to Payment (${selectedSeats.length}/${ticketCount})`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Local Ethiopian Escrow Payment */}
            {step === 3 && (
              <div className="space-y-5">
                
                {/* Boarding and Seats recap */}
                <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 font-mono">
                      {selectedSeats.length} Seat(s): {selectedSeats.join(', ')}
                    </span>
                    <span>•</span>
                    <span className="text-stone-600">
                      {currentPickupStation.name} ({currentPickupStation.time})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-emerald-800 hover:underline font-bold text-[11px] cursor-pointer"
                  >
                    Edit Seats
                  </button>
                </div>

                <div className="text-center max-w-sm mx-auto mb-2">
                  <h4 className="font-bold text-stone-900 text-base">
                    {lang === 'am' ? 'የመክፈያ ዘዴዎን ይምረጡ' : 'Select Local Payment Method'}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {lang === 'am'
                      ? 'ክፍያዎ በGuzoTribe ዋስትና የተያዘ ሲሆን ጉዞው እስኪረጋገጥ ድረስ በጥንቃቄ ይጠበቃል።'
                      : '100% Escrow protected. Payment released only when trip departure is confirmed.'}
                  </p>
                </div>

                {/* Payment Methods Options */}
                <div className="space-y-2.5">
                  
                  {/* Telebirr Option */}
                  <label 
                    onClick={() => setPaymentMethod('telebirr')}
                    className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'telebirr'
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 font-black flex items-center justify-center text-xs shadow-xs">
                        telebirr
                      </div>
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-stone-900 block">
                          Telebirr (ቴሌብር)
                        </span>
                        <span className="text-[11px] text-stone-500">
                          {lang === 'am' ? 'በUSSD ወይም በTelebirr App ፈጣን ክፍያ' : 'Instant mobile wallet prompt / USSD push'}
                        </span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'telebirr'}
                      onChange={() => setPaymentMethod('telebirr')}
                      className="w-4 h-4 text-emerald-700 focus:ring-emerald-700 cursor-pointer"
                    />
                  </label>

                  {/* CBE Birr Option */}
                  <label 
                    onClick={() => setPaymentMethod('cbe')}
                    className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'cbe'
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-900 text-amber-400 font-black flex items-center justify-center text-xs shadow-xs">
                        CBE
                      </div>
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-stone-900 block">
                          CBE Birr / Commercial Bank of Ethiopia
                        </span>
                        <span className="text-[11px] text-stone-500">
                          {lang === 'am' ? 'በCBE Birr ወይም በCBE Mobile Banking' : 'Pay via CBE Birr mobile app or transfer'}
                        </span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cbe'}
                      onChange={() => setPaymentMethod('cbe')}
                      className="w-4 h-4 text-emerald-700 focus:ring-emerald-700 cursor-pointer"
                    />
                  </label>

                  {/* Chapa / Card Option */}
                  <label 
                    onClick={() => setPaymentMethod('chapa')}
                    className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'chapa'
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-black flex items-center justify-center text-xs shadow-xs">
                        Chapa
                      </div>
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-stone-900 block">
                          Chapa / Bank Cards & Diaspora Cards
                        </span>
                        <span className="text-[11px] text-stone-500">
                          {lang === 'am' ? 'ቪዛ፣ ማስተርካርድ፣ አዋሽ ብርና ሌሎች' : 'Visa, Mastercard, Awash Birr, SantimPay'}
                        </span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'chapa'}
                      onChange={() => setPaymentMethod('chapa')}
                      className="w-4 h-4 text-emerald-700 focus:ring-emerald-700 cursor-pointer"
                    />
                  </label>

                </div>

                {/* Promo Code Input */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {lang === 'am' ? 'የማስተዋወቂያ ኮድ (Promo Code)' : 'Have a Promo Code?'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Try GUZO2026"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs uppercase font-mono focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-stone-800 text-white rounded-xl text-xs font-bold hover:bg-stone-900 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Amount Breakdown Box */}
                <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-700 space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span>{lang === 'am' ? 'የጉዞ ትኬት (' : 'Ticket ('}{ticketCount}x)</span>
                    <span>{formatPrice(rawSubtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Discount Savings ({discountPercent}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-500">
                    <span>{lang === 'am' ? 'የአገልግሎት ዋስትና (Escrow)' : 'Escrow Guarantee & Protection'}</span>
                    <span className="font-semibold text-emerald-700">{lang === 'am' ? 'ነፃ' : 'FREE'}</span>
                  </div>
                  <div className="pt-2 border-t border-stone-300 flex justify-between font-extrabold text-stone-900 text-sm">
                    <span>{lang === 'am' ? 'የሚከፈለው ድምር' : 'Grand Total'}</span>
                    <span className="text-emerald-800">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{lang === 'am' ? 'ተመለስ' : 'Back'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleConfirmPayment}
                    className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/20 transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{lang === 'am' ? 'ክፍያው እየተረጋገጠ ነው...' : 'Verifying Payment...'}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>
                          {lang === 'am' ? `${formatPrice(finalTotal)} ይክፈሉ` : `Pay ${formatPrice(finalTotal)}`}
                        </span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}

            {/* STEP 4: Confirmed E-Ticket & Boarding Pass */}
            {step === 4 && (
              <div className="space-y-6 text-center py-2 animate-scale-up">
                
                {/* Success Badge */}
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mb-1">
                    {lang === 'am' ? 'እንኳን ደስ አለዎት! ቦታዎ ተይዟል።' : 'Booking Confirmed!'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                    {lang === 'am'
                      ? `የቦታ ማስያዣ ቁጥርዎ ${bookingRef} ነው። የጉዞ ትኬትዎ በSMS ወደ ${formData.phone} ተልኳል።`
                      : `Your booking reference is ${bookingRef}. A confirmation SMS has been dispatched to ${formData.phone}.`}
                  </p>
                </div>

                {/* Printable Ticket Voucher Card */}
                <div className="max-w-md mx-auto bg-gradient-to-br from-stone-900 to-stone-950 text-white p-5 sm:p-6 rounded-3xl shadow-xl border border-stone-800 text-left relative overflow-hidden">
                  
                  <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                    <Sparkles className="w-44 h-44 text-amber-300" />
                  </div>

                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                        GuzoTribe Boarding Pass
                      </span>
                      <span className="font-extrabold text-base text-white tracking-wide font-mono">
                        {bookingRef}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-white text-stone-950">
                      <QrCode className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <span className="text-stone-400 block text-[10px]">{lang === 'am' ? 'ተጓዥ' : 'Traveler'}</span>
                      <span className="font-bold text-white text-sm">{formData.fullName} ({ticketCount} {ticketCount > 1 ? 'Passengers' : 'Passenger'})</span>
                    </div>

                    <div>
                      <span className="text-stone-400 block text-[10px]">{lang === 'am' ? 'የጉዞ መዳረሻ' : 'Trip'}</span>
                      <span className="font-bold text-amber-300">{lang === 'am' ? trip.amharicTitle : trip.title}</span>
                    </div>

                    {/* Assigned Seats Highlight */}
                    <div className="p-2.5 rounded-xl bg-emerald-900/60 border border-emerald-700/80 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-xs">
                        <Bus className="w-4 h-4 text-amber-300" />
                        <span>Assigned Coaster Seats:</span>
                      </div>
                      <span className="font-mono font-black text-amber-300 bg-stone-900/80 px-2 py-0.5 rounded-lg border border-emerald-500/50">
                        {selectedSeats.join(', ')}
                      </span>
                    </div>

                    {/* Boarding Station & Time */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                      <div>
                        <span className="text-stone-400 block text-[10px]">{lang === 'am' ? 'የመነሻ ቀን' : 'Departure'}</span>
                        <span className="font-semibold text-white">{trip.nextDeparture}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">{lang === 'am' ? 'የመነሻ ጣቢያ (Boarding)' : 'Pickup Station'}</span>
                        <span className="font-semibold text-amber-200 truncate block">
                          {currentPickupStation.name} ({currentPickupStation.time})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-dashed border-white/20 flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Escrow Protection
                    </span>
                    <span className="text-amber-400 font-bold font-mono">{formatPrice(finalTotal)} PAID</span>
                  </div>

                </div>

                {/* Official Telegram Group banner */}
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 max-w-md mx-auto flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-sky-950">
                        {lang === 'am' ? 'የጉዞው የቴሌግራም ግሩፕ' : 'Official Trip Telegram Group'}
                      </h5>
                      <p className="text-[11px] text-sky-800">
                        {lang === 'am' ? 'ከአስጎብኚውና ከተጓዦች ጋር ይገናኙ' : 'Meet your fellow hikers & coordinator'}
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://t.me/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shrink-0 transition-all"
                  >
                    {lang === 'am' ? 'ተቀላቀል' : 'Join Group'}
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                  <button
                    onClick={() => setIsPrintModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                  >
                    <Printer className="w-4 h-4 text-amber-300" />
                    <span>{lang === 'am' ? 'ትኬት አትም (Print Boarding Pass)' : 'Print Official Boarding Pass'}</span>
                  </button>

                  <button
                    onClick={handleResetAndClose}
                    className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    {lang === 'am' ? 'ጨርስ (Done)' : 'Done'}
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>

      {/* Printable Boarding Pass Modal */}
      {isPrintModalOpen && (
        <PrintableTicketModal
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
          ticket={printableTicketData}
          user={activeUser}
        />
      )}
    </>
  );
}
