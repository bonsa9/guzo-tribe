import React from 'react';
import { Play } from 'lucide-react';

export default function SqlQueryRunner({
  queryInput,
  setQueryInput,
  queryResult,
  onRunQuery
}) {
  const sampleQueries = [
    { label: 'Weekend Hikes <= 2,500 ETB', sql: `SELECT title, price_etb, spots_left, category \nFROM trips \nWHERE category = 'Weekend Hikes' AND price_etb <= 2500;` },
    { label: 'Recent Passenger Bookings', sql: `SELECT booking_reference, passenger_name, passenger_phone, seats_booked, status \nFROM bookings \nORDER BY id DESC LIMIT 5;` },
    { label: 'Escrow Fee Balances (8%)', sql: `SELECT booking_id, total_amount_etb, platform_fee_etb, organizer_payout_etb, custody_status \nFROM escrow_ledger;` }
  ];

  return (
    <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <h3 className="font-bold text-base text-stone-900">
          Interactive SQL Query Console
        </h3>
        <span className="text-xs text-stone-500">PostgreSQL 14+ Dialect</span>
      </div>

      {/* Preset Queries */}
      <div className="flex flex-wrap gap-2">
        {sampleQueries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => setQueryInput(q.sql)}
            className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-all cursor-pointer"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Query Input */}
      <div className="space-y-2">
        <textarea
          rows={4}
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          className="w-full p-4 rounded-2xl bg-stone-950 text-emerald-400 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={onRunQuery}
          className="px-6 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Execute Query</span>
        </button>
      </div>

      {/* Query Results */}
      {queryResult && (
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-stone-700">Query Output:</span>
          <pre className="p-4 rounded-2xl bg-stone-950 text-stone-200 font-mono text-xs overflow-x-auto leading-relaxed border border-stone-800">
            {JSON.stringify(queryResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
