import React from 'react';
import { Compass, ShieldCheck, Users, Target, Globe, Heart, Award, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AboutPage({ lang }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>{lang === 'am' ? 'ስለ ጉዞትራይብ' : 'About GuzoTribe'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight font-serif">
            {lang === 'am' ? 'የማህበረሰብ ጉዞዎችን ተደራሽ እና የታመኑ ማድረግ' : 'Making Community Travel Discoverable in Ethiopia'}
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {lang === 'am'
              ? 'የተበታተኑ የቴሌግራም እና የቲክቶክ የጉዞ ማስታወቂያዎችን ወደ አንድ የተረጋገጠ፣ ግልጽ እና ደህንነቱ የተጠበቀ ማዕከል አምጥተናል።'
              : 'We aggregate community-led trips from verified local operators so Ethiopian travelers, weekend hikers, and visiting diaspora can search, compare side-by-side, and book with complete confidence.'}
          </p>
        </div>

        {/* The Problem We Solve */}
        <div className="grid md:grid-cols-2 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-sm">
          <div className="space-y-4">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {lang === 'am' ? 'የምንፈታው ችግር' : 'The Problem We Solve'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {lang === 'am' ? 'የቡድን ጉዞዎች የተበታተኑ ናቸው' : 'Group Travel in Ethiopia Was Fragmented'}
            </h2>
            <div className="space-y-3 text-stone-600 text-xs sm:text-sm leading-relaxed">
              <p>
                {lang === 'am'
                  ? 'በኢትዮጵያ ምርጥ የእግር ጉዞዎችን ለማግኘት በደርዘን የሚቆጠሩ የቴሌግራም ቻናሎች፣ የቲክቶክ ቪዲዮዎችና የኢንስታግራም ገጾችን ማሰስ ይጠይቃል። ዋጋዎችን ማነጻጸር፣ የስካውትና የምግብ ይዘቶችን ማረጋገጥ እና የአስጎብኚውን ተአማኒነት ማወቅ አስቸጋሪ ነበር።'
                  : 'Finding great group trips in Ethiopia used to be frustrating. Dozens of operators scattered across Telegram channels, TikTok posts, and WhatsApp groups, with no easy way to compare prices, read verified reviews, or verify guide licenses.'}
              </p>
              <p>
                {lang === 'am'
                  ? 'GuzoTribe ይህን ችግር ይፈታል። እኛ ራሳችን ጉዞዎችን አናካሂድም፤ ይልቁንም የተረጋገጡ የታመኑ አስጎብኚዎችን በአንድ መድረክ በማሰባሰብ ምርጫውን ለተጓዦች እናመቻቻለን።'
                  : 'GuzoTribe aggregates trips from verified community organizers and local trekking clubs, giving travelers the transparency and security to choose what fits them best.'}
              </p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
              alt="Community Hikers in Ethiopia"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-6 text-white">
              <p className="text-xs font-semibold">Weekend hikers exploring Wenchi Crater Lake Basin</p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-emerald-900 text-white shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800 flex items-center justify-center">
              <Target className="w-6 h-6 text-amber-300" />
            </div>
            <h3 className="text-xl font-bold">
              {lang === 'am' ? 'ተልዕኮአችን (Our Mission)' : 'Our Mission'}
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {lang === 'am'
                ? 'በኢትዮጵያ ውስጥ የማህበረሰብ ጉዞዎች እጅግ የታመነና ተደራሽ መድረክ መሆን። ተጓዦች ግልጽ በሆነ ዋጋና የተረጋገጠ ደህንነት ድንቅ የሀገራችንን ስፍራዎች እንዲጎበኙ ማስቻል።'
                : 'To be Ethiopia\'s most trusted aggregator for community travel, empowering travelers to discover and book group trips with complete price transparency and safety assurance.'}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-stone-900 text-white shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-800 flex items-center justify-center">
              <Globe className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold">
              {lang === 'am' ? 'ራዕያችን (Our Vision)' : 'Our Vision'}
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {lang === 'am'
                ? 'ማንኛውም ሰው የኢትዮጵያን የተፈጥሮና የባህል ድንቆች ልክ እንደ አውሮፕላን ትኬት በቀላሉ ፈልጎ የሚይዝበት ዘመናዊና የተሳለጠ የጉዞ ስርዓት መገንባት።'
                : 'A world where finding your perfect Ethiopian group adventure is as seamless and reliable as booking a flight, connecting local youth and global diaspora with authentic heritage.'}
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-8">
          <button
            onClick={() => navigate('/trips')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-lg transition-all hover:scale-105 cursor-pointer"
          >
            <span>{lang === 'am' ? 'ጉዞዎችን አሁኑኑ ይመልከቱ' : 'Explore Curated Trips'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
