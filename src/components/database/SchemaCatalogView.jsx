import React from 'react';
import { Table } from 'lucide-react';

export default function SchemaCatalogView({
  tables,
  selectedTable,
  setSelectedTable
}) {
  const tableDefinitions = {
    organizers: [
      { col: 'id', type: 'VARCHAR(64)', constraint: 'PRIMARY KEY', desc: 'Unique club slug (e.g. addis-hikers)' },
      { col: 'name', type: 'VARCHAR(255)', constraint: 'NOT NULL', desc: 'Official registered club name' },
      { col: 'license_number', type: 'VARCHAR(128)', constraint: 'UNIQUE', desc: 'Ethiopian Ministry of Tourism license' },
      { col: 'telebirr_account', type: 'VARCHAR(32)', constraint: 'NULLABLE', desc: 'Telebirr merchant shortcode or phone' },
      { col: 'cbe_account_number', type: 'VARCHAR(64)', constraint: 'NULLABLE', desc: 'Commercial Bank of Ethiopia payout account' },
      { col: 'verified', type: 'BOOLEAN', constraint: 'DEFAULT FALSE', desc: 'Verified tour club badge' }
    ],
    trips: [
      { col: 'id', type: 'VARCHAR(64)', constraint: 'PRIMARY KEY', desc: 'Trip slug (e.g. wenchi-crater-lake)' },
      { col: 'organizer_id', type: 'VARCHAR(64)', constraint: 'REFERENCES organizers(id)', desc: 'Hosting tour club' },
      { col: 'title', type: 'VARCHAR(255)', constraint: 'NOT NULL', desc: 'English trip title' },
      { col: 'amharic_title', type: 'VARCHAR(255)', constraint: 'NOT NULL', desc: 'Amharic trip title (የጉዞ ርዕስ)' },
      { col: 'price_etb', type: 'INTEGER', constraint: 'NOT NULL CHECK (price_etb > 0)', desc: 'Price per seat in ETB' },
      { col: 'total_spots', type: 'INTEGER', constraint: 'NOT NULL', desc: 'Maximum bus / vehicle capacity' },
      { col: 'spots_left', type: 'INTEGER', constraint: 'NOT NULL CHECK (spots_left >= 0)', desc: 'Atomic decremented seat pool' },
      { col: 'elevation_meters', type: 'INTEGER', constraint: 'NULLABLE', desc: 'Altitude (e.g. 3000m for Wenchi, 4120m for Sanetti)' }
    ],
    bookings: [
      { col: 'id', type: 'SERIAL', constraint: 'PRIMARY KEY', desc: 'Internal integer booking ID' },
      { col: 'booking_reference', type: 'VARCHAR(32)', constraint: 'UNIQUE NOT NULL', desc: 'Customer pass reference (e.g. GZ-8842-ETH)' },
      { col: 'trip_id', type: 'VARCHAR(64)', constraint: 'REFERENCES trips(id)', desc: 'Booked departure' },
      { col: 'passenger_name', type: 'VARCHAR(255)', constraint: 'NOT NULL', desc: 'Official passenger name for checkpoint manifest' },
      { col: 'passenger_phone', type: 'VARCHAR(32)', constraint: 'NOT NULL', desc: 'Contact phone / Telebirr account' },
      { col: 'seats_booked', type: 'INTEGER', constraint: 'DEFAULT 1', desc: 'Number of passenger seats' },
      { col: 'status', type: 'VARCHAR(32)', constraint: 'CHECK (status IN (\'CONFIRMED\', \'CANCELLED\'))', desc: 'Booking state' }
    ],
    escrow_ledger: [
      { col: 'id', type: 'SERIAL', constraint: 'PRIMARY KEY', desc: 'Ledger transaction ID' },
      { col: 'booking_id', type: 'INTEGER', constraint: 'REFERENCES bookings(id)', desc: 'Associated passenger booking' },
      { col: 'total_amount_etb', type: 'NUMERIC(12, 2)', constraint: 'NOT NULL', desc: 'Gross booking value' },
      { col: 'platform_fee_etb', type: 'NUMERIC(12, 2)', constraint: 'NOT NULL', desc: 'GuzoTribe 8% take rate' },
      { col: 'organizer_payout_etb', type: 'NUMERIC(12, 2)', constraint: 'NOT NULL', desc: 'Net 92% payout pool for host' },
      { col: 'custody_status', type: 'VARCHAR(32)', constraint: 'DEFAULT \'HELD_IN_ESCROW\'', desc: 'HELD_IN_ESCROW, RELEASED, REFUNDED' }
    ]
  };

  const currentCols = tableDefinitions[selectedTable] || tableDefinitions.trips;

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      
      {/* Left: Table List */}
      <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-2">
        <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
          PostgreSQL Database Tables
        </h3>
        {tables.map((t) => (
          <button
            key={t.name}
            onClick={() => setSelectedTable(t.name)}
            className={`w-full p-3.5 rounded-2xl text-left transition-all flex items-center justify-between cursor-pointer ${
              selectedTable === t.name
                ? 'bg-indigo-900 text-white shadow-md font-bold'
                : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Table className="w-4 h-4 text-indigo-400" />
              <span className="font-mono text-xs">{t.name}</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
              selectedTable === t.name ? 'bg-indigo-800 text-indigo-200' : 'bg-stone-200 text-stone-600'
            }`}>
              {t.count} rows
            </span>
          </button>
        ))}
      </div>

      {/* Right: Table Column Viewer */}
      <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="font-bold text-base text-stone-900 font-mono">
              public.{selectedTable}
            </h3>
            <p className="text-xs text-stone-500">
              {tables.find((t) => t.name === selectedTable)?.desc}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-800 bg-indigo-50 px-3 py-1 rounded-xl">
            {currentCols.length} Columns
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-mono">
                <th className="pb-2">Column Name</th>
                <th className="pb-2">Data Type</th>
                <th className="pb-2">Constraints</th>
                <th className="pb-2">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-mono">
              {currentCols.map((col, idx) => (
                <tr key={idx} className="hover:bg-stone-50">
                  <td className="py-2.5 font-bold text-stone-900">{col.col}</td>
                  <td className="py-2.5 text-indigo-700">{col.type}</td>
                  <td className="py-2.5 text-amber-700 font-semibold">{col.constraint}</td>
                  <td className="py-2.5 text-stone-600 font-sans">{col.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
