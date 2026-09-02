import React from 'react';
import { Footprints, Mountain, Landmark, Waves, Flame, Grid } from 'lucide-react';

export default function CategoryFilters({ selectedCategory, setSelectedCategory, lang }) {
  const categories = [
    {
      id: 'All',
      label: lang === 'am' ? 'ሁሉም ጉዞዎች' : 'All Trips',
      icon: Grid,
      badge: '45'
    },
    {
      id: 'Weekend Hikes',
      label: lang === 'am' ? 'የሳምንቱ መጨረሻ' : 'Weekend Hikes',
      icon: Footprints,
      badge: '18'
    },
    {
      id: 'Mountain Treks',
      label: lang === 'am' ? 'የሰሜንና ባሌ ተራሮች' : 'Mountain Treks',
      icon: Mountain,
      badge: '11'
    },
    {
      id: 'Cultural & Festivals',
      label: lang === 'am' ? 'ባህል እና በዓላት' : 'Cultural & Festivals',
      icon: Landmark,
      badge: '8'
    },
    {
      id: 'Lake & Relaxation',
      label: lang === 'am' ? 'ሀይቆች እና እረፍት' : 'Lake & Chill',
      icon: Waves,
      badge: '5'
    },
    {
      id: 'Expeditions',
      label: lang === 'am' ? 'ዳናኪልና እሳተ-ጎመራ' : 'Expeditions',
      icon: Flame,
      badge: '3'
    }
  ];

  return (
    <div className="py-6 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2.5 min-w-max pb-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-lg shadow-stone-900/20 scale-[1.02]'
                  : 'bg-white text-stone-700 border border-stone-200/80 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-emerald-700'}`} />
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                isSelected ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-500'
              }`}>
                {cat.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
