import React from 'react';
import { organizersData } from '../data/organizersData';
import { ShieldCheck, Star, Users, Send, CheckCircle2, ArrowRight } from 'lucide-react';

export default function VerifiedOrganizers({ lang, onOpenPartnerModal }) {
  return (
    <section id="organizers" className="py-16 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'am' ? 'የተረጋገጠ አጋርነት' : 'Verified Partner Network'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            {lang === 'am' ? 'የታመኑ የኢትዮጵያ አስጎብኚ ማህበረሰቦች' : 'Trusted Local Trip Hosts & Clubs'}
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
            {lang === 'am'
              ? 'በGuzoTribe ላይ የተዘረዘሩ ሁሉም አስጎብኚዎች ህጋዊ የቱሪዝም ፍቃድ፣ የደህንነት ስልጠና እና የመጀመሪያ እርዳታ ዝግጅት ያላቸው ናቸው።'
              : 'Every organizer on GuzoTribe is vetted for passenger safety, licensed mountain guides, and verified reviews.'}
          </p>
        </div>

        {/* Organizers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizersData.map((org) => (
            <div
              key={org.id}
              className="bg-stone-800/80 rounded-3xl p-6 border border-stone-700 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={org.image}
                      alt={org.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/40"
                    />
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-emerald-400 transition-colors">
                        {lang === 'am' ? org.amharicName : org.name}
                      </h3>
                      <span className="text-[11px] text-amber-400 font-semibold block">
                        {org.specialty}
                      </span>
                    </div>
                  </div>

                  <span className="p-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400" title="Verified License">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                </div>

                <p className="text-xs text-stone-300 mb-4 line-clamp-2 leading-relaxed">
                  {org.tagline}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-stone-900/80 border border-stone-700/60 text-center mb-4">
                  <div>
                    <span className="text-[10px] text-stone-400 block">{lang === 'am' ? 'ደረጃ' : 'Rating'}</span>
                    <span className="text-xs font-bold text-amber-400 flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400" /> {org.rating}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">{lang === 'am' ? 'ጉዞዎች' : 'Trips'}</span>
                    <span className="text-xs font-bold text-white">{org.tripsCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">{lang === 'am' ? 'አባላት' : 'Hikers'}</span>
                    <span className="text-xs font-bold text-emerald-400">{org.membersCount}</span>
                  </div>
                </div>

              </div>

              {/* Footer row */}
              <div className="pt-3 border-t border-stone-700 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-400 font-mono">
                  {org.licenseNo}
                </span>

                <a
                  href={`https://t.me/${org.telegramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-semibold transition-colors"
                >
                  <Send className="w-3 h-3" />
                  <span>{org.telegramHandle}</span>
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Partner Application Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {lang === 'am' ? 'የጉዞ ወይም የእግር ጉዞ ክለብ አዘጋጅ ነዎት?' : 'Are you a Tour Operator or Hiking Club?'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              {lang === 'am'
                ? 'ጉዞዎችዎን በGuzoTribe ላይ በመዘርዘር በሺዎች የሚቆጠሩ ተጓዦችን ያግኙ።'
                : 'List your weekend and multi-day trips. Gain instant visibility and automated Telebirr ticket bookings.'}
            </p>
          </div>

          <button
            onClick={onOpenPartnerModal}
            className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-xs sm:text-sm transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer shrink-0"
          >
            {lang === 'am' ? 'አጋር ለመሆን ያመልክቱ' : 'Apply as Organizer'}
          </button>
        </div>

      </div>
    </section>
  );
}
