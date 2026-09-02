import React, { useState, useEffect, useRef } from 'react';
import { Compass, Users, Award, Shield } from 'lucide-react';
import gsap from 'gsap';

export default function MetricsBar({ lang }) {
  const barRef = useRef(null);
  const [counts, setCounts] = useState({
    trips: 0,
    clubs: 0,
    travelers: 0,
    rating: '0.00'
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Staggered fade in of cards
      gsap.from('.metric-card', {
        opacity: 0,
        y: 25,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out'
      });

      // 2. Animated numeric counter
      const target = { trips: 0, clubs: 0, travelers: 0, rating: 0 };
      gsap.to(target, {
        trips: 45,
        clubs: 18,
        travelers: 14200,
        rating: 4.92,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => {
          setCounts({
            trips: Math.round(target.trips),
            clubs: Math.round(target.clubs),
            travelers: Math.round(target.travelers),
            rating: target.rating.toFixed(2)
          });
        }
      });
    }, barRef);

    return () => ctx.revert();
  }, []);

  const metrics = [
    {
      icon: Compass,
      value: `${counts.trips}+`,
      label: lang === 'am' ? 'የተመረጡ ጉዞዎች' : 'Curated Group Trips',
      sublabel: lang === 'am' ? 'በመላው ኢትዮጵያ' : 'Across all Ethiopian regions'
    },
    {
      icon: Shield,
      value: `${counts.clubs}+`,
      label: lang === 'am' ? 'የተረጋገጡ አስጎብኚ ክለቦች' : 'Verified Organizer Clubs',
      sublabel: lang === 'am' ? 'በቱሪዝም ፍቃድ የተረጋገጡ' : 'Licensed & background checked'
    },
    {
      icon: Users,
      value: `${counts.travelers.toLocaleString()}+`,
      label: lang === 'am' ? 'የተጓዙ ደንበኞች' : 'Community Travelers',
      sublabel: lang === 'am' ? 'ተማሪዎች፣ ወጣቶችና ዲያስፖራ' : 'Locals, youth & visiting diaspora'
    },
    {
      icon: Award,
      value: `${counts.rating} ★`,
      label: lang === 'am' ? 'አማካይ የተጓዦች ደረጃ' : 'Average Traveler Rating',
      sublabel: lang === 'am' ? 'ከእውነተኛ አስተያየቶች የተሰጠ' : 'From 1,800+ authentic reviews'
    }
  ];

  return (
    <section ref={barRef} className="bg-white border-y border-stone-200 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="metric-card flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300 shadow-2xs group-hover:scale-110">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight mb-1 font-mono">
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
