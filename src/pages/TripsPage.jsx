import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import TripCard from '../components/TripCard';
import { useTripFilters } from '../hooks/useTripFilters';
import TripSidebarFilters from '../components/trips/TripSidebarFilters';
import TripMobileFilterSheet from '../components/trips/TripMobileFilterSheet';
import TripSearchBar from '../components/trips/TripSearchBar';

export default function TripsPage({
  trips,
  currency,
  lang,
  comparedTrips,
  onToggleCompare,
  onViewDetails,
  onBookNow,
  wishlist,
  onToggleWishlist
}) {
  const {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    maxPrice,
    setMaxPrice,
    selectedDuration,
    setSelectedDuration,
    selectedDifficulties,
    handleDifficultyToggle,
    verifiedOnly,
    setVerifiedOnly,
    sortBy,
    setSortBy,
    activeSpecialTag,
    setActiveSpecialTag,
    isMobileFilterOpen,
    setIsMobileFilterOpen,
    handleResetFilters,
    sortedTrips,
    activeFilterCount
  } = useTripFilters(trips, currency, wishlist);

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Search Bar, Tags & Sort Controls */}
        <TripSearchBar
          lang={lang}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeSpecialTag={activeSpecialTag}
          setActiveSpecialTag={setActiveSpecialTag}
          wishlistCount={wishlist ? wishlist.length : 0}
          activeFilterCount={activeFilterCount}
          onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Main 2-Column Layout */}
        <div className="flex items-start gap-8">
          
          {/* Left Desktop Sidebar Filters */}
          <TripSidebarFilters
            lang={lang}
            trips={trips}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selectedDuration={selectedDuration}
            setSelectedDuration={setSelectedDuration}
            selectedDifficulties={selectedDifficulties}
            handleDifficultyToggle={handleDifficultyToggle}
            verifiedOnly={verifiedOnly}
            setVerifiedOnly={setVerifiedOnly}
            handleResetFilters={handleResetFilters}
          />

          {/* Right Trips Grid Area */}
          <main className="flex-1 min-w-0">
            {sortedTrips.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-500 font-semibold px-1">
                  <span>
                    {lang === 'am'
                      ? `የተገኙ ${sortedTrips.length} የቡድን ጉዞዎች`
                      : `Showing ${sortedTrips.length} curated group trips`}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                      isWishlisted={wishlist ? wishlist.includes(trip.id) : false}
                      onToggleWishlist={onToggleWishlist}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm space-y-4 my-6">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-stone-800">
                    {lang === 'am' ? 'ምንም ጉዞዎች አልተገኙም' : 'No Trips Found Matching Criteria'}
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    {lang === 'am'
                      ? 'እባክዎ የማጣሪያ መስፈርቶችዎን ወይም የፍለጋ ቃላትን ይቀይሩ።'
                      : 'Try adjusting your search terms, price budget, or difficulty filters.'}
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-md"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'am' ? 'ማጣሪያዎችን አጽዳ' : 'Reset All Filters'}</span>
                </button>
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Slide-Up Filter Bottom Sheet */}
      <TripMobileFilterSheet
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        lang={lang}
        trips={trips}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
        selectedDifficulties={selectedDifficulties}
        handleDifficultyToggle={handleDifficultyToggle}
        verifiedOnly={verifiedOnly}
        setVerifiedOnly={setVerifiedOnly}
        handleResetFilters={handleResetFilters}
        resultCount={sortedTrips.length}
      />
    </div>
  );
}
