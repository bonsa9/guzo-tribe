import React from 'react';
import { Compass, Users, Award, Shield } from 'lucide-react';

export default function MetricsBar({ lang }) {
  const metrics = [
    {
      icon: Compass,
      value: '45+',
      label: lang === 'am' ? 'የተመረጡ ጉዞዎች' : 'Curated Group Trips',
      sublabel: lang === 'am' ? 'በመላው ኢትዮጵያ' : 'Across all Ethiopian regions'
    },
    {
      icon: Shield,
      value: '18+',
      label: lang === 'am' ? 'የተረጋገጡ አስጎብኚ ክለቦች' : 'Verified Organizer Clubs',
      sublabel: lang === 'am' ? 'በቱሪዝም ፍቃድ የተረጋገጡ' : 'Licensed & background checked'
    },
    {
      icon: Users,
      value: '14,200+',
      label: lang === 'am' ? 'የተጓዙ ደንበኞች' : 'Community Travelers',
      sublabel: lang === 'am' ? 'ተማሪዎች፣ ወጣቶችና ዲያስፖራ' : 'Locals, youth & visiting diaspora'
    },
    {
      icon: Award,
      value: '4.92 ★',
      label: lang === 'am' ? 'አማካይ የተጓዦች ደረጃ' : 'Average Traveler Rating',
      sublabel: lang === 'am' ? 'ከእውነተኛ አስተያየቶች የተሰጠ' : 'From 1,800+ authentic reviews'
    }
  ];

  return (
    <section className="bg-white border-y border-stone-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-1">
                  {item.value}
                </div>
                <div className="text-sm font-bold text-stone-800 mb-0.5">
                  {item.label}
                </div>
                <div className="text-xs text-stone-500 font-medium">
                  {item.sublabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
