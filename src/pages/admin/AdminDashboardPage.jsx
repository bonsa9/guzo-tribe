import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import confetti from 'canvas-confetti';
import {
  initialAdminMetrics,
  initialPendingOrganizers,
  initialPendingTrips,
  initialEscrowPayouts,
  initialRoadCorridors,
  initialDisputes,
  initialLiveFeed
} from '../../data/adminData';

import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import AdminOverviewTab from './components/AdminOverviewTab';
import AdminKYCTab from './components/AdminKYCTab';
import AdminTripsModerationTab from './components/AdminTripsModerationTab';
import AdminPayoutsTab from './components/AdminPayoutsTab';
import AdminCorridorsTab from './components/AdminCorridorsTab';
import AdminDisputesTab from './components/AdminDisputesTab';

export default function AdminDashboardPage({ lang, currency: _currency }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // State
  const [metrics, setMetrics] = useState(initialAdminMetrics);
  const [organizers, setOrganizers] = useState(initialPendingOrganizers);
  const [tripsQueue, setTripsQueue] = useState(initialPendingTrips);
  const [payouts, setPayouts] = useState(initialEscrowPayouts);
  const [corridors, setCorridors] = useState(initialRoadCorridors);
  const [disputes, setDisputes] = useState(initialDisputes);
  const [liveFeed] = useState(initialLiveFeed);

  // 1. Handle Approve Organizer KYC
  const handleApproveOrganizer = (orgId) => {
    const org = organizers.find((o) => o.id === orgId);
    if (!org) return;

    setOrganizers((prev) =>
      prev.map((o) => (o.id === orgId ? { ...o, status: 'approved' } : o))
    );

    setMetrics((prev) => ({
      ...prev,
      totalVerifiedOrganizers: prev.totalVerifiedOrganizers + 1,
      pendingKYCCount: Math.max(0, prev.pendingKYCCount - 1)
    }));

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (_e) {}

    addToast(
      lang === 'am'
        ? `"${org.businessName}" እንደ የተረጋገጠ አጋር ጸድቋል! 🛡️`
        : `Approved "${org.businessName}" as Verified Tour Partner! 🛡️`,
      'success'
    );
  };

  // 2. Handle Reject Organizer KYC
  const handleRejectOrganizer = (orgId) => {
    const org = organizers.find((o) => o.id === orgId);
    setOrganizers((prev) =>
      prev.map((o) => (o.id === orgId ? { ...o, status: 'rejected' } : o))
    );
    setMetrics((prev) => ({
      ...prev,
      pendingKYCCount: Math.max(0, prev.pendingKYCCount - 1)
    }));
    addToast(
      lang === 'am'
        ? `የ${org?.businessName} ማመልከቻ ተቀባይነት አላገኘም`
        : `Declined application for "${org?.businessName}"`,
      'info'
    );
  };

  // 3. Handle Approve Trip Moderation
  const handleApproveTrip = (tripId) => {
    const trip = tripsQueue.find((t) => t.id === tripId);
    if (!trip) return;

    setTripsQueue((prev) =>
      prev.map((t) => (t.id === tripId ? { ...t, status: 'approved' } : t))
    );

    setMetrics((prev) => ({
      ...prev,
      pendingTripsCount: Math.max(0, prev.pendingTripsCount - 1)
    }));

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (_e) {}

    addToast(
      lang === 'am'
        ? `"${trip.title}" ጸድቆ ወደ ዋናው የጉዞ ዝርዝር ተለጥፏል! 🏔️`
        : `"${trip.title}" approved & published to Live Catalog! 🏔️`,
      'success'
    );
  };

  const handleRequestTripEdits = (tripId) => {
    setTripsQueue((prev) =>
      prev.map((t) => (t.id === tripId ? { ...t, status: 'changes_requested' } : t))
    );
    addToast('Requested safety revisions from organizer', 'info');
  };

  // 4. Handle Release Escrow Payout
  const handleReleasePayout = (payoutId) => {
    const p = payouts.find((item) => item.id === payoutId);
    if (!p) return;

    setPayouts((prev) =>
      prev.map((item) => (item.id === payoutId ? { ...item, status: 'released' } : item))
    );

    setMetrics((prev) => ({
      ...prev,
      escrowInCustody_ETB: Math.max(0, prev.escrowInCustody_ETB - p.netPayoutETB),
      escrowInCustody_USD: Math.max(0, prev.escrowInCustody_USD - Math.round(p.netPayoutETB / 120))
    }));

    try {
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    } catch (_e) {}

    addToast(
      lang === 'am'
        ? `${p.netPayoutETB.toLocaleString()} ብር ለ${p.organizerName} በ${p.bankOrWallet} ተለቋል!`
        : `Released ${p.netPayoutETB.toLocaleString()} ETB to ${p.organizerName} via ${p.bankOrWallet}! 💰`,
      'success'
    );
  };

  // 5. Handle Update Road Corridor Status
  const handleToggleCorridorStatus = (corridorId) => {
    setCorridors((prev) =>
      prev.map((c) => {
        if (c.id !== corridorId) return c;
        const nextStatus =
          c.status === 'CLEAR'
            ? 'CAUTION'
            : c.status === 'CAUTION'
            ? 'RESTRICTED'
            : 'CLEAR';
        addToast(
          `Updated route status for "${c.route.split('➔')[1]?.trim() || c.route}" to ${nextStatus}`,
          nextStatus === 'CLEAR' ? 'success' : nextStatus === 'CAUTION' ? 'info' : 'error'
        );
        return {
          ...c,
          status: nextStatus,
          lastVerified: 'Just Now by Admin'
        };
      })
    );
  };

  // 6. Handle Resolve Dispute / Refund
  const handleResolveDisputeRefund = (dispId) => {
    const d = disputes.find((item) => item.id === dispId);
    if (!d) return;

    setDisputes((prev) =>
      prev.map((item) => (item.id === dispId ? { ...item, status: 'refunded' } : item))
    );

    setMetrics((prev) => ({
      ...prev,
      activeDisputesCount: Math.max(0, prev.activeDisputesCount - 1)
    }));

    addToast(
      lang === 'am'
        ? `${d.amountETB.toLocaleString()} ብር 100% ተመላሽ ለ${d.travelerName} ተላልፏል!`
        : `100% Full Refund of ${d.amountETB.toLocaleString()} ETB executed to ${d.travelerName}!`,
      'success'
    );
  };

  const handleDismissDispute = (dispId) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === dispId ? { ...d, status: 'dismissed' } : d))
    );
    addToast('Claim reviewed & dismissed', 'info');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-emerald-600 selection:text-white flex flex-col">
      
      {/* Top Operations Header */}
      <AdminHeader
        lang={lang}
        metrics={metrics}
        onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
      />

      {/* Main 2-Column Sidebar + Content Shell */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Left-Hand Sidebar */}
        <AdminSidebar
          lang={lang}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          metrics={metrics}
          corridors={corridors}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Right-Hand Dynamic Tab Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl">
          
          {activeTab === 'overview' && (
            <AdminOverviewTab
              metrics={metrics}
              liveFeed={liveFeed}
              payouts={payouts}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'kyc' && (
            <AdminKYCTab
              organizers={organizers}
              onApprove={handleApproveOrganizer}
              onReject={handleRejectOrganizer}
            />
          )}

          {activeTab === 'trips' && (
            <AdminTripsModerationTab
              tripsQueue={tripsQueue}
              onApproveTrip={handleApproveTrip}
              onRequestEdits={handleRequestTripEdits}
            />
          )}

          {activeTab === 'payouts' && (
            <AdminPayoutsTab
              payouts={payouts}
              onReleasePayout={handleReleasePayout}
            />
          )}

          {activeTab === 'corridors' && (
            <AdminCorridorsTab
              corridors={corridors}
              onToggleCorridorStatus={handleToggleCorridorStatus}
            />
          )}

          {activeTab === 'disputes' && (
            <AdminDisputesTab
              disputes={disputes}
              onResolveRefund={handleResolveDisputeRefund}
              onDismissDispute={handleDismissDispute}
            />
          )}

        </main>

      </div>

    </div>
  );
}
