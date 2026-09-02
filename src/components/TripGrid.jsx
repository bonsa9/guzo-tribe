import React, { useState } from 'react';
import TripCard from './TripCard';
import CategoryFilters from './CategoryFilters';
import { SlidersHorizontal, Sparkles, AlertCircle } from 'lucide-react';

export default function TripGrid({
  trips,
  currency,
  lang,
  selectedCategory,
  setSelectedCategory,
  comparedTrips,
  onToggleCompare,
  onViewDetails,
  onBookNow
}) {
  const [sortBy, setSortBy] = useState('popular');

  // Sorting logic
  const sortedTrips = [...trips].sort((a, b) => {
    if (sortBy === 'price-low') {
      const priceA = currency === 'USD' ? a.priceUSD : a.priceETB;
      const priceB = currency === 'USD' ? b.priceUSD : b.priceETB;
      return priceA - priceB;
    }
    if (sortBy === 'price-high') {
      const priceA = currency === 'USD' ? a.priceUSD : a.priceETB;
      const priceB = currency === 'USD' ? b.priceUSD : b.priceETB;
      return priceB - priceA;
    }
    if (sortBy === 'duration') {
      return a.durationDays - b.durationDays;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0; // Default popular
  });

  return (
    <section id="trips-section" className="py-16 bg-stone-50/60 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{lang === 'am' ? 'የተመረጡ የቡድን ጉዞዎች' : 'Curated Group Adventures'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {lang === 'am' ? 'ተወዳጅ የኢትዮጵያ ማህበረሰብ ጉዞዎች' : 'Popular Community Trips'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {lang === 'am'
                ? 'ከተረጋገጡ የሀገር ውስጥ አስጎብኚዎች ጋር የተዘጋጁ ምርጥ የሳምንቱ መጨረሻ እና የረጅም ጊዜ ጉዞዎች'
                : 'Handpicked weekend getaways and multi-day expeditions with verified local hosts.'}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-medium text-stone-500 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {lang === 'am' ? 'ደርድር በ፡' : 'Sort by:'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-stone-300 bg-white text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer shadow-sm"
            >
              <option value="popular">{lang === 'am' ? 'ተወዳጅነት (Popular)' : 'Most Popular'}</option>
              <option value="price-low">{lang === 'am' ? 'ዋጋ፡ ከዝቅተኛ ወደ ከፍተኛ' : 'Price: Low to High'}</option>
              <option value="price-high">{lang === 'am' ? 'ዋጋ፡ ከከፍተኛ ወደ ዝቅተኛ' : 'Price: High to Low'}</option>
              <option value="duration">{lang === 'am' ? 'የቀናት ርዝማኔ' : 'Duration (Shortest)'}</option>
              <option value="rating">{lang === 'am' ? 'ከፍተኛ ደረጃ (Rating)' : 'Highest Rated'}</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <CategoryFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          lang={lang}
        />

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs font-semibold text-stone-500">
          <span>
            {lang === 'am' ? 'የተገኙ ጉዞዎች፡ ' : 'Showing '}
            <strong className="text-stone-900">{sortedTrips.length}</strong> {lang === 'am' ? 'ጉዞዎች' : 'curated trips'}
          </span>
          {comparedTrips.length > 0 && (
            <span className="text-emerald-700">
              {comparedTrips.length} {lang === 'am' ? 'ጉዞዎች ለማነጻጸር ተመርጠዋል' : 'trips selected to compare'}
            </span>
          )}
        </div>

        {/* Trips Grid */}
        {sortedTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sortedTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                currency={currency}
                lang={lang}
                isCompared={comparedTrips.some((t) => t.id === trip.id)}
                onToggleCompare={() => onToggleCompare(trip)}
                onViewDetails={() => onViewDetails(trip)}
                onBookNow={() => onBookNow(trip)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-stone-300 max-w-lg mx-auto">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-900 mb-1">
              {lang === 'am' ? 'ምንም ጉዞ አልተገኘም' : 'No Trips Found'}
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              {lang === 'am'
                ? 'እባክዎ የተለየ የፍለጋ ቃል ወይም ምድብ ይሞክሩ።'
                : 'Try clearing your search query or selecting a different trip category.'}
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-all cursor-pointer"
            >
              {lang === 'am' ? 'ሁሉንም ጉዞዎች አሳይ' : 'Show All Trips'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
