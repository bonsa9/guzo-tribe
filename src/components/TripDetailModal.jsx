import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Heart, 
  Sparkles,
  Bus,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TripDetailModal({
  trip,
  isOpen,
  onClose,
  currency,
  lang,
  onBookNow,
  isWishlisted,
  onToggleWishlist
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'company' | 'itinerary' | 'inclusions' | 'cancellation'
  const [activeImg, setActiveImg] = useState(0);

  if (!isOpen || !trip) return null;

  const formatPrice = (etb, usd) => {
    if (currency === 'USD') return `$${usd}`;
    return `${etb.toLocaleString()} ETB`;
  };

  const tabs = [
    { id: 'overview', label: lang === 'am' ? 'አጠቃላይ እይታ' : 'Overview' },
    { id: 'company', label: lang === 'am' ? 'ስለ አስጎብኚው' : 'Company Description' },
    { id: 'itinerary', label: lang === 'am' ? 'የጉዞ መርሃ-ግብር' : 'Itinerary' },
    { id: 'inclusions', label: lang === 'am' ? 'የተካተቱ ነገሮች' : 'Inclusions' },
    { id: 'cancellation', label: lang === 'am' ? 'የስረዛ ፖሊሲ' : 'Cancellation Policy' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-5xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'am' ? 'የተረጋገጠ ጉዞ' : 'Verified Group Trip'}</span>
            </span>
            <span className="text-xs text-stone-400 font-mono hidden sm:inline">#{trip.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/trips/${trip.id}`}
              onClick={onClose}
              className="text-xs text-amber-300 hover:underline font-bold mr-2 hidden sm:inline-flex items-center gap-1"
            >
              <span>Open Full Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => onToggleWishlist && onToggleWishlist(trip.id)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/10 hover:bg-white/20 text-stone-300'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 flex-1 text-stone-800">
          
          {/* Main Visual Carousel */}
          <div className="space-y-2">
            <div className="relative aspect-[21/9] sm:aspect-[21/8] rounded-2xl overflow-hidden bg-stone-900 shadow-md">
              <img
                src={trip.images[activeImg] || trip.images[0]}
                alt={trip.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-6 text-white space-y-1">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">{trip.region || 'Oromia'} Region</span>
                <h2 className="text-xl sm:text-2xl font-black font-serif">{lang === 'am' ? trip.amharicTitle : trip.title}</h2>
                <p className="text-xs text-stone-300 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{trip.location}</span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{trip.durationText}</span>
                </p>
              </div>
            </div>

            {/* Thumbnail Pickers */}
            {trip.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {trip.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`w-16 sm:w-20 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      activeImg === idx ? 'border-emerald-700 scale-105' : 'border-stone-200 opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Top Multi-Tab Bar */}
          <div className="border-b border-stone-200">
            <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto pb-px">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 px-2 text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 relative ${
                      isActive ? 'text-emerald-800' : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Column Tab Content & Trip Details Card */}
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-4 animate-slide-up">
                  <div>
                    <h3 className="font-extrabold text-lg text-stone-900 font-serif mb-2">
                      {lang === 'am' ? 'ስለዚህ ጉዞ' : 'About This Trip'}
                    </h3>
                    <p className="text-xs leading-relaxed text-stone-600">
                      {lang === 'am' ? trip.amharicDescription : trip.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  {trip.highlights && (
                    <div className="pt-3 border-t border-stone-100 space-y-2">
                      <span className="text-xs font-bold text-stone-700">Signature Highlights</span>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {trip.highlights.map((h, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 text-xs text-stone-800 font-medium flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: COMPANY */}
              {activeTab === 'company' && (
                <div className="space-y-4 animate-slide-up text-xs">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <strong className="block text-stone-900 text-sm font-serif">{trip.organizer?.name || 'Addis Hikers Club'}</strong>
                    <p className="text-stone-600">{trip.organizer?.bio || 'Licensed community ecotourism club with Wilderness First Responder guides.'}</p>
                    <span className="text-[10px] text-emerald-800 font-mono font-bold block">License: #ETH-TOUR-884 (MoT Verified)</span>
                  </div>
                </div>
              )}

              {/* TAB 3: ITINERARY */}
              {activeTab === 'itinerary' && (
                <div className="space-y-3 animate-slide-up text-xs">
                  {trip.itinerary && trip.itinerary.length > 0 ? (
                    trip.itinerary.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                        <strong className="text-stone-900 block font-serif">Day {item.day || idx + 1}: {item.title}</strong>
                        <p className="text-stone-600">{item.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-stone-500">Departure at 06:00 AM from Meskel Square, Addis Ababa.</p>
                  )}
                </div>
              )}

              {/* TAB 4: INCLUSIONS */}
              {activeTab === 'inclusions' && (
                <div className="space-y-4 animate-slide-up text-xs">
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                    <strong className="text-emerald-950 block font-bold">✓ Included in Booking:</strong>
                    <ul className="space-y-1 text-stone-700">
                      {trip.included && trip.included.map((it, i) => (
                        <li key={i}>• {it}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 5: CANCELLATION */}
              {activeTab === 'cancellation' && (
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 animate-slide-up text-xs">
                  <strong className="text-stone-900 block font-bold">100% Escrow Refund Guarantee:</strong>
                  <p className="text-stone-600">
                    Cancel 48h prior to departure for an automatic 100% refund. Passenger funds protected in Telebirr & CBE Escrow until completion.
                  </p>
                </div>
              )}

            </div>

            {/* Right "Trip Details" Card (Matching Reference Screenshot) */}
            <div className="lg:col-span-5 bg-stone-50 p-5 rounded-3xl border border-stone-200 space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                <h4 className="font-extrabold text-sm text-stone-900 font-serif">Trip Details</h4>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">Open</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Source:</span>
                  <strong className="text-stone-900">{trip.pickupLocation?.split(',')[0] || 'Addis Ababa'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Destination:</span>
                  <strong className="text-stone-900">{trip.location?.split(',')[0] || trip.title}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Region:</span>
                  <span className="text-stone-900 font-bold">{trip.region || 'Oromia'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Duration:</span>
                  <span className="text-stone-900 font-bold">{trip.durationText}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Difficulty:</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono font-bold text-[10px]">
                    {trip.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Group Size:</span>
                  <strong className="text-stone-900 font-mono">{trip.totalSpots} Seats</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                <span className="text-stone-500">Total Price:</span>
                <strong className="text-xl font-black text-emerald-800 font-mono">
                  {formatPrice(trip.priceETB, trip.priceUSD)}
                </strong>
              </div>

              <button
                onClick={() => onBookNow && onBookNow(trip)}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Book Telebirr Escrow</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
