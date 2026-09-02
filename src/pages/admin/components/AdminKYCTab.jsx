import React, { useState, useMemo } from 'react';
import { Check, X, Search, LayoutGrid, Table as TableIcon } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';

export default function AdminKYCTab({ 
  organizers, 
  onApprove, 
  onReject 
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredOrganizers = useMemo(() => {
    return organizers.filter((org) => {
      if (statusFilter !== 'ALL' && org.status !== statusFilter) return false;
      const term = searchTerm.trim().toLowerCase();
      if (!term) return true;
      return (
        org.businessName.toLowerCase().includes(term) ||
        org.ownerName.toLowerCase().includes(term) ||
        org.licenseNumber.toLowerCase().includes(term) ||
        org.telegramHandle.toLowerCase().includes(term) ||
        org.specialty.toLowerCase().includes(term)
      );
    });
  }, [organizers, searchTerm, statusFilter]);

  const kycColumns = [
    {
      header: 'Club Name / Org ID',
      accessor: 'businessName',
      sortable: true,
      render: (row) => (
        <div>
          <strong className="block text-white">{row.businessName}</strong>
          <span className="text-[10px] font-mono text-stone-500">{row.id}</span>
        </div>
      )
    },
    {
      header: 'Lead Host',
      accessor: 'ownerName',
      sortable: true,
      render: (row) => (
        <div>
          <span className="text-stone-200 block">{row.ownerName}</span>
          <span className="text-[10px] text-sky-400">{row.telegramHandle}</span>
        </div>
      )
    },
    {
      header: 'Tourism License #',
      accessor: 'licenseNumber',
      sortable: true,
      render: (row) => <span className="font-mono text-amber-400 font-bold">{row.licenseNumber}</span>
    },
    {
      header: 'Specialty / Fleet',
      accessor: 'specialty',
      sortable: true,
      render: (row) => (
        <div>
          <span className="text-emerald-400 block font-semibold">{row.specialty}</span>
          <span className="text-[10px] text-stone-400 truncate max-w-[150px] block">{row.fleetInfo}</span>
        </div>
      )
    },
    {
      header: 'KYC Status',
      accessor: 'status',
      sortable: true,
      render: (row) => (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
          row.status === 'approved' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
          row.status === 'rejected' ? 'bg-rose-950 text-rose-300 border border-rose-700' :
          'bg-amber-950 text-amber-300 border border-amber-700'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      sortable: false,
      render: (row) => {
        if (row.status === 'pending') {
          return (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onReject(row.id)}
                className="p-1.5 rounded-lg border border-rose-800 hover:bg-rose-950 text-rose-300 transition-all cursor-pointer"
                title="Decline License"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onApprove(row.id)}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-all cursor-pointer flex items-center gap-1 text-[11px]"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Verify</span>
              </button>
            </div>
          );
        }
        return (
          <span className="text-[11px] text-stone-500 font-semibold">
            {row.status === 'approved' ? '🛡️ Verified' : 'Declined'}
          </span>
        );
      }
    }
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-serif">Organizer KYC & License Verification</h2>
          <p className="text-xs text-stone-400">
            Review Ministry of Tourism credentials, guide certifications, and grant Verified Club badges.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <div className="bg-stone-900 border border-stone-800 p-1 rounded-xl flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
              title="Data Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: DATA TABLE VIEW */}
      {viewMode === 'table' ? (
        <div className="bg-stone-900 rounded-3xl p-2 border border-stone-800 text-stone-100">
          <DataTable
            title="Tour Operators Directory"
            subtitle="Verified Ethiopian tour organizers and pending license verification queue"
            data={organizers}
            columns={kycColumns}
            searchKeys={['businessName', 'ownerName', 'licenseNumber', 'telegramHandle', 'specialty']}
            searchPlaceholder="Search organizers by name, license #, or Telegram..."
            filterKey="status"
            filterOptions={[
              { label: 'All Hosts', value: 'ALL' },
              { label: 'Pending Verification', value: 'pending' },
              { label: 'Approved', value: 'approved' },
              { label: 'Declined', value: 'rejected' }
            ]}
            exportFileName="GuzoTribe_Organizers_KYC"
          />
        </div>
      ) : (
        /* VIEW 2: GRID CARDS VIEW WITH SEARCH & FILTER */
        <div className="space-y-4">
          
          {/* Search & Status Filter Chips */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search organizers..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-stone-900 border border-stone-800 text-white placeholder:text-stone-500 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
              {[
                { label: 'All', value: 'ALL' },
                { label: 'Pending', value: 'pending' },
                { label: 'Approved', value: 'approved' },
                { label: 'Declined', value: 'rejected' }
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStatusFilter(opt.value)}
                  className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer text-xs shrink-0 ${
                    statusFilter === opt.value
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOrganizers.map((org) => {
              const isPending = org.status === 'pending';
              const isApproved = org.status === 'approved';
              const isRejected = org.status === 'rejected';

              return (
                <div
                  key={org.id}
                  className="bg-stone-900 p-6 rounded-3xl border border-stone-800 flex flex-col justify-between space-y-4 hover:border-stone-700 transition-all shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-stone-500 uppercase">{org.id}</span>
                        <h3 className="font-bold text-base text-white">{org.businessName}</h3>
                        <p className="text-xs text-emerald-400 font-semibold">{org.specialty}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        isApproved ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
                        isRejected ? 'bg-rose-950 text-rose-300 border border-rose-700' :
                        'bg-amber-950 text-amber-300 border border-amber-700'
                      }`}>
                        {org.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-300 bg-stone-950/80 p-3.5 rounded-2xl border border-stone-800/80">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Lead Host:</span>
                        <strong className="text-stone-200">{org.ownerName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">License #:</span>
                        <span className="text-amber-400 font-mono font-bold">{org.licenseNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Telegram:</span>
                        <span className="text-sky-400">{org.telegramHandle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Fleet:</span>
                        <span className="text-stone-300 truncate max-w-[170px]">{org.fleetInfo}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-400 line-clamp-2">
                      📜 <strong className="text-stone-300">Certifications:</strong> {org.guideCertifications}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-stone-800">
                    {isPending ? (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onReject(org.id)}
                          className="py-2 px-3 rounded-xl border border-rose-800/80 hover:bg-rose-950/50 text-rose-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Decline</span>
                        </button>
                        <button
                          onClick={() => onApprove(org.id)}
                          className="py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 shadow-md"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-1">
                        <span className="text-xs font-bold text-stone-400">
                          {isApproved ? '🛡️ Verified Partner Active' : '❌ Application Archived'}
                        </span>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
