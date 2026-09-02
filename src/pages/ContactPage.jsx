import React, { useState } from 'react';
import { Sparkles, MessageSquare, Users, ShieldCheck, CreditCard } from 'lucide-react';
import { useToast } from '../context/ToastContext';

import ContactDepartmentSelector from '../components/contact/ContactDepartmentSelector';
import ContactChannelsCard from '../components/contact/ContactChannelsCard';
import ContactForm from '../components/contact/ContactForm';
import ContactFaqAccordion from '../components/contact/ContactFaqAccordion';

export default function ContactPage({ lang }) {
  const { addToast } = useToast();
  const [selectedDept, setSelectedDept] = useState('general');
  const [copiedKey, setCopiedKey] = useState(null);

  const departments = [
    {
      id: 'general',
      icon: MessageSquare,
      title: lang === 'am' ? 'ጠቅላላ ድጋፍ' : 'General Support',
      desc: lang === 'am' ? 'ስለ ጉዞዎች እና ቦታ ማስያዝ ጥያቄዎች' : 'Trip inquiries, booking questions, and general info'
    },
    {
      id: 'partners',
      icon: Users,
      title: lang === 'am' ? 'የአስጎብኚ አጋርነት' : 'Tour Club Onboarding',
      desc: lang === 'am' ? 'ለአስጎብኚዎች እና የጉዞ ክለቦች' : 'Join as a verified tour operator or club host'
    },
    {
      id: 'escrow',
      icon: ShieldCheck,
      title: lang === 'am' ? 'የክፍያ እና Escrow ደህንነት' : 'Escrow & Payments',
      desc: lang === 'am' ? 'የቴሌብር፣ CBE ወይም የካርድ ክፍያ እርዳታ' : 'Telebirr, CBE Birr, Chapa payouts & refund protection'
    },
    {
      id: 'diaspora',
      icon: CreditCard,
      title: lang === 'am' ? 'የዲያስፖራ ጉዞዎች' : 'Diaspora & Custom Trips',
      desc: lang === 'am' ? 'ለበዓላት (ጥምቀት፣ መስቀል) ልዩ የቡድን ጉዞዎች' : 'Timket, Meskel & custom private group expeditions'
    }
  ];

  const handleCopy = (text, key, label) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addToast(
      lang === 'am' ? `${label} ተገልብጧል!` : `Copied ${label} to clipboard!`,
      'success'
    );
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const selectedDepartmentName = departments.find(d => d.id === selectedDept)?.title || 'General Support';

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-8 pb-24 relative overflow-hidden">
      
      {/* Decorative Ethiopian Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/80 text-emerald-900 text-xs font-bold uppercase tracking-wider shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === 'am' ? 'የእርዳታ እና ግንኙነት ማዕከል' : 'Bole Support & Operations Hub'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight font-serif">
            {lang === 'am' ? 'እንዴት ልንረዳዎ እንችላለን?' : 'How Can We Help You Travel?'}
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {lang === 'am'
              ? 'ስለ ጉዞዎች፣ ክፍያዎች፣ የጉዞ አዘጋጅነት ወይም የዲያስፖራ ልዩ ጉዞዎች ጥያቄ ካለዎት የጉዞትራይብ ቡድን ዝግጁ ነው።'
              : 'Whether you need assistance with Telebirr escrow payments, tour organizer onboarding, or custom group departures in Ethiopia, our team in Addis Ababa is here.'}
          </p>

          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-stone-200/90 shadow-xs text-xs font-semibold text-stone-700">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-800 font-bold">{lang === 'am' ? 'የድጋፍ ቡድኑ በስራ ላይ ነው' : 'Support Online'}</span>
            </div>
            <span className="text-stone-300">•</span>
            <span>Bole Medhanialem, Addis Ababa</span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-500">Mon - Sat: 8:30 AM - 6:30 PM (EAT)</span>
          </div>
        </div>

        {/* 1. Department Topic Selector */}
        <ContactDepartmentSelector
          lang={lang}
          departments={departments}
          selectedDept={selectedDept}
          onSelectDept={setSelectedDept}
        />

        {/* 2. Main Grid: Direct Channels & Interactive Form */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5">
            <ContactChannelsCard
              lang={lang}
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
          </div>

          <div className="lg:col-span-7">
            <ContactForm
              lang={lang}
              selectedDepartmentName={selectedDepartmentName}
            />
          </div>

        </div>

        {/* 3. Interactive FAQ Accordion */}
        <ContactFaqAccordion lang={lang} />

      </div>
    </div>
  );
}
