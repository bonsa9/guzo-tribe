import React from 'react';
import { Search, X, SlidersHorizontal, Heart } from 'lucide-react';

export default function TripSearchBar({
  lang,
  searchTerm,
  setSearchTerm,
  activeSpecialTag,
  setActiveSpecialTag,
  wishlistCount,
  activeFilterCount,
  onOpenMobileFilters,
  sortBy,
  setSortBy
}) {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-sm space-y-4">
      
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              lang === 'am'
                ? 'ጉዞዎችን በስም፣ በቦታ (ወንጪ፣ ስሜን፣ ባሌ) ወይም በአስጎብኚ ፈልግ...'
                : 'Search trips by destination (Wenchi, Simien, Bale), club, or vibe...'
            }
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:bg-white transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile Filter Button & Sort Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          
          {/* Mobile Filter Button */}
          <button
            onClick={onOpenMobileFilters}
            className="lg:hidden flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-stone-100 text-stone-800 text-xs font-bold border border-stone-200 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === 'am' ? 'ማጣሪያ' : 'Filters'}</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-400 font-semibold hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-700/40 cursor-pointer"
            >
              <option value="recommended">{lang === 'am' ? 'ተመራጭ (Recommended)' : 'Recommended'}</option>
              <option value="price-low">{lang === 'am' ? 'ዋጋ፡ ከዝቅተኛ ወደ ከፍተኛ' : 'Price: Low to High'}</option>
              <option value="price-high">{lang === 'am' ? 'ዋጋ፡ ከከፍተኛ ወደ ዝቅተኛ' : 'Price: High to Low'}</option>
              <option value="rating">{lang === 'am' ? 'ምርጥ ደረጃ የተሰጣቸው' : 'Highest Rated'}</option>
              <option value="duration">{lang === 'am' ? 'የቀናት ቆይታ' : 'Trip Duration'}</option>
            </select>
          </div>

        </div>

      </div>

      {/* Quick Filter Tag Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveSpecialTag('All')}
          className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer shrink-0 ${
            activeSpecialTag === 'All'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          {lang === 'am' ? 'ሁሉም' : 'All Trips'}
        </button>

        <button
          onClick={() => setActiveSpecialTag('Wishlist')}
          className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1 ${
            activeSpecialTag === 'Wishlist'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
          }`}
        >
          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
          <span>{lang === 'am' ? 'የተወደዱ' : 'Saved'} ({wishlistCount})</span>
        </button>

        <button
          onClick={() => setActiveSpecialTag('Festivals')}
          className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer shrink-0 ${
            activeSpecialTag === 'Festivals'
              ? 'bg-amber-500 text-stone-950 shadow-xs'
              : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          ✨ {lang === 'am' ? 'የበዓላት ጉዞዎች' : 'Holiday Specials'}
        </button>

        <button
          onClick={() => setActiveSpecialTag('Under2500')}
          className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer shrink-0 ${
            activeSpecialTag === 'Under2500'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
          }`}
        >
          💰 {lang === 'am' ? 'ከ2,500 ብር በታች' : 'Under 2,500 ETB'}
        </button>
      </div>

    </div>
  );
}
