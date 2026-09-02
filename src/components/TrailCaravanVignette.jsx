import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Volume2, Sun, Moon, Compass, Heart } from 'lucide-react';
import gsap from 'gsap';

/**
 * TrailCaravanVignette
 * Custom interactive GSAP + SVG Ethiopian highland trail scene:
 * - 28-Seat Toyota Coaster with bobbing suspension, spinning wheels & luggage rack
 * - Stylized backpacking travelers with trekking sticks & walking cycles
 * - Adventurous Abyssinian Trail Cat ("Guzo Cat / ጉዞ ድመት") with swishing tail & hiking tips
 * - Interactive Day/Dusk lighting mode and click reactions
 */
export default function TrailCaravanVignette({ lang }) {
  const containerRef = useRef(null);
  const busRef = useRef(null);
  const wheelFrontRef = useRef(null);
  const wheelBackRef = useRef(null);
  const catTailRef = useRef(null);
  const catEarRef = useRef(null);
  const hiker1Ref = useRef(null);
  const hiker2Ref = useRef(null);
  const cloudsRef = useRef(null);
  const hornWaveRef = useRef(null);

  const [isDusk, setIsDusk] = useState(false);
  const [catMood, setCatMood] = useState('curious'); // 'curious' | 'purring' | 'advising'
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [showHonk, setShowHonk] = useState(false);
  const [pattedCount, setPattedCount] = useState(0);

  const trailTips = [
    {
      en: "Wenchi Crater boat rides get chilly in the afternoon—pack a light windbreaker! 🧥",
      am: "የወንጪ ሀይቅ ጀልባ ጉዞ ከሰዓት ይቀዘቅዛል፤ ቀለል ያለ ጃኬት ይያዙ! 🧥"
    },
    {
      en: "Bale Mountains Sanetti plateau sits at 4,122m! Drink at least 3 liters of water. 💧",
      am: "የባሌ ሳኔቲ አምባ 4,122 ሜትር ከፍታ አለው! በቀን 3 ሊትር ውሃ ይጠጡ። 💧"
    },
    {
      en: "Toyota Coaster departure from Meskel Square is sharp at 06:00 AM! Don't snooze. ⏰",
      am: "የኮስተር አውቶቡስ ከመስቀል አደባባይ 06:00 ጠዋት ይነሳል! እንዳያረፍዱ። ⏰"
    },
    {
      en: "Simien Gelada baboons are gentle herbivores—just keep dried snacks zipped! 🐒",
      am: "የሰሜን ጭላዳ ዝንጀሮዎች የዋሆች ናቸው፤ ምግቦን በቦርሳዎ ዚፕ አድርገው ይያዙ! 🐒"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Bus Suspension Bobbing
      gsap.to(busRef.current, {
        y: -3,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 2. Wheels Rotation
      gsap.to([wheelFrontRef.current, wheelBackRef.current], {
        rotation: 360,
        duration: 1.2,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%'
      });

      // 3. Hikers Walking Bob
      gsap.to(hiker1Ref.current, {
        y: -4,
        rotation: 1.5,
        duration: 0.45,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to(hiker2Ref.current, {
        y: -3.5,
        rotation: -1.5,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.2
      });

      // 4. Cat Tail Swish
      gsap.to(catTailRef.current, {
        rotation: 15,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'bottom left'
      });

      // 5. Drifting Clouds
      gsap.to(cloudsRef.current, {
        x: '-=120',
        duration: 25,
        repeat: -1,
        ease: 'none'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePetCat = () => {
    setCatMood('purring');
    setPattedCount((prev) => prev + 1);
    setCurrentTipIndex((prev) => (prev + 1) % trailTips.length);

    if (catEarRef.current) {
      gsap.fromTo(
        catEarRef.current,
        { scale: 1.2, rotation: 10 },
        { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(2)' }
      );
    }

    setTimeout(() => setCatMood('curious'), 4000);
  };

  const handleHonkBus = () => {
    setShowHonk(true);
    if (hornWaveRef.current) {
      gsap.fromTo(
        hornWaveRef.current,
        { opacity: 1, scale: 0.5 },
        { opacity: 0, scale: 2, duration: 0.8, ease: 'power2.out' }
      );
    }
    setTimeout(() => setShowHonk(false), 800);
  };

  return (
    <section 
      ref={containerRef}
      className={`relative py-12 px-4 sm:px-6 lg:px-8 border-y transition-colors duration-700 overflow-hidden select-none ${
        isDusk 
          ? 'bg-gradient-to-b from-stone-950 via-purple-950/40 to-stone-900 border-stone-800 text-stone-100' 
          : 'bg-gradient-to-b from-amber-50/50 via-emerald-50/30 to-stone-100/80 border-stone-200 text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
              <span>{lang === 'am' ? 'የተራራው ጉዞ ትዕይንት' : 'Live Trail Caravan & Hiking Crew'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight font-serif">
              {lang === 'am' ? 'የጉዞ ትዝታ፡ ተጓዦች፣ ኮስተር እና ድመት' : 'Highland Trail Life: Coaster, Hikers & Trail Cat'}
            </h2>
          </div>

          {/* Interactive controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleHonkBus}
              className="px-3 py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-bold text-amber-600 dark:text-amber-300 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{lang === 'am' ? 'ጥሩንባ አሰማ (Honk)' : 'Honk Coaster'}</span>
            </button>

            <button
              onClick={handlePetCat}
              className="px-3 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>{lang === 'am' ? 'ድመቷን ዳብሳት (Pet Cat)' : 'Pet Guzo Cat'} ({pattedCount})</span>
            </button>

            <button
              onClick={() => setIsDusk(!isDusk)}
              className="p-2 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all cursor-pointer"
              title="Toggle Golden Hour / Daylight"
            >
              {isDusk ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>
          </div>
        </div>

        {/* Trail Cat Speech Bubble Balloon */}
        <div className="mb-4 max-w-xl mx-auto">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-emerald-500/30 shadow-md text-xs">
            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-sm shrink-0 border border-amber-400">
              🐱
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[11px] text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Guzo Cat's Trail Advisory
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  {catMood === 'purring' ? 'Purring... 🐾' : 'Click cat for more tips'}
                </span>
              </div>
              <p className="font-medium text-stone-800 dark:text-stone-200 mt-0.5">
                {lang === 'am' ? trailTips[currentTipIndex].am : trailTips[currentTipIndex].en}
              </p>
            </div>
          </div>
        </div>

        {/* The Animated Highland Trail Canvas (SVG + GSAP) */}
        <div className="relative w-full h-[260px] sm:h-[300px] rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-gradient-to-b from-sky-200/40 via-amber-100/30 to-stone-200/50 dark:from-stone-900 dark:via-purple-950/20 dark:to-stone-950 shadow-inner">
          
          <svg
            viewBox="0 0 1000 300"
            className="w-full h-full object-cover"
            preserveAspectRatio="none"
          >
            {/* Background Mountain Ridges (Simien Peak Silhouettes) */}
            <path
              d="M0 160L80 120L190 145L280 90L400 135L520 80L660 140L780 95L900 130L1000 110V300H0Z"
              fill={isDusk ? "#1e1b4b" : "#cbd5e1"}
              fillOpacity={isDusk ? "0.7" : "0.5"}
            />
            <path
              d="M0 185L120 150L240 170L360 130L490 165L620 135L750 175L870 140L1000 165V300H0Z"
              fill={isDusk ? "#312e81" : "#94a3b8"}
              fillOpacity={isDusk ? "0.6" : "0.4"}
            />

            {/* Drifting Highland Clouds */}
            <g ref={cloudsRef} fill="#ffffff" fillOpacity={isDusk ? "0.15" : "0.55"}>
              <circle cx="200" cy="45" r="22" />
              <circle cx="230" cy="40" r="28" />
              <circle cx="260" cy="45" r="20" />
              <circle cx="650" cy="60" r="20" />
              <circle cx="680" cy="55" r="25" />
              <circle cx="710" cy="60" r="18" />
            </g>

            {/* Golden Sun / Dusk Moon */}
            <circle
              cx="860"
              cy="70"
              r="24"
              fill={isDusk ? "#fef08a" : "#f59e0b"}
              fillOpacity={isDusk ? "0.85" : "0.9"}
            />

            {/* Rolling Midground Hills with Acacia Trees */}
            <path
              d="M0 215Q260 195 500 210T1000 215V300H0Z"
              fill={isDusk ? "#064e3b" : "#a7f3d0"}
              fillOpacity={isDusk ? "0.8" : "0.5"}
            />

            {/* Acacia Tree Silhouettes */}
            <g fill={isDusk ? "#022c22" : "#047857"}>
              {/* Acacia 1 (Far left) */}
              <path d="M75 220C73 205 76 195 72 185C60 183 50 178 52 172C55 168 85 168 90 172C92 177 82 183 76 185L78 220Z" />
              {/* Acacia 2 (Mid right) */}
              <path d="M920 220C918 200 922 190 916 180C900 177 890 172 892 166C898 162 935 162 940 166C942 172 930 177 922 180L924 220Z" />
            </g>

            {/* Foreground Scenic Dirt & Cobblestone Trail */}
            <path
              d="M0 240Q350 230 700 240T1000 245V300H0Z"
              fill={isDusk ? "#1c1917" : "#e7e5e4"}
            />
            {/* Trail Path Surface */}
            <path
              d="M0 252Q400 245 750 254T1000 258V300H0Z"
              fill={isDusk ? "#292524" : "#d6d3d1"}
            />

            {/* ========================================================= */}
            {/* 1. THE TOYOTA COASTER BUS (X: 120, Y: 175)                 */}
            {/* ========================================================= */}
            <g
              ref={busRef}
              onClick={handleHonkBus}
              className="cursor-pointer transition-transform hover:scale-[1.01]"
              transform="translate(140, 165)"
            >
              {/* Bus Shadow */}
              <ellipse cx="90" cy="85" rx="85" ry="8" fill="#000000" fillOpacity="0.25" />

              {/* Bus Main White Shell */}
              <rect x="5" y="10" width="170" height="65" rx="10" fill="#ffffff" stroke="#78716c" strokeWidth="1.5" />
              
              {/* Front Aerodynamic Windshield Curve */}
              <path d="M145 10H170C176 10 180 15 178 26L172 55H145V10Z" fill="#38bdf8" fillOpacity="0.75" />
              
              {/* Passenger Windows (Side Aisle) */}
              <rect x="18" y="18" width="24" height="22" rx="4" fill="#38bdf8" fillOpacity="0.65" />
              <rect x="48" y="18" width="24" height="22" rx="4" fill="#38bdf8" fillOpacity="0.65" />
              <rect x="78" y="18" width="24" height="22" rx="4" fill="#38bdf8" fillOpacity="0.65" />
              <rect x="108" y="18" width="24" height="22" rx="4" fill="#38bdf8" fillOpacity="0.65" />

              {/* Ethiopian Flag Stripe Motif on Coaster Body */}
              <rect x="5" y="47" width="168" height="3" fill="#10b981" />
              <rect x="5" y="50" width="168" height="3" fill="#fbbf24" />
              <rect x="5" y="53" width="168" height="3" fill="#ef4444" />

              {/* Coaster Brand Text */}
              <text x="50" y="66" fill="#1c1917" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                GUZOTRIBE COASTER 28
              </text>

              {/* Roof Luggage Rack with Backpacks & Spare Tire */}
              <rect x="25" y="4" width="115" height="6" rx="2" fill="#44403c" />
              {/* Backpack 1 (Red) */}
              <rect x="35" y="-6" width="16" height="10" rx="3" fill="#ef4444" />
              {/* Backpack 2 (Emerald) */}
              <rect x="55" y="-7" width="18" height="11" rx="3" fill="#10b981" />
              {/* Duffel Bag (Amber) */}
              <rect x="77" y="-5" width="22" height="9" rx="3" fill="#f59e0b" />
              {/* Spare Wheel */}
              <circle cx="114" cy="-2" r="7" fill="#1c1917" stroke="#78716c" strokeWidth="1.5" />

              {/* Headlights & Tail Lights */}
              <circle cx="177" cy="58" r="3" fill="#fef08a" />
              <circle cx="6" cy="58" r="2.5" fill="#ef4444" />

              {/* Wheels */}
              {/* Rear Wheel */}
              <g ref={wheelBackRef} transform="translate(42, 75)">
                <circle cx="0" cy="0" r="14" fill="#1c1917" stroke="#a8a29e" strokeWidth="3" />
                <circle cx="0" cy="0" r="5" fill="#e7e5e4" />
                <line x1="-12" y1="0" x2="12" y2="0" stroke="#a8a29e" strokeWidth="1.5" />
                <line x1="0" y1="-12" x2="0" y2="12" stroke="#a8a29e" strokeWidth="1.5" />
              </g>

              {/* Front Wheel */}
              <g ref={wheelFrontRef} transform="translate(145, 75)">
                <circle cx="0" cy="0" r="14" fill="#1c1917" stroke="#a8a29e" strokeWidth="3" />
                <circle cx="0" cy="0" r="5" fill="#e7e5e4" />
                <line x1="-12" y1="0" x2="12" y2="0" stroke="#a8a29e" strokeWidth="1.5" />
                <line x1="0" y1="-12" x2="0" y2="12" stroke="#a8a29e" strokeWidth="1.5" />
              </g>

              {/* Honk visual wave */}
              <g ref={hornWaveRef} opacity={showHonk ? 1 : 0} transform="translate(180, 50)">
                <path d="M0 0C6 -8 14 -8 20 0C14 8 6 8 0 0" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                <path d="M6 -5C12 -12 20 -12 26 -5C20 2 12 2 6 -5" fill="none" stroke="#fbbf24" strokeWidth="2" />
              </g>
            </g>

            {/* ========================================================= */}
            {/* 2. THE BACKPACKING HIKERS (X: 420-560, Y: 180)            */}
            {/* ========================================================= */}
            {/* Hiker 1 (Lead Guide / Trail Leader with Hiking Stick) */}
            <g
              ref={hiker1Ref}
              transform="translate(430, 195)"
              className="cursor-pointer"
            >
              {/* Shadow */}
              <ellipse cx="10" cy="62" rx="14" ry="4" fill="#000000" fillOpacity="0.25" />
              {/* Trekking Pole */}
              <line x1="22" y1="18" x2="28" y2="62" stroke="#78716c" strokeWidth="2" strokeLinecap="round" />
              {/* Back Backpack */}
              <rect x="-4" y="14" width="10" height="20" rx="3" fill="#047857" />
              {/* Body */}
              <rect x="4" y="12" width="12" height="24" rx="4" fill="#d97706" />
              {/* Head with Hiking Cap */}
              <circle cx="10" cy="6" r="6" fill="#f5d0b5" />
              <path d="M3 4C3 4 10 -1 17 4H3Z" fill="#15803d" />
              {/* Legs in stride */}
              <line x1="7" y1="36" x2="4" y2="60" stroke="#1c1917" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="13" y1="36" x2="16" y2="60" stroke="#1c1917" strokeWidth="3.5" strokeLinecap="round" />
            </g>

            {/* Hiker 2 (Traveler Friend with Camera) */}
            <g
              ref={hiker2Ref}
              transform="translate(480, 198)"
              className="cursor-pointer"
            >
              {/* Shadow */}
              <ellipse cx="10" cy="60" rx="13" ry="4" fill="#000000" fillOpacity="0.25" />
              {/* Trekking Pole */}
              <line x1="22" y1="20" x2="26" y2="60" stroke="#78716c" strokeWidth="2" strokeLinecap="round" />
              {/* Backpack */}
              <rect x="-3" y="15" width="9" height="19" rx="3" fill="#dc2626" />
              {/* Body */}
              <rect x="4" y="14" width="11" height="22" rx="4" fill="#2563eb" />
              {/* Head with Ponytail/Cap */}
              <circle cx="9" cy="7" r="5.5" fill="#f5d0b5" />
              <circle cx="14" cy="7" r="3" fill="#451a03" />
              {/* Legs */}
              <line x1="6" y1="36" x2="3" y2="58" stroke="#1c1917" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="12" y1="36" x2="15" y2="58" stroke="#1c1917" strokeWidth="3.5" strokeLinecap="round" />
            </g>

            {/* ========================================================= */}
            {/* 3. THE ADVENTUROUS ABYSSINIAN TRAIL CAT (X: 550, Y: 220)  */}
            {/* ========================================================= */}
            <g
              onClick={handlePetCat}
              transform="translate(560, 218)"
              className="cursor-pointer group"
            >
              {/* Cat Shadow */}
              <ellipse cx="18" cy="40" rx="16" ry="4" fill="#000000" fillOpacity="0.3" />

              {/* Cat Body (Tawny Golden Abyssinian) */}
              <ellipse cx="18" cy="24" rx="14" ry="9" fill="#d97706" />

              {/* Tiny Emerald Hiking Bandana / Collar */}
              <path d="M26 18L32 23L27 25Z" fill="#10b981" />

              {/* Cat Head */}
              <circle cx="31" cy="16" r="7.5" fill="#b45309" />

              {/* Ears */}
              <g ref={catEarRef}>
                <polygon points="27,10 30,3 33,10" fill="#92400e" />
                <polygon points="33,10 36,4 38,11" fill="#92400e" />
                {/* Inner ear pink */}
                <polygon points="29,9 30,5 32,9" fill="#fbcfe8" />
              </g>

              {/* Expressive Green Eyes */}
              <circle cx="33" cy="15" r="1.5" fill="#10b981" />
              <circle cx="33.5" cy="14.8" r="0.6" fill="#000000" />

              {/* Cat Muzzle and Whiskers */}
              <circle cx="36" cy="18" r="1.5" fill="#fef3c7" />
              <line x1="37" y1="18" x2="43" y2="17" stroke="#fef3c7" strokeWidth="0.75" />
              <line x1="37" y1="19" x2="42" y2="20" stroke="#fef3c7" strokeWidth="0.75" />

              {/* Cat Legs */}
              <line x1="12" y1="30" x2="10" y2="39" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="16" y1="31" x2="15" y2="39" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="24" y1="30" x2="23" y2="39" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="28" y1="31" x2="27" y2="39" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />

              {/* Animated Swishing Tail */}
              <path
                ref={catTailRef}
                d="M5 21C-2 18 -6 10 -2 5"
                fill="none"
                stroke="#92400e"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Tiny Paws */}
              <circle cx="10" cy="39" r="2" fill="#d97706" />
              <circle cx="15" cy="39" r="2" fill="#d97706" />
              <circle cx="23" cy="39" r="2" fill="#d97706" />
              <circle cx="27" cy="39" r="2" fill="#d97706" />

              {/* Floating Heart if Patted */}
              {catMood === 'purring' && (
                <g className="animate-bounce" transform="translate(20, -10)">
                  <path d="M4 1C3 0 1 0 0.5 1C-0.5 2.5 1.5 5 4 7C6.5 5 8.5 2.5 7.5 1C7 0 5 0 4 1Z" fill="#ef4444" />
                </g>
              )}
            </g>

            {/* Trail Marker Signpost (Wenchi Lake 12 KM / Simien 3,200M) */}
            <g transform="translate(680, 205)">
              <rect x="7" y="10" width="4" height="40" fill="#78716c" />
              {/* Wooden Arrow Signs */}
              <path d="M0 12H35L42 19L35 26H0V12Z" fill="#b45309" stroke="#78350f" strokeWidth="1" />
              <text x="4" y="22" fill="#ffffff" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">
                WENCHI LAKE →
              </text>

              <path d="M35 28H0L-7 35L0 42H35V28Z" fill="#047857" stroke="#065f46" strokeWidth="1" />
              <text x="-1" y="38" fill="#ffffff" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">
                ← ADDIS ABABA
              </text>
            </g>

          </svg>

        </div>

        {/* Caption and Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>28-Seat Coaster Caravan</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Guzo Cat Mascot (Abyssinian)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Community Hikers</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-medium text-stone-400">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Click any character to interact</span>
          </div>
        </div>

      </div>
    </section>
  );
}
