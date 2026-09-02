import React from 'react';

/**
 * GuzoLogo
 * Bespoke vector brand identity combining:
 * 1. Simien/Bale mountain peaks (Ethiopian Highlands)
 * 2. 8-point gold navigational compass star
 * 3. Ethiopian tri-color geometry (Emerald, Gold, Crimson)
 */
export default function GuzoLogo({ 
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  showText = true, 
  variant = 'dark', // 'dark' | 'light' | 'white'
  className = ''
}) {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', subtext: 'text-[8px]', box: 'w-7 h-7 rounded-xl' },
    md: { icon: 'w-10 h-10', text: 'text-2xl', subtext: 'text-[9px]', box: 'w-10 h-10 rounded-2xl' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl', subtext: 'text-[10px]', box: 'w-12 h-12 rounded-2xl' },
    xl: { icon: 'w-16 h-16', text: 'text-4xl', subtext: 'text-xs', box: 'w-16 h-16 rounded-3xl' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const isLight = variant === 'light' || variant === 'white';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Icon Badge */}
      <div 
        className={`${currentSize.box} bg-gradient-to-tr from-emerald-800 via-amber-600 to-rose-700 p-0.5 shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-emerald-900/30 shrink-0`}
      >
        <div className="w-full h-full bg-stone-950 rounded-[11px] sm:rounded-[14px] flex items-center justify-center p-1 relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-radial from-amber-500/20 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Bespoke Mountain & Compass SVG */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-amber-400"
          >
            {/* Mountain Back Peak (Simien Ridge) */}
            <path
              d="M15 75L40 38L55 60L70 38L85 75H15Z"
              fill="currentColor"
              fillOpacity="0.25"
            />
            
            {/* Front Crisp Mountain Peaks with Snow/Sun highlight */}
            <path
              d="M20 75L46 34L60 55L75 35L88 75H20Z"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Sun/Compass Star Rising above Peaks */}
            <g className="animate-pulse-subtle">
              {/* Vertical / Horizontal Spikes */}
              <path d="M50 12L53 25L66 28L53 31L50 44L47 31L34 28L47 25L50 12Z" fill="#FBBF24" />
              {/* Inner core */}
              <circle cx="50" cy="28" r="3" fill="#10B981" />
            </g>

            {/* Ethiopian Flag Micro-Bars Accent Base */}
            <rect x="28" y="78" width="14" height="2.5" rx="1.25" fill="#10B981" />
            <rect x="44" y="78" width="14" height="2.5" rx="1.25" fill="#FBBF24" />
            <rect x="60" y="78" width="14" height="2.5" rx="1.25" fill="#EF4444" />
          </svg>

        </div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span 
              className={`font-black tracking-tight font-serif ${currentSize.text} ${
                isLight ? 'text-white' : 'text-stone-900'
              }`}
            >
              Guzo<span className="text-emerald-600">Tribe</span>
            </span>

            {/* Ethiopic Script Tag */}
            <span className="text-[9px] sm:text-[10px] font-black px-1.5 py-0.2 rounded-full bg-gradient-to-r from-emerald-100 via-amber-100 to-red-100 text-stone-900 border border-amber-300 shadow-2xs font-ethiopic">
              ጉዞትራይብ
            </span>
          </div>

          <span 
            className={`font-medium tracking-wider uppercase ${currentSize.subtext} ${
              isLight ? 'text-stone-400' : 'text-stone-500'
            }`}
          >
            Ethiopian Community Travel
          </span>
        </div>
      )}
    </div>
  );
}
