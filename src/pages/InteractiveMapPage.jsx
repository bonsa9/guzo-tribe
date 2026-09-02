import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Car, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  Layers,
  Search,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { destinationsData } from '../data/destinationsData';

export default function InteractiveMapPage({ lang }) {
  const navigate = useNavigate();
  const [selectedDestId, setSelectedDestId] = useState('wenchi');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const regions = ['ALL', 'Oromia', 'Amhara', 'Afar', 'Tigray', 'Harari'];

  const filteredDestinations = destinationsData.filter((d) => {
    if (selectedRegion !== 'ALL' && d.region !== selectedRegion) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        d.name.toLowerCase().includes(term) ||
        d.amharicName.includes(term) ||
        d.region.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const selectedDest = destinationsData.find((d) => d.id === selectedDestId) || destinationsData[0];

  const handleExploreTrips = (destName) => {
    navigate('/trips');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-8 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>{lang === 'am' ? 'የኢትዮጵያ የጉዞ ካርታ እና ከፍታ መመርመሪያ' : 'Ethiopian Landmark & Elevation Explorer'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight font-serif">
            {lang === 'am' ? 'የኢትዮጵያ ታላላቅ የጉዞ መዳረሻዎች' : 'Interactive Ethiopia Adventure Map'}
          </h1>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            {lang === 'am'
              ? 'ከአዲስ አበባ የሚወስዱ የጉዞ ሰዓታት፣ የተራራ ከፍታዎች (ከባህር ጠለል በላይ) እና የክልል የመንገድ ደህንነት ሁኔታዎችን ይመልከቱ።'
              : 'Explore driving times from Addis Ababa, elevation profiles (from Ras Dashen 4,550m to Danakil -125m), vehicle recommendations, and live road safety clearances.'}
          </p>
        </div>

        {/* Region Filter Bar & Search */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Region Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  selectedRegion === reg
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {reg === 'ALL' ? (lang === 'am' ? 'ሁሉም ክልሎች' : 'All Regions') : reg}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'am' ? 'መዳረሻዎችን ፈልግ...' : 'Search landmark...'}
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
            />
          </div>

        </div>

        {/* Main 2-Column Grid: Landmark List ↔ Deep Dive Map Profile Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Destination Cards List */}
          <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1">
            {filteredDestinations.map((dest) => {
              const isSelected = selectedDestId === dest.id;
              const isClear = dest.roadStatus === 'CLEAR';

              return (
                <div
                  key={dest.id}
                  onClick={() => setSelectedDestId(dest.id)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-center gap-4 ${
                    isSelected
                      ? 'bg-emerald-900 text-white border-emerald-800 shadow-lg scale-[1.01] ring-2 ring-emerald-600/40'
                      : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 shrink-0 shadow-inner">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        isSelected ? 'text-amber-300' : 'text-stone-400'
                      }`}>
                        {dest.region} Region
                      </span>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                        isClear
                          ? isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-emerald-100 text-emerald-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {dest.roadStatus === 'CLEAR' ? '🟢 Clear Route' : '🟡 Convoy'}
                      </span>
                    </div>

                    <h3 className={`font-bold text-sm truncate ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                      {dest.name}
                    </h3>
                    <p className={`text-[11px] truncate ${isSelected ? 'text-emerald-100' : 'text-stone-500'}`}>
                      {dest.amharicName}
                    </p>

                    <div className="flex items-center gap-3 mt-1 text-[11px] font-mono">
                      <span className={isSelected ? 'text-emerald-200' : 'text-emerald-700 font-bold'}>
                        🏔️ {dest.elevationMeters > 0 ? `+${dest.elevationMeters}m` : `${dest.elevationMeters}m`}
                      </span>
                      <span className={isSelected ? 'text-stone-300' : 'text-stone-400'}>
                        ⏱️ {dest.drivingHours}h from Addis
                      </span>
                    </div>
                  </div>

                  <ChevronRight className={`w-5 h-5 shrink-0 ${isSelected ? 'text-amber-300' : 'text-stone-300'}`} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep Dive Landmark Elevation & Travel Blueprint */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden space-y-6 p-6 sm:p-8">
              
              {/* Landmark Big Visual Banner */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-stone-900 shadow-md">
                <img
                  src={selectedDest.image}
                  alt={selectedDest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white space-y-1">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    {selectedDest.region} Region • {selectedDest.elevationZone}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-serif">{selectedDest.name}</h2>
                  <p className="text-sm font-ethiopic text-stone-200">{selectedDest.amharicName}</p>
                </div>
              </div>

              {/* 4 Core Travel Metric Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center space-y-1">
                  <span className="text-[10px] text-stone-500 font-bold uppercase block">Elevation</span>
                  <strong className="text-base sm:text-lg font-black font-mono text-emerald-800">
                    {selectedDest.elevationMeters > 0 ? `+${selectedDest.elevationMeters}m` : `${selectedDest.elevationMeters}m`}
                  </strong>
                  <span className="text-[10px] text-stone-400 block">{selectedDest.elevationZone.split(' ')[0]}</span>
                </div>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center space-y-1">
                  <span className="text-[10px] text-stone-500 font-bold uppercase block">Driving Time</span>
                  <strong className="text-base sm:text-lg font-black font-mono text-stone-900">
                    ~{selectedDest.drivingHours} Hours
                  </strong>
                  <span className="text-[10px] text-stone-400 block">{selectedDest.distanceKm} km distance</span>
                </div>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center space-y-1">
                  <span className="text-[10px] text-stone-500 font-bold uppercase block">Corridor Safety</span>
                  <strong className="text-xs sm:text-sm font-black text-emerald-700 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{selectedDest.roadStatus}</span>
                  </strong>
                  <span className="text-[10px] text-stone-400 block">Live Monitored</span>
                </div>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center space-y-1">
                  <span className="text-[10px] text-stone-500 font-bold uppercase block">Active Groups</span>
                  <strong className="text-base sm:text-lg font-black font-mono text-amber-700">
                    {selectedDest.activeTripsCount} Tours
                  </strong>
                  <span className="text-[10px] text-stone-400 block">Departing Soon</span>
                </div>
              </div>

              {/* Description & Travel Route */}
              <div className="space-y-3 text-xs leading-relaxed text-stone-600">
                <p className="text-sm text-stone-800 leading-normal">{selectedDest.description}</p>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2 text-stone-800">
                  <div className="flex items-center gap-2 font-bold text-xs text-emerald-950">
                    <Car className="w-4 h-4 text-emerald-700" />
                    <span>Transportation & Route Blueprint</span>
                  </div>
                  <p className="text-xs">
                    📍 <strong>Route from Addis Ababa:</strong> {selectedDest.routeDescription}
                  </p>
                  <p className="text-xs">
                    🚐 <strong>Recommended Vehicle:</strong> {selectedDest.recommendedVehicle}
                  </p>
                  <p className="text-xs">
                    ☀️ <strong>Best Season to Travel:</strong> {selectedDest.bestSeason}
                  </p>
                </div>
              </div>

              {/* Trail Highlights Chips */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  Signature Trail Highlights
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedDest.highlights.map((h, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 text-xs font-semibold"
                    >
                      ✨ {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button: Explore Group Trips */}
              <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-stone-500">
                  <span>Available slots in verified departures</span>
                </div>

                <button
                  onClick={() => handleExploreTrips(selectedDest.name)}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>View Group Trips to {selectedDest.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
