import React from 'react';
import { destinationsData } from '../data/destinationsData';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';

export default function DestinationsSection({ lang, onSelectDestination }) {
  return (
    <section id="destinations" className="py-16 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{lang === 'am' ? 'የኢትዮጵያ ድንቅ ስፍራዎች' : 'Iconic Ethiopian Landscapes'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {lang === 'am' ? 'ተወዳጅ መዳረሻዎች' : 'Explore Popular Destinations'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {lang === 'am'
                ? 'ከተራሮች እስከ እሳተ-ገሞራዎች፣ ከጥንታዊ ቅርሶች እስከ ውብ ሀይቆች'
                : 'From UNESCO mountain summits to volcanic marvels and serene rift valley lakes.'}
            </p>
          </div>

          <a
            href="#trips-section"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <span>{lang === 'am' ? 'ሁሉንም መዳረሻዎች እይ' : 'View All Trips'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinationsData.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest.name)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

              {/* Top Distance Pill */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold">
                  {dest.distance}
                </span>
              </div>

              {/* Card Footer Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <div className="flex items-center gap-1 text-amber-300 text-xs font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{dest.region}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                  {lang === 'am' ? dest.amharicName : dest.name}
                </h3>

                <p className="text-xs text-stone-300 line-clamp-1 mb-3">
                  {dest.highlight}
                </p>

                <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-white/15">
                  <span className="text-emerald-300">
                    {dest.tripsAvailable} {lang === 'am' ? 'ጉዞዎች አሉ' : 'trips available'}
                  </span>
                  <span className="flex items-center gap-1 text-stone-300 group-hover:text-white transition-colors">
                    <span>{lang === 'am' ? 'እይ' : 'Explore'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
