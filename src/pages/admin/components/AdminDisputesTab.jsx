import React from 'react';
import { RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';

export default function AdminDisputesTab({ 
  disputes, 
  onResolveRefund, 
  onDismissDispute 
}) {
  const disputeColumns = [
    {
      header: 'Dispute / Booking Ref',
      accessor: 'bookingRef',
      sortable: true,
      render: (row) => (
        <div>
          <span className="font-mono font-bold text-amber-700 block">{row.bookingRef}</span>
          <span className="text-[10px] text-stone-400 font-mono">{row.id}</span>
        </div>
      )
    },
    {
      header: 'Traveler & Host',
      accessor: 'travelerName',
      sortable: true,
      render: (row) => (
        <div>
          <strong className="block text-stone-900">{row.travelerName}</strong>
          <span className="text-[11px] text-stone-500">{row.travelerPhone}</span>
          <span className="text-[10px] text-stone-400 block">Host: {row.organizerName}</span>
        </div>
      )
    },
    {
      header: 'Trip Itinerary',
      accessor: 'tripTitle',
      sortable: true,
      render: (row) => <span className="font-semibold text-stone-700">{row.tripTitle}</span>
    },
    {
      header: 'Claim Reason',
      accessor: 'reason',
      sortable: false,
      render: (row) => <span className="text-stone-600 text-xs line-clamp-2 max-w-xs">{row.reason}</span>
    },
    {
      header: 'Refund Amount',
      accessor: 'amountETB',
      sortable: true,
      render: (row) => <span className="font-mono font-bold text-rose-700">{row.amountETB.toLocaleString()} ETB</span>
    },
    {
      header: 'Status & Resolution',
      accessor: 'status',
      sortable: true,
      render: (row) => {
        if (row.status === 'open') {
          return (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onDismissDispute(row.id)}
                className="px-2.5 py-1 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold cursor-pointer"
              >
                Dismiss
              </button>
              <button
                onClick={() => onResolveRefund(row.id)}
                className="px-3 py-1 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>100% Refund</span>
              </button>
            </div>
          );
        }
        if (row.status === 'refunded') {
          return (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold flex items-center gap-1 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Refunded via Telebirr</span>
            </span>
          );
        }
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-300 text-[10px] font-bold flex items-center gap-1 w-fit">
            <XCircle className="w-3.5 h-3.5 text-stone-500" />
            <span>Dismissed</span>
          </span>
        );
      }
    }
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <DataTable
        title="Traveler Disputes & 100% Escrow Refunds"
        subtitle="Manage traveler claims with automated Telebirr B2C refunds when organizers fail to fulfill tour commitments."
        data={disputes}
        columns={disputeColumns}
        searchKeys={['bookingRef', 'travelerName', 'travelerPhone', 'organizerName', 'tripTitle', 'reason']}
        searchPlaceholder="Search claims by passenger, booking ref, or reason..."
        filterKey="status"
        filterOptions={[
          { label: 'All Claims', value: 'ALL' },
          { label: 'Open Disputes', value: 'open' },
          { label: 'Refunded', value: 'refunded' },
          { label: 'Dismissed', value: 'dismissed' }
        ]}
        exportFileName="GuzoTribe_Disputes_Log"
      />
    </div>
  );
}
