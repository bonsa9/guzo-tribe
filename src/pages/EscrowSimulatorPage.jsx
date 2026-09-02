import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  Building, 
  CreditCard, 
  Lock, 
  Sparkles
} from 'lucide-react';
import { initiateTelebirrPush, initializeChapaPayment } from '../services/paymentService';
import { createEscrowEntry, EscrowStatus } from '../services/escrowService';
import confetti from 'canvas-confetti';
import { useToast } from '../context/ToastContext';

import TelebirrUssdSimulator from '../components/escrow/TelebirrUssdSimulator';
import EscrowLedgerTable from '../components/escrow/EscrowLedgerTable';
import WebhookTerminal from '../components/escrow/WebhookTerminal';

export default function EscrowSimulatorPage({ lang: _lang }) {
  const { addToast } = useToast();
  // State for Simulator
  const [selectedGateway, setSelectedGateway] = useState('telebirr'); // telebirr, chapa, cbe
  const [amount, setAmount] = useState(2200);
  const [travelerPhone, setTravelerPhone] = useState('+251 911 482910');
  const travelerName = 'Bethlehem Tadesse';
  const selectedTrip = 'Wenchi Crater Lake Hike & Boat';
  const organizerName = 'Addis Hikers Club';

  // Simulator Stage
  const [isProcessing, setIsProcessing] = useState(false);
  const [phonePrompt, setPhonePrompt] = useState(null);
  const [userPin, setUserPin] = useState('');
  const [webhookLogs, setWebhookLogs] = useState([
    { time: '02:20:01', event: 'SYSTEM_READY', data: { status: 'Escrow Engine listening on /api/webhooks' } }
  ]);

  // Escrow Vault Items
  const [escrowVault, setEscrowVault] = useState([
    createEscrowEntry({
      bookingRef: 'GZ-8842-ETH',
      travelerName: 'Yonas Mengistu',
      travelerPhone: '+251 922 710344',
      tripId: 'wenchi-crater-lake',
      tripTitle: 'Wenchi Crater Lake Hike & Boat',
      organizerName: 'Addis Hikers Club',
      organizerAccount: '0911482910 (Telebirr)',
      amountETB: 4400
    }),
    createEscrowEntry({
      bookingRef: 'GZ-8843-ETH',
      travelerName: 'Marcus Washington',
      travelerPhone: '+1 202 555 0194',
      tripId: 'simien-mountains-expedition',
      tripTitle: 'Simien Mountains 4-Day Trek',
      organizerName: 'Simien Highland Trekkers',
      organizerAccount: '1000293847291 (CBE)',
      amountETB: 24500
    })
  ]);

  const addLog = (event, data) => {
    setWebhookLogs((prev) => [
      { time: new Date().toLocaleTimeString(), event, data },
      ...prev.slice(0, 15)
    ]);
  };

  // 1. Simulate Payment Initiation
  const handleInitiatePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const txRef = `TX-ETH-${Math.floor(Date.now() / 1000)}`;

    if (selectedGateway === 'telebirr') {
      const res = await initiateTelebirrPush({
        phone: travelerPhone,
        amount,
        txRef,
        tripTitle: selectedTrip
      });
      setIsProcessing(false);
      setPhonePrompt(res);
      addLog('TELEBIRR_USSD_PUSHED', { txRef, phone: travelerPhone, amount });
    } else if (selectedGateway === 'chapa') {
      const res = await initializeChapaPayment({
        email: 'traveler@example.com',
        amount,
        txRef,
        currency: 'ETB'
      });
      setIsProcessing(false);
      addLog('CHAPA_CHECKOUT_INITIALIZED', res);
      completeEscrowLock(txRef, 'Chapa Visa/Mastercard (Diaspora)');
    } else {
      // CBE Birr Simulation
      setTimeout(() => {
        setIsProcessing(false);
        addLog('CBE_BIRR_PAYMENT_CONFIRMED', { txRef, amount, billerCode: 'GUZO8829' });
        completeEscrowLock(txRef, 'CBE Birr App / USSD');
      }, 1000);
    }
  };

  // 2. Confirm USSD PIN & Lock Escrow
  const handleConfirmPin = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const txRef = phonePrompt.txRef;
      setPhonePrompt(null);
      setUserPin('');
      addLog('TELEBIRR_PIN_VERIFIED', { txRef, status: 'SUCCESS' });
      completeEscrowLock(txRef, 'Telebirr Merchant Push');
    }, 1200);
  };

  const completeEscrowLock = (txRef, gatewayName) => {
    const bookingRef = `GZ-${Math.floor(1000 + Math.random() * 9000)}-ETH`;
    const newEntry = createEscrowEntry({
      bookingRef,
      travelerName,
      travelerPhone,
      tripId: 'wenchi-crater-lake',
      tripTitle: selectedTrip,
      organizerName,
      organizerAccount: `${travelerPhone} (${gatewayName})`,
      amountETB: amount
    });

    setEscrowVault((prev) => [newEntry, ...prev]);
    addLog('ESCROW_FUNDS_LOCKED', {
      bookingRef,
      escrowId: newEntry.id,
      totalAmountETB: amount,
      platformFeeETB: amount * 0.08,
      organizerNetPayoutETB: amount * 0.92,
      custodyState: 'HELD_IN_ESCROW'
    });

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (_e) {}

    addToast(`Payment of ${amount.toLocaleString()} ETB locked in 8% Escrow Vault! 🛡️`, 'success');
  };

  // 3. Release Escrow to Host
  const handleReleaseEscrow = (escrowId) => {
    setEscrowVault((prev) =>
      prev.map((item) =>
        item.id === escrowId ? { ...item, status: EscrowStatus.RELEASED_TO_ORGANIZER } : item
      )
    );
    const target = escrowVault.find((i) => i.id === escrowId);
    addLog('ESCROW_PAYOUT_RELEASED', {
      escrowId,
      bookingRef: target?.bookingRef,
      netPayoutETB: (target?.amountETB || 0) * 0.92,
      platformFeeRetainedETB: (target?.amountETB || 0) * 0.08,
      releasedTo: target?.organizerAccount
    });
    addToast(`Released payout to ${target?.organizerName}! 💰`, 'success');
  };

  // 4. Issue 100% Refund
  const handleRefundEscrow = (escrowId) => {
    setEscrowVault((prev) =>
      prev.map((item) =>
        item.id === escrowId ? { ...item, status: EscrowStatus.REFUNDED_TO_TRAVELER } : item
      )
    );
    const target = escrowVault.find((i) => i.id === escrowId);
    addLog('ESCROW_FULL_REFUND_EXECUTED', {
      escrowId,
      bookingRef: target?.bookingRef,
      refundedAmountETB: target?.amountETB,
      refundDestination: target?.travelerPhone
    });
    addToast(`100% Full Refund issued to ${target?.travelerName}!`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-8 pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span>Escrow & Payment Sandbox</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            Telebirr USSD & 8% Escrow State Machine
          </h1>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Test how traveler bookings are collected via Telebirr USSD Push, CBE Birr, or Chapa, held in an automated 8% platform escrow vault, and released upon safe trip arrival.
          </p>
        </div>

        {/* Top Grid: Payment Trigger Form & USSD Phone Frame */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Checkout Trigger Simulator */}
          <div className="lg:col-span-6 bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-base text-stone-900">1. Simulate Traveler Checkout</h3>
              <span className="text-xs font-mono text-stone-400">Step 1 of 3</span>
            </div>

            <form onSubmit={handleInitiatePayment} className="space-y-4 text-xs">
              
              {/* Payment Gateway Picker */}
              <div>
                <label className="block font-bold text-stone-700 mb-1.5">Select Payment Gateway</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedGateway('telebirr')}
                    className={`p-3 rounded-2xl border text-center font-bold transition-all cursor-pointer ${
                      selectedGateway === 'telebirr'
                        ? 'bg-amber-50 border-amber-400 text-amber-900 ring-2 ring-amber-400/30'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                    <span>Telebirr Push</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedGateway('cbe')}
                    className={`p-3 rounded-2xl border text-center font-bold transition-all cursor-pointer ${
                      selectedGateway === 'cbe'
                        ? 'bg-purple-50 border-purple-400 text-purple-900 ring-2 ring-purple-400/30'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    <Building className="w-4 h-4 mx-auto mb-1 text-purple-600" />
                    <span>CBE Birr</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedGateway('chapa')}
                    className={`p-3 rounded-2xl border text-center font-bold transition-all cursor-pointer ${
                      selectedGateway === 'chapa'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-400/30'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                    <span>Chapa (Cards)</span>
                  </button>
                </div>
              </div>

              {/* Amount & Phone Input */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Booking Amount (ETB)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-mono font-bold text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Traveler Phone Number</label>
                  <input
                    type="tel"
                    value={travelerPhone}
                    onChange={(e) => setTravelerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-mono text-stone-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isProcessing ? 'Triggering Gateway API...' : 'Trigger Payment Push'}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Interactive Phone Simulation / Webhook Live Stream */}
          <div className="lg:col-span-6 space-y-4">
            {phonePrompt ? (
              <TelebirrUssdSimulator
                phonePrompt={phonePrompt}
                userPin={userPin}
                setUserPin={setUserPin}
                isProcessing={isProcessing}
                onSubmitPin={handleConfirmPin}
                onCancel={() => setPhonePrompt(null)}
              />
            ) : (
              <div className="bg-emerald-900/10 border border-emerald-700/30 p-6 rounded-3xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>8% Escrow Custody Protection Rule</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Upon traveler payment confirmation, the funds are not sent directly to the organizer. They are held in a secure trust state until the group trip departs. GuzoTribe automatically retains an 8% commission fee.
                </p>
              </div>
            )}

            {/* Live Webhook Terminal */}
            <WebhookTerminal webhookLogs={webhookLogs} />
          </div>

        </div>

        {/* Bottom Section: Active Escrow Ledger Table */}
        <EscrowLedgerTable
          escrowVault={escrowVault}
          onReleaseEscrow={handleReleaseEscrow}
          onRefundEscrow={handleRefundEscrow}
        />

      </div>
    </div>
  );
}
