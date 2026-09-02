import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function ContactFaqAccordion({ lang }) {
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const faqs = [
    {
      q: lang === 'am' ? 'የጉዞትራይብ Escrow ክፍያ ስርዓት ገንዘቤን እንዴት ይጠብቃል?' : 'How does GuzoTribe\'s Escrow custody protect my payment?',
      a: lang === 'am'
        ? 'በቴሌብር፣ CBE ብር ወይም በካርድ የሚከፍሉት ገንዘብ ጉዞው በሰላም እስኪጠናቀቅ ድረስ በGuzoTribe ደህንነቱ በተጠበቀ Escrow አካውንት ውስጥ ይቆያል። ጉዞው በአስጎብኚው ምክንያት ቢሰረዝ 100% ገንዘብዎ ወዲያውኑ ይመለሳል።'
        : 'Your payment via Telebirr, CBE Birr, or Chapa is held securely in our 8% Escrow Trust Custody until the trip completes safely. If an organizer cancels or fails to deliver, you receive an automated 100% full refund.'
    },
    {
      q: lang === 'am' ? 'የውጭ ሀገር ቪዛ ወይም ማስተርካርድ መጠቀም ይቻላል?' : 'Can diaspora and international travelers pay with Visa or Mastercard?',
      a: lang === 'am'
        ? 'አዎ! በChapa ክፍያ በኩል ማንኛውንም አለምአቀፍ ቪዛ ወይም ማስተርካርድ በመጠቀም በUSD ወይም በETB መክፈል ይችላሉ።'
        : 'Yes! We support international Visa, Mastercard, and Amex via Chapa checkout in both USD and ETB, making it seamless for visiting diaspora during Timket, Meskel, or Enkutatash.'
    },
    {
      q: lang === 'am' ? 'የፍተሻ ኬላ (Checkpoint) የመንገደኞች ዝርዝር ምንድን ነው?' : 'What is the official Checkpoint Passenger Manifest?',
      a: lang === 'am'
        ? 'በኦሮሚያ፣ አማራ ወይም ሌሎች ክልሎች ባሉ የፍተሻ ኬላዎች ለሚደረግ የደህንነት ፍተሻ ህጋዊና የተሟላ የተሳፋሪዎች መታወቂያ እና የአደጋ ጊዜ ስልክ ቁጥር የያዘ ሰነድ ሲሆን፤ ሲመዘገቡ በራስ-ሰር ይዘጋጃል።'
        : 'Organizers can generate an official printable Passenger Manifest with full names, national IDs, and emergency contacts required at regional transportation security checkpoints.'
    },
    {
      q: lang === 'am' ? 'የቡድን ቅናሽ (Group Discount) እንዴት ይሰራል?' : 'How do automated group discounts work?',
      a: lang === 'am'
        ? 'ከ3 ወይም ከ5 ሰዎች በላይ በአንድ ላይ ሲይዙ በራስ-ሰር ከ10% እስከ 15% ቅናሽ ይደረግልዎታል። በተጨማሪም "GUZO2026" ወይም "DIASPORA" ፕሮሞ ኮዶችን መጠቀም ይችላሉ።'
        : 'When booking 3+ seats together, an automatic 10% to 15% group discount is applied during checkout. You can also enter promo codes like "GUZO2026" or "DIASPORA".'
    }
  ];

  return (
    <div className="bg-white p-7 sm:p-10 rounded-3xl border border-stone-200/90 shadow-sm space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>{lang === 'am' ? 'ተደጋግመው የሚጠየቁ ጥያቄዎች' : 'Frequently Asked Questions'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
          {lang === 'am' ? 'ስለ ጉዞትራይብ ማወቅ የሚፈልጓቸው ነገሮች' : 'Everything You Need to Know'}
        </h2>
      </div>

      <div className="divide-y divide-stone-100 max-w-3xl mx-auto">
        {faqs.map((faq, idx) => {
          const isOpen = openFaqIdx === idx;
          return (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
              >
                <span className="font-bold text-stone-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors">
                  {faq.q}
                </span>
                <span className="p-1.5 rounded-full bg-stone-100 group-hover:bg-emerald-50 text-stone-600 group-hover:text-emerald-700 transition-all shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              {isOpen && (
                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed animate-slide-up pl-1 pr-6">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
