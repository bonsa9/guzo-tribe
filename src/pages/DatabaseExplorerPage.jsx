import React, { useState } from 'react';
import { Database, Table, Code, Play } from 'lucide-react';
import { tripsData } from '../data/tripsData';
import { organizersData } from '../data/organizersData';
import { sampleBookings } from '../data/bookingsData';
import { useToast } from '../context/ToastContext';

import SchemaCatalogView from '../components/database/SchemaCatalogView';
import SqlQueryRunner from '../components/database/SqlQueryRunner';
import DdlCodeViewer from '../components/database/DdlCodeViewer';

export default function DatabaseExplorerPage({ lang: _lang }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('schema'); // 'schema' | 'ddl' | 'query'
  const [selectedTable, setSelectedTable] = useState('trips');
  const [copied, setCopied] = useState(false);
  const [queryInput, setQueryInput] = useState(
    `SELECT title, price_etb, spots_left, category \nFROM trips \nWHERE category = 'Weekend Hikes' AND price_etb <= 2500;`
  );
  const [queryResult, setQueryResult] = useState(null);

  const tables = [
    { name: 'organizers', count: organizersData.length, desc: 'Tour hosts, hiking clubs, licenses & Telebirr/CBE accounts' },
    { name: 'destinations', count: 6, desc: 'Landmarks (Wenchi, Simien, Bale, Danakil, Lalibela)' },
    { name: 'trips', count: tripsData.length, desc: 'Curated itineraries, ETB/USD prices, JSONB milestones' },
    { name: 'bookings', count: sampleBookings.length, desc: 'Passenger manifest, phone numbers, seat counts & check-in' },
    { name: 'escrow_ledger', count: 4, desc: 'Custody balances, 8% platform fees & organizer net shares' },
    { name: 'reviews', count: 18, desc: 'Verified traveler ratings & reviews' },
    { name: 'payout_requests', count: 3, desc: 'Organizer Telebirr & CBE withdrawal logs' }
  ];

  const handleCopyDDL = (ddl) => {
    navigator.clipboard.writeText(ddl);
    setCopied(true);
    addToast('PostgreSQL DDL script copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunQuery = () => {
    if (queryInput.toLowerCase().includes('weekend hikes')) {
      setQueryResult([
        { title: 'Wenchi Crater Lake Hike & Boat Ride', price_etb: 2200, spots_left: 6, category: 'Weekend Hikes' },
        { title: 'Menagesha Suba Forest Eco-Walk', price_etb: 1800, spots_left: 11, category: 'Weekend Hikes' },
        { title: 'Debre Libanos Gorge & Monastery', price_etb: 2400, spots_left: 9, category: 'Weekend Hikes' }
      ]);
    } else if (queryInput.toLowerCase().includes('bookings')) {
      setQueryResult(sampleBookings.slice(0, 3));
    } else {
      setQueryResult(tripsData.slice(0, 3).map(t => ({ title: t.title, price_etb: t.priceETB, organizer: t.organizerName })));
    }
    addToast('SQL Query executed successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider">
            <Database className="w-4 h-4 text-indigo-700" />
            <span>PostgreSQL Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            PostgreSQL Database & Schema Explorer
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm">
            Relational tables, JSONB itineraries, foreign key constraints, atomic overbooking triggers, and 8% escrow ledger calculations.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-2 border-b border-stone-200 pb-3 text-xs font-bold">
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'schema' ? 'bg-indigo-900 text-white shadow-md' : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Table Schema Catalog</span>
          </button>
          <button
            onClick={() => setActiveTab('query')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'query' ? 'bg-indigo-900 text-white shadow-md' : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Interactive SQL Runner</span>
          </button>
          <button
            onClick={() => setActiveTab('ddl')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ddl' ? 'bg-indigo-900 text-white shadow-md' : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Full DDL Schema Script</span>
          </button>
        </div>

        {/* Tab 1: Schema Catalog View */}
        {activeTab === 'schema' && (
          <SchemaCatalogView
            tables={tables}
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
          />
        )}

        {/* Tab 2: Interactive SQL Query Runner */}
        {activeTab === 'query' && (
          <SqlQueryRunner
            queryInput={queryInput}
            setQueryInput={setQueryInput}
            queryResult={queryResult}
            onRunQuery={handleRunQuery}
          />
        )}

        {/* Tab 3: DDL Code Viewer */}
        {activeTab === 'ddl' && (
          <DdlCodeViewer
            copied={copied}
            onCopy={handleCopyDDL}
          />
        )}

      </div>
    </div>
  );
}
