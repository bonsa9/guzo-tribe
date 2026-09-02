import React from 'react';
import { MapPin, Clock, Check, Info } from 'lucide-react';
import { ADDIS_PICKUP_STATIONS } from '../../data/coasterBusData';

export default function PickupStationSelector({
  selectedStationId,
  onSelectStation,
  lang
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-stone-700">
          {lang === 'am' ? 'የአዲስ አበባ መነሻ ጣቢያ ምረጡ *' : 'Choose Addis Ababa Morning Pickup Station *'}
        </label>
        <span className="text-[11px] text-stone-400 flex items-center gap-1">
          <Clock className="w-3 h-3 text-amber-600" />
          <span>{lang === 'am' ? 'ሰዓት አክብረው ይገኙ' : 'Arrive 10 min early'}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {ADDIS_PICKUP_STATIONS.map((station) => {
          const isSelected = selectedStationId === station.id;

          return (
            <div
              key={station.id}
              onClick={() => onSelectStation(station.id)}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between text-left ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20'
                  : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/70'
              }`}
            >
              {/* Top Row: Station Name & Time Badge */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-stone-900 block leading-tight">
                      {lang === 'am' ? station.amharicName : station.name}
                    </strong>
                    <span className="text-[10px] text-stone-500 font-mono">
                      {lang === 'am' ? station.name : station.amharicName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-100/80 text-amber-900 font-mono font-bold text-[11px] px-2 py-0.5 rounded-full border border-amber-300/70 shrink-0">
                  <Clock className="w-3 h-3 text-amber-700" />
                  <span>{station.time}</span>
                </div>
              </div>

              {/* Landmark info */}
              <p className="text-[11px] text-stone-600 font-medium pl-8 leading-snug">
                {lang === 'am' ? station.amharicLandmark : station.landmark}
              </p>

              {/* Bottom selection indicator */}
              <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                <span className="truncate max-w-[180px]">{station.note}</span>
                {isSelected ? (
                  <span className="flex items-center gap-1 font-bold text-emerald-800 text-[11px]">
                    <Check className="w-3.5 h-3.5" />
                    <span>{lang === 'am' ? 'ተመርጧል' : 'Selected'}</span>
                  </span>
                ) : (
                  <span className="text-stone-400 text-[10px] font-semibold">
                    {lang === 'am' ? 'ለመምረጥ ንኩ' : 'Click to select'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center gap-2 text-[11px] text-stone-500">
        <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <span>
          {lang === 'am'
            ? 'የጉዞው አስተባባሪ አውቶቡሱ መነሻው ሲቃረብ በቴሌግራም/ስልክ ይደውልልዎታል።'
            : 'The tour bus coordinator contacts your Telegram/phone 30 minutes before boarding.'}
        </span>
      </div>
    </div>
  );
}
