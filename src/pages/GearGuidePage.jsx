import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Copy, 
  Check, 
  Compass, 
  Sun, 
  Snowflake, 
  TreePine, 
  Church, 
  Sparkles, 
  Send, 
  Plus, 
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function GearGuidePage({ lang }) {
  const { addToast } = useToast();
  const [selectedClimate, setSelectedClimate] = useState('alpine');
  const [copied, setCopied] = useState(false);

  const climatePresets = {
    alpine: {
      id: 'alpine',
      title: lang === 'am' ? 'የደጋ እና የበረዶ ተራራ ጉዞ (>3,000m)' : 'Alpine High-Altitude Trek (>3,000m)',
      subtitle: 'Simien Mountains, Bale Sanetti Plateau, Mt. Abuna Yosef',
      icon: Snowflake,
      accentColor: 'text-sky-600',
      badgeBg: 'bg-sky-50 text-sky-900 border-sky-200',
      items: [
        { id: 'alp-1', name: 'Thermal base layers (Top & Bottom)', category: 'Clothing', essential: true },
        { id: 'alp-2', name: 'Windproof & waterproof alpine outer jacket (Gore-Tex)', category: 'Clothing', essential: true },
        { id: 'alp-3', name: 'High-ankle sturdy hiking boots (broken in)', category: 'Footwear', essential: true },
        { id: 'alp-4', name: 'Sub-zero sleeping bag (-5°C rating) & sleeping pad', category: 'Camping', essential: true },
        { id: 'alp-5', name: 'Acetazolamide (Diamox) & Altitude relief meds', category: 'Medical', essential: true },
        { id: 'alp-6', name: 'Wool beanie / balaclava and thermal gloves', category: 'Clothing', essential: true },
        { id: 'alp-7', name: 'Telescopic hiking poles (pair)', category: 'Gear', essential: false },
        { id: 'alp-8', name: 'High-capacity power bank (battery drains fast in cold)', category: 'Electronics', essential: true },
        { id: 'alp-9', name: 'Headlamp with extra batteries (for dawn summit pushes)', category: 'Electronics', essential: true },
        { id: 'alp-10', name: '2L Water bladder / insulated thermos flask', category: 'Hydration', essential: true }
      ]
    },
    lowland: {
      id: 'lowland',
      title: lang === 'am' ? 'የቆላ እና የበረሃ ጉዞ (Danakil)' : 'Desert & Extreme Heat (-125m)',
      subtitle: 'Danakil Depression, Dallol, Erta Ale Lava Lake',
      icon: Sun,
      accentColor: 'text-amber-600',
      badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
      items: [
        { id: 'low-1', name: 'Electrolyte rehydration salts (ORS packets)', category: 'Medical', essential: true },
        { id: 'low-2', name: 'Lightweight loose breathable cotton clothing', category: 'Clothing', essential: true },
        { id: 'low-3', name: 'Wide-brim safari sun hat & UV400 polarized sunglasses', category: 'Sun Protection', essential: true },
        { id: 'low-4', name: 'Gas / dust mask (for sulfur fumes at Dallol)', category: 'Safety', essential: true },
        { id: 'low-5', name: 'High SPF 50+ mineral sunscreen & lip balm', category: 'Sun Protection', essential: true },
        { id: 'low-6', name: 'Sturdy closed shoes (lava rock shreds soft soles)', category: 'Footwear', essential: true },
        { id: 'low-7', name: 'Bandana / Shemagh scarf (desert sandstorms)', category: 'Clothing', essential: true },
        { id: 'low-8', name: '3L+ Personal hydration capacity per day', category: 'Hydration', essential: true },
        { id: 'low-9', name: 'Power bank & camera lens dust protection sleeve', category: 'Electronics', essential: false }
      ]
    },
    weekend: {
      id: 'weekend',
      title: lang === 'am' ? 'የሳምንቱ መጨረሻ ፏፏቴ እና ደን ጉዞ' : 'Weekend Eco-Hike & Waterfall Trail',
      subtitle: 'Wenchi Crater Lake, Menagesha Suba, Debre Libanos',
      icon: TreePine,
      accentColor: 'text-emerald-700',
      badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      items: [
        { id: 'wkd-1', name: 'Comfortable trail running shoes or light hikers', category: 'Footwear', essential: true },
        { id: 'wkd-2', name: 'Rain poncho / compact umbrella (rainy season)', category: 'Weather', essential: true },
        { id: 'wkd-3', name: 'Original National ID or Kebele card (for checkpoints)', category: 'Documents', essential: true },
        { id: 'wkd-4', name: '1.5L Reusable water bottle', category: 'Hydration', essential: true },
        { id: 'wkd-5', name: 'High-energy trail snacks (kolo, dry fruits, energy bars)', category: 'Food', essential: true },
        { id: 'wkd-6', name: 'Small daypack (20L - 25L)', category: 'Gear', essential: true },
        { id: 'wkd-7', name: 'Dry bag / Ziploc for phone (boat ride spray)', category: 'Gear', essential: false },
        { id: 'wkd-8', name: 'Hand sanitizer & wet wipes', category: 'Hygiene', essential: true }
      ]
    },
    festival: {
      id: 'festival',
      title: lang === 'am' ? 'የበዓላት እና የባህል ጉዞ (ጥምቀት / ገና)' : 'Cultural Pilgrimage & Festival',
      subtitle: 'Lalibela Genna, Gondar Timket, Meskel in Addis Ababa',
      icon: Church,
      accentColor: 'text-purple-700',
      badgeBg: 'bg-purple-50 text-purple-900 border-purple-200',
      items: [
        { id: 'fes-1', name: 'Traditional white Ethiopian cotton Netela / Gabi', category: 'Clothing', essential: true },
        { id: 'fes-2', name: 'Slip-on comfortable shoes (churches require shoe removal)', category: 'Footwear', essential: true },
        { id: 'fes-3', name: 'Extra socks (for stone floors inside ancient churches)', category: 'Clothing', essential: true },
        { id: 'fes-4', name: 'Original Passport / National ID', category: 'Documents', essential: true },
        { id: 'fes-5', name: 'Crossbody anti-theft pouch for cash (Telebirr backup)', category: 'Security', essential: true },
        { id: 'fes-6', name: 'Modest respectful dress covering shoulders and knees', category: 'Clothing', essential: true }
      ]
    }
  };

  const currentPreset = climatePresets[selectedClimate];
  const [checkedItems, setCheckedItems] = useState(['alp-1', 'alp-2', 'alp-3', 'wkd-1', 'wkd-3']);

  const handleToggleItem = (itemId) => {
    setCheckedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const completedCount = currentPreset.items.filter((item) => checkedItems.includes(item.id)).length;
  const progressPercent = Math.round((completedCount / currentPreset.items.length) * 100);

  // Copy for Telegram Group
  const handleCopyForTelegram = () => {
    const text = `🎒 *GuzoTribe Gear Packing List: ${currentPreset.title}*\n_${currentPreset.subtitle}_\n\n` +
      currentPreset.items.map((it) => {
        const isDone = checkedItems.includes(it.id);
        return `${isDone ? '✅' : '⬜'} ${it.name} ${it.essential ? '*(Essential)*' : ''}`;
      }).join('\n') +
      `\n\n📌 *Prepared by GuzoTribe (ጉዞትራይብ) Ethiopia Travel Desk*\n👉 Check departures at guzo-tribe.et`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    addToast('Packing checklist copied in Telegram format! 📲', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-8 pb-24 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>Smart Trekking Preparation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            {lang === 'am' ? 'የጉዞ እቃዎች እና አልባሳት ማረጋገጫ' : 'Ethiopian Travel Gear & Packing Checklist'}
          </h1>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            {lang === 'am'
              ? 'ለስሜን እና ባሌ ውርጭ፣ ለዳናኪል ሙቀት ወይም ለሳምንቱ መጨረሻ ጉዞ የሚፈልጓቸውን እቃዎች ይፈትሹ፤ ለቴሌግራም ግሩፕዎ በአንድ ጠቅታ ይላኩ።'
              : 'Generate custom packing lists for sub-zero Simien peaks, boiling Danakil desert, or weekend forest waterfalls. Share directly with your Telegram travel club.'}
          </p>
        </div>

        {/* 4 Terrain Climate Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {Object.values(climatePresets).map((preset) => {
            const Icon = preset.icon;
            const isSelected = selectedClimate === preset.id;

            return (
              <button
                key={preset.id}
                onClick={() => setSelectedClimate(preset.id)}
                className={`p-4 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-900 text-white border-emerald-800 shadow-md ring-2 ring-emerald-600/40 scale-[1.02]'
                    : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    isSelected ? 'bg-emerald-800 text-amber-300' : 'bg-stone-100 text-stone-700'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200">
                      Active
                    </span>
                  )}
                </div>
                <div>
                  <h3 className={`font-bold text-xs sm:text-sm mb-1 ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                    {preset.title}
                  </h3>
                  <p className={`text-[11px] truncate ${isSelected ? 'text-emerald-100' : 'text-stone-500'}`}>
                    {preset.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Checklist Card */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
          
          {/* Top Progress & Quick Share Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border ${currentPreset.badgeBg}`}>
                {currentPreset.subtitle}
              </span>
              <h2 className="text-xl font-extrabold text-stone-900 mt-2 font-serif">
                {currentPreset.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyForTelegram}
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Send className="w-4 h-4" />}
                <span>{copied ? 'Copied for Telegram!' : 'Copy for Telegram Group'}</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span>Packing Progress</span>
              <span className="text-emerald-800 font-mono">{completedCount} of {currentPreset.items.length} Items Packed ({progressPercent}%)</span>
            </div>
            <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 transition-all duration-300 rounded-full"
              />
            </div>
          </div>

          {/* Interactive Checklist Items */}
          <div className="grid md:grid-cols-2 gap-3">
            {currentPreset.items.map((item) => {
              const isDone = checkedItems.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => handleToggleItem(item.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isDone
                      ? 'bg-emerald-50/50 border-emerald-300 text-emerald-950'
                      : 'bg-stone-50/50 hover:bg-stone-100/70 border-stone-200 text-stone-800'
                  }`}
                >
                  <div className="shrink-0">
                    {isDone ? (
                      <CheckSquare className="w-5 h-5 text-emerald-700 fill-emerald-100" />
                    ) : (
                      <Square className="w-5 h-5 text-stone-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-semibold block ${isDone ? 'line-through text-stone-500' : 'text-stone-900'}`}>
                      {item.name}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      Category: {item.category} {item.essential && '• Essential'}
                    </span>
                  </div>

                  {item.essential && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                      Must Have
                    </span>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
