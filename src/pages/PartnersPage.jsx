import React from 'react';
import { ShieldCheck, TrendingUp, Users, Smartphone, CheckCircle, ArrowRight, BarChart3, Headphones } from 'lucide-react';

export default function PartnersPage({ lang, onOpenPartnerModal }) {
  const benefits = [
    {
      icon: Users,
      title: lang === 'am' ? 'ሰፊ የተጓዦች ተደራሽነት' : 'Reach High-Intent Travelers',
      desc: lang === 'am' ? 'በየሳምንቱ አዳዲስ ጉዞዎችን በንቃት የሚፈልጉ በሺዎች የሚቆጠሩ ደንበኞችን ያግኙ።' : 'Get discovered by thousands of active travelers, students, and visiting diaspora.'
    },
    {
      icon: Smartphone,
      title: lang === 'am' ? 'የተሳለጠ የTelebirr እና CBE ክፍያ' : 'Automated Telebirr & CBE Checkout',
      desc: lang === 'am' ? 'በእጅ የሚደረጉ የባንክ ዝውውሮችን እና የስክሪንሾት ማረጋገጫዎችን ያስወግዱ።' : 'Eliminate manual bank transfer screenshots with instant e-ticket issuing.'
    },
    {
      icon: ShieldCheck,
      title: lang === 'am' ? 'የተረጋገጠ የአስጎብኚ ባጅ' : 'Verified Partner Credibility',
      desc: lang === 'am' ? 'ህጋዊ የፍቃድ ማረጋገጫ ባጅ በማግኘት በተጓዦች ዘንድ ያለዎትን ተአማኒነት ያሳድጉ።' : 'Verified badge builds trust with first-time hikers and solo female travelers.'
    },
    {
      icon: BarChart3,
      title: lang === 'am' ? 'የቦታ ማስያዣ ዳሽቦርድ' : 'Analytics & Passenger Manifest',
      desc: lang === 'am' ? 'የተሳፋሪዎችን ዝርዝር፣ የተያዙ ቦታዎችን እና የገቢ ሁኔታን በቀላሉ ይከታተሉ።' : 'Track views, attendee manifests for checkpoints, and revenue payouts.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>{lang === 'am' ? 'አጋር ይሁኑ' : 'Partner with GuzoTribe'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight font-serif">
            {lang === 'am' ? 'የጉዞ ንግድዎን ያሳድጉ' : 'Grow Your Group Trip Business in Ethiopia'}
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {lang === 'am'
              ? 'የኢትዮጵያ ቀዳሚ የማህበረሰብ ጉዞ ማዕከልን ይቀላቀሉ። ጉዞዎችዎን ይዘርዝሩ እና ወዲያውኑ የተረጋገጡ ተሳፋሪዎችን ያግኙ።'
              : 'Join Ethiopia\'s leading community trip aggregator. Fill every seat on your bus and grow your tour operations.'}
          </p>
          <button
            onClick={onOpenPartnerModal}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-lg transition-all hover:scale-105 cursor-pointer mt-2"
          >
            <span>{lang === 'am' ? 'አሁኑኑ ያመልክቱ' : 'Apply to Join as Organizer'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-base">{item.title}</h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* How Onboarding Works */}
        <div className="bg-stone-900 text-white p-8 sm:p-12 rounded-3xl space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              {lang === 'am' ? 'በ4 ቀላል ደረጃዎች ይቀላቀሉ' : 'How to Get Started'}
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm">
              {lang === 'am' ? 'ከማመልከቻ እስከ የመጀመሪያው ጉዞ ሽያጭ' : 'Simple onboarding process for Ethiopian tour operators.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700">
              <div className="text-amber-400 font-extrabold text-lg mb-2">01</div>
              <h4 className="font-bold text-white text-sm mb-1">{lang === 'am' ? 'ያመልክቱ' : 'Apply Online'}</h4>
              <p className="text-xs text-stone-400">{lang === 'am' ? 'የድርጅትዎን መረጃና የቴሌግራም አድራሻ ያስገቡ።' : 'Submit your business details and trip portfolio.'}</p>
            </div>
            <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700">
              <div className="text-amber-400 font-extrabold text-lg mb-2">02</div>
              <h4 className="font-bold text-white text-sm mb-1">{lang === 'am' ? 'ማረጋገጫ' : 'Verification'}</h4>
              <p className="text-xs text-stone-400">{lang === 'am' ? 'የፍቃድ እና የደህንነት ደረጃዎችን እናረጋግጣለን።' : 'We review your license and guide credentials.'}</p>
            </div>
            <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700">
              <div className="text-amber-400 font-extrabold text-lg mb-2">03</div>
              <h4 className="font-bold text-white text-sm mb-1">{lang === 'am' ? 'ጉዞዎችን ይዘርዝሩ' : 'List Trips'}</h4>
              <p className="text-xs text-stone-400">{lang === 'am' ? 'የጉዞ መርሃ-ግብርዎን እና ዋጋዎን ይለጥፉ።' : 'Upload your itineraries, pricing, and departure dates.'}</p>
            </div>
            <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700">
              <div className="text-amber-400 font-extrabold text-lg mb-2">04</div>
              <h4 className="font-bold text-white text-sm mb-1">{lang === 'am' ? 'ይጀምሩ' : 'Start Selling'}</h4>
              <p className="text-xs text-stone-400">{lang === 'am' ? 'በሺዎች ለሚቆጠሩ ተጓዦች ይታዩ፣ ክፍያ ይቀበሉ።' : 'Receive instant bookings and automated payouts.'}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
