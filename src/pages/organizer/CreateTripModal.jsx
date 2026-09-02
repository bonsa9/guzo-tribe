import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function CreateTripModal({ isOpen, onClose, onTripCreated, lang: _lang }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    amharicTitle: '',
    category: 'Weekend Hikes',
    location: '',
    region: '',
    elevationMeters: 2500,
    difficulty: 'Moderate',
    difficultyAmharic: 'መካከለኛ',
    priceETB: 2500,
    priceUSD: 25,
    durationText: '1 Day',
    durationDays: 1,
    totalSpots: 25,
    pickupLocation: 'Meskel Square (In front of Tourist Hotel), Addis Ababa',
    pickupTime: '06:00 AM',
    nextDeparture: 'This Saturday, 6:00 AM',
    description: '',
    inclusions: ['Coaster Bus Transport', 'Local Scout & Certified Guide', 'Group Lunch & Snack', 'First Aid Kit'],
    exclusions: ['Personal drinks', 'Horseback rental'],
    vibeTags: ['Photography 📸', 'Coffee Ceremony ☕', 'Nature Walk 🌿'],
    itinerary: [
      { time: '06:00 AM', title: 'Departure from Addis Ababa', desc: 'Board bus and drive to trail base.' },
      { time: '10:00 AM', title: 'Hike Begins', desc: 'Guided trek through scenic viewpoints.' },
      { time: '01:00 PM', title: 'Traditional Lunch & Coffee', desc: 'Local meal and coffee ceremony.' },
      { time: '05:00 PM', title: 'Return to Addis', desc: 'Drop off at Meskel Square.' }
    ]
  });

  if (!isOpen) return null;

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete creation
      const newTrip = {
        ...formData,
        id: `trip-${Date.now()}`,
        organizerId: 'addis-hikers',
        organizerName: 'Addis Hikers Club',
        verified: true,
        rating: 5.0,
        reviewsCount: 1,
        spotsLeft: formData.totalSpots,
        groupDiscount: { minSeats: 3, discountPercent: 10 },
        groupComposition: { soloHikers: 50, friendGroups: 40, couples: 10, avgAge: '20-35' },
        safetyScore: '100% Verified & Escorted',
        images: [
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80'
        ]
      };
      onTripCreated(newTrip);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
              {step}/4
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">
                {step === 1 && 'Step 1: Trip Identity & Destination'}
                {step === 2 && 'Step 2: Pricing & Spots'}
                {step === 3 && 'Step 3: Schedule & Meeting Point'}
                {step === 4 && 'Step 4: Itinerary & Inclusions'}
              </h3>
              <p className="text-[11px] text-stone-400">Publish to GuzoTribe Marketplace</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Form */}
        <form onSubmit={handleNext} className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* STEP 1: Identity & Category */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Trip Title (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mount Entoto Sunrise Ridge Hike"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">የጉዞው ስም (Amharic Title)</label>
                <input
                  type="text"
                  placeholder="ምሳሌ፡ የእንጦጦ ተራራ የጧት የእግር ጉዞ"
                  value={formData.amharicTitle}
                  onChange={(e) => setFormData({ ...formData, amharicTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  >
                    <option value="Weekend Hikes">Weekend Hikes</option>
                    <option value="Mountain Treks">Mountain Treks</option>
                    <option value="Cultural & Festivals">Cultural & Festivals</option>
                    <option value="Lake & Relaxation">Lake & Relaxation</option>
                    <option value="Expeditions">Expeditions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Difficulty *</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      difficulty: e.target.value,
                      difficultyAmharic: e.target.value === 'Easy' ? 'ቀላል' : e.target.value === 'Moderate' ? 'መካከለኛ' : 'ከባድ'
                    })}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  >
                    <option value="Easy">Easy (ቀላል)</option>
                    <option value="Moderate">Moderate (መካከለኛ)</option>
                    <option value="Challenging">Challenging (ከባድ)</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Destination Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Entoto / Debre Zeit / Wonchi"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Elevation (Meters)</label>
                  <input
                    type="number"
                    placeholder="e.g. 3000"
                    value={formData.elevationMeters}
                    onChange={(e) => setFormData({ ...formData, elevationMeters: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Pricing & Total Spots */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Price per Traveler (ETB) *</label>
                  <input
                    type="number"
                    required
                    min="500"
                    value={formData.priceETB}
                    onChange={(e) => setFormData({ ...formData, priceETB: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Price for Diaspora/Tourists (USD $)</label>
                  <input
                    type="number"
                    required
                    min="5"
                    value={formData.priceUSD}
                    onChange={(e) => setFormData({ ...formData, priceUSD: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-bold text-stone-800 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Total Available Seats (Bus Capacity) *</label>
                <input
                  type="number"
                  required
                  min="5"
                  max="60"
                  value={formData.totalSpots}
                  onChange={(e) => setFormData({ ...formData, totalSpots: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                <span className="font-bold block mb-1">💰 Estimated Gross Revenue:</span>
                <span className="text-base font-extrabold text-emerald-900">
                  {(formData.priceETB * formData.totalSpots).toLocaleString()} ETB
                </span>
                <span className="text-[11px] text-stone-500 block">
                  Platform fee: 8% upon passenger departure confirmation.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Logistics & Pickup */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Departure Date & Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. This Saturday, 6:00 AM"
                  value={formData.nextDeparture}
                  onChange={(e) => setFormData({ ...formData, nextDeparture: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Addis Ababa Meeting & Pickup Location *</label>
                <select
                  value={formData.pickupLocation}
                  onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                >
                  <option value="Meskel Square (In front of Tourist Hotel), Addis Ababa">Meskel Square (Tourist Hotel)</option>
                  <option value="Stadium Gate 2, Addis Ababa">Stadium Gate 2</option>
                  <option value="Piazza / 4 Kilo (Saint Mary Church), Addis Ababa">Piazza / 4 Kilo</option>
                  <option value="Mexico Square / Tor Hailoch, Addis Ababa">Mexico Square / Tor Hailoch</option>
                  <option value="Bole Medhanialem Mall, Addis Ababa">Bole Medhanialem Mall</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Trip Overview Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the experience, trail scenery, and highlights..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Itinerary & Inclusions */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">Itinerary Timeline Milestones</label>
                <div className="space-y-2">
                  {formData.itinerary.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs flex items-center justify-between gap-2">
                      <div>
                        <strong className="text-emerald-800">{item.time}: </strong>
                        <span className="font-semibold text-stone-900">{item.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                <span className="font-bold block mb-1">🌟 Included by Default:</span>
                <p className="text-[11px] text-stone-700">Coaster Bus, Certified Guide & Scout, First Aid Kit, Group Lunch & Ethiopian Buna ceremony.</p>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              {step === 4 ? 'Publish Trip to Marketplace' : 'Next Step'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
