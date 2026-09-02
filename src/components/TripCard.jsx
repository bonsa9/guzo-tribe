import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Star, 
  Heart, 
  Mountain, 
  Tag, 
  Flame 
} from 'lucide-react';

export default function TripCard({
  trip,
  currency,
  lang,
  isCompared,
  onToggleCompare,
  onViewDetails,
  onBookNow,
  isWishlisted,
  onToggleWishlist
}) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const formatPrice = (etb, usd) => {
    if (currency === 'USD') {
      return `$${usd}`;
    }
    return `${etb.toLocaleString()} ETB`;
  };

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Easy':
        return {
          classes: 'bg-emerald-100/90 text-emerald-900 border-emerald-300',
          label: lang === 'am' ? 'ቀላል' : 'Easy'
        };
      case 'Moderate':
        return {
          classes: 'bg-amber-100/90 text-amber-950 border-amber-300',
          label: lang === 'am' ? 'መካከለኛ' : 'Moderate'
        };
      case 'Challenging':
        return {
          classes: 'bg-rose-100/90 text-rose-950 border-rose-300',
          label: lang === 'am' ? 'አስቸጋሪ' : 'Challenging'
        };
      default:
        return {
          classes: 'bg-stone-100 text-stone-800 border-stone-300',
          label: diff
        };
    }
  };

  const getElevationBadge = (meters) => {
    if (!meters) return null;
    if (meters < 0) {
      return {
        label: `${Math.abs(meters)}m Below Sea Level`,
        color: 'bg-cyan-950/80 text-cyan-200 border-cyan-700/60'
      };
    }
    if (meters >= 3000) {
      return {
        label: `${meters.toLocaleString()}m Alpine Highs`,
        color: 'bg-indigo-950/85 text-indigo-200 border-indigo-700/60'
      };
    }
    if (meters >= 2000) {
      return {
        label: `${meters.toLocaleString()}m Highland`,
        color: 'bg-emerald-950/85 text-emerald-200 border-emerald-700/60'
      };
    }
    return {
      label: `${meters.toLocaleString()}m`,
      color: 'bg-stone-900/80 text-stone-200 border-stone-700'
    };
  };

  const diffBadge = getDifficultyBadge(trip.difficulty);
  const elevBadge = getElevationBadge(trip.elevationMeters);

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group relative hover:-translate-y-1">
      
      {/* Image Carousel / Banner Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={trip.images[activeImgIdx] || trip.images[0]}
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />
        
        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-black/20 to-black/30 pointer-events-none" />

        {/* Top Left Badges: Verified & Difficulty */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5 z-10 max-w-[75%]">
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-700/95 text-white text-[10px] font-bold backdrop-blur-md shadow-sm border border-emerald-500/40">
            <ShieldCheck className="w-3 h-3 text-amber-300" />
            <span>{lang === 'am' ? 'የተረጋገጠ' : 'Verified'}</span>
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md ${diffBadge.classes}`}>
            {diffBadge.label}
          </span>
          {trip.festivalTag && (
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-[10px] font-extrabold backdrop-blur-md shadow-sm">
              ✨ {trip.festivalTag}
            </span>
          )}
        </div>

        {/* Top Right: Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleWishlist) onToggleWishlist(trip.id);
          }}
          className={`absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-md scale-110 ring-2 ring-white/50'
              : 'bg-black/40 hover:bg-black/60 text-white hover:scale-105'
          }`}
          title={isWishlisted ? 'Remove from Saved' : 'Save to Wishlist'}
        >
          <Heart className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-white scale-110' : ''}`} />
        </button>

        {/* Bottom Elevation / Altitude Badge */}
        {elevBadge && (
          <div className={`absolute bottom-3 left-3 z-10 px-2 py-0.5 rounded-lg border backdrop-blur-md text-[10px] font-bold flex items-center gap-1 ${elevBadge.color}`}>
            <Mountain className="w-3 h-3" />
            <span>{elevBadge.label}</span>
          </div>
        )}

        {/* Image Dots Indicator */}
        {trip.images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 z-10">
            {trip.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImgIdx(i);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeImgIdx === i ? 'bg-white w-3.5' : 'bg-white/50 hover:bg-white/80 w-1.5'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          
          {/* Location & Duration Row */}
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold mb-2">
            <div className="flex items-center gap-1 text-emerald-800">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span className="truncate max-w-[150px] font-bold">{trip.location}</span>
            </div>
            <div className="flex items-center gap-1 text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md text-[11px]">
              <Clock className="w-3 h-3 text-stone-400" />
              <span>{trip.durationText}</span>
            </div>
          </div>

          {/* Trip Title */}
          <h3 
            onClick={onViewDetails}
            className="text-base sm:text-lg font-extrabold text-stone-900 leading-snug group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1 mb-1 font-serif"
            title={trip.title}
          >
            {lang === 'am' ? trip.amharicTitle : trip.title}
          </h3>

          {/* Organizer Info & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-600 mb-2.5 pb-2.5 border-b border-stone-100">
            <span className="font-medium text-stone-700 truncate max-w-[180px]">
              {lang === 'am' ? 'በ፡' : 'by'} <span className="text-emerald-900 font-bold">{trip.organizerName}</span>
            </span>
            <div className="flex items-center gap-1 text-amber-600 font-extrabold shrink-0 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{trip.rating}</span>
              <span className="text-stone-400 font-normal text-[10px]">({trip.reviewsCount})</span>
            </div>
          </div>

          {/* Vibe Tags */}
          {trip.vibeTags && (
            <div className="flex flex-wrap gap-1 mb-3">
              {trip.vibeTags.slice(0, 3).map((vibe, idx) => (
                <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 border border-stone-200">
                  {vibe}
                </span>
              ))}
            </div>
          )}

          {/* Next Departure & Group Discount */}
          <div className="space-y-1.5 mb-3">
            <div className="text-[11px] font-medium text-stone-600 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>{lang === 'am' ? 'መነሻ፡' : 'Departs:'} <strong className="text-stone-900">{trip.nextDeparture}</strong></span>
              </div>
              
              {/* Urgency Seat Alert */}
              <div className="flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded">
                <Flame className="w-3 h-3 text-amber-600 animate-pulse" />
                <span>{lang === 'am' ? 'ጥቂት ቦታዎች ቀርተዋል' : 'Few seats left'}</span>
              </div>
            </div>

            {trip.groupDiscount && (
              <div className="text-[10px] font-bold text-emerald-900 flex items-center gap-1 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md w-fit">
                <Tag className="w-3 h-3 text-emerald-700" />
                <span>
                  {lang === 'am' 
                    ? `ከ${trip.groupDiscount.minSeats} ሰው በላይ ${trip.groupDiscount.discountPercent}% ቅናሽ!` 
                    : `${trip.groupDiscount.discountPercent}% OFF for groups of ${trip.groupDiscount.minSeats}+`}
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Card Footer: Compare Checkbox & Pricing & Buttons */}
        <div className="pt-3 border-t border-stone-100">
          
          <div className="flex items-center justify-between mb-3">
            
            {/* Compare Checkbox */}
            <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 cursor-pointer select-none group-hover:text-stone-900">
              <input
                type="checkbox"
                checked={isCompared}
                onChange={onToggleCompare}
                className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 border-stone-300 cursor-pointer"
              />
              <span className={isCompared ? 'text-emerald-800 font-bold' : ''}>
                {lang === 'am' ? 'አነጻጽር' : 'Compare'}
              </span>
            </label>

            {/* Price */}
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-stone-400 block -mb-1">
                {lang === 'am' ? 'ዋጋ' : 'From'}
              </span>
              <span className="text-xl font-extrabold text-emerald-800">
                {formatPrice(trip.priceETB, trip.priceUSD)}
              </span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onViewDetails}
              className="w-full py-2.5 px-3 rounded-xl border border-stone-300 hover:border-emerald-700 hover:bg-emerald-50 text-stone-800 text-xs font-bold transition-all cursor-pointer text-center"
            >
              {lang === 'am' ? 'ዝርዝር እይ' : 'View Itinerary'}
            </button>
            <button
              onClick={onBookNow}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-900/15 transition-all hover:scale-[1.02] cursor-pointer text-center"
            >
              {lang === 'am' ? 'አሁኑኑ ያዙ' : 'Book Trip'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
