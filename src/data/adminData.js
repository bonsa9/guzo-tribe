// GuzoTribe Platform Master Admin Mock Data

export const initialAdminMetrics = {
  totalGMV_ETB: 38450000, // 38.45 Million ETB
  totalGMV_USD: 320416,
  platformCommission_ETB: 3076000, // 8% Take Rate (~3.07 Million ETB)
  platformCommission_USD: 25633,
  escrowInCustody_ETB: 8420000, // 8.42M currently locked in escrow
  escrowInCustody_USD: 70166,
  totalBookings: 14850,
  totalVerifiedOrganizers: 18,
  pendingKYCCount: 3,
  pendingTripsCount: 4,
  activeDisputesCount: 2,
  securityCorridorsClear: 5,
  securityCorridorsTotal: 6
};

export const initialPendingOrganizers = [
  {
    id: 'org-k-101',
    businessName: 'Abyssinia Alpine Trekkers',
    ownerName: 'Yonas Bekele',
    phone: '+251 911 882233',
    email: 'yonas@abyssinia-trekkers.et',
    telegramHandle: '@AbyssiniaTrekkers',
    city: 'Addis Ababa (Bole)',
    licenseNumber: 'MOT-ET-2025-08492',
    guideCertifications: 'Certified Simien & Bale Senior Guide (MoT)',
    yearsOperating: 4,
    appliedDate: '2026-08-30',
    status: 'pending', // 'pending' | 'approved' | 'rejected' | 'suspended'
    fleetInfo: '2x 4WD Toyota Coasters + 1x Land Cruiser',
    specialty: 'High-Altitude Trekking & Photography'
  },
  {
    id: 'org-k-102',
    businessName: 'Rift Valley Eco-Campers',
    ownerName: 'Helen Tesfaye',
    phone: '+251 922 447711',
    email: 'helen@riftvalleyecocamp.com',
    telegramHandle: '@RiftValleyEcoCamp',
    city: 'Hawassa / Addis Ababa',
    licenseNumber: 'MOT-ET-2026-01129',
    guideCertifications: 'Wilderness First Aid & Birding Specialist',
    yearsOperating: 2,
    appliedDate: '2026-08-31',
    status: 'pending',
    fleetInfo: '3x Minibuses (HiAce)',
    specialty: 'Lakeside Camping & Kayaking'
  },
  {
    id: 'org-k-103',
    businessName: 'Danakil Extreme Expeditions',
    ownerName: 'Mohammed Ahmed',
    phone: '+251 933 991144',
    email: 'info@danakilextreme.et',
    telegramHandle: '@DanakilExtremeTours',
    city: 'Semera / Addis Ababa',
    licenseNumber: 'MOT-ET-2024-99201',
    guideCertifications: 'Afar Regional Tourism Association Certified',
    yearsOperating: 6,
    appliedDate: '2026-09-01',
    status: 'pending',
    fleetInfo: '6x 4WD Land Cruisers with Satellite Comms',
    specialty: 'Erta Ale & Dallol Geological Expeditions'
  }
];

