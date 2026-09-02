// Toyota Coaster 28-Seat Bus Configuration & Addis Ababa Departure Stations
// Standard tour coaster: 28 passenger seats, 1 driver station, 1 tour coordinator jumpseat.

export const ADDIS_PICKUP_STATIONS = [
  {
    id: 'meskel-square',
    name: 'Meskel Square',
    amharicName: 'መስቀል አደባባይ',
    landmark: 'In front of Addis Ababa Museum / Tourist Hotel',
    amharicLandmark: 'በአዲስ አበባ ሙዚየም ፊት ለፊት',
    time: '06:00 AM',
    note: 'Central Addis hub with secure morning parking and metro access.',
    iconType: 'central'
  },
  {
    id: 'bole-medhanialem',
    name: 'Bole Medhanialem',
    amharicName: 'ቦሌ መድኃኔዓለም',
    landmark: 'Medhanialem Church Gate / In front of Edna Mall',
    amharicLandmark: 'በመድኃኔዓለም ቤተክርስቲያን በር / ኤድና ሞል ፊት',
    time: '06:20 AM',
    note: 'Most convenient for Bole, Atlas, and Airport corridor travelers.',
    iconType: 'bole'
  },
  {
    id: 'mexico-square',
    name: 'Mexico Square',
    amharicName: 'ሜክሲኮ አደባባይ',
    landmark: 'In front of Coffee & Tea Authority / Genete Eyesus',
    amharicLandmark: 'በቡና እና ሻይ ባለስልጣን ፊት ለፊት',
    time: '05:45 AM',
    note: 'Ideal for Sarbet, Tor Hailoch, and Western Addis commuters.',
    iconType: 'mexico'
  },
  {
    id: 'megenagna-zefmesh',
    name: 'Megenagna / CMC',
    amharicName: 'መገናኛ / ሲኤምሲ',
    landmark: 'In front of Zefmesh Grand Mall Main Entrance',
    amharicLandmark: 'በዘፍመሽ ግራንድ ሞል ዋና መግቢያ በር ፊት',
    time: '06:35 AM',
    note: 'Final Addis stop on Eastern expressway before exiting city.',
    iconType: 'east'
  }
];

// 28-Seat Toyota Coaster Layout (7 Rows)
// Row 1: 1A, 1B (Left) | Aisle | 1C (Right)  [3 seats]
// Rows 2-6: Left (A, B) | Aisle | Right (C, D) [4 seats * 5 rows = 20 seats]
// Row 7 (The Back Bench / "ድጋፉ"): 7A, 7B, 7C, 7D, 7E [5 continuous seats]
// Total = 3 + 20 + 5 = 28 passenger seats.

