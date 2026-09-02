import React from 'react';
import HeroSection from '../components/HeroSection';
import MetricsBar from '../components/MetricsBar';
import DestinationsSection from '../components/DestinationsSection';
import VerifiedOrganizers from '../components/VerifiedOrganizers';
import TripCard from '../components/TripCard';
import { ArrowRight, Sparkles, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomePage({
  trips,
  currency,
  lang,
  comparedTrips,
  onToggleCompare,
  onViewDetails,
  onBookNow,
  onOpenPartnerModal,
  wishlist,
  onToggleWishlist
}) {
  const navigate = useNavigate();

  const handleSelectDestination = (destName) => {
    navigate('/trips');
  };

  const featuredTrips = trips.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        lang={lang}
        searchTerm=""
        setSearchTerm={() => {}}
        selectedCategory="All"
        setSelectedCategory={() => {}}
        onSearchSubmit={() => navigate('/trips')}
      />

      {/* Trust Metrics Bar */}
      <MetricsBar lang={lang} />

      {/* Featured Trips Highlight Section */}
      <section className="py-16 bg-stone-50/60 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{lang === 'am' ? 'የሳምንቱ ተወዳጅ ጉዞዎች' : 'Featured Group Trips'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {lang === 'am' ? 'ተወዳጅ የቡድን ጉዞዎች' : 'Popular Group Adventures'}
              </h2>
            </div>

            <button
              onClick={() => navigate('/trips')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>{lang === 'am' ? 'ሁሉንም ጉዞዎች እይ' : 'Explore All Trips'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                currency={currency}
                lang={lang}
                isCompared={comparedTrips.some((t) => t.id === trip.id)}
                onToggleCompare={() => onToggleCompare(trip)}
                onViewDetails={() => onViewDetails(trip)}
                onBookNow={() => onBookNow(trip)}
                isWishlisted={wishlist && wishlist.includes(trip.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Destinations Section */}
      <DestinationsSection
        lang={lang}
        onSelectDestination={handleSelectDestination}
      />

      {/* Verified Organizers Section */}
      <VerifiedOrganizers
        lang={lang}
        onOpenPartnerModal={onOpenPartnerModal}
      />

      {/* Ready to Find Your Tribe CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 via-stone-900 to-emerald-950 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-800/80 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'am' ? 'ጉዞዎን ዛሬውኑ ይጀምሩ' : 'Start Your Adventure'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
            {lang === 'am' ? 'ጉዞህን ከጓደኞችህ ጋር ለመጀመር ዝግጁ ነህ?' : 'Ready to Find Your Tribe?'}
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            {lang === 'am'
              ? 'በሺዎች የሚቆጠሩ ተጓዦችን ይቀላቀሉ። ከተረጋገጡ አስጎብኚዎች ጋር የተዘጋጁ ምርጥ የኢትዮጵያ ጉዞዎችን ይፈልጉ እና ይያዙ።'
              : 'Join thousands of Ethiopian travelers discovering amazing group trips. Search, compare side-by-side, and book with confidence.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/trips')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-extrabold text-sm shadow-xl shadow-emerald-950/40 transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{lang === 'am' ? 'ጉዞዎችን ፈልግ' : 'Explore Trips'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenPartnerModal}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              {lang === 'am' ? 'አስጎብኚ ይሁኑ' : 'Become a Partner'}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