export const initialPendingTrips = [
  {
    id: 'trip-mod-201',
    title: 'Garba Guracha Alpine Lake 3-Day Expedition',
    amharicTitle: 'የጋርባ ጉራቻ ተራራ ሀይቅ የ3 ቀን የእግር ጉዞ',
    organizerName: 'Bale Mountain Trekkers',
    organizerId: 'bale-trekkers',
    destination: 'Bale Mountains National Park, Oromia',
    elevationMeters: 3950,
    priceETB: 12500,
    priceUSD: 105,
    departureDate: '2026-09-18',
    totalSeats: 20,
    difficulty: 'Challenging',
    status: 'pending_review', // 'pending_review' | 'approved' | 'changes_requested'
    submittedDate: '2026-09-01',
    safetyReviewNotes: 'High elevation acclimatization plan included. Certified local scout allocated.'
  },
  {
    id: 'trip-mod-202',
    title: 'Debre Libanos & Portuguese Bridge Day Hike',
    amharicTitle: 'ደብረ ሊባኖስ እና የፖርቹጋል ድልድይ የቀን ጉዞ',
    organizerName: 'Addis Weekend Hikers',
    organizerId: 'addis-hikers',
    destination: 'Debre Libanos, North Shewa',
    elevationMeters: 2400,
    priceETB: 2200,
    priceUSD: 20,
    departureDate: '2026-09-12',
    totalSeats: 30,
    difficulty: 'Easy',
    status: 'pending_review',
    submittedDate: '2026-09-01',
    safetyReviewNotes: 'Standard day hike. Pickup at Bole Friendship Mall.'
  },
  {
    id: 'trip-mod-203',
    title: 'Meskel Festival Eve at Gishen Debre Kerbe',
    amharicTitle: 'የግሸን ደብረ ከርቤ የመስቀል በዓል ጉዞ',
    organizerName: 'Heritage Ethiopia Expeditions',
    organizerId: 'heritage-eth',
    destination: 'Wollo, Amhara Region',
    elevationMeters: 3000,
    priceETB: 16000,
    priceUSD: 135,
    departureDate: '2026-09-25',
    totalSeats: 40,
    difficulty: 'Moderate',
    status: 'pending_review',
    submittedDate: '2026-08-29',
    safetyReviewNotes: 'Major religious festival departure. Route clearance confirmed via Kombolcha.'
  }
];

export const initialEscrowPayouts = [
  {
    id: 'payout-tx-701',
    tripTitle: 'Wenchi Crater Lake Sunday Hike (Batch #48)',
    organizerName: 'Addis Weekend Hikers',
    bankOrWallet: 'Telebirr B2C Merchant Push',
    accountNumber: '+251 911 234567',
    passengersCount: 28,
    grossAmountETB: 70000,
    platformFeeETB: 5600, // 8%
    netPayoutETB: 64400,
    completionDate: '2026-08-31',
    status: 'ready_to_release', // 'ready_to_release' | 'released' | 'held_for_review'
    travelerSatisfactionScore: 4.9,
    disputesCount: 0
  },
  {
    id: 'payout-tx-702',
    tripTitle: 'Simien Mountains 4-Day Ridge Trek (Batch #12)',
    organizerName: 'Simien Trekkers Club',
    bankOrWallet: 'Commercial Bank of Ethiopia (CBE)',
    accountNumber: '1000192847592',
    passengersCount: 16,
    grossAmountETB: 288000,
    platformFeeETB: 23040, // 8%
    netPayoutETB: 264960,
    completionDate: '2026-08-30',
    status: 'ready_to_release',
    travelerSatisfactionScore: 4.8,
    disputesCount: 0
  },
  {
    id: 'payout-tx-703',
    tripTitle: 'Gheralta Rock Churches Expedition (Batch #05)',
    organizerName: 'Tigray Heritage Guides',
    bankOrWallet: 'Telebirr B2C Merchant Push',
    accountNumber: '+251 944 883322',
    passengersCount: 12,
    grossAmountETB: 180000,
    platformFeeETB: 14400,
    netPayoutETB: 165600,
    completionDate: '2026-08-29',
    status: 'held_for_review',
    travelerSatisfactionScore: 4.2,
    disputesCount: 1 // 1 refund claim
  }
];

