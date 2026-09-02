import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CloudRain, 
  Wind, 
  Sun, 
  Mountain, 
  Compass, 
  ShieldAlert, 
  CheckSquare, 
  Square, 
  ArrowRight,
  Clock, 
  Droplets,
  Sparkles,
  MapPin,
  Flame,
  Snowflake
} from 'lucide-react';
import { MOUNTAIN_DESTINATIONS_WEATHER } from '../data/weatherRadarData';

export default function MountainWeatherRadarPage({ lang, currency: _currency }) {
  const [selectedDestId, setSelectedDestId] = useState('wenchi-crater');
  const [packedItems, setPackedItems] = useState({});

  const activeDest = MOUNTAIN_DESTINATIONS_WEATHER.find((d) => d.id === selectedDestId) || MOUNTAIN_DESTINATIONS_WEATHER[0];

  const togglePacked = (gearItem) => {
    setPackedItems((prev) => ({
      ...prev,
      [gearItem]: !prev[gearItem]
    }));
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <Compass className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
              <span>{lang === 'am' ? 'የኢትዮጵያ ተራሮች የአየር ራዳር' : 'Ethiopian Mountain Trail Weather & Altitude Radar'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight font-serif">
              {lang === 'am' ? 'የተራራ የአየር ሁኔታ እና ከፍታ መመርመሪያ' : 'Live Trail Weather & Altitude Advisory'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mt-1 leading-relaxed">
              {lang === 'am'
                ? 'ከአዲስ አበባ ከመነሳትዎ በፊት የወንጪ፣ የሰሜን፣ የባሌ እና የዳናኪል የአየር ሁኔታ፣ የቀንና የሌሊት ሙቀት፣ እና የሚጠበቅ ዝናብን ይከታተሉ።'
                : 'Real-time microclimate conditions, elevation gauges, freeze alerts, and packing checklists for Ethiopia’s iconic hiking destinations.'}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0 shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Live Satellite & Ranger Network</span>
          </div>
        </div>

        {/* Mountain Destination Navigation Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MOUNTAIN_DESTINATIONS_WEATHER.map((dest) => {
            const isSelected = dest.id === selectedDestId;
            return (
              <button
                key={dest.id}
                onClick={() => setSelectedDestId(dest.id)}
                className={`px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-md scale-102'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <Mountain className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-stone-400'}`} />
                <span>{dest.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isSelected ? 'bg-emerald-950 text-emerald-200' : 'bg-stone-100 text-stone-500'
                }`}>
                  {dest.elevationMeters > 0 ? `${dest.elevationMeters}m` : `${dest.elevationMeters}m`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Top Hero Card for Active Mountain */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 text-white border border-stone-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Destination Info & Altitude */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
                  {activeDest.region}
                </span>
                <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{activeDest.distanceFromAddis}</span>
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                  {lang === 'am' ? activeDest.amharicName : activeDest.name}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 font-medium">
                  {activeDest.trailDifficulty}
                </p>
              </div>

              {/* Elevation Meter Scale Visualizer */}
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-300 flex items-center gap-1.5">
                    <Mountain className="w-4 h-4 text-emerald-400" />
                    <span>Trail Elevation Above Sea Level</span>
                  </span>
                  <span className="font-mono font-black text-amber-400 text-sm">
                    {activeDest.elevationMeters.toLocaleString()} m ({activeDest.elevationFeet.toLocaleString()} ft)
                  </span>
                </div>

                <div className="w-full h-3 bg-stone-900 rounded-full overflow-hidden p-0.5 border border-stone-800">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 rounded-full transition-all duration-700 shadow-sm"
                    style={{ 
                      width: `${Math.max(5, Math.min(100, ((activeDest.elevationMeters + 200) / 4800) * 100))}%` 
                    }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>Danakil (-125m)</span>
                  <span>Addis Ababa (2,355m)</span>
                  <span>Ras Dashen Peak (4,550m)</span>
                </div>
              </div>

              {/* Altitude Risk Advisory Note */}
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-950/40 border border-amber-800/40 text-xs text-amber-200">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-300 font-bold">
                    Altitude Advisory: {activeDest.altitudeRisk}
                  </strong>
                  <span className="text-[11px] text-stone-300">
                    Trail soil: {activeDest.soilCondition}
                  </span>
                </div>
              </div>

            </div>

            {/* Right: Big Live Temperature Gauge & Microclimate Stats */}
            <div className="lg:col-span-5 bg-stone-950/80 border border-stone-800 p-6 rounded-3xl space-y-6 text-center lg:text-left">
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 block font-medium">
                    Current Temperature
                  </span>
                  <div className="text-5xl font-black font-mono text-white tracking-tight flex items-baseline gap-1 mt-1">
                    <span>{activeDest.currentTempC}°C</span>
                    <span className="text-sm text-stone-400 font-sans font-normal">
                      ({Math.round((activeDest.currentTempC * 9/5) + 32)}°F)
                    </span>
                  </div>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-stone-900 border border-stone-700 flex items-center justify-center text-3xl shadow-inner">
                  {activeDest.elevationMeters > 4000 ? (
                    <Snowflake className="w-8 h-8 text-sky-400 animate-pulse" />
                  ) : activeDest.elevationMeters < 0 ? (
                    <Flame className="w-8 h-8 text-rose-500 animate-pulse" />
                  ) : (
                    <Sun className="w-8 h-8 text-amber-400" />
                  )}
                </div>
              </div>

              {/* Day High / Night Low */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-800/80 text-xs">
                <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 text-center">
                  <span className="text-stone-400 block text-[11px]">Daytime Peak</span>
                  <strong className="text-base font-mono text-amber-400 font-black">
                    +{activeDest.dayHighC}°C
                  </strong>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 text-center">
                  <span className="text-stone-400 block text-[11px]">Night Freeze</span>
                  <strong className={`text-base font-mono font-black ${
                    activeDest.nightLowC < 0 ? 'text-sky-400' : 'text-stone-200'
                  }`}>
                    {activeDest.nightLowC > 0 ? `+${activeDest.nightLowC}` : activeDest.nightLowC}°C
                  </strong>
                </div>
              </div>

              {/* Climate Metric Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-stone-900/50">
                  <Droplets className="w-3.5 h-3.5 text-sky-400 mx-auto mb-1" />
                  <span className="text-[10px] text-stone-400 block">Rain Risk</span>
                  <strong className="text-white font-mono">{activeDest.precipitationChance}</strong>
                </div>
                <div className="p-2 rounded-xl bg-stone-900/50">
                  <Wind className="w-3.5 h-3.5 text-teal-400 mx-auto mb-1" />
                  <span className="text-[10px] text-stone-400 block">Wind</span>
                  <strong className="text-white font-mono">{activeDest.windSpeedKmh} km/h</strong>
                </div>
                <div className="p-2 rounded-xl bg-stone-900/50">
                  <Sun className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
                  <span className="text-[10px] text-stone-400 block">UV Index</span>
                  <strong className="text-white font-mono">{activeDest.uvIndex} (Extreme)</strong>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 5-Slot Hourly Trail Forecast */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'am' ? 'የቀኑ ሰዓታት የአየር ሁኔታ ትንበያ' : 'Daylight Hourly Trail Forecast'}</span>
            </h3>
            <span className="text-xs text-stone-500 font-mono">
              Addis Ababa Time (EAT)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {activeDest.hourlyForecast.map((hour, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs text-center space-y-1 hover:border-emerald-500/50 transition-all"
              >
                <span className="text-xs font-mono font-bold text-stone-500 block">
                  {hour.time}
                </span>
                <div className="text-2xl font-black font-mono text-stone-900">
                  {hour.tempC}°C
                </div>
                <span className="text-xs font-semibold text-emerald-800 block">
                  {hour.condition}
                </span>
                <span className="text-[11px] text-stone-400 flex items-center justify-center gap-1">
                  <CloudRain className="w-3 h-3 text-sky-500" />
                  <span>{hour.rain} rain</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Two Columns: Trail Advisories & Mandatory Gear Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Trail Highlights & Ranger Advisories (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>{lang === 'am' ? 'የአካባቢው አስጎብኚ ምክሮች' : 'Park Ranger & Guide Advisories'}</span>
            </h3>

            <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-xs">
              <div className="space-y-3">
                {activeDest.advisories.map((adv, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-3 text-xs leading-relaxed text-stone-700">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      {aIdx + 1}
                    </span>
                    <span>{adv}</span>
                  </div>
                ))}
              </div>

              {/* Scenic Highlights */}
              <div className="pt-4 border-t border-stone-200 space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  Trail Highlights:
                </span>
                <ul className="space-y-1 text-xs text-stone-600">
                  {activeDest.highlights.map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Interactive Mandatory Gear Checklist (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-700" />
                <span>{lang === 'am' ? 'አስፈላጊ የጉዞ እቃዎች ማመሳከሪያ' : 'Mandatory Gear Checklist'}</span>
              </h3>
              <span className="text-xs text-emerald-800 font-bold">
                {Object.values(packedItems).filter(Boolean).length} / {activeDest.recommendedGear.length} packed
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-3 shadow-xs">
              <p className="text-xs text-stone-500">
                Check off items as you pack your daypack before boarding your Toyota Coaster:
              </p>

              <div className="space-y-2 pt-1">
                {activeDest.recommendedGear.map((gear, gIdx) => {
                  const isPacked = packedItems[gear];
                  return (
                    <button
                      key={gIdx}
                      type="button"
                      onClick={() => togglePacked(gear)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer ${
                        isPacked
                          ? 'bg-emerald-50/80 border-emerald-400 text-stone-800 shadow-2xs'
                          : 'bg-stone-50/50 border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      {isPacked ? (
                        <CheckSquare className="w-5 h-5 text-emerald-700 shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-stone-400 shrink-0" />
                      )}
                      <span className={`text-xs font-semibold ${isPacked ? 'line-through text-stone-400' : ''}`}>
                        {gear}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3">
                <Link
                  to="/trips"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Group Trip to {activeDest.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
