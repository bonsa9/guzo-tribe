import React, { useState } from 'react';
import { Send, CheckCircle2, Copy } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ContactForm({
  lang,
  selectedDepartmentName
}) {
  const { addToast } = useToast();
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleCopyTicket = (ticketId) => {
    navigator.clipboard.writeText(ticketId);
    addToast(lang === 'am' ? 'የማጣቀሻ ቁጥር ተገልብጧል!' : 'Reference ID copied to clipboard!', 'success');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketId = 'GZ-' + Math.floor(100000 + Math.random() * 900000);
    setSubmittedTicket({
      ticketId,
      ...formData,
      department: selectedDepartmentName
    });
    addToast(
      lang === 'am'
        ? `መልእክትዎ ተልኳል! የማጣቀሻ ቁጥር፡ ${ticketId}`
        : `Message sent successfully! Reference ID: ${ticketId}`,
      'success'
    );
  };

  return (
    <div className="bg-white p-7 sm:p-9 rounded-3xl border border-stone-200/90 shadow-md relative">
      {submittedTicket ? (
        <div className="text-center py-10 space-y-5 animate-slide-up">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Ticket #{submittedTicket.ticketId}
            </span>
            <h3 className="text-2xl font-extrabold text-stone-900 mt-2 font-serif">
              {lang === 'am' ? 'መልእክትዎ በተሳካ ሁኔታ ደርሶናል!' : 'Inquiry Received!'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mt-1 leading-relaxed">
              {lang === 'am'
                ? `እናመሰግናለን ${submittedTicket.name}። የጉዞትራይብ የ${submittedTicket.department} ቡድን በ ${submittedTicket.email} ወይም በስልክዎ በኩል በቅርቡ ምላሽ ይሰጥዎታል።`
                : `Thank you, ${submittedTicket.name}. Our ${submittedTicket.department} team has logged your inquiry and will follow up at ${submittedTicket.email} shortly.`}
            </p>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left max-w-md mx-auto space-y-2 text-xs">
            <div className="flex justify-between text-stone-500">
              <span>Reference ID:</span>
              <strong className="text-stone-900 font-mono">{submittedTicket.ticketId}</strong>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Department:</span>
              <strong className="text-stone-900">{submittedTicket.department}</strong>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Subject:</span>
              <strong className="text-stone-900 truncate max-w-[200px]">{submittedTicket.subject || 'General Inquiry'}</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleCopyTicket(submittedTicket.ticketId)}
              className="px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Reference ID</span>
            </button>
            <button
              onClick={() => {
                setSubmittedTicket(null);
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="font-extrabold text-lg text-stone-900 font-serif">
              {lang === 'am' ? 'መልእክት ይላኩልን' : 'Send an Inquiry'}
            </h3>
            <p className="text-xs text-stone-500">
              {lang === 'am' ? 'ቅጹን ይሙሉ፤ ቡድናችን በጥቂት ሰዓታት ውስጥ ያነጋግርዎታል' : 'Fill out the form below and our Addis Ababa desk will reply'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {lang === 'am' ? 'ሙሉ ስም *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Abebe Bikila"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {lang === 'am' ? 'ኢሜይል *' : 'Email Address *'}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {lang === 'am' ? 'ስልክ ቁጥር (ቴሌብር)' : 'Phone Number (Telebirr / WhatsApp)'}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+251 9..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {lang === 'am' ? 'ርዕስ / የጉዞ ስም' : 'Subject / Trip Name'}
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Wenchi Crater Lake weekend group"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              {lang === 'am' ? 'መልእክት *' : 'Message Details *'}
            </label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={
                lang === 'am'
                  ? 'ጥያቄዎን፣ የተሳፋሪዎች ብዛት ወይም የሚፈልጉትን ቀን በዝርዝር ይግለጹ...'
                  : 'Describe your request, number of seats, departure preferences, or partner inquiries...'
              }
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-900/15 transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>{lang === 'am' ? 'መልእክት ላክ' : 'Submit Inquiry'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
