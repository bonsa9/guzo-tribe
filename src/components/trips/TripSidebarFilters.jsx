import React from 'react';
import { SlidersHorizontal, RotateCcw, ShieldCheck } from 'lucide-react';

export default function TripSidebarFilters({
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
  handleResetFilters
}) {
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
    <aside className="hidden lg:block w-72 shrink-0 space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6 sticky top-24">
        
        {/* Header & Reset */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
            <h3 className="font-bold text-stone-900 text-base">
              {lang === 'am' ? 'ማጣሪያዎች' : 'Filters'}
            </h3>
          </div>
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-stone-400 hover:text-emerald-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{lang === 'am' ? 'ዳግም ጀምር' : 'Reset'}</span>
          </button>
        </div>

        {/* 1. Trip Type Filter Pills */}
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
            {lang === 'am' ? 'የጉዞ አይነት' : 'Trip Type'}
          </label>
          <div className="space-y-1.5">
            {tripTypes.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs font-bold'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>{type.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-stone-200 text-stone-600'}`}>
                    {type.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Max Budget Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {lang === 'am' ? 'ከፍተኛ በጀት' : 'Max Budget'}
            </label>
            <span className="text-xs font-black text-emerald-800 font-mono">
              {maxPrice >= 50000 ? 'Any' : `${maxPrice.toLocaleString()} ETB`}
            </span>
          </div>
          <input
            type="range"
            min="1000"
            max="50000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-emerald-700 cursor-pointer"
          />
        </div>

        {/* 3. Duration Selector */}
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            {lang === 'am' ? 'የቀናት ብዛት' : 'Duration'}
          </label>
          <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
            {[
              { id: 'All', label: 'All' },
              { id: '1', label: '1 Day' },
              { id: '2-3', label: '2-3 Days' },
              { id: '4+', label: '4+ Days' }
            ].map((dur) => (
              <button
                key={dur.id}
                onClick={() => setSelectedDuration(dur.id)}
                className={`py-2 px-2 rounded-xl text-center transition-all cursor-pointer ${
                  selectedDuration === dur.id
                    ? 'bg-emerald-700 text-white font-bold'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {dur.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Difficulty Checkboxes */}
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            {lang === 'am' ? 'የእግር ጉዞ ደረጃ' : 'Difficulty'}
          </label>
          <div className="space-y-2">
            {difficulties.map((diff) => (
              <label key={diff.id} className="flex items-center gap-2.5 text-xs font-medium text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedDifficulties.includes(diff.id)}
                  onChange={() => handleDifficultyToggle(diff.id)}
                  className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 border-stone-300 cursor-pointer"
                />
                <span className={diff.color}>{diff.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 5. Verified Organizers Only Toggle */}
        <div className="pt-4 border-t border-stone-100">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'am' ? 'የተረጋገጡ አስጎብኚዎች ብቻ' : 'Verified Hosts Only'}</span>
            </div>
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 border-stone-300 cursor-pointer"
            />
          </label>
        </div>

      </div>
    </aside>
  );
}
