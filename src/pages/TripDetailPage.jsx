import React, { useState } from 'react';
import { 
  useParams, 
  Link 
} from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Heart, 
  Share2, 
  Sparkles, 
  Bus
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function TripDetailPage({
  trips,
  currency,
  lang,
  onBookNow,
  wishlist,
  onToggleWishlist,
  comparedTrips,
  onToggleCompare
}) {
  const { id } = useParams();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'company' | 'itinerary' | 'inclusions' | 'cancellation'
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Find trip by ID or slug
  const trip = trips.find((t) => t.id === id) || trips[0];

  if (!trip) {
    return (
      <div className="min-h-screen bg-[#faf9f6] pt-20 pb-24 flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-stone-900">Trip Not Found</h2>
          <Link to="/trips" className="px-6 py-2.5 bg-emerald-700 text-white rounded-xl font-bold text-xs">
            Browse All Trips
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlist && wishlist.includes(trip.id);
  const isCompared = comparedTrips && comparedTrips.some((t) => t.id === trip.id);

  const formatPrice = (etb, usd) => {
    if (currency === 'USD') return `$${usd}`;
    return `${etb?.toLocaleString()} ETB`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast(lang === 'am' ? 'የጉዞው ሊንክ ተቀድቷል!' : 'Trip link copied to clipboard! 🔗', 'success');
    }
  };

  const tabs = [
    { id: 'overview', label: lang === 'am' ? 'አጠቃላይ እይታ' : 'Overview' },
    { id: 'company', label: lang === 'am' ? 'ስለ አስጎብኚው' : 'Company Description' },
    { id: 'itinerary', label: lang === 'am' ? 'የጉዞ መርሃ-ግብር' : 'Itinerary' },
    { id: 'inclusions', label: lang === 'am' ? 'የተካተቱ ነገሮች' : 'Inclusions' },
    { id: 'cancellation', label: lang === 'am' ? 'የስረዛ ፖሊሲ' : 'Cancellation Policy' }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-6 pb-24 font-sans text-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb & Top Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 flex-wrap">
            <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/trips" className="hover:text-stone-900 transition-colors">Trips</Link>
            <span>/</span>
            <span className="text-stone-900 font-bold truncate max-w-xs">{trip.title}</span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => onToggleWishlist && onToggleWishlist(trip.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isWishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isWishlisted ? 'Saved' : 'Save Wishlist'}</span>
            </button>

            <button
              onClick={() => onToggleCompare && onToggleCompare(trip)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isCompared
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{isCompared ? 'Comparing' : 'Compare'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-xl bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 transition-all cursor-pointer"
              title="Share Trip Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Gallery Banner */}
        <div className="space-y-3">
          <div className="relative aspect-[21/9] sm:aspect-[21/8] rounded-3xl overflow-hidden bg-stone-900 shadow-md">
            <img
              src={trip.images[activeImgIndex] || trip.images[0]}
              alt={trip.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-700/90 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Escrow Protected</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-stone-200 text-xs font-mono">
                  {trip.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight">
                {lang === 'am' ? trip.amharicTitle : trip.title}
              </h1>
              <p className="text-xs sm:text-sm text-stone-200 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{trip.location}</span>
                <span>•</span>
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{trip.durationText}</span>
              </p>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {trip.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {trip.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`w-20 sm:w-24 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImgIndex === idx ? 'border-emerald-600 scale-105 shadow-xs' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Multi-Tab Navigation Bar (Matching Reference Screenshot) */}
        <div className="border-b border-stone-200 sticky top-20 bg-[#faf9f6]/95 backdrop-blur-md z-30 pt-2">
          <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto pb-px">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3.5 px-2 text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 relative whitespace-nowrap ${
                    isActive
                      ? 'text-emerald-800'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full animate-slide-right" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Grid: Left Tab Content ↔ Right Sticky "Trip Details" Card */}
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          {/* ==================== LEFT COLUMN: TAB CONTENT ==================== */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-slide-up">
                
                {/* About This Trip Narrative */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-serif">
                    {lang === 'am' ? 'ስለዚህ ጉዞ' : 'About This Trip'}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {lang === 'am' ? trip.amharicDescription : trip.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="pt-4 border-t border-stone-100 space-y-3">
                    <h3 className="font-bold text-sm text-stone-900 font-serif">
                      {lang === 'am' ? 'ዋና ዋና መስህቦች' : 'Key Highlights'}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {trip.highlights && trip.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 rounded-2xl bg-stone-50 border border-stone-100 text-xs text-stone-800 font-semibold">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Altitude Profile & Fitness */}
                  <div className="pt-4 border-t border-stone-100 grid sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1 text-center">
                      <span className="text-[10px] text-stone-500 font-bold uppercase block">Max Elevation</span>
                      <strong className="text-base font-black font-mono text-emerald-900">{trip.elevation || '3,000m'}</strong>
                      <span className="text-[10px] text-stone-400 block">Highland (ደጋ)</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-center">
                      <span className="text-[10px] text-stone-500 font-bold uppercase block">Trek Difficulty</span>
                      <strong className="text-base font-black font-mono text-amber-700">{trip.difficulty}</strong>
                      <span className="text-[10px] text-stone-400 block">Moderate Stamina</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-center">
                      <span className="text-[10px] text-stone-500 font-bold uppercase block">Transport Type</span>
                      <strong className="text-base font-black font-mono text-stone-900">{trip.vehicleType || 'Toyota Coaster'}</strong>
                      <span className="text-[10px] text-stone-400 block">AC High Clearance</span>
                    </div>
                  </div>
                </div>

                {/* Pickup & Boarding Spot */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-stone-900">
                    <Bus className="w-4 h-4 text-emerald-700" />
                    <span>Departure Pickup Location & Schedule</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    📍 <strong>Addis Ababa Meeting Spot:</strong> {trip.pickupLocation || 'Meskel Square (In front of Tourist Hotel), 06:00 AM Departure'}
                  </p>
                  <p className="text-xs text-stone-500">
                    Tour bus departs promptly with pre-registered checkpoint passenger manifests.
                  </p>
                </div>

              </div>
            )}

            {/* TAB 2: COMPANY DESCRIPTION (TOUR HOST) */}
            {activeTab === 'company' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6 animate-slide-up">
                <div className="flex items-start justify-between gap-4 border-b border-stone-100 pb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-700 to-amber-500 p-0.5 shadow-md">
                      <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center text-white font-bold text-lg font-serif">
                        {trip.organizer?.name ? trip.organizer.name.charAt(0) : 'A'}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-lg text-stone-900 font-serif">
                          {trip.organizer?.name || 'Addis Hikers Club'}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold">
                          🛡️ Verified Host #884
                        </span>
                      </div>
                      <p className="text-xs text-stone-500">{trip.organizer?.telegram || '@AddisHikersClub'}</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                    ★ 4.9 (142 Reviews)
                  </span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-stone-600">
                  <h4 className="font-bold text-sm text-stone-900 font-serif">About the Tour Host</h4>
                  <p>
                    {trip.organizer?.bio || 
                      'Addis Hikers Club is a licensed community ecotourism collective operating weekly weekend group treks across Oromia, Amhara, and Afar. All mountain guides carry Wilderness First Responder (WFR) certifications and travel with high-altitude medical equipment.'}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="text-stone-400 font-bold block text-[10px] uppercase">Tourism License</span>
                    <strong className="text-stone-800 font-mono">ETH-TOUR-8842 / MoT Registered</strong>
                  </div>
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="text-stone-400 font-bold block text-[10px] uppercase">Fleet & Safety</span>
                    <strong className="text-stone-800">28-Seat Toyota Coaster + Satellite Comms</strong>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ITINERARY */}
            {activeTab === 'itinerary' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6 animate-slide-up">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="font-extrabold text-xl text-stone-900 font-serif">Day-by-Day Expedition Timeline</h3>
                  <p className="text-xs text-stone-500">Carefully paced for altitude adaptation and scenic photography</p>
                </div>

                <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200 pl-1">
                  {trip.itinerary && trip.itinerary.length > 0 ? (
                    trip.itinerary.map((item, idx) => (
                      <div key={idx} className="relative flex items-start gap-4 text-xs">
                        <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold shrink-0 z-10 shadow-xs text-xs">
                          {item.day || idx + 1}
                        </div>
                        <div className="flex-1 bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                          <strong className="text-sm font-bold text-stone-900 block font-serif">{item.title}</strong>
                          <p className="text-stone-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-4">
                      <div className="relative flex items-start gap-4 text-xs">
                        <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold shrink-0 z-10">1</div>
                        <div className="flex-1 bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                          <strong className="text-sm font-bold text-stone-900 block font-serif">06:00 AM – Departure from Meskel Square</strong>
                          <p className="text-stone-600">Boarding at Meskel Square with breakfast stop at Woliso. Drive through scenic Oromia countryside.</p>
                        </div>
                      </div>
                      <div className="relative flex items-start gap-4 text-xs">
                        <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold shrink-0 z-10">2</div>
                        <div className="flex-1 bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                          <strong className="text-sm font-bold text-stone-900 block font-serif">10:30 AM – Caldera Rim Hike & Island Boat</strong>
                          <p className="text-stone-600">Guided caldera rim descent, wooden canoe boat ride to Dege Kirkos monastery island, and traditional lunch.</p>
                        </div>
                      </div>
                      <div className="relative flex items-start gap-4 text-xs">
                        <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold shrink-0 z-10">3</div>
                        <div className="flex-1 bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                          <strong className="text-sm font-bold text-stone-900 block font-serif">04:30 PM – Return Journey to Addis Ababa</strong>
                          <p className="text-stone-600">Scenic sunset bus ride back to Addis Ababa arriving at Meskel Square by 07:30 PM.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: INCLUSIONS */}
            {activeTab === 'inclusions' && (
              <div className="grid sm:grid-cols-2 gap-5 animate-slide-up">
                
                {/* What is Included */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-emerald-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-base font-serif">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                    <span>What's Included</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-stone-700">
                    {trip.included && trip.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-700 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What is Excluded */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-base font-serif">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>What's Excluded</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-stone-700">
                    {trip.excluded && trip.excluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-600 font-bold">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            )}

            {/* TAB 5: CANCELLATION POLICY */}
            {activeTab === 'cancellation' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6 animate-slide-up">
                <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-stone-900">GuzoTribe 100% Escrow Protection Guarantee</h3>
                    <p className="text-xs text-stone-500">Your booking payment is held in trust until departure completion</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                    <strong className="text-emerald-950 block text-xs">Full 100% Refund Window</strong>
                    <p>
                      Cancel up to 48 hours before scheduled departure time for an instant 100% Telebirr or CBE refund.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <strong className="text-stone-900 block text-xs">Security & Weather Guarantee</strong>
                    <p>
                      If a regional transport checkpoint or adverse weather forces trip cancellation, you will receive an automatic 100% refund without dispute fees.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ==================== RIGHT COLUMN: FLOATING "TRIP DETAILS" CARD (Matching Screenshot) ==================== */}
          <div className="lg:col-span-4 sticky top-24 space-y-5">
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-lg p-6 sm:p-7 space-y-6">
              
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <h3 className="font-black text-lg text-stone-900 font-serif">
                  {lang === 'am' ? 'የጉዞ ዝርዝሮች' : 'Trip Details'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold">
                  ● Booking Open
                </span>
              </div>

              {/* Specification Table (Matching Trip Details in Screenshot) */}
              <div className="space-y-3.5 text-xs">
                
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-medium">Source</span>
                  <strong className="text-stone-900 font-bold text-right">{trip.pickupLocation?.split(',')[0] || 'Addis Ababa'}</strong>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-medium">Destination</span>
                  <strong className="text-stone-900 font-bold text-right">{trip.location?.split(',')[0] || trip.title}</strong>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-medium">Region</span>
                  <span className="text-stone-900 font-bold text-right">{trip.region || 'Oromia'}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-medium">Duration</span>
                  <span className="text-stone-900 font-bold text-right">{trip.durationText}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-medium">Difficulty</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-mono font-bold uppercase text-[10px]">
                    {trip.difficulty}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-medium">Group Size</span>
                  <strong className="text-stone-900 font-mono text-right">{trip.totalSpots} Seats (Coaster)</strong>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-medium">Departure Date</span>
                  <span className="text-emerald-800 font-mono font-bold text-right">{trip.dates?.[0] || 'Upcoming Weekend'}</span>
                </div>

              </div>

              {/* Price & Seats Remaining */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-stone-500">Price per Traveler:</span>
                  <strong className="text-2xl font-black text-emerald-800 font-mono">
                    {formatPrice(trip.priceETB, trip.priceUSD)}
                  </strong>
                </div>
                <div className="flex justify-between text-[11px] text-amber-800 font-semibold pt-1 border-t border-stone-200">
                  <span>🔥 Remaining Seats:</span>
                  <strong className="font-mono">{trip.spotsLeft} of {trip.totalSpots} Left</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => onBookNow && onBookNow(trip)}
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-emerald-900/15 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Book with Telebirr Escrow</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onToggleWishlist && onToggleWishlist(trip.id)}
                    className={`py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isWishlisted ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                  </button>

                  <button
                    onClick={() => onToggleCompare && onToggleCompare(trip)}
                    className={`py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isCompared ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                  </button>
                </div>
              </div>

              <div className="text-[10px] text-stone-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Protected by Ministry of Tourism licensed operators</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
