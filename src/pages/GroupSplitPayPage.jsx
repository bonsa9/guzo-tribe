import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  Copy, 
  Send, 
  ShieldCheck, 
  Lock, 
  Bus, 
  MapPin, 
  Calendar, 
  ArrowLeft,
  Sparkles,
  Phone,
  User,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from '../context/ToastContext';
import { tripsData } from '../data/tripsData';
import GuzoLogo from '../components/GuzoLogo';

export default function GroupSplitPayPage({ lang, currency: _currency }) {
  const { splitId } = useParams();
  const { addToast } = useToast();

  // Find trip from splitId or fallback to Wenchi
  const trip = tripsData.find((t) => splitId?.includes(t.id)) || tripsData[0];

  // 60-minute countdown simulation
  const [timeLeft, setTimeLeft] = useState(54 * 60 + 35); // 54m 35s

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Group members state
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Yared M. (Group Host)',
      phone: '+251 911 *** 412',
      seat: '3A (Window)',
      status: 'paid',
      amountETB: trip.priceETB,
      method: 'Telebirr',
      paidAt: '12 mins ago'
    },
    {
      id: 2,
      name: 'Selamawit B.',
      phone: '+251 922 *** 890',
      seat: '3B (Aisle)',
      status: 'paid',
      amountETB: trip.priceETB,
      method: 'Telebirr',
      paidAt: '4 mins ago'
    },
    {
      id: 3,
      name: 'Pending Friend #3',
      phone: '',
      seat: '3C (Aisle)',
      status: 'pending',
      amountETB: trip.priceETB,
      method: null,
      paidAt: null
    },
    {
      id: 4,
      name: 'Pending Friend #4',
      phone: '',
      seat: '3D (Window)',
      status: 'pending',
      amountETB: trip.priceETB,
      method: null,
      paidAt: null
    }
  ]);

  // Checkout form state for claiming an unpaid seat
  const [selectedSeatIndex, setSelectedSeatIndex] = useState(2); // Seat 3C
  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('+251 9');
  const [paymentMethod, setPaymentMethod] = useState('telebirr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPaidCurrentSession, setHasPaidCurrentSession] = useState(false);

  const paidCount = members.filter((m) => m.status === 'paid').length;
  const totalCount = members.length;
  const progressPercent = Math.round((paidCount / totalCount) * 100);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    addToast(
      lang === 'am' ? 'የቡድን ሊንክ ተቀድቷል! ለጓደኞችዎ ያጋሩ።' : 'Group link copied to clipboard! Share with your friends.',
      'success'
    );
  };

  const handlePayMyShare = (e) => {
    e.preventDefault();
    if (!friendName.trim() || friendPhone.length < 9) {
      addToast(
        lang === 'am' ? 'እባክዎ ስምዎንና ስልክ ቁጥርዎን ያስገቡ' : 'Please fill in your name and phone number',
        'error'
      );
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasPaidCurrentSession(true);

      // Update member status
      setMembers((prev) =>
        prev.map((m, idx) =>
          idx === selectedSeatIndex
            ? {
                ...m,
                name: friendName,
                phone: friendPhone,
                status: 'paid',
                method: paymentMethod === 'telebirr' ? 'Telebirr' : 'CBE Birr',
                paidAt: 'Just now'
              }
            : m
        )
      );

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}

      addToast(
        lang === 'am'
          ? `እንኳን ደስ አለዎት ${friendName}! የቡድን ድርሻዎ በ${paymentMethod === 'telebirr' ? 'ቴሌብር' : 'CBE'} ተከፍሏል።`
          : `Success ${friendName}! Your share has been escrow paid via ${paymentMethod === 'telebirr' ? 'Telebirr' : 'CBE'}.`,
        'success'
      );
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'am' ? 'ወደ መነሻ ገጽ ተመለስ' : 'Back to Home'}</span>
          </Link>

          <GuzoLogo size="sm" variant="white" />
        </div>

        {/* Hero Banner: Crew Trip Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-emerald-950 border border-stone-800 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Guzo Group Split Lock #{splitId || 'WENCHI-CREW'}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-serif">
                {lang === 'am' ? trip.amharicTitle : trip.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 font-medium">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Calendar className="w-4 h-4" />
                  <span>{trip.nextDeparture}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-amber-300">
                  <MapPin className="w-4 h-4" />
                  <span>Meskel Square (06:00 AM)</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-stone-300">
                  <Bus className="w-4 h-4 text-emerald-400" />
                  <span>Toyota Coaster ({totalCount} Seats Reserved)</span>
                </span>
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-500/30 text-center shrink-0 min-w-[160px]">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Seat Lock Timer</span>
              </div>
              <div className="text-3xl font-black font-mono text-white tracking-widest">
                {formatTimer(timeLeft)}
              </div>
              <span className="text-[10px] text-stone-400 block mt-0.5">
                Seats release if unpaid
              </span>
            </div>
          </div>

          {/* Live Progress Bar */}
          <div className="mt-6 pt-6 border-t border-stone-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-stone-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Crew Payment Progress: {paidCount} of {totalCount} paid ({progressPercent}%)</span>
              </span>
              <span className="text-emerald-400 font-mono">
                {(paidCount * trip.priceETB).toLocaleString()} / {(totalCount * trip.priceETB).toLocaleString()} ETB
              </span>
            </div>

            <div className="w-full h-3 bg-stone-950 rounded-full overflow-hidden p-0.5 border border-stone-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

        </div>

        {/* Main Grid: Crew Status List vs Individual Checkout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Reserved Seats & Passenger Status (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'am' ? 'የተያዙ መቀመጫዎች እና የተጓዦች ሁኔታ' : 'Reserved Seats & Crew Status'}</span>
              </h3>
              <span className="text-xs text-stone-400 font-mono">
                {trip.priceETB.toLocaleString()} ETB / person
              </span>
            </div>

            <div className="space-y-3">
              {members.map((member, index) => {
                const isPaid = member.status === 'paid';
                const isSelectable = !isPaid && !hasPaidCurrentSession;

                return (
                  <div
                    key={member.id}
                    onClick={() => {
                      if (isSelectable) setSelectedSeatIndex(index);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      isPaid
                        ? 'bg-stone-900/60 border-emerald-800/60'
                        : selectedSeatIndex === index
                        ? 'bg-amber-950/30 border-amber-400 shadow-md ring-2 ring-amber-500/20 cursor-pointer'
                        : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      
                      <div className="flex items-center gap-3">
                        {/* Seat Badge */}
                        <div className={`w-10 h-10 rounded-xl font-mono font-black text-xs flex flex-col items-center justify-center shrink-0 ${
                          isPaid
                            ? 'bg-emerald-900 text-emerald-200 border border-emerald-700'
                            : selectedSeatIndex === index
                            ? 'bg-amber-500 text-stone-950 font-black'
                            : 'bg-stone-800 text-stone-300'
                        }`}>
                          <span>{member.seat.split(' ')[0]}</span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-sm font-bold text-white block">
                              {member.name}
                            </strong>
                            {isPaid && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                                PAID ✓
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-stone-400 font-mono">
                            {member.seat} • {isPaid ? `${member.method} (${member.paidAt})` : 'Awaiting payment'}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-sm font-black font-mono block ${isPaid ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {member.amountETB.toLocaleString()} ETB
                        </span>
                        {isSelectable && (
                          <span className="text-[10px] text-amber-300 font-bold block">
                            {selectedSeatIndex === index ? '● Selected for you' : 'Click to claim'}
                          </span>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Share Group Link Box */}
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
              <span className="text-xs font-bold text-stone-300 block">
                {lang === 'am' ? 'ሊንኩን ለጓደኞችዎ በቴሌግራም ያጋሩ፡' : 'Invite friends to pay their share:'}
              </span>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="flex-1 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-stone-400 truncate"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Hey crew! Claim and pay your Coaster seat for "${trip.title}" on GuzoTribe:`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Share to Telegram</span>
                </a>
                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-xl border border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Individual Payment Checkout Form (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-5 sticky top-24">
              
              <div className="border-b border-stone-800 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-extrabold text-base text-white">
                    {lang === 'am' ? 'የእርስዎን ድርሻ ይክፈሉ' : 'Pay Your Share'}
                  </h3>
                  <span className="text-xs font-black font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-800/60">
                    {trip.priceETB.toLocaleString()} ETB
                  </span>
                </div>
                <p className="text-xs text-stone-400">
                  Selected Seat: <strong className="text-white font-mono">{members[selectedSeatIndex]?.seat}</strong>
                </p>
              </div>

              {hasPaidCurrentSession ? (
                <div className="text-center py-6 space-y-4 animate-scale-up">
                  <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white">
                      {lang === 'am' ? 'ክፍያዎ በተሳካ ሁኔታ ተጠናቋል!' : 'Your Seat is Locked!'}
                    </h4>
                    <p className="text-xs text-stone-400 mt-1">
                      {friendName} ({members[selectedSeatIndex]?.seat}). Confirmation SMS dispatched to {friendPhone}.
                    </p>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Share with Remaining Friends
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePayMyShare} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      {lang === 'am' ? 'የተጓዥ ሙሉ ስም *' : 'Your Full Name *'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dawit Kebede"
                        value={friendName}
                        onChange={(e) => setFriendName(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      {lang === 'am' ? 'የቴሌብር ስልክ ቁጥር *' : 'Telebirr Phone Number *'}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+251 9..."
                        value={friendPhone}
                        onChange={(e) => setFriendPhone(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2 pt-1">
                    <label className="block text-xs font-bold text-stone-300">
                      {lang === 'am' ? 'የመክፈያ ዘዴ' : 'Payment Option'}
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('telebirr')}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          paymentMethod === 'telebirr'
                            ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-sm'
                            : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-stone-950" />
                        <span>Telebirr</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cbe')}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          paymentMethod === 'cbe'
                            ? 'bg-purple-900 text-white border-purple-600 shadow-sm'
                            : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span>CBE Birr</span>
                      </button>
                    </div>
                  </div>

                  {/* Escrow Guarantee Pill */}
                  <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 flex items-center gap-2 text-xs text-emerald-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Held in 100% Escrow until trip departure confirmed.</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing Telebirr Push...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Pay {trip.priceETB.toLocaleString()} ETB</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
