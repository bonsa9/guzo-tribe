import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Send, Building, Phone, User, FileText, Sparkles } from 'lucide-react';

export default function BecomePartnerModal({ isOpen, onClose, lang }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '+251 9',
    telegramHandle: '@',
    licenseNumber: '',
    specialty: 'Weekend Hikes & Day Trips'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">
                {lang === 'am' ? 'የአስጎብኚ አጋርነት ማመልከቻ' : 'Partner Application Form'}
              </h3>
              <p className="text-[11px] text-stone-400">
                {lang === 'am' ? 'ጉዞዎችዎን በGuzoTribe ላይ ይዘርዝሩ' : 'Join Ethiopia\'s Leading Trip Aggregator'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-scale-up">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-extrabold text-stone-900">
                {lang === 'am' ? 'ማመልከቻዎ በተሳካ ሁኔታ ደርሷል!' : 'Application Submitted!'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                {lang === 'am'
                  ? `የGuzoTribe የአጋርነት ቡድን በ24 ሰዓት ውስጥ በ${formData.phone} ወይም በቴሌግራም ${formData.telegramHandle} ያገኝዎታል።`
                  : `Thank you for applying. Our partner onboarding team will contact you within 24 hours via ${formData.phone} or Telegram.`}
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-all cursor-pointer"
              >
                {lang === 'am' ? 'እሺ (Close)' : 'Close'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-950">
                <p className="font-bold mb-1">
                  {lang === 'am' ? '🌟 የአጋርነት ጥቅሞች፡' : '🌟 Organizer Partner Perks:'}
                </p>
                <ul className="space-y-1 text-[11px] text-emerald-850">
                  <li>• {lang === 'am' ? 'በቀጥታ በTelebirr እና በCBE የሚገቡ ፈጣን ክፍያዎች' : 'Automated Telebirr & CBE Birr ticket checkouts'}</li>
                  <li>• {lang === 'am' ? 'የተረጋገጠ የአስጎብኚ ባጅ (Verified Badge) እና ተአማኒነት' : 'Verified Organizer badge to build trust'}</li>
                  <li>• {lang === 'am' ? 'በቴሌግራም ቦት እና በዌብሳይት ለሺዎች የሚደርስ ተደራሽነት' : 'Cross-promoted on Telegram and Web'}</li>
                </ul>
              </div>

              {/* Contact Person */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {lang === 'am' ? 'የአዘጋጁ / የተጠሪው ሙሉ ስም *' : 'Contact Person Full Name *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dawit Tadesse"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Company / Club Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {lang === 'am' ? 'የድርጅቱ ወይም የክለቡ ስም *' : 'Company / Hiking Club Name *'}
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Entoto Outdoor Community / Abyssinia Treks"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone & Telegram */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {lang === 'am' ? 'ስልክ ቁጥር *' : 'Phone Number *'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+251 9..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {lang === 'am' ? 'የቴሌግራም ቻናል/አድራሻ *' : 'Telegram Channel/Handle *'}
                  </label>
                  <div className="relative">
                    <Send className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="@yourchannel"
                      value={formData.telegramHandle}
                      onChange={(e) => setFormData({ ...formData, telegramHandle: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Tourism License & Specialty */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {lang === 'am' ? 'የቱሪዝም ፍቃድ / ምዝገባ ቁጥር' : 'Tourism License / TIN'}
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. ETH-TOUR-2024..."
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {lang === 'am' ? 'የጉዞ ዘርፍ (Trip Specialty)' : 'Trip Specialty'}
                  </label>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none cursor-pointer"
                  >
                    <option value="Weekend Hikes & Day Trips">Weekend Hikes & Day Trips</option>
                    <option value="Simien & Bale Mountaineering">Simien & Bale Mountaineering</option>
                    <option value="Danakil & Afar 4x4 Expeditions">Danakil & Afar 4x4 Expeditions</option>
                    <option value="Cultural Festivals (Timket/Meskel)">Cultural Festivals (Timket/Meskel)</option>
                    <option value="Rift Valley Lake Retreats">Rift Valley Lake Retreats</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 cursor-pointer"
                >
                  {lang === 'am' ? 'ሰርዝ' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                >
                  {lang === 'am' ? 'ማመልከቻውን ላክ' : 'Submit Application'}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
