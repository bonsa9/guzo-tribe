/**
 * Telegram Mini App (TMA) SDK Wrapper
 * Connects GuzoTribe with window.Telegram.WebApp
 */

export const TelegramWebApp = {
  get isInsideTelegram() {
    return typeof window !== 'undefined' && !!window.Telegram?.WebApp?.initData;
  },

  get user() {
    if (this.isInsideTelegram) {
      return window.Telegram.WebApp.initDataUnsafe?.user || null;
    }
    return {
      id: 98472910,
      first_name: 'Dawit',
      last_name: 'Tadesse',
      username: 'dawit_eth',
      language_code: 'am'
    };
  },

  ready() {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  },

  haptic(type = 'success') {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.HapticFeedback) {
      if (type === 'impact') {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
      } else {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred(type);
      }
    } else {
      console.log(`[TMA Haptics] Triggered '${type}' haptic feedback`);
    }
  },

  openTelegramLink(url) {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(url);
    } else {
      window.open(url, '_blank');
    }
  }
};
