/**
 * GuzoTribe Telegram Bot Engine (@GuzoTribeBot)
 * Handles incoming bot commands, inline keyboards, and automated DM delivery
 */

export const BOT_INFO = {
  name: 'GuzoTribe Bot',
  username: '@GuzoTribeBot',
  tagline: "Ethiopia's #1 Community Trip Bot",
  supportPhone: '+251 911 234567'
};

export function processBotCommand(command, params = {}) {
  const cleanCmd = command.trim().toLowerCase();

  switch (cleanCmd) {
    case '/start':
      return {
        text: `👋 **እንኳን ወደ ጉዞትራይብ በደህና መጡ!**\n**Welcome to GuzoTribe Ethiopia!** 🇪🇹\n\nየኢትዮጵያን የተፈጥሮ ድንቆች፣ ጥንታዊ ቅርሶች እና ተራሮች ከተረጋገጡ አስጎብኚዎች ጋር በአንድ ቦታ ፈልገው ይያዙ።\n\nDiscover and compare curated weekend hikes, cultural festivals, and mountain expeditions across Ethiopia with Telebirr & CBE payments.\n\n👇 **ከታች ያለውን ቁልፍ በመጫን ጉዞዎችን ይፈልጉ:**`,
        buttons: [
          { text: '🚀 Open GuzoTribe WebApp (ጉዞዎችን ፈልግ)', action: 'OPEN_TMA', url: '/trips' },
          { text: '🌟 Festival Specials (የበዓላት ጉዞዎች)', action: 'OPEN_TMA', url: '/trips' },
          { text: '🎫 My Tickets (የእኔ ትኬቶች)', action: 'COMMAND', command: '/my_tickets' }
        ]
      };

    case '/trips':
      return {
        text: `🏞️ **Upcoming Featured Weekend Departures:**\n\n1. **Wenchi Crater Lake Hike & Boat**\n   • 📅 This Saturday, 6:00 AM\n   • 💰 2,200 ETB • 🏔️ 3,000m\n   • 📍 Meskel Square Pickup\n\n2. **Debre Libanos Gorge & Baboons**\n   • 📅 This Saturday, 6:30 AM\n   • 💰 2,400 ETB • 🏞️ 2,400m\n   • 📍 4 Kilo Pickup\n\n3. **Simien Mountains 4-Day Trek**\n   • 📅 Sep 18, 2026\n   • 💰 24,500 ETB • 🏔️ 4,100m\n\nTap below to compare & book:`,
        buttons: [
          { text: '🔍 View All 45+ Trips on WebApp', action: 'OPEN_TMA', url: '/trips' },
          { text: '🏷️ Budget Trips Under 2,500 ETB', action: 'OPEN_TMA', url: '/trips' }
        ]
      };

    case '/my_tickets':
      return {
        text: `🎫 **Your Confirmed E-Ticket Voucher:**\n\n• **Ref:** \`GZ-8842-ETH\`\n• **Trip:** Wenchi Crater Lake Hike & Boat\n• **Departure:** This Saturday, 6:00 AM\n• **Meeting Spot:** Meskel Square (Tourist Hotel)\n• **Seats:** 2 Travelers (Paid via Telebirr)\n• **Lead Guide:** Dawit Tadesse (+251 911 482910)\n\n✅ **100% Verified Escrow Protected**`,
        buttons: [
          { text: '💬 Join Official Trip Telegram Group', action: 'LINK', url: 'https://t.me/' },
          { text: '📄 Download Full PDF E-Ticket', action: 'DOWNLOAD_TICKET' }
        ]
      };

    case '/host':
      return {
        text: `🏢 **Organizer Portal Quick Summary:**\n\n• **Club:** Addis Hikers Club\n• **Active Departures:** 2 Trips\n• **Total Booked:** 32 Passengers\n• **Available Escrow:** 48,500 ETB\n\nTap below to open your organizer dashboard:`,
        buttons: [
          { text: '📊 Open Organizer Dashboard', action: 'OPEN_TMA', url: '/organizer/dashboard' },
          { text: '📋 View Checkpoint Manifest', action: 'OPEN_TMA', url: '/organizer/dashboard' }
        ]
      };

    case '/help':
    default:
      return {
        text: `ℹ️ **GuzoTribe Support & Help Desk:**\n\n• 📞 **Helpline:** +251 911 234567\n• 📱 **Telebirr Support:** Available Mon - Sat (8:30 AM - 6:30 PM)\n• 🏢 **Office:** Bole Medhanialem, Addis Ababa\n\n**Available Commands:**\n• \`/start\` - Main Menu\n• \`/trips\` - Browse Trips\n• \`/my_tickets\` - View Tickets\n• \`/host\` - Organizer Portal`,
        buttons: [
          { text: '🚀 Open GuzoTribe WebApp', action: 'OPEN_TMA', url: '/trips' }
        ]
      };
  }
}