export const COASTER_SEAT_LAYOUT = [
  // Row 1
  {
    row: 1,
    seatsLeft: [
      { id: '1A', label: '1A', isWindow: true, isAisle: false, zone: 'front', feature: 'Scenic Window' },
      { id: '1B', label: '1B', isWindow: false, isAisle: true, zone: 'front', feature: 'Aisle Access' }
    ],
    seatsRight: [
      { id: '1C', label: '1C', isWindow: true, isAisle: true, zone: 'front', feature: 'Near Guide / Window' }
    ]
  },
  // Row 2
  {
    row: 2,
    seatsLeft: [
      { id: '2A', label: '2A', isWindow: true, isAisle: false, zone: 'front', feature: 'Scenic Window' },
      { id: '2B', label: '2B', isWindow: false, isAisle: true, zone: 'front', feature: 'Aisle Legroom' }
    ],
    seatsRight: [
      { id: '2C', label: '2C', isWindow: false, isAisle: true, zone: 'front', feature: 'Aisle Legroom' },
      { id: '2D', label: '2D', isWindow: true, isAisle: false, zone: 'front', feature: 'Scenic Window' }
    ]
  },
  // Row 3
  {
    row: 3,
    seatsLeft: [
      { id: '3A', label: '3A', isWindow: true, isAisle: false, zone: 'mid', feature: 'Panoramic Window' },
      { id: '3B', label: '3B', isWindow: false, isAisle: true, zone: 'mid', feature: 'Aisle Access' }
    ],
    seatsRight: [
      { id: '3C', label: '3C', isWindow: false, isAisle: true, zone: 'mid', feature: 'Aisle Access' },
      { id: '3D', label: '3D', isWindow: true, isAisle: false, zone: 'mid', feature: 'Panoramic Window' }
    ]
  },
  // Row 4
  {
    row: 4,
    seatsLeft: [
      { id: '4A', label: '4A', isWindow: true, isAisle: false, zone: 'mid', feature: 'Panoramic Window' },
      { id: '4B', label: '4B', isWindow: false, isAisle: true, zone: 'mid', feature: 'Aisle Access' }
    ],
    seatsRight: [
      { id: '4C', label: '4C', isWindow: false, isAisle: true, zone: 'mid', feature: 'Aisle Access' },
      { id: '4D', label: '4D', isWindow: true, isAisle: false, zone: 'mid', feature: 'Panoramic Window' }
    ]
  },
  // Row 5
  {
    row: 5,
    seatsLeft: [
      { id: '5A', label: '5A', isWindow: true, isAisle: false, zone: 'mid', feature: 'Mountain View' },
      { id: '5B', label: '5B', isWindow: false, isAisle: true, zone: 'mid', feature: 'Aisle Access' }
    ],
    seatsRight: [
      { id: '5C', label: '5C', isWindow: false, isAisle: true, zone: 'mid', feature: 'Aisle Access' },
      { id: '5D', label: '5D', isWindow: true, isAisle: false, zone: 'mid', feature: 'Mountain View' }
    ]
  },
  // Row 6
  {
    row: 6,
    seatsLeft: [
      { id: '6A', label: '6A', isWindow: true, isAisle: false, zone: 'back', feature: 'Quiet Corner' },
      { id: '6B', label: '6B', isWindow: false, isAisle: true, zone: 'back', feature: 'Aisle Access' }
    ],
    seatsRight: [
      { id: '6C', label: '6C', isWindow: false, isAisle: true, zone: 'back', feature: 'Aisle Access' },
      { id: '6D', label: '6D', isWindow: true, isAisle: false, zone: 'back', feature: 'Window View' }
    ]
  },
  // Row 7 (Back Bench / ድጋፉ)
  {
    row: 7,
    isBackBench: true,
    seats: [
      { id: '7A', label: '7A', isWindow: true, isAisle: false, zone: 'back', feature: 'The Back Crew (ድጋፉ)' },
      { id: '7B', label: '7B', isWindow: false, isAisle: false, zone: 'back', feature: 'The Back Crew (ድጋፉ)' },
      { id: '7C', label: '7C', isWindow: false, isAisle: true, zone: 'back', feature: 'Center Back Bench' },
      { id: '7D', label: '7D', isWindow: false, isAisle: false, zone: 'back', feature: 'The Back Crew (ድጋፉ)' },
      { id: '7E', label: '7E', isWindow: true, isAisle: false, zone: 'back', feature: 'The Back Crew (ድጋፉ)' }
    ]
  }
];

// Pre-seeded occupied seats map for realistic demo simulation per trip
const PRESET_BOOKINGS = {
  'wenchi-crater-lake': ['1A', '1B', '2D', '3C', '4A', '5B', '7D', '7E'],
  'simien-mountains-expedition': ['1C', '2A', '2B', '3A', '3B', '4C', '4D', '6A', '7A', '7B'],
  'bale-mountains-wildlife-safari': ['1A', '2C', '2D', '3D', '5A', '5D', '6C'],
  'danakil-depression-lava-lake': ['1B', '1C', '2A', '3A', '4A', '4B', '5C', '6B', '7C', '7D'],
  'default': ['1B', '2A', '3D', '4C', '5B', '7A', '7E']
};

export function getTripOccupiedSeats(tripId) {
  return PRESET_BOOKINGS[tripId] || PRESET_BOOKINGS.default;
}

// Flat list of all 28 seat definitions
export const ALL_COASTER_SEATS = COASTER_SEAT_LAYOUT.flatMap((rowObj) => {
  if (rowObj.isBackBench) {
    return rowObj.seats;
  }
  return [...rowObj.seatsLeft, ...rowObj.seatsRight];
});
