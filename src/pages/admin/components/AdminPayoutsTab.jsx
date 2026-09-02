import React from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';

export default function AdminPayoutsTab({ 
  payouts, 
  onReleasePayout 
}) {
  const payoutColumns = [
    {
      header: 'Payout Ref',
      accessor: 'id',
      sortable: true,
      render: (row) => <span className="font-mono font-bold text-amber-700">{row.id}</span>
    },
    {
      header: 'Tour Organizer & Trip',
      accessor: 'organizerName',
      sortable: true,
      render: (row) => (
        <div>
          <strong className="block text-stone-900">{row.organizerName}</strong>
          <span className="text-stone-500 text-[11px]">{row.tripTitle}</span>
          <span className="text-[10px] text-stone-400 block font-mono">Completed: {row.completionDate}</span>
        </div>
      )
    },
    {
      header: 'Gross (ETB)',
      accessor: 'grossAmountETB',
      sortable: true,
      render: (row) => <span className="font-mono font-semibold">{row.grossAmountETB.toLocaleString()} ETB</span>
    },
    {
      header: '8% Take Rate',
      accessor: 'platformFeeETB',
      sortable: true,
      render: (row) => <span className="font-mono text-amber-700 font-bold">-{row.platformFeeETB.toLocaleString()} ETB</span>
    },
    {
      header: 'Net Payout',
      accessor: 'netPayoutETB',
      sortable: true,
      render: (row) => <span className="font-mono font-black text-emerald-800">{row.netPayoutETB.toLocaleString()} ETB</span>
    },
    {
      header: 'Account / Wallet',
      accessor: 'bankOrWallet',
      sortable: false,
      render: (row) => (
        <span className="font-mono text-xs text-stone-700">
          {row.bankOrWallet} <span className="text-stone-400 block text-[10px]">{row.accountNumber}</span>
        </span>
      )
    },
    {
      header: 'Status & Action',
      accessor: 'status',
      sortable: true,
      render: (row) => {
        if (row.status === 'ready_to_release') {
          return (
            <button
              onClick={() => onReleasePayout(row.id)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-amber-300" />
              <span>Release</span>
            </button>
          );
        }
        if (row.status === 'released') {
          return (
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold flex items-center gap-1 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Settled</span>
            </span>
          );
        }
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold flex items-center gap-1 w-fit">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Held</span>
          </span>
        );
      }
    }
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <DataTable
        title="Escrow Custody Payout Ledger"
        subtitle="Authorize Telebirr & CBE escrow releases to tour organizers after safe trip completion (8% platform fee retained)."
        data={payouts}
        columns={payoutColumns}
        searchKeys={['id', 'organizerName', 'tripTitle', 'bankOrWallet', 'accountNumber']}
        searchPlaceholder="Search payout ledger by ID, organizer, or bank account..."
        filterKey="status"
        filterOptions={[
          { label: 'All Payouts', value: 'ALL' },
          { label: 'Ready to Release', value: 'ready_to_release' },
          { label: 'Settled / Released', value: 'released' },
          { label: 'Held in Review', value: 'held_for_review' }
        ]}
        exportFileName="GuzoTribe_Escrow_Payouts_Ledger"
      />
    </div>
  );
}
