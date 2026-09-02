import React from 'react';
import { Compass, Send, Phone, Mail, MapPin, ShieldCheck, LayoutDashboard, Map, Camera, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer({ lang, onOpenPartnerModal: _onOpenPartnerModal }) {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1 & 2: Brand & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 via-amber-600 to-red-600 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="font-bold text-2xl tracking-tight text-white font-serif">
                Guzo<span className="text-emerald-500">Tribe</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              {lang === 'am'
                ? 'የኢትዮጵያን የተፈጥሮ ድንቆች፣ ጥንታዊ ቅርሶች እና ተራሮች ከተረጋገጡ የማህበረሰብ አስጎብኚዎች ጋር የሚያገናኝ የታመነ የጉዞ መድረክ።'
                : 'Your trusted aggregator for curated Ethiopian community travel. Compare trips, verify certified guides, and book weekend adventures with escrow protection.'}
            </p>

            <div className="space-y-2 text-xs text-stone-400 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Bole Sub-City (Near Medhanialem Mall), Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="mailto:support@guzotribe.et" className="hover:text-emerald-400 transition-colors">
                  support@guzotribe.et
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+251 911 234567 / +251 988 590295</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Send className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="https://t.me/" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                  @GuzoTribeEthiopia (Official Telegram Channel)
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Explore Links & Tools */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">
              {lang === 'am' ? 'ማሰሻ እና መሳሪያዎች' : 'Explore & Tools'}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><Link to="/trips" className="hover:text-white transition-colors">{lang === 'am' ? 'ሁሉንም ጉዞዎች እይ' : 'All Curated Trips'}</Link></li>
              <li><Link to="/map" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1.5"><Map className="w-3.5 h-3.5" /><span>Ethiopia Landmark Map</span></Link></li>
              <li><Link to="/gear-guide" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5"><CheckSquare className="w-3.5 h-3.5" /><span>Trek Gear & Packing Guide</span></Link></li>
              <li><Link to="/community" className="text-sky-400 hover:text-sky-300 font-semibold transition-colors flex items-center gap-1.5"><Camera className="w-3.5 h-3.5" /><span>Community Trail Stories</span></Link></li>
            </ul>
          </div>

          {/* Col 4: Company & Portals */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">
              {lang === 'am' ? 'ድርጅት እና አስተዳደር' : 'Company & Host'}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><Link to="/about" className="hover:text-white transition-colors">{lang === 'am' ? 'ስለ እኛ' : 'About Us'}</Link></li>
              <li><Link to="/partners" className="hover:text-white transition-colors">{lang === 'am' ? 'አስጎብኚ ይሁኑ' : 'Become a Partner'}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{lang === 'am' ? 'ያግኙን' : 'Contact Us'}</Link></li>
              <li><Link to="/gear-guide" className="hover:text-white transition-colors">{lang === 'am' ? 'የእቃ ዝርዝር መመሪያ' : 'Trek Gear Checklist'}</Link></li>
              <li className="pt-2 border-t border-stone-800">
                <Link to="/organizer/dashboard" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Host Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Local Payments & Escrow Protection */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">
              {lang === 'am' ? 'ክፍያና ዋስትና' : 'Payments & Escrow'}
            </h4>
            <p className="text-xs text-stone-400 mb-3">
              {lang === 'am'
                ? 'በTelebirr፣ በCBE Birr እና በChapa ሙሉ ዋስትና ያለው ክፍያ።'
                : 'Automated 8% Escrow Custody with Telebirr, CBE Birr & Chapa (Visa/Mastercard).'}
            </p>

            <div className="p-3 bg-stone-900 rounded-2xl border border-stone-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Payout Protection</span>
              </div>
              <span className="text-[10px] text-stone-400 block leading-tight">
                Funds released to organizers only upon passenger trip completion.
              </span>
            </div>

            {/* Verified Payment Partners */}
            <div className="pt-3">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                {lang === 'am' ? 'የተረጋገጡ የክፍያ አማራጮች' : 'Official Payment Partners'}
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200">
                  <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                  <span>Telebirr</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200">
                  <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                  <span>CBE Birr</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>Chapa</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span>Awash Birr</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} GuzoTribe (ጉዞትራይብ) Ethiopia. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>Powered by Telebirr & CBE Birr</span>
            <span>•</span>
            <span>Ministry of Tourism Licensed Hosts</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
