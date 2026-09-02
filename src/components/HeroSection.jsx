import React, { useState } from 'react';
import { Search, MapPin, Calendar, CheckCircle2, ShieldCheck, CreditCard, Sparkles, ArrowRight } from 'lucide-react';

export default function HeroSection({ 
  lang, 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory,
  onSearchSubmit
}) {
  const [selectedLocation, setSelectedLocation] = useState('');

  const quickPopular = [
    'Wenchi Crater',
    'Simien Mountains',
    'Bale & Sanetti',
    'Timket Gondar',
    'Danakil Depression',
    'Suba Forest'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-stone-900 py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Image with Ethiopian Highlands/Lakes Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-900/60 to-stone-950/90" />
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === 'am' ? 'የኢትዮጵያ የመጀመሪያው የማህበረሰብ ጉዞ ማዕከል' : "Ethiopia's First Community Trip Aggregator"}</span>
        </div>

        {/* Hero Title with Dual Amharic/English Punch */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
          {lang === 'am' ? (
            <>
              ጉዞህን ከጓደኞችህ ጋር <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-200">ጀምር።</span>
            </>
          ) : (
            <>
              Find your tribe, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-400 to-teal-200">
                explore Ethiopia together.
              </span>
            </>
          )}
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-stone-200/90 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          {lang === 'am'
            ? 'ከተረጋገጡ የኢትዮጵያ አስጎብኚዎች ጋር የተዘጋጁ የቡድን ጉዞዎችን ይፈልጉ፣ ዋጋና ይዘት ያነጻጽሩ፣ በTelebirr ወይም በCBE በደህና ይያዙ።'
            : 'Discover curated group trips across Ethiopia. Compare prices, inclusions, and difficulty side-by-side. Book with 100% verified local operators.'}
        </p>

        {/* Interactive Search Bar */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl border border-stone-200/60 text-left">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Destination Input */}
              <div className="md:col-span-5 relative">
                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
                  {lang === 'am' ? 'የት መሄድ ይፈልጋሉ?' : 'Where do you want to go?'}
                </label>
                <div className="relative flex items-center">
                  <MapPin className="w-5 h-5 text-emerald-700 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={lang === 'am' ? 'ለምሳሌ፡ ወንጪ፣ ሰሜን፣ ባሌ፣ ላንጋኖ...' : 'e.g. Wenchi, Simien, Bale, Danakil...'}
                    className="w-full pl-10 pr-3 py-3 rounded-2xl bg-stone-100/80 border border-stone-200 text-stone-900 text-sm font-medium placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Trip Category / Type */}
              <div className="md:col-span-4 relative">
                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
                  {lang === 'am' ? 'የጉዞ አይነት' : 'Trip Category'}
                </label>
                <div className="relative flex items-center">
                  <Calendar className="w-5 h-5 text-emerald-700 absolute left-3 pointer-events-none" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-8 py-3 rounded-2xl bg-stone-100/80 border border-stone-200 text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all cursor-pointer appearance-none"
                  >
                    <option value="All">{lang === 'am' ? 'ሁሉም ጉዞዎች (All Trips)' : 'All Trip Styles'}</option>
                    <option value="Weekend Hikes">{lang === 'am' ? 'የሳምንቱ መጨረሻ የእግር ጉዞ (Weekend Hikes)' : 'Weekend Day Hikes'}</option>
                    <option value="Mountain Treks">{lang === 'am' ? 'የተራራ ላይ ጉዞዎች (Mountain Treks)' : 'Simien & Bale Mountain Treks'}</option>
                    <option value="Cultural & Festivals">{lang === 'am' ? 'ባህላዊ እና በዓላት (Cultural & Festivals)' : 'Cultural & Festival Specials (Timket/Meskel)'}</option>
                    <option value="Lake & Relaxation">{lang === 'am' ? 'ሀይቆች እና እረፍት (Lake & Relaxation)' : 'Lake & Beach Getaways'}</option>
                    <option value="Expeditions">{lang === 'am' ? 'ታላላቅ ጉዞዎች (Expeditions)' : 'Danakil & Volcano Expeditions'}</option>
                  </select>
                </div>
              </div>

              {/* Search Submit Button */}
              <div className="md:col-span-3 pt-1 md:pt-5">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-950/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Search className="w-4 h-4 text-amber-300" />
                  <span>{lang === 'am' ? 'ፈልግ' : 'Find Trips'}</span>
                </button>
              </div>

            </div>
          </div>
        </form>

        {/* Quick Popular Search Tags */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-300 font-medium">
          <span className="text-stone-400">{lang === 'am' ? 'ተወዳጅ መዳረሻዎች፡' : 'Popular:'}</span>
          {quickPopular.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchTerm(item);
                if (onSearchSubmit) onSearchSubmit();
              }}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10 transition-all cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-stone-300 text-xs sm:text-sm font-medium">
          <div className="flex items-center justify-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{lang === 'am' ? '100% የተረጋገጡ አስጎብኚዎች' : '100% Verified Local Operators'}</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <CreditCard className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{lang === 'am' ? 'በTelebirr / CBE / Chapa ይክፈሉ' : 'Telebirr & CBE Birr Checkout'}</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{lang === 'am' ? 'ቀጥታ ዋጋና ይዘት ማነጻጸሪያ' : 'Side-by-Side Inclusions Matrix'}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
