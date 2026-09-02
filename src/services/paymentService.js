/**
 * GuzoTribe Payment Gateway Integration Service
 * Supports: Chapa (Cards/Banks), Telebirr (USSD Push & QR), CBE Birr
 */

export const CHAPA_CONFIG = {
  publicKey: 'CHAPUBK_TEST-ethiopia-guzotribe-demo',
  endpoint: 'https://api.chapa.co/v1/transaction/initialize',
  verifyEndpoint: 'https://api.chapa.co/v1/transaction/verify'
};

export const TELEBIRR_CONFIG = {
  shortCode: '127',
  merchantId: 'ETH_MERCHANT_GUZOTRIBE_8842',
  ussdPrefix: '*127*1*1*'
};

/**
 * Initialize a Chapa Payment Checkout
 */
export async function initializeChapaPayment({
  amount,
  currency = 'ETB',
  email = 'traveler@guzotribe.et',
  firstName,
  lastName,
  txRef,
  callbackUrl = window.location.origin + '/escrow-simulator',
  returnUrl = window.location.origin + '/escrow-simulator'
}) {
  console.log(`[Chapa API] Initializing payment for ${amount} ${currency} (Ref: ${txRef})`);
  
  // Simulated Chapa API Response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success',
        message: 'Hosted Payment page created',
        data: {
          checkout_url: `https://checkout.chapa.co/checkout/payment/${txRef}`,
          tx_ref: txRef,
          amount,
          currency
        }
      });
    }, 600);
  });
}

/**
 * Initiate a Telebirr USSD Push Prompt
 */
export async function initiateTelebirrPush({
  phone,
  amount,
  txRef,
  tripTitle
}) {
  console.log(`[Telebirr API] Dispatching USSD push to ${phone} for ${amount} ETB`);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'PENDING_USER_PIN',
        txRef,
        phone,
        amount,
        ussdPrompt: `Pay ${amount} ETB to GuzoTribe for ${tripTitle}? Enter Telebirr PIN:`,
        qrData: `telebirr://pay?merchant=${TELEBIRR_CONFIG.merchantId}&amount=${amount}&ref=${txRef}`
      });
    }, 800);
  });
}

/**
 * Verify Transaction Status
 */
export async function verifyPaymentStatus(txRef, provider = 'telebirr') {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'PAID',
        txRef,
        provider,
        verifiedAt: new Date().toISOString(),
        escrowLocked: true
      });
    }, 500);
  });
}
