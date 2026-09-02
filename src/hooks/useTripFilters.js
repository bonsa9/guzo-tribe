import { useState, useMemo } from 'react';

export function useTripFilters(trips, currency, wishlist) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(50000);
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [activeSpecialTag, setActiveSpecialTag] = useState('All');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleDifficultyToggle = (diff) => {
    setSelectedDifficulties((prev) =>
      prev.includes(diff) ? prev.filter((d) => d !== diff) : [...prev, diff]
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setMaxPrice(50000);
    setSelectedDuration('All');
    setSelectedDifficulties([]);
    setVerifiedOnly(false);
    setSortBy('recommended');
    setActiveSpecialTag('All');
  };

  // Filter logic
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      if (activeSpecialTag === 'Wishlist' && (!wishlist || !wishlist.includes(trip.id))) {
        return false;
      }
      if (activeSpecialTag === 'Festivals' && trip.category !== 'Cultural & Festivals') {
        return false;
      }
      if (activeSpecialTag === 'Under2500' && trip.priceETB > 2500) {
        return false;
      }
      if (activeSpecialTag === 'Expeditions' && trip.category !== 'Expeditions') {
        return false;
      }

      const term = searchTerm.trim().toLowerCase();
      if (term) {
        const matches =
          trip.title.toLowerCase().includes(term) ||
          trip.amharicTitle?.includes(term) ||
          trip.location?.toLowerCase().includes(term) ||
          trip.region?.toLowerCase().includes(term) ||
          trip.organizerName?.toLowerCase().includes(term) ||
          (trip.vibeTags && trip.vibeTags.some((v) => v.toLowerCase().includes(term)));
        if (!matches) return false;
      }

      if (selectedType !== 'All' && trip.category !== selectedType) {
        return false;
      }

      const currentTripPrice = currency === 'USD' ? trip.priceUSD * 115 : trip.priceETB;
      if (currentTripPrice > maxPrice) {
        return false;
      }

      if (selectedDuration === '1' && trip.durationDays !== 1) return false;
      if (selectedDuration === '2-3' && (trip.durationDays < 2 || trip.durationDays > 3)) return false;
      if (selectedDuration === '4+' && trip.durationDays < 4) return false;

      if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(trip.difficulty)) {
        return false;
      }

      if (verifiedOnly && !trip.verified) return false;

      return true;
    });
  }, [
    trips,
    searchTerm,
    selectedType,
    maxPrice,
    selectedDuration,
    selectedDifficulties,
    verifiedOnly,
    activeSpecialTag,
    wishlist,
    currency
  ]);

  // Sort logic
  const sortedTrips = useMemo(() => {
    return [...filteredTrips].sort((a, b) => {
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
      return 0;
    });
  }, [filteredTrips, sortBy, currency]);

  const activeFilterCount =
    (selectedType !== 'All' ? 1 : 0) +
    (maxPrice < 50000 ? 1 : 0) +
    (selectedDuration !== 'All' ? 1 : 0) +
    selectedDifficulties.length +
    (verifiedOnly ? 1 : 0);

  return {
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
    filteredTrips,
    sortedTrips,
    activeFilterCount
  };
}
