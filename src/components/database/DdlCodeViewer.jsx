import React from 'react';
import { Copy, Check, FileCode } from 'lucide-react';

export default function DdlCodeViewer({
  copied,
  onCopy
}) {
  const ddlScript = `-- ==========================================
-- GuzoTribe (ጉዞትራይብ) — PostgreSQL 14+ DDL Schema
-- ==========================================

-- 1. Organizers & Tour Clubs
CREATE TABLE organizers (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    license_number VARCHAR(128) UNIQUE,
    telebirr_account VARCHAR(32),
    cbe_account_number VARCHAR(64),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Curated Group Trips
CREATE TABLE trips (
    id VARCHAR(64) PRIMARY KEY,
    organizer_id VARCHAR(64) REFERENCES organizers(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    amharic_title VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    price_etb INTEGER NOT NULL CHECK (price_etb > 0),
    price_usd INTEGER NOT NULL CHECK (price_usd > 0),
    total_spots INTEGER NOT NULL,
    spots_left INTEGER NOT NULL CHECK (spots_left >= 0),
    elevation_meters INTEGER,
    departure_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Atomic Overbooking Prevention Trigger
CREATE OR REPLACE FUNCTION decrement_spots_on_booking()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE trips
    SET spots_left = spots_left - NEW.seats_booked
    WHERE id = NEW.trip_id AND spots_left >= NEW.seats_booked;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Cannot complete booking: insufficient available seats.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_decrement_trip_spots
AFTER INSERT ON bookings
FOR EACH ROW EXECUTE FUNCTION decrement_spots_on_booking();`;

  return (
    <div className="bg-stone-950 p-6 rounded-3xl border border-stone-800 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-stone-800 pb-3">
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold">
          <FileCode className="w-4 h-4" />
          <span>server/db/schema.sql</span>
        </div>
        <button
          onClick={() => onCopy(ddlScript)}
          className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied DDL!' : 'Copy SQL DDL'}</span>
        </button>
      </div>

      <pre className="text-stone-300 font-mono text-xs overflow-x-auto p-2 leading-relaxed max-h-[500px]">
        {ddlScript}
      </pre>
    </div>
  );
}