export const initialRoadCorridors = [
  {
    id: 'corridor-1',
    route: 'Addis Ababa ➔ Ambo ➔ Wenchi Crater Lake',
    region: 'Oromia',
    status: 'CLEAR', // 'CLEAR' | 'CAUTION' | 'RESTRICTED'
    lastVerified: 'Today, 06:30 AM',
    checkpointPassage: 'Normal (Waliso & Ambo Checkpoints open)',
    recommendedVehicle: 'Minibus / Coaster / SUV',
    notes: 'Paved road in good condition. Police escorts not required.'
  },
  {
    id: 'corridor-2',
    route: 'Addis Ababa ➔ Hawassa ➔ Dodola ➔ Bale Mountains (Dinsho & Sanetti)',
    region: 'Oromia / Sidama',
    status: 'CLEAR',
    lastVerified: 'Today, 07:15 AM',
    checkpointPassage: 'Normal (Shashamane bypass operating smoothly)',
    recommendedVehicle: 'Coaster / High Clearance SUV',
    notes: 'Sanetti Plateau pass open. Morning mist near 4,000m.'
  },
  {
    id: 'corridor-3',
    route: 'Gondar ➔ Debark ➔ Simien Mountains (Sankaber & Chennek)',
    region: 'Amhara',
    status: 'CLEAR',
    lastVerified: 'Yesterday, 05:00 PM',
    checkpointPassage: 'Normal with Park Scout registration at Debark HQ',
    recommendedVehicle: '4WD Coaster / 4WD Land Cruiser',
    notes: 'Seasonal mountain rains in the evening. Park scouts mandatory.'
  },
  {
    id: 'corridor-4',
    route: 'Semera ➔ Afdera ➔ Erta Ale & Dallol (Danakil)',
    region: 'Afar',
    status: 'CLEAR',
    lastVerified: 'Today, 08:00 AM',
    checkpointPassage: 'Military & Afar Police Escort check at Afdera',
    recommendedVehicle: 'Convoy of 2+ 4WD Land Cruisers strictly required',
    notes: 'Extreme heat (42°C+). High-spec water and satellite phones mandatory.'
  },
  {
    id: 'corridor-5',
    route: 'Addis Ababa ➔ Debre Berhan ➔ Dessie ➔ Lalibela',
    region: 'Amhara',
    status: 'CAUTION',
    lastVerified: 'Today, 06:00 AM',
    checkpointPassage: 'Enhanced security screening at Termaber Tunnel',
    recommendedVehicle: 'Daylight travel only (06:00 to 17:30)',
    notes: 'Organizers must carry official GuzoTribe Checkpoint Passenger Manifest.'
  },
  {
    id: 'corridor-6',
    route: 'Addis Ababa ➔ Bishoftu ➔ Wonji / Awash National Park',
    region: 'Oromia / Afar',
    status: 'CLEAR',
    lastVerified: 'Today, 07:45 AM',
    checkpointPassage: 'Expressway open (Addis-Adama toll)',
    recommendedVehicle: 'Any standard vehicle / bus',
    notes: 'Smooth transit. Awash park gate operates 06:00 - 18:00.'
  }
];

export const initialDisputes = [
  {
    id: 'disp-901',
    bookingRef: 'GZ-829104',
    tripTitle: 'Gheralta Rock Churches Expedition',
    travelerName: 'Samuel Girma',
    travelerPhone: '+251 911 654321',
    amountETB: 15000,
    reason: 'Organizer cancelled second day church hike due to vehicle breakdown without backup.',
    filedDate: '2026-08-30',
    status: 'open', // 'open' | 'refunded' | 'dismissed'
    organizerName: 'Tigray Heritage Guides'
  },
  {
    id: 'disp-902',
    bookingRef: 'GZ-772910',
    tripTitle: 'Wenchi Crater Lake Sunday Hike',
    travelerName: 'Bethlehem Tadesse',
    travelerPhone: '+251 922 113355',
    amountETB: 2500,
    reason: 'Duplicate payment on Telebirr USSD push.',
    filedDate: '2026-08-31',
    status: 'open',
    organizerName: 'Addis Weekend Hikers'
  }
];

export const initialLiveFeed = [
  {
    id: 'feed-1',
    type: 'booking',
    time: '2 mins ago',
    desc: '3 seats booked for "Wenchi Crater Lake" via Telebirr USSD Push',
    amount: '7,500 ETB',
    status: 'success'
  },
  {
    id: 'feed-2',
    type: 'chapa',
    time: '8 mins ago',
    desc: 'International Diaspora booked 2 seats for "Simien Ridge Trek" via Chapa (Visa USD)',
    amount: '$320 USD',
    status: 'success'
  },
  {
    id: 'feed-3',
    type: 'escrow',
    time: '18 mins ago',
    desc: 'Escrow lock triggered for Booking #GZ-993821 (8% fee reserved: 480 ETB)',
    amount: '6,000 ETB',
    status: 'escrow_locked'
  },
  {
    id: 'feed-4',
    type: 'organizer',
    time: '35 mins ago',
    desc: 'New Organizer Application submitted by "Abyssinia Alpine Trekkers"',
    amount: 'KYC Pending',
    status: 'warning'
  }
];
