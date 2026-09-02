import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  ChevronUp, 
  ChevronDown, 
  ChevronsUpDown, 
  Download, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

export default function DataTable({
  title,
  subtitle,
  data = [],
  columns = [],
  searchKeys = [],
  searchPlaceholder = 'Search records...',
  filterKey = null,
  filterOptions = [], // e.g. [{ label: 'All', value: 'ALL' }, { label: 'Confirmed', value: 'CONFIRMED' }]
  initialSortKey = null,
  initialSortDirection = 'asc',
  defaultRowsPerPage = 5,
  actions = null, // Header actions like "Export CSV" or custom buttons
  enableExport = true,
  exportFileName = 'guzotribe_export',
  emptyMessage = 'No matching records found'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [sortKey, setSortKey] = useState(initialSortKey);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // 1. Search & Filter
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Status Filter
      if (filterKey && activeFilter !== 'ALL') {
        const rowValue = row[filterKey];
        if (rowValue !== activeFilter) return false;
      }

      // Search query
      const term = searchTerm.trim().toLowerCase();
      if (!term) return true;

      if (searchKeys.length > 0) {
        return searchKeys.some((key) => {
          const val = row[key];
          return val !== undefined && val !== null && String(val).toLowerCase().includes(term);
        });
      }

      // Fallback: search all values
      return Object.values(row).some((val) =>
        val !== undefined && val !== null && String(val).toLowerCase().includes(term)
      );
    });
  }, [data, searchTerm, activeFilter, filterKey, searchKeys]);

  // 2. Sorting
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];

      if (typeof aVal === 'string') {
        const cmp = aVal.localeCompare(bVal);
        return sortDirection === 'asc' ? cmp : -cmp;
      }

      if (typeof aVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  }, [filteredData, sortKey, sortDirection]);

  // 3. Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    if (sortedData.length === 0) return;
    const headerRow = columns.map((col) => `"${col.header}"`).join(',');
    const bodyRows = sortedData.map((row) =>
      columns
        .map((col) => {
          const val = col.accessor ? row[col.accessor] : '';
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headerRow, ...bodyRows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${exportFileName}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden space-y-4 p-5 sm:p-6 text-stone-800">
      
      {/* Table Header / Title & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          {title && <h3 className="font-extrabold text-base sm:text-lg text-stone-900 font-serif">{title}</h3>}
          {subtitle && <p className="text-xs text-stone-500">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {enableExport && (
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Download CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          )}

          {actions}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-9 py-2 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:bg-white transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                setCurrentPage(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        {filterOptions.length > 0 && (
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setActiveFilter(opt.value);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer shrink-0 text-xs ${
                  activeFilter === opt.value
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* Responsive Table View */}
      <div className="overflow-x-auto rounded-2xl border border-stone-200/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50/90 text-stone-700 font-bold uppercase text-[10px] tracking-wider border-b border-stone-200">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => col.sortable && col.accessor && handleSort(col.accessor)}
                  className={`py-3.5 px-4 ${col.className || ''} ${
                    col.sortable ? 'cursor-pointer select-none hover:bg-stone-100 transition-colors' : ''
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-stone-400">
                        {sortKey === col.accessor ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="w-3.5 h-3.5 text-emerald-700" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-emerald-700" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-3.5 h-3.5" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-stone-800 font-sans">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr key={row.id || rowIdx} className="hover:bg-emerald-50/20 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={`py-3.5 px-4 ${col.cellClassName || ''}`}>
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-stone-400">
                  <div className="space-y-1">
                    <p className="font-bold text-stone-600 text-sm">{emptyMessage}</p>
                    <p className="text-xs">Try adjusting your search terms or filter selection</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-stone-500">
        
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 rounded-lg bg-stone-100 border border-stone-200 font-bold text-stone-800 focus:outline-none cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span className="font-semibold text-stone-700">
            Showing {sortedData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} -{' '}
            {Math.min(currentPage * rowsPerPage, sortedData.length)} of {sortedData.length} entries
          </span>
        </div>

        {/* Page Nav */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-stone-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-bold px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || sortedData.length === 0}
            className="p-1.5 rounded-lg border border-stone-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
