-- ============================================================================
-- GUZOTRIBE ETHIOPIA (ጉዞትራይብ) - POSTGRESQL DATABASE SCHEMA
-- Version: 1.0.0
-- Dialect: PostgreSQL 14+
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ORGANIZERS TABLE (Tour Operators, Hiking Clubs, Mountain Guide Assocs)
CREATE TABLE IF NOT EXISTS organizers (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amharic_name VARCHAR(255),
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo_url TEXT,
    tagline TEXT,
    specialty VARCHAR(255),
    license_number VARCHAR(100) UNIQUE NOT NULL,
    tin_number VARCHAR(50),
    telegram_handle VARCHAR(100) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    payout_account_telebirr VARCHAR(50),
    payout_account_cbe VARCHAR(50),
    rating NUMERIC(3, 2) DEFAULT 5.00 CHECK (rating >= 1.0 AND rating <= 5.0),
    reviews_count INT DEFAULT 0,
    members_count INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. DESTINATIONS TABLE (Iconic Ethiopian Landmarks)
CREATE TABLE IF NOT EXISTS destinations (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amharic_name VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    distance_from_addis VARCHAR(100),
    elevation_meters INT,
    cover_image_url TEXT,
    highlight_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TRIPS TABLE (Curated Group Departures & Itineraries)
CREATE TABLE IF NOT EXISTS trips (
    id VARCHAR(64) PRIMARY KEY,
    organizer_id VARCHAR(64) NOT NULL REFERENCES organizers(id) ON DELETE CASCADE,
    destination_id VARCHAR(64) REFERENCES destinations(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    amharic_title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'Weekend Hikes', 'Mountain Treks', 'Cultural & Festivals', etc.
    difficulty VARCHAR(50) NOT NULL CHECK (difficulty IN ('Easy', 'Moderate', 'Challenging')),
    difficulty_amharic VARCHAR(50),
    elevation_meters INT,
    price_etb INT NOT NULL CHECK (price_etb > 0),
    price_usd INT NOT NULL CHECK (price_usd > 0),
    duration_days INT NOT NULL DEFAULT 1 CHECK (duration_days >= 1),
    duration_text VARCHAR(50) NOT NULL,
    total_spots INT NOT NULL CHECK (total_spots > 0),
    spots_left INT NOT NULL CHECK (spots_left >= 0),
    pickup_location TEXT NOT NULL,
    pickup_time VARCHAR(50) NOT NULL,
    next_departure VARCHAR(100) NOT NULL,
    departure_timestamp TIMESTAMP WITH TIME ZONE,
    description TEXT NOT NULL,
    safety_score VARCHAR(100) DEFAULT '100% Verified & Escorted',
    festival_tag VARCHAR(100),
    
    -- Structured JSONB fields for flexibility & richness
    images JSONB DEFAULT '[]'::jsonb,
    inclusions JSONB DEFAULT '[]'::jsonb,
    exclusions JSONB DEFAULT '[]'::jsonb,
    itinerary JSONB DEFAULT '[]'::jsonb,
    vibe_tags JSONB DEFAULT '[]'::jsonb,
    group_composition JSONB DEFAULT '{"soloHikers": 50, "friendGroups": 40, "couples": 10, "avgAge": "20-35"}'::jsonb,
    group_discount JSONB DEFAULT '{"minSeats": 3, "discountPercent": 10}'::jsonb,
    requirements JSONB DEFAULT '[]'::jsonb,
    
    rating NUMERIC(3, 2) DEFAULT 5.00,
    reviews_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_spots_valid CHECK (spots_left <= total_spots)
);

-- 4. BOOKINGS TABLE (Passenger Manifest & Ticket Records)
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_ref VARCHAR(50) UNIQUE NOT NULL, -- e.g. GZ-8842-ETH
    trip_id VARCHAR(64) NOT NULL REFERENCES trips(id) ON DELETE RESTRICT,
    traveler_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL, -- e.g. +251 9...
    telegram_handle VARCHAR(100),
    emergency_contact VARCHAR(255),
    dietary_notes TEXT,
    seat_count INT NOT NULL DEFAULT 1 CHECK (seat_count >= 1),
    unit_price_etb INT NOT NULL,
    raw_subtotal_etb INT NOT NULL,
    discount_amount_etb INT DEFAULT 0,
    final_total_etb INT NOT NULL,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('Telebirr', 'CBE Birr', 'Chapa', 'Awash Birr')),
    payment_status VARCHAR(50) DEFAULT 'PAID' CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED')),
    bus_check_in_status VARCHAR(50) DEFAULT 'PENDING' CHECK (bus_check_in_status IN ('PENDING', 'ON_BOARD', 'NO_SHOW')),
    qr_code_data TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. ESCROW LEDGER TABLE (Custody & Commission Management)
CREATE TABLE IF NOT EXISTS escrow_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    escrow_ref VARCHAR(50) UNIQUE NOT NULL, -- e.g. ESC-948210
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    organizer_id VARCHAR(64) NOT NULL REFERENCES organizers(id) ON DELETE CASCADE,
    gross_amount_etb INT NOT NULL,
    platform_commission_rate NUMERIC(4, 2) DEFAULT 0.08, -- 8%
    platform_fee_etb INT NOT NULL,
    net_organizer_payout_etb INT NOT NULL,
    status VARCHAR(50) DEFAULT 'HELD_IN_ESCROW' CHECK (status IN ('HELD_IN_ESCROW', 'DEPARTURE_CONFIRMED', 'RELEASED_TO_ORGANIZER', 'REFUNDED_TO_TRAVELER')),
    payout_account VARCHAR(100),
    released_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. REVIEWS TABLE (Traveler Feedback & Ratings)
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id VARCHAR(64) NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    author_name VARCHAR(255) NOT NULL,
    author_avatar TEXT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. PAYOUT REQUESTS TABLE (Organizer Withdrawals)
CREATE TABLE IF NOT EXISTS payout_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organizer_id VARCHAR(64) NOT NULL REFERENCES organizers(id) ON DELETE CASCADE,
    amount_etb INT NOT NULL CHECK (amount_etb > 0),
    destination_method VARCHAR(50) NOT NULL CHECK (destination_method IN ('telebirr', 'cbe', 'awash')),
    account_number VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'PROCESSED' CHECK (status IN ('PENDING', 'PROCESSED', 'REJECTED')),
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INDICES FOR OPTIMAL QUERY PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_trips_category ON trips(category);
CREATE INDEX IF NOT EXISTS idx_trips_price ON trips(price_etb);
CREATE INDEX IF NOT EXISTS idx_trips_organizer ON trips(organizer_id);
CREATE INDEX IF NOT EXISTS idx_trips_destination ON trips(destination_id);
CREATE INDEX IF NOT EXISTS idx_trips_active ON trips(is_active);
CREATE INDEX IF NOT EXISTS idx_bookings_trip_id ON bookings(trip_id);
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON bookings(phone_number);
CREATE INDEX IF NOT EXISTS idx_escrow_organizer ON escrow_ledger(organizer_id);
CREATE INDEX IF NOT EXISTS idx_escrow_status ON escrow_ledger(status);

-- ============================================================================
-- TRIGGER: ATOMIC SEAT DECREMENT & OVERBOOKING PREVENTION
-- ============================================================================
CREATE OR REPLACE FUNCTION trg_decrement_trip_spots()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE trips
    SET spots_left = spots_left - NEW.seat_count,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.trip_id AND spots_left >= NEW.seat_count;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Cannot book seats: Trip is either fully booked or has insufficient spots remaining.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_after_booking_insert ON bookings;
CREATE TRIGGER trg_after_booking_insert
AFTER INSERT ON bookings
FOR EACH ROW
EXECUTE FUNCTION trg_decrement_trip_spots();

-- ============================================================================
-- TRIGGER: AUTOMATED ESCROW LEDGER RECORDING (8% COMMISSION CALCULATION)
-- ============================================================================
CREATE OR REPLACE FUNCTION trg_auto_record_escrow()
RETURNS TRIGGER AS $$
DECLARE
    v_organizer_id VARCHAR(64);
    v_organizer_account VARCHAR(100);
    v_platform_fee INT;
    v_net_payout INT;
BEGIN
    SELECT organizer_id INTO v_organizer_id FROM trips WHERE id = NEW.trip_id;
    SELECT COALESCE(payout_account_telebirr, payout_account_cbe) INTO v_organizer_account FROM organizers WHERE id = v_organizer_id;

    v_platform_fee := ROUND(NEW.final_total_etb * 0.08);
    v_net_payout := NEW.final_total_etb - v_platform_fee;

    INSERT INTO escrow_ledger (
        escrow_ref,
        booking_id,
        organizer_id,
        gross_amount_etb,
        platform_commission_rate,
        platform_fee_etb,
        net_organizer_payout_etb,
        status,
        payout_account
    ) VALUES (
        'ESC-' || FLOOR(100000 + RANDOM() * 900000)::TEXT,
        NEW.id,
        v_organizer_id,
        NEW.final_total_etb,
        0.08,
        v_platform_fee,
        v_net_payout,
        'HELD_IN_ESCROW',
        v_organizer_account
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_after_booking_escrow ON bookings;
CREATE TRIGGER trg_after_booking_escrow
AFTER INSERT ON bookings
FOR EACH ROW
EXECUTE FUNCTION trg_auto_record_escrow();
