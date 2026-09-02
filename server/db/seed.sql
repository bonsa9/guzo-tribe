-- ============================================================================
-- GUZOTRIBE ETHIOPIA (ጉዞትራይብ) - POSTGRESQL SEED DATA
-- ============================================================================

-- 1. SEED ORGANIZERS
INSERT INTO organizers (id, name, amharic_name, slug, logo_url, tagline, specialty, license_number, tin_number, telegram_handle, phone_number, payout_account_telebirr, payout_account_cbe, rating, reviews_count, members_count, is_verified)
VALUES
('addis-hikers', 'Addis Hikers Club', 'አዲስ ሃይከርስ ክለብ', 'addis-hikers-club', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80', 'Addis Ababa’s premier weekend hiking community.', 'Weekend Day Hikes & Gorge Treks', 'ETH-TOUR-2024-884', '0098472910', '@addishikers', '+251911482910', '0911482910', '1000192837461', 4.92, 142, 3400, TRUE),

('simien-trekkers', 'Simien Highland Trekkers', 'የሰሜን ተራሮች አስጎብኚዎች', 'simien-highland-trekkers', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', 'Certified UNESCO mountain guides for Simien summits.', 'High Altitude & Walia Ibex Treks', 'ETH-TOUR-2023-412', '0082736192', '@simientreks', '+251922710344', '0922710344', '1000293847291', 5.00, 88, 1200, TRUE),

('goguzo-ethiopia', 'GoGuzo Heritage Expeditions', 'ጎጉዞ የባህል ጉዞዎች', 'goguzo-heritage', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', 'Specializing in Ethiopian cultural festivals (Timket, Meskel).', 'Timket & Historic Circuit', 'ETH-TOUR-2022-901', '0073619283', '@goguzo', '+251930192837', '0930192837', '1000384729102', 4.95, 215, 5200, TRUE),

('yene-hikers', 'Yene Hikers Addis', 'የኔ ሃይከርስ አዲስ', 'yene-hikers-addis', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', 'Youth-led accessible forest walks, campfires and acoustics.', 'Beginner Trails & Camping', 'ETH-TOUR-2024-119', '0062819203', '@yenehikers', '+251911998877', '0911998877', '1000492817293', 4.85, 198, 4100, TRUE),

('afar-nomads', 'Afar Desert Nomads', 'የአፋር በረሃ አስጎብኚዎች', 'afar-desert-nomads', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', 'Extreme expedition logistics for Erta Ale & Dallol.', '4x4 Desert Expeditions', 'ETH-TOUR-2021-305', '0051928374', '@afarnomads', '+251940291827', '0940291827', '1000582910293', 4.98, 112, 1900, TRUE),

('horn-expeditions', 'Horn of Africa Expeditions', 'የአፍሪካ ቀንድ ጉዞዎች', 'horn-of-africa-expeditions', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80', 'Wildlife safaris and Afro-alpine biodiversity expeditions.', 'Bale Safari & Wolf Tracking', 'ETH-TOUR-2023-772', '0049281720', '@hornexpeditions', '+251950392817', '0950392817', '1000692810394', 4.88, 64, 1500, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED DESTINATIONS
INSERT INTO destinations (id, name, amharic_name, region, distance_from_addis, elevation_meters, cover_image_url, highlight_text)
VALUES
('wenchi-crater', 'Wenchi Crater Lake', 'ወንጪ እሳተ-ገሞራ ሀይቅ', 'Oromia (Southwest Shewa)', '155 km from Addis', 3000, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', 'Crater basin lake, hot mineral springs, wooden boat rides, and Cherkos island monastery.'),
('simien-mountains', 'Simien Mountains National Park', 'የሰሜን ተራሮች ብሔራዊ ፓርክ', 'Amhara (Debark)', '800 km from Addis (Gondar Flight)', 4100, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', 'UNESCO World Heritage escarpments, endemic Gelada baboons, and Jinbar waterfall.'),
('bale-mountains', 'Bale Mountains & Sanetti Plateau', 'የባሌ ተራሮች እና ሳኔቲ አምባ', 'Oromia (Bale Zone)', '400 km from Addis', 4120, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 'Africa’s highest all-weather road, rare Ethiopian red wolves, and Harenna cloud forest.'),
('danakil-depression', 'Danakil Depression & Erta Ale', 'ዳናኪል ድብርት እና ኤርታ አሌ', 'Afar Regional State', 'Semera / Mekelle Gateways', -125, 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80', 'Active basalt lava lake, psychedelic yellow Dallol sulphur chimneys, and salt caravans.'),
('gondar-royal-castles', 'Gondar & Timket Royal Bath', 'የጎንደር ጥምቀት እና ፋሲል ግቢ', 'Amhara (Gondar)', '730 km from Addis', 2133, 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80', '17th-century Camelot castles of Emperor Fasiladas and vibrant Timket water festival celebrations.')
ON CONFLICT (id) DO NOTHING;

-- 3. SEED TRIPS
INSERT INTO trips (
    id, organizer_id, destination_id, title, amharic_title, slug, category, difficulty, difficulty_amharic,
    elevation_meters, price_etb, price_usd, duration_days, duration_text, total_spots, spots_left,
    pickup_location, pickup_time, next_departure, description, festival_tag, rating, reviews_count
) VALUES
(
    'wenchi-crater-lake',
    'addis-hikers',
    'wenchi-crater',
    'Wenchi Crater Lake Hike & Boat Ride',
    'የወንጪ እሳተ-ገሞራ ሀይቅ የእግር ጉዞ እና የጀልባ ሽርሽር',
    'wenchi-crater-lake-hike-boat',
    'Weekend Hikes',
    'Moderate',
    'መካከለኛ',
    3000,
    2200,
    20,
    1,
    '1 Day',
    25,
    6,
    'Meskel Square (In front of Tourist Hotel), Addis Ababa',
    '06:00 AM',
    'This Saturday, 6:00 AM',
    'Experience the breathtaking beauty of Wenchi Crater Lake (3,000m above sea level). Hike down lush valleys, hot mineral springs, waterfalls, and visit the historic Cherkos monastery island via traditional wooden boats.',
    'Weekend Special',
    4.90,
    142
),
(
    'simien-mountains-expedition',
    'simien-trekkers',
    'simien-mountains',
    'Simien Mountains Wilderness Trek (Gelada & Escarpments)',
    'የሰሜን ተራሮች ብሔራዊ ፓርክ አስደናቂ የእግር ጉዞ',
    'simien-mountains-wilderness-trek',
    'Mountain Treks',
    'Challenging',
    'ከባድ',
    4100,
    24500,
    210,
    4,
    '4 Days / 3 Nights',
    14,
    4,
    'Gondar Airport / Gondar City Center',
    '08:30 AM',
    'Sep 18, 2026',
    'Trek the UNESCO World Heritage Simien Mountains, known as the Roof of Africa. Encounter large troops of friendly Gelada baboons, see the 500m Jinbar Waterfall, and camp under milky way night skies.',
    'Expedition Special',
    5.00,
    88
),
(
    'timket-gondar-festival',
    'goguzo-ethiopia',
    'gondar-royal-castles',
    'Timket Epiphany in Gondar & Royal Enclosure',
    'የጎንደር ጥምቀት በዓል እና የፋሲል ግቢ ጉብኝት',
    'timket-epiphany-gondar-castles',
    'Cultural & Festivals',
    'Easy',
    'ቀላል',
    2133,
    18900,
    165,
    3,
    '3 Days / 2 Nights',
    30,
    8,
    'Bole Airport (Addis) / Gondar Airport',
    '07:00 AM',
    'Jan 18, 2027 (Festival Departure)',
    'Join thousands of pilgrims and travelers celebrating Timket (Ethiopian Epiphany) inside the 17th-century Royal Bath of Emperor Fasiladas.',
    'Timket 2027 Special',
    4.95,
    215
)
ON CONFLICT (id) DO NOTHING;
