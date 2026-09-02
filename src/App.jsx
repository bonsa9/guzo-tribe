import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TripsPage from './pages/TripsPage';
import AboutPage from './pages/AboutPage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';
import OrganizerDashboard from './pages/organizer/OrganizerDashboard';
import EscrowSimulatorPage from './pages/EscrowSimulatorPage';
import TelegramBotPlayground from './pages/TelegramBotPlayground';
import DatabaseExplorerPage from './pages/DatabaseExplorerPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ProfilePage from './pages/auth/ProfilePage';
import InteractiveMapPage from './pages/InteractiveMapPage';
import GearGuidePage from './pages/GearGuidePage';
import CommunityPage from './pages/CommunityPage';
import TripDetailPage from './pages/TripDetailPage';
import ComparisonDrawer from './components/ComparisonDrawer';
import TripDetailModal from './components/TripDetailModal';
import BookingModal from './components/BookingModal';
import BecomePartnerModal from './components/BecomePartnerModal';
import TelegramPreviewToggle from './components/TelegramPreviewToggle';
import { tripsData as initialTripsData } from './data/tripsData';
import { TelegramWebApp } from './bot/tmaSdk';

import { ToastProvider, useToast } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainContent() {
  // Global State
  const [currency, setCurrency] = useState('ETB'); // 'ETB' | 'USD'
  const [lang, setLang] = useState('en'); // 'en' | 'am'
  const [isTelegramMode, setIsTelegramMode] = useState(false);
  const [allTrips, setAllTrips] = useState(initialTripsData);
  const { addToast } = useToast();

  useEffect(() => {
    TelegramWebApp.ready();
  }, []);

  // Wishlist persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('guzotribe_wishlist');
      return saved ? JSON.parse(saved) : ['wenchi-crater-lake'];
    } catch {
      return ['wenchi-crater-lake'];
    }
  });

  const handleToggleWishlist = (tripId) => {
    TelegramWebApp.haptic('impact');
    const isCurrentlySaved = wishlist.includes(tripId);
    const targetTrip = allTrips.find((t) => t.id === tripId);
    const tripName = targetTrip ? (lang === 'am' ? targetTrip.amharicTitle : targetTrip.title) : 'Trip';

    if (isCurrentlySaved) {
      addToast(
        lang === 'am' ? `"${tripName}" ከተወዳጆች ተሰርዟል` : `Removed "${tripName}" from Wishlist`,
        'info'
      );
    } else {
      addToast(
        lang === 'am' ? `"${tripName}" ወደ ተወዳጆች ታክሏል! ❤️` : `Saved "${tripName}" to Wishlist! ❤️`,
        'wishlist'
      );
    }

    setWishlist((prev) => {
      const next = prev.includes(tripId)
        ? prev.filter((id) => id !== tripId)
        : [...prev, tripId];
      try {
        localStorage.setItem('guzotribe_wishlist', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleTripCreated = (newTrip) => {
    TelegramWebApp.haptic('success');
    setAllTrips((prev) => [newTrip, ...prev]);
    addToast(
      lang === 'am'
        ? `"${newTrip.title}" በተሳካ ሁኔታ ተፈጥሯል!`
        : `"${newTrip.title}" trip created & published! ✨`,
      'success'
    );
  };

  // Modals & Drawers State
  const [selectedTripForDetail, setSelectedTripForDetail] = useState(null);
  const [selectedTripForBooking, setSelectedTripForBooking] = useState(null);
  const [comparedTrips, setComparedTrips] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  // Compare handlers
  const handleToggleCompare = (trip) => {
    TelegramWebApp.haptic('impact');
    const exists = comparedTrips.some((t) => t.id === trip.id);
    const tripName = lang === 'am' ? trip.amharicTitle : trip.title;

    if (exists) {
      setComparedTrips((prev) => prev.filter((t) => t.id !== trip.id));
      addToast(
        lang === 'am' ? `"${tripName}" ከንጽጽር ተሰርዟል` : `Removed "${tripName}" from comparison`,
        'info'
      );
    } else {
      if (comparedTrips.length >= 3) {
        addToast(
          lang === 'am'
            ? 'በአንድ ጊዜ እስከ 3 ጉዞዎችን ብቻ ማነጻጸር ይችላሉ'
            : 'You can compare up to 3 trips simultaneously',
          'error'
        );
        return;
      }
      setComparedTrips((prev) => [...prev, trip]);
      addToast(
        lang === 'am'
          ? `"${tripName}" ወደ ንጽጽር ታክሏል (${comparedTrips.length + 1}/3)`
          : `Added "${tripName}" to comparison (${comparedTrips.length + 1}/3)`,
        'compare'
      );
    }
  };

  const handleRemoveFromCompare = (tripId) => {
    TelegramWebApp.haptic('impact');
    setComparedTrips((prev) => prev.filter((t) => t.id !== tripId));
  };

  const handleClearCompare = () => {
    TelegramWebApp.haptic('impact');
    setComparedTrips([]);
    setIsCompareModalOpen(false);
    addToast(lang === 'am' ? 'የንጽጽር ዝርዝር ጸድቷል' : 'Comparison list cleared', 'info');
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#faf9f6] text-stone-800 ${isTelegramMode ? 'max-w-md mx-auto shadow-2xl border-x border-stone-200 min-h-screen relative' : ''}`}>
      <ScrollToTop />
      
      {/* Top Main Navigation */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        lang={lang}
        setLang={setLang}
        onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
        isTelegramMode={isTelegramMode}
        setIsTelegramMode={setIsTelegramMode}
        compareCount={comparedTrips.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        wishlistCount={wishlist ? wishlist.length : 0}
      />

      {/* Floating Telegram Simulator Toggle */}
      <TelegramPreviewToggle
        isTelegramMode={isTelegramMode}
        setIsTelegramMode={setIsTelegramMode}
        lang={lang}
      />

      {/* Page Routes */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                trips={allTrips}
                currency={currency}
                lang={lang}
                comparedTrips={comparedTrips}
                onToggleCompare={handleToggleCompare}
                onViewDetails={(trip) => setSelectedTripForDetail(trip)}
                onBookNow={(trip) => setSelectedTripForBooking(trip)}
                onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
              />
            }
          />
          <Route
            path="/trips"
            element={
              <TripsPage
                trips={allTrips}
                currency={currency}
                lang={lang}
                comparedTrips={comparedTrips}
                onToggleCompare={handleToggleCompare}
                onViewDetails={(trip) => setSelectedTripForDetail(trip)}
                onBookNow={(trip) => setSelectedTripForBooking(trip)}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
              />
            }
          />
          <Route
            path="/trips/:id"
            element={
              <TripDetailPage
                trips={allTrips}
                currency={currency}
                lang={lang}
                onBookNow={(trip) => setSelectedTripForBooking(trip)}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                comparedTrips={comparedTrips}
                onToggleCompare={handleToggleCompare}
              />
            }
          />
          <Route
            path="/map"
            element={<InteractiveMapPage lang={lang} />}
          />
          <Route
            path="/gear-guide"
            element={<GearGuidePage lang={lang} />}
          />
          <Route
            path="/community"
            element={<CommunityPage lang={lang} />}
          />
          <Route
            path="/login"
            element={<LoginPage lang={lang} />}
          />
          <Route
            path="/signup"
            element={<SignupPage lang={lang} />}
          />
          <Route
            path="/profile"
            element={
              <ProfilePage
                lang={lang}
                currency={currency}
                wishlist={wishlist}
                trips={allTrips}
                onViewTrip={(trip) => setSelectedTripForDetail(trip)}
                onBookTrip={(trip) => setSelectedTripForBooking(trip)}
              />
            }
          />
          <Route
            path="/organizer/dashboard"
            element={
              <OrganizerDashboard
                trips={allTrips}
                onTripCreated={handleTripCreated}
                lang={lang}
              />
            }
          />
          <Route
            path="/escrow-simulator"
            element={<EscrowSimulatorPage lang={lang} />}
          />
          <Route
            path="/telegram-bot-demo"
            element={
              <TelegramBotPlayground
                lang={lang}
                setIsTelegramMode={setIsTelegramMode}
              />
            }
          />
          <Route
            path="/database-admin"
            element={<DatabaseExplorerPage lang={lang} />}
          />
          <Route
            path="/admin"
            element={<AdminDashboardPage lang={lang} currency={currency} />}
          />
          <Route
            path="/about"
            element={<AboutPage lang={lang} />}
          />
          <Route
            path="/partners"
            element={
              <PartnersPage
                lang={lang}
                onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
              />
            }
          />
          <Route
            path="/contact"
            element={<ContactPage lang={lang} />}
          />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer
        lang={lang}
        onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
      />

      {/* Comparison Drawer / Floating Bar */}
      <ComparisonDrawer
        comparedTrips={comparedTrips}
        onRemoveTrip={handleRemoveFromCompare}
        onClearAll={handleClearCompare}
        currency={currency}
        lang={lang}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onBookTrip={(trip) => {
          setIsCompareModalOpen(false);
          setSelectedTripForBooking(trip);
        }}
      />

      {/* Trip Detail Modal */}
      {selectedTripForDetail && (
        <TripDetailModal
          trip={selectedTripForDetail}
          currency={currency}
          lang={lang}
          isOpen={!!selectedTripForDetail}
          onClose={() => setSelectedTripForDetail(null)}
          onBookNow={(trip) => {
            setSelectedTripForDetail(null);
            setSelectedTripForBooking(trip);
          }}
          isCompared={comparedTrips.some((t) => t.id === selectedTripForDetail.id)}
          onToggleCompare={() => handleToggleCompare(selectedTripForDetail)}
          isWishlisted={wishlist ? wishlist.includes(selectedTripForDetail.id) : false}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Booking Modal */}
      {selectedTripForBooking && (
        <BookingModal
          trip={selectedTripForBooking}
          currency={currency}
          lang={lang}
          isOpen={!!selectedTripForBooking}
          onClose={() => setSelectedTripForBooking(null)}
        />
      )}

      {/* Become a Partner Modal */}
      <BecomePartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        lang={lang}
      />

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <MainContent />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
