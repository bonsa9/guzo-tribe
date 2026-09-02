import React from 'react';
import { X, SlidersHorizontal, RotateCcw, ShieldCheck } from 'lucide-react';

export default function TripMobileFilterSheet({
  isOpen,
  onClose,
  lang,
  trips,
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
  handleResetFilters,
  resultCount
}) {
  if (!isOpen) return null;

  const tripTypes = [
    { id: 'All', label: lang === 'am' ? 'ሁሉም አይነቶች' : 'All Types', count: trips.length },
    { id: 'Weekend Hikes', label: lang === 'am' ? 'የሳምንቱ መጨረሻ' : 'Weekend Hikes', count: trips.filter(t => t.category === 'Weekend Hikes').length },
    { id: 'Mountain Treks', label: lang === 'am' ? 'የተራራ ላይ ጉዞ' : 'Mountain Treks', count: trips.filter(t => t.category === 'Mountain Treks').length },
    { id: 'Cultural & Festivals', label: lang === 'am' ? 'ባህል እና በዓላት' : 'Cultural & Festivals', count: trips.filter(t => t.category === 'Cultural & Festivals').length },
    { id: 'Lake & Relaxation', label: lang === 'am' ? 'ሀይቆች እና እረፍት' : 'Lake & Relaxation', count: trips.filter(t => t.category === 'Lake & Relaxation').length },
    { id: 'Expeditions', label: lang === 'am' ? 'ታላላቅ ጉዞዎች' : 'Expeditions', count: trips.filter(t => t.category === 'Expeditions').length }
  ];

  const difficulties = [
    { id: 'Easy', label: lang === 'am' ? 'ቀላል (Easy)' : 'Easy', color: 'text-emerald-700' },
    { id: 'Moderate', label: lang === 'am' ? 'መካከለኛ (Moderate)' : 'Moderate', color: 'text-amber-700' },
    { id: 'Challenging', label: lang === 'am' ? 'አስቸጋሪ (Challenging)' : 'Challenging', color: 'text-rose-700' }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex items-end bg-black/60 backdrop-blur-xs">
      <div className="bg-white w-full max-h-[88vh] rounded-t-3xl p-6 overflow-y-auto space-y-6 animate-slide-up shadow-2xl">
        
        {/* Sheet Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-lg text-stone-900">
              {lang === 'am' ? 'የጉዞ ማጣሪያዎች' : 'Filter Trips'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full bg-stone-100 text-stone-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Trip Types */}
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            {lang === 'am' ? 'የጉዞ አይነት' : 'Trip Type'}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {tripTypes.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                    isSelected ? 'bg-emerald-700 text-white shadow-xs' : 'bg-stone-50 text-stone-700'
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Max Budget */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-bold text-stone-500 uppercase">Max Budget:</span>
            <span className="text-xs font-mono font-bold text-emerald-800">{maxPrice.toLocaleString()} ETB</span>
          </div>
          <input
            type="range"
            min="1000"
            max="50000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-emerald-700"
          />
        </div>

        {/* 3. Duration */}
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Duration</label>
          <div className="grid grid-cols-4 gap-1.5 text-xs font-semibold">
            {['All', '1', '2-3', '4+'].map((dur) => (
              <button
                key={dur}
                onClick={() => setSelectedDuration(dur)}
                className={`py-2 rounded-xl text-center ${
                  selectedDuration === dur ? 'bg-emerald-700 text-white font-bold' : 'bg-stone-50 text-stone-700'
                }`}
              >
                {dur === 'All' ? 'All' : dur === '1' ? '1 Day' : dur + ' Days'}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Difficulty Checkboxes */}
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Difficulty</label>
          <div className="flex gap-4">
            {difficulties.map((diff) => (
              <label key={diff.id} className="flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedDifficulties.includes(diff.id)}
                  onChange={() => handleDifficultyToggle(diff.id)}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                <span>{diff.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply & Reset Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-3 border-t border-stone-100">
          <button
            onClick={handleResetFilters}
            className="py-3 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={onClose}
            className="py-3 rounded-xl bg-emerald-700 text-white text-xs font-bold shadow-md text-center"
          >
            View {resultCount} Trips
          </button>
        </div>

      </div>
    </div>
  );
}
