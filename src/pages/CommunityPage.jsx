import React, { useState } from 'react';
import { 
  Users, 
  Star, 
  Heart, 
  Plus, 
  X,
  Send
} from 'lucide-react';
import { communityReviewsData } from '../data/communityData';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';

export default function CommunityPage({ lang }) {
  const { addToast } = useToast();
  const [reviews, setReviews] = useState(communityReviewsData);
  const [selectedDestination, setSelectedDestination] = useState('ALL');
  const [likedReviews, setLikedReviews] = useState([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New review form state
  const [formData, setFormData] = useState({
    name: 'Bethlehem Tadesse',
    tripTitle: 'Wenchi Crater Lake Hike & Boat',
    rating: 5,
    reviewText: '',
    vibe: 'Scenic & Peaceful'
  });

  const destinations = ['ALL', 'Wenchi', 'Simien', 'Bale', 'Suba'];

  const filteredReviews = reviews.filter((r) => {
    if (selectedDestination === 'ALL') return true;
    return r.destination.toLowerCase().includes(selectedDestination.toLowerCase());
  });

  const handleToggleLike = (revId) => {
    if (likedReviews.includes(revId)) {
      setLikedReviews((prev) => prev.filter((id) => id !== revId));
      setReviews((prev) =>
        prev.map((r) => (r.id === revId ? { ...r, likes: r.likes - 1 } : r))
      );
    } else {
      setLikedReviews((prev) => [...prev, revId]);
      setReviews((prev) =>
        prev.map((r) => (r.id === revId ? { ...r, likes: r.likes + 1 } : r))
      );
      addToast('Liked story! ❤️', 'success');
    }
  };

  const handlePostReview = (e) => {
    e.preventDefault();
    const newRev = {
      id: 'rev-' + Date.now(),
      author: formData.name,
      role: 'Verified Traveler 🎒',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
      tripTitle: formData.tripTitle,
      organizerName: 'Verified Tour Club',
      destination: 'Addis Ababa & Regional',
      date: 'Just Now',
      rating: formData.rating,
      likes: 1,
      images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80'],
      reviewText: formData.reviewText,
      vibe: formData.vibe
    };

    setReviews((prev) => [newRev, ...prev]);
    setIsSubmitModalOpen(false);
    setFormData({ name: '', tripTitle: '', rating: 5, reviewText: '', vibe: 'Scenic' });

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (_e) {}

    addToast('Your trip story and photos have been posted! 📸', 'success');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-8 pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4 text-emerald-700" />
            <span>Ethiopian Trail Community</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight font-serif">
            {lang === 'am' ? 'የተጓዦች አስተያየቶች እና የጉዞ ፎቶዎች' : 'Verified Traveler Stories & Trail Gallery'}
          </h1>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            {lang === 'am'
              ? 'በGuzoTribe በኩል የተደረጉ የእውነተኛ ተጓዦች ገጠመኞች፣ ፎቶዎች እና የአስጎብኚዎች ደረጃዎች።'
              : 'Read unfiltered stories, real trail photos, and ratings from hikers across Wenchi, Simien, Bale Mountains, and Danakil.'}
          </p>
        </div>

        {/* Filter Bar & Share Action */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Destination Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            {destinations.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDestination(d)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  selectedDestination === d
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {d === 'ALL' ? 'All Stories' : d}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Share Your Trail Story</span>
          </button>

        </div>

        {/* Reviews Feed Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Author Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-11 h-11 rounded-2xl object-cover border border-stone-200"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-stone-900">{rev.author}</h3>
                      <span className="text-[10px] text-emerald-700 font-bold block">{rev.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{rev.rating}.0</span>
                  </div>
                </div>

                {/* Trip Info Pill */}
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <strong className="block text-stone-800 text-[11px]">{rev.tripTitle}</strong>
                    <span className="text-[10px] text-stone-400">Host: {rev.organizerName}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    {rev.destination}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  "{rev.reviewText}"
                </p>

                {/* Photos Thumbnail Grid */}
                {rev.images && rev.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {rev.images.map((imgUrl, imgIdx) => (
                      <div key={imgIdx} className="aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 shadow-2xs">
                        <img src={imgUrl} alt="Trip photo" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Card Footer: Date, Vibe & Like */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                <span className="text-[11px]">{rev.date} • <strong className="text-stone-700">{rev.vibe}</strong></span>

                <button
                  onClick={() => handleToggleLike(rev.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    likedReviews.includes(rev.id)
                      ? 'bg-rose-50 border-rose-200 text-rose-600 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${likedReviews.includes(rev.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{rev.likes}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Share Story Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-slide-up relative">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-stone-900 font-serif">Share Your Trail Story</h3>
                <p className="text-xs text-stone-500">Inspire fellow Ethiopian hikers and diaspora travelers</p>
              </div>
              <button onClick={() => setIsSubmitModalOpen(false)} className="p-1 rounded-full bg-stone-100 text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Trip Name / Landmark</label>
                <input
                  type="text"
                  required
                  value={formData.tripTitle}
                  onChange={(e) => setFormData({ ...formData, tripTitle: e.target.value })}
                  placeholder="e.g. Wenchi Crater Lake weekend departure"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Star Rating</label>
                <div className="flex gap-2">
                  {[5, 4, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: num })}
                      className={`px-3 py-1.5 rounded-xl border font-bold flex items-center gap-1 cursor-pointer ${
                        formData.rating === num ? 'bg-amber-500 text-stone-950 border-amber-600' : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{num}.0 Stars</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Your Experience & Advice for Hikers</label>
                <textarea
                  rows={4}
                  required
                  value={formData.reviewText}
                  onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                  placeholder="Tell us about the bus ride, guide, scenery, food, or trail difficulty..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>Publish to Community Feed</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
