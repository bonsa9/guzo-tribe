import React from 'react';
import { Send, Phone, Mail, MapPin, Copy, Check, ExternalLink, Clock, ShieldCheck } from 'lucide-react';

export default function ContactChannelsCard({
  lang,
  copiedKey,
  onCopy
}) {
  return (
    <div className="space-y-6">
      
      {/* Quick Contact Card */}
      <div className="bg-stone-900 text-white p-7 sm:p-8 rounded-3xl space-y-6 shadow-xl border border-stone-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <h3 className="font-bold text-lg text-white">
              {lang === 'am' ? 'ቀጥታ የእውቂያ መስመሮች' : 'Direct Channels'}
            </h3>
            <p className="text-xs text-stone-400">
              {lang === 'am' ? 'ፈጣን ምላሽ በቴሌግራም ወይም በስልክ' : 'Instant response via Telegram or Phone'}
            </p>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 text-[10px] font-bold">
            Bole HQ
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-stone-300">
          
          {/* Telegram Hotline */}
          <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-center justify-between gap-3 hover:border-sky-500/50 transition-all group">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                <Send className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <strong className="block text-white text-xs">Official Telegram Channel</strong>
                <a 
                  href="https://t.me/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-sky-400 hover:underline text-xs truncate block font-medium"
                >
                  @GuzoTribeEthiopia
                </a>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => onCopy('@GuzoTribeEthiopia', 'tg', 'Telegram')}
                className="p-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 cursor-pointer transition-all"
                title="Copy handle"
              >
                {copiedKey === 'tg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white cursor-pointer transition-all"
                title="Open in Telegram"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Telebirr & Phone Hotline */}
          <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-center justify-between gap-3 hover:border-emerald-500/50 transition-all">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-white text-xs">Phone & Telebirr Helpline</strong>
                <span className="text-stone-300 text-xs font-mono">+251 911 234567 / +251 988 590295</span>
              </div>
            </div>
            <button
              onClick={() => onCopy('+251911234567', 'phone', 'Helpline')}
              className="p-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 cursor-pointer transition-all shrink-0"
              title="Copy phone number"
            >
              {copiedKey === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Email Support */}
          <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-center justify-between gap-3 hover:border-amber-500/50 transition-all">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-white text-xs">Email Desk</strong>
                <a href="mailto:support@guzotribe.et" className="text-stone-300 hover:text-emerald-400 text-xs font-mono">
                  support@guzotribe.et
                </a>
              </div>
            </div>
            <button
              onClick={() => onCopy('support@guzotribe.et', 'email', 'Email')}
              className="p-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 cursor-pointer transition-all shrink-0"
              title="Copy email"
            >
              {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Physical Location */}
          <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-white text-xs">Addis Ababa Office</strong>
                <span className="text-stone-300 text-xs leading-relaxed block">
                  Bole Sub-City (Near Medhanialem Mall), Addis Ababa, Ethiopia
                </span>
              </div>
            </div>
            <button
              onClick={() => onCopy('Bole Sub-City (Near Medhanialem Mall), Addis Ababa, Ethiopia', 'loc', 'Office Address')}
              className="p-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 cursor-pointer transition-all shrink-0"
              title="Copy address"
            >
              {copiedKey === 'loc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>

        <div className="pt-3 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Response Time: ~15 mins on Telegram</span>
          </div>
        </div>

      </div>

      {/* Escrow Guarantee Pill */}
      <div className="bg-emerald-900/10 border border-emerald-700/30 p-5 rounded-3xl flex items-start gap-3">
        <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-xs text-emerald-950">
            {lang === 'am' ? '100% የEscrow ተቀማጭ ዋስትና' : '100% Escrow Custody Assurance'}
          </h4>
          <p className="text-[11px] text-stone-600 leading-relaxed">
            {lang === 'am'
              ? 'ሁሉም በጉዞትራይብ በኩል የሚከፈሉ ክፍያዎች ጉዞው በሰላም እስኪጠናቀቅ ድረስ በEscrow የተጠበቁ ናቸው።'
              : 'All traveler bookings are protected by our automated Telebirr & CBE Birr escrow custody until departure.'}
          </p>
        </div>
      </div>

    </div>
  );
}
