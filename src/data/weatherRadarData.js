/**
 * Ethiopian Mountain Weather & Altitude Advisory Dataset
 * Real-time trail weather, elevation profiles, climate hazards, and gear checklists
 */

export const MOUNTAIN_DESTINATIONS_WEATHER = [
  {
    id: 'wenchi-crater',
    name: 'Wenchi Crater Lake',
    amharicName: 'ወንጪ እሳተ-ገሞራ ሀይቅ',
    region: 'Oromia (Southwest Shewa)',
    distanceFromAddis: '155 km (approx. 3.5 hrs)',
    elevationMeters: 3000,
    elevationFeet: 9840,
    trailDifficulty: 'Moderate (Ridge to Shore descent & boat crossing)',
    currentCondition: 'Partly Cloudy & Crisp Breeze',
    conditionCode: 'partly-cloudy',
    currentTempC: 19,
    dayHighC: 22,
    nightLowC: 8,
    precipitationChance: '25%',
    windSpeedKmh: 16,
    uvIndex: 9,
    humidity: '62%',
    soilCondition: 'Firm dirt trail with wet pebble stones near sulfur hot springs',
    altitudeRisk: 'Low-to-Medium (Mild shortness of breath on rim climb)',
    highlights: [
      'St. Kirkos island monastery boat crossing',
      'Natural mineral hot spring waterfalls',
      'Local horseback trekking route'
    ],
    advisories: [
      'Afternoon boat crossing winds can cause lake chill—carry a windbreaker.',
      'Pack an extra pair of dry socks for lakeside disembarkation.',
      'Sunscreen recommended due to high UV reflection off crater water.'
    ],
    recommendedGear: [
      'Light waterproof windbreaker jacket',
      'Sturdy hiking shoes with good grip',
      '1.5L drinking water',
      'Sun hat & UV sunglasses',
      'Swimwear & micro-towel for natural hot springs'
    ],
    hourlyForecast: [
      { time: '06:00 AM', tempC: 9, condition: 'Chilly Fog', rain: '10%' },
      { time: '09:00 AM', tempC: 15, condition: 'Sunny Break', rain: '5%' },
      { time: '12:00 PM', tempC: 21, condition: 'Warm Breeze', rain: '15%' },
      { time: '03:00 PM', tempC: 18, condition: 'Scattered Clouds', rain: '30%' },
      { time: '06:00 PM', tempC: 13, condition: 'Crater Mist', rain: '20%' }
    ]
  },
  {
    id: 'simien-mountains',
    name: 'Simien Mountains (Ras Dashen)',
    amharicName: 'ስሜን ተራሮች (ራስ ዳሽን)',
    region: 'Amhara (North Gondar)',
    distanceFromAddis: '820 km (Domestic flight to Gondar + 2.5 hrs drive)',
    elevationMeters: 4550,
    elevationFeet: 14928,
    trailDifficulty: 'Strenuous (High alpine ridges & steep escarpments)',
    currentCondition: 'Alpine Frost & Crystal Clear Sun',
    conditionCode: 'frost',
    currentTempC: 11,
    dayHighC: 15,
    nightLowC: -3,
    precipitationChance: '10%',
    windSpeedKmh: 28,
    uvIndex: 11,
    humidity: '38%',
    soilCondition: 'Dry rocky scree with morning frost on high escarpments',
    altitudeRisk: 'High (Acclimatization day required; acute mountain sickness risk)',
    highlights: [
      'Troops of endemic Gelada grass-eating baboons',
      'Overnight camps at Sankaber (3,250m) & Chennek (3,620m)',
      'Panoramic 1,500-meter drop escarpments'
    ],
    advisories: [
      'Freezing nighttime temperatures (-3°C)—thermal base layers mandatory.',
      'Hydrate with at least 3.5 liters per day to prevent altitude headaches.',
      'Scouting with licensed park scouts is legally required at Debark entry.'
    ],
    recommendedGear: [
      'Down feather insulated jacket (-5°C rated)',
      'Thermal merino wool base layers',
      'Trekking poles for rocky ridge descents',
      'Electrolyte rehydration salts',
      'High-altitude UV lip balm & SPF 50+ sunscreen'
    ],
    hourlyForecast: [
      { time: '06:00 AM', tempC: -1, condition: 'Frosty Ridge', rain: '0%' },
      { time: '09:00 AM', tempC: 8, condition: 'Clear Alpine', rain: '5%' },
      { time: '12:00 PM', tempC: 14, condition: 'High Sun', rain: '10%' },
      { time: '03:00 PM', tempC: 12, condition: 'Gusty Winds', rain: '15%' },
      { time: '06:00 PM', tempC: 4, condition: 'Rapid Freeze', rain: '5%' }
    ]
  },
  {
    id: 'bale-mountains',
    name: 'Bale Mountains (Sanetti Plateau)',
    amharicName: 'ባሌ ተራሮች (ሳኔቲ አምባ)',
    region: 'Oromia (Bale Zone)',
    distanceFromAddis: '400 km (approx. 7.5 hrs drive via Hawassa)',
    elevationMeters: 4122,
    elevationFeet: 13524,
    trailDifficulty: 'Challenging (Afro-alpine moorland trek)',
    currentCondition: 'Afro-Alpine Mist & Crisp Wind',
    conditionCode: 'mist',
    currentTempC: 8,
    dayHighC: 12,
    nightLowC: -2,
    precipitationChance: '40%',
    windSpeedKmh: 32,
    uvIndex: 10,
    humidity: '75%',
    soilCondition: 'Spongy Afro-alpine lichen and bog moorlands; water resistant boots needed',
    altitudeRisk: 'High (Africa’s highest drivable all-weather road at 4,000m+)',
    highlights: [
      'Habitats of the endangered Ethiopian Red Wolf',
      'Giant Lobelia forests resembling prehistoric landscapes',
      'Harenna Forest escarpment cloud canopy'
    ],
    advisories: [
      'Sudden hail and mist can roll in within 20 minutes—carry rain gear at all times.',
      'Strong crosswinds on Sanetti plateau can drop real-feel temperature below zero.',
      'Do not feed or approach the Ethiopian wolves; maintain 30m distance.'
    ],
    recommendedGear: [
      'GORE-TEX or waterproof shell jacket & pants',
      'Waterproof high-ankle hiking boots',
      'Warm wool beanie and wind-resistant fleece gloves',
      'Binoculars for wolf & bird sightings',
      'Headlamp with spare batteries (cold drains lithium cells faster)'
    ],
    hourlyForecast: [
      { time: '06:00 AM', tempC: 0, condition: 'Freezing Mist', rain: '20%' },
      { time: '09:00 AM', tempC: 6, condition: 'Cloud Break', rain: '25%' },
      { time: '12:00 PM', tempC: 11, condition: 'High Moorland Sun', rain: '35%' },
      { time: '03:00 PM', tempC: 9, condition: 'Scattered Rain', rain: '55%' },
      { time: '06:00 PM', tempC: 3, condition: 'Dense Fog', rain: '40%' }
    ]
  },
  {
    id: 'danakil-depression',
    name: 'Danakil & Erta Ale Volcano',
    amharicName: 'ዳናኪል በረሃ እና ኤርታ አሌ',
    region: 'Afar Regional State',
    distanceFromAddis: 'Domestic flight to Semera/Mekelle + 4WD convoy',
    elevationMeters: -125,
    elevationFeet: -410,
    trailDifficulty: 'Extreme (Nighttime volcanic rim hike on jagged lava crust)',
    currentCondition: 'Extreme Thermal Heat & Active Fumaroles',
    conditionCode: 'hot',
    currentTempC: 44,
    dayHighC: 47,
    nightLowC: 29,
    precipitationChance: '0%',
    windSpeedKmh: 20,
    uvIndex: 13,
    humidity: '18%',
    soilCondition: 'Razor-sharp sulfur crust, potash salt flats, and volcanic obsidian rock',
    altitudeRisk: 'Extreme Negative Elevation (Severe dehydration & heat exhaustion risk)',
    highlights: [
      'Active molten basalt lava lake at Erta Ale caldera',
      'Neon-green and bright yellow sulfur pools of Dallol',
      'Lake Karum vast salt flat extraction caravans'
    ],
    advisories: [
      'Daytime temperatures regularly exceed 45°C—hikes only conducted before sunrise and after dark.',
      'Sulfur gas respirator / mask required near hydrothermal Dallol vents.',
      'Minimum 5 liters of electrolyte-infused water per person per day.'
    ],
    recommendedGear: [
      'Heavy-duty thick-soled boots (lava crust heats sole adhesives)',
      'Gas mask or activated carbon dust scarf for sulfur fumes',
      'High-power 1000-lumen headlamp for nighttime volcano caldera ascent',
      'Light breathable cotton long-sleeve safari shirts',
      'Electrolyte hydration powder packs'
    ],
    hourlyForecast: [
      { time: '06:00 AM', tempC: 31, condition: 'Dawn Heat', rain: '0%' },
      { time: '09:00 AM', tempC: 38, condition: 'Intense Sun', rain: '0%' },
      { time: '12:00 PM', tempC: 46, condition: 'Extreme Thermal', rain: '0%' },
      { time: '03:00 PM', tempC: 44, condition: 'Scorching Wind', rain: '0%' },
      { time: '06:00 PM', tempC: 36, condition: 'Dusk Cool-down', rain: '0%' }
    ]
  },
  {
    id: 'suba-forest',
    name: 'Menagesha Suba National Forest',
    amharicName: 'መናገሻ ሱባ ደን',
    region: 'Oromia (West Shewa)',
    distanceFromAddis: '45 km (approx. 1.2 hrs drive)',
    elevationMeters: 2500,
    elevationFeet: 8200,
    trailDifficulty: 'Easy to Moderate (Forest canopy dirt trails)',
    currentCondition: 'Fresh Pine Canopy & Morning Dew',
    conditionCode: 'forest',
    currentTempC: 20,
    dayHighC: 24,
    nightLowC: 11,
    precipitationChance: '15%',
    windSpeedKmh: 12,
    uvIndex: 7,
    humidity: '58%',
    soilCondition: 'Soft cedar needle floor with moist shaded woodland paths',
    altitudeRisk: 'Low (Ideal weekend acclimatization hike for Addis residents)',
    highlights: [
      'Ancient Juniper and Podocarpus trees dating to Emperor Zera Yacob (15th century)',
      'Menelik bushbuck and Colobus monkey sightings',
      'Panoramic view of Wechecha mountain peak'
    ],
    advisories: [
      'Morning dew can make tree roots slick—watch your footing on switchbacks.',
      'Shaded forest paths can be significantly cooler than Addis Ababa city.',
      'Pack out all trash—strict national park conservation zone.'
    ],
    recommendedGear: [
      'Comfortable trail running shoes or light hikers',
      'Light fleece pullover for early morning shade',
      'Water bottle (1L)',
      'Insect repellent for deep pine trails',
      'Small daypack with picnic snacks'
    ],
    hourlyForecast: [
      { time: '06:00 AM', tempC: 12, condition: 'Pine Mist', rain: '5%' },
      { time: '09:00 AM', tempC: 18, condition: 'Dappled Sun', rain: '5%' },
      { time: '12:00 PM', tempC: 23, condition: 'Sunny & Pleasant', rain: '10%' },
      { time: '03:00 PM', tempC: 21, condition: 'Forest Breeze', rain: '20%' },
      { time: '06:00 PM', tempC: 15, condition: 'Cool Dusk', rain: '10%' }
    ]
  }
];
