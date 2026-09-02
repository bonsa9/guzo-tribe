import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  Send, 
  QrCode, 
  Download, 
  Sparkles,
  ArrowRight,
  User,
  Phone,
  Lock,
  Tag,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({
  trip,
  isOpen,
  onClose,
  currency,
  lang
}) {
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Ticket
  const [ticketCount, setTicketCount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('telebirr'); // telebirr, cbe, chapa
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '+251 9',
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

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (!formData.fullName || formData.phone.length < 9) {
      alert(lang === 'am' ? 'እባክዎ ሙሉ ስምዎንና ስልክ ቁጥርዎን ያስገቡ።' : 'Please fill in your Full Name and Phone Number.');
      return;
    }
    setStep(2);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedRef = `GZ-${Math.floor(1000 + Math.random() * 9000)}-ETH`;
      setBookingRef(generatedRef);
      setStep(3);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (_e) {
        // ignore
      }
    }, 1500);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setPromoApplied(false);
    setPromoCode('');
    setFormData({
      fullName: '',
      phone: '+251 9',
      telegramHandle: '@',
      emergencyContact: '',
      dietaryNotes: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[92vh]">
        
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
              {step}/3
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">
                {step === 1 && (lang === 'am' ? 'የተጓዥ መረጃ' : 'Step 1: Traveler Details')}
                {step === 2 && (lang === 'am' ? 'ክፍያ ይፈጽሙ' : 'Step 2: Payment Method')}
                {step === 3 && (lang === 'am' ? 'የተረጋገጠ የጉዞ ትኬት' : 'Step 3: Confirmed E-Ticket')}
              </h3>
              <p className="text-[11px] text-stone-400">
                {trip.title} ({trip.durationText})
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
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: Traveler Info Form */}
          {step === 1 && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              
              {/* Trip Mini Summary Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-emerald-950 text-xs sm:text-sm">{trip.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-emerald-800 mt-0.5">
                    <span>{trip.nextDeparture}</span>
                    <span>•</span>
                    <span>{trip.pickupLocation.split(',')[0]}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-900 block">
                    {formatPrice(unitPrice)} <span className="text-[10px] font-normal text-stone-500">/ person</span>
                  </span>
                </div>
              </div>

              {/* Number of Seats Selection */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-stone-700">
                    {lang === 'am' ? 'የቦታዎች ብዛት (Number of Seats)' : 'Number of Travelers'}
                  </label>
                  {trip.groupDiscount && (
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {trip.groupDiscount.minSeats}+ Seats = {trip.groupDiscount.discountPercent}% Discount
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setTicketCount(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
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
                  <span className="text-emerald-800">You Save: {formatPrice(discountAmount)}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {lang === 'am' ? 'ሙሉ ስም *' : 'Full Name *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Almaz Bekele / Michael Abebe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone Number & Telegram Handle */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {lang === 'am' ? 'ስልክ ቁጥር (Telebirr/SMS) *' : 'Phone Number (Telebirr/SMS) *'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+251 911 234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {lang === 'am' ? 'የቴሌግራም አካውንት (Telegram Handle)' : 'Telegram Username (For Group Chat)'}
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

              {/* Total Calculation */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500">{ticketCount} x {formatPrice(unitPrice)}</span>
                  <div className="text-lg font-extrabold text-stone-900">
                    {lang === 'am' ? 'ጠቅላላ፡ ' : 'Total: '} <span className="text-emerald-800">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>{lang === 'am' ? 'ወደ ክፍያ ይቀጥሉ' : 'Continue to Payment'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 2: Ethiopian Payment Provider Selection */}
          {step === 2 && (
            <div className="space-y-5">
              
              <div className="text-center max-w-sm mx-auto mb-4">
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
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'telebirr'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 font-extrabold flex items-center justify-center text-xs">
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
                    className="w-4 h-4 text-emerald-700 focus:ring-emerald-700"
                  />
                </label>

                {/* CBE Birr Option */}
                <label 
                  onClick={() => setPaymentMethod('cbe')}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'cbe'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-900 text-amber-400 font-extrabold flex items-center justify-center text-xs">
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
                    className="w-4 h-4 text-emerald-700 focus:ring-emerald-700"
                  />
                </label>

                {/* Chapa / Card Option */}
                <label 
                  onClick={() => setPaymentMethod('chapa')}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'chapa'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-xs">
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
                    className="w-4 h-4 text-emerald-700 focus:ring-emerald-700"
                  />
                </label>

              </div>

              {/* Amount Breakdown Box */}
              <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-700 space-y-1.5">
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
                  <span>{lang === 'am' ? 'የአገልግሎት ዋስትና ክፍያ (Escrow Protection)' : 'Escrow Guarantee & Protection'}</span>
                  <span className="font-semibold text-emerald-700">{lang === 'am' ? 'ነፃ' : 'FREE'}</span>
                </div>
                <div className="pt-2 border-t border-stone-300 flex justify-between font-extrabold text-stone-900 text-sm">
                  <span>{lang === 'am' ? 'የሚከፈለው ድምር' : 'Grand Total'}</span>
                  <span className="text-emerald-800">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold transition-all cursor-pointer"
                >
                  {lang === 'am' ? 'ተመለስ' : 'Back'}
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

          {/* STEP 3: Confirmed Ethiopian E-Ticket */}
          {step === 3 && (
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
              <div className="max-w-md mx-auto bg-gradient-to-br from-stone-900 to-stone-950 text-white p-6 rounded-3xl shadow-xl border border-stone-800 text-left relative overflow-hidden">
                
                <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                  <Sparkles className="w-44 h-44 text-amber-300" />
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                      GuzoTribe E-Voucher
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
                    <span className="text-stone-400 block text-[10px]">{lang === 'am' ? 'ተጓዥ' : 'Traveler Name'}</span>
                    <span className="font-bold text-white text-sm">{formData.fullName} ({ticketCount} {ticketCount > 1 ? 'Pax' : 'Person'})</span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[10px]">{lang === 'am' ? 'የጉዞ መዳረሻ' : 'Trip'}</span>
                    <span className="font-bold text-amber-300">{trip.title}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                    <div>
                      <span className="text-stone-400 block text-[10px]">{lang === 'am' ? 'የመነሻ ቀን' : 'Departure'}</span>
                      <span className="font-semibold text-white">{trip.nextDeparture}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">{lang === 'am' ? 'የመነሻ ቦታ' : 'Meeting Spot'}</span>
                      <span className="font-semibold text-white truncate block">{trip.pickupLocation.split(',')[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-white/20 flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified Escrow Booking
                  </span>
                  <span className="text-amber-400 font-bold">{formatPrice(finalTotal)} PAID</span>
                </div>

              </div>

              {/* Action: Join Telegram Group for this trip */}
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
                      {lang === 'am' ? 'ከአስጎብኚውና ከተጓዦች ጋር ይገናኙ' : 'Meet your fellow hikers & trip lead'}
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
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    alert(lang === 'am' ? 'ትኬትዎ ወደ ስልክዎ ዳውንሎድ ተደርጓል!' : 'E-Ticket PDF successfully downloaded!');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-bold transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'am' ? 'ትኬቱን አውርድ' : 'Download Ticket PDF'}</span>
                </button>
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  {lang === 'am' ? 'ጨርስ (Done)' : 'Done'}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
