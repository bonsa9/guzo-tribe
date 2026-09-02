import React from 'react';
import { 
  X, 
  Check, 
  Minus, 
  ArrowRight, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Star, 
  Sparkles,
  Layers,
  Trash2
} from 'lucide-react';

export default function ComparisonDrawer({
  comparedTrips,
  isOpen,
  onClose,
  onRemoveTrip,
  onClearAll,
  onOpenModal,
  currency,
  lang,
  onBookNow
}) {
  if (comparedTrips.length === 0) return null;

  const formatPrice = (etb, usd) => {
    if (currency === 'USD') return `$${usd}`;
    return `${etb.toLocaleString()} ETB`;
  };

  // If the detailed modal is open
  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto animate-fade-in">
        <div className="bg-white w-full max-w-5xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
          
          {/* Modal Header */}
          <div className="px-4 sm:px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-700/80 flex items-center justify-center">
                <Layers className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold">
                  {lang === 'am' ? 'የጎንዮሽ የጉዞዎች ማነጻጸሪያ' : 'Side-by-Side Trip Comparison'}
                </h3>
                <p className="text-[11px] text-stone-400">
                  {lang === 'am' 
                    ? `እያነጻጸሩ ያሉት ${comparedTrips.length} ጉዞዎችን ነው` 
                    : `Comparing ${comparedTrips.length} curated itineraries`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClearAll}
                className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-stone-300 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'am' ? 'ሁሉንም አጽዳ' : 'Clear'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Comparison Matrix Table (Horizontal touch scrollable on small screens) */}
          <div className="overflow-x-auto p-4 sm:p-6 flex-1 scrollbar-thin">
            <div className="min-w-[620px] grid grid-cols-4 gap-3 sm:gap-4">
              
              {/* Metric Labels Column */}
              <div className="space-y-5 pt-36 text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider">
                <div className="h-8 flex items-center">{lang === 'am' ? 'ዋጋ (Price)' : 'Price'}</div>
                <div className="h-8 flex items-center">{lang === 'am' ? 'የቀናት ርዝማኔ' : 'Duration'}</div>
                <div className="h-8 flex items-center">{lang === 'am' ? 'የከበደበት ደረጃ' : 'Difficulty'}</div>
                <div className="h-8 flex items-center">{lang === 'am' ? 'አስጎብኚ ድርጅት' : 'Organizer'}</div>
                <div className="h-8 flex items-center">{lang === 'am' ? 'መነሻ ቦታ' : 'Pickup Point'}</div>
                <div className="h-8 flex items-center">{lang === 'am' ? 'የመጓጓዣ አይነት' : 'Transport'}</div>
                <div className="h-8 flex items-center">{lang === 'am' ? 'ምግብና መክሰስ' : 'Meals Included'}</div>
                <div className="h-8 flex items-center">{lang === 'am' ? 'የአካባቢ ስካውት' : 'Scout / Guide'}</div>
                <div className="h-8 flex items-center">{lang === 'am' ? 'የተጓዦች ደረጃ' : 'User Rating'}</div>
                <div className="h-10 flex items-center">{lang === 'am' ? 'እርምጃ' : 'Action'}</div>
              </div>

              {/* Compared Trips Columns */}
              {comparedTrips.map((trip) => (
                <div key={trip.id} className="bg-stone-50/90 rounded-2xl p-3.5 sm:p-4 border border-stone-200 flex flex-col justify-between">
                  
                  {/* Trip Card Header inside comparison */}
                  <div className="relative mb-3">
                    <button
                      onClick={() => onRemoveTrip(trip.id)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center text-xs shadow-md z-10 cursor-pointer"
                      title="Remove"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <img
                      src={trip.images[0]}
                      alt={trip.title}
                      className="w-full h-20 sm:h-24 object-cover rounded-xl mb-1.5"
                    />
                    <h4 className="font-bold text-stone-900 text-xs line-clamp-2" title={trip.title}>
                      {lang === 'am' ? trip.amharicTitle : trip.title}
                    </h4>
                    <span className="text-[10px] text-emerald-800 font-semibold block mt-0.5">
                      {trip.location}
                    </span>
                  </div>

                  {/* Rows */}
                  <div className="space-y-5 text-xs text-stone-800 font-medium">
                    <div className="h-8 flex items-center font-extrabold text-sm text-emerald-800">
                      {formatPrice(trip.priceETB, trip.priceUSD)}
                    </div>
                    <div className="h-8 flex items-center text-stone-700">
                      <Clock className="w-3.5 h-3.5 mr-1 text-stone-400" />
                      {trip.durationText}
                    </div>
                    <div className="h-8 flex items-center">
                      <span className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-800 font-bold text-[10px]">
                        {lang === 'am' ? trip.difficultyAmharic : trip.difficulty}
                      </span>
                    </div>
                    <div className="h-8 flex items-center font-semibold text-stone-900">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-700" />
                      <span className="truncate">{trip.organizerName}</span>
                    </div>
                    <div className="h-8 flex items-center text-[11px] text-stone-600 truncate" title={trip.pickupLocation}>
                      <MapPin className="w-3.5 h-3.5 mr-1 text-stone-400 shrink-0" />
                      <span className="truncate">{trip.pickupLocation.split(',')[0]}</span>
                    </div>
                    <div className="h-8 flex items-center text-emerald-700 font-semibold">
                      <Check className="w-4 h-4 mr-1 text-emerald-600" />
                      <span className="truncate">{trip.inclusions[0] || 'Bus Included'}</span>
                    </div>
                    <div className="h-8 flex items-center">
                      {trip.inclusions.some((inc) => inc.toLowerCase().includes('lunch') || inc.toLowerCase().includes('meal')) ? (
                        <span className="flex items-center text-emerald-700 font-semibold">
                          <Check className="w-4 h-4 mr-1 text-emerald-600" /> Yes
                        </span>
                      ) : (
                        <span className="flex items-center text-stone-400">
                          <Minus className="w-4 h-4 mr-1" /> Not included
                        </span>
                      )}
                    </div>
                    <div className="h-8 flex items-center text-emerald-700 font-semibold">
                      <Check className="w-4 h-4 mr-1 text-emerald-600" /> Included
                    </div>
                    <div className="h-8 flex items-center font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                      {trip.rating} ({trip.reviewsCount})
                    </div>
                    <div className="h-10 flex items-center pt-1">
                      <button
                        onClick={() => {
                          onClose();
                          onBookNow(trip);
                        }}
                        className="w-full py-2 px-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                      >
                        {lang === 'am' ? 'ይሄን ምረጥ' : 'Book This'}
                      </button>
                    </div>
                  </div>

                </div>
              ))}

              {/* Placeholder Column if fewer than 3 */}
              {comparedTrips.length < 3 && (
                <div className="border-2 border-dashed border-stone-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center text-stone-400">
                  <Sparkles className="w-6 h-6 text-stone-300 mb-2" />
                  <p className="text-[11px] font-semibold">
                    {lang === 'am' ? 'ሌላ ጉዞ ጨምረው ያነጻጽሩ' : 'Select another trip from the grid to compare side-by-side'}
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    );
  }

  // Floating Bottom Banner (Optimized for Mobile Screens)
  return (
    <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 w-[95%] sm:w-11/12 max-w-3xl bg-stone-900/95 text-white backdrop-blur-lg px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl shadow-2xl border border-stone-700 flex items-center justify-between gap-2 sm:gap-4 animate-slide-up">
      
      {/* Left: Thumbnail Previews & Count */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex -space-x-2 overflow-hidden">
          {comparedTrips.map((trip) => (
            <img
              key={trip.id}
              src={trip.images[0]}
              alt={trip.title}
              className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-stone-900 object-cover"
            />
          ))}
        </div>
        <div>
          <span className="text-xs font-bold text-amber-300 block">
            {comparedTrips.length} {lang === 'am' ? 'ጉዞዎች' : 'Trips Selected'}
          </span>
          <span className="text-[10px] sm:text-[11px] text-stone-300 hidden sm:inline">
            {lang === 'am' ? 'ዋጋና ይዘት በቀጥታ ያነጻጽሩ' : 'Ready for side-by-side comparison'}
          </span>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={onClearAll}
          className="text-stone-400 hover:text-stone-200 text-xs px-2 py-1 font-medium transition-colors cursor-pointer"
        >
          {lang === 'am' ? 'አጽዳ' : 'Clear'}
        </button>
        <button
          onClick={onOpenModal}
          className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white px-3 sm:px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
        >
          <span>{lang === 'am' ? 'አነጻጽር' : 'Compare Now'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
