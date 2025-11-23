import React, { useState, useMemo } from 'react';
import { FileCheck2, FileX2, Clock } from 'lucide-react';
import { useCOI } from '../context/COIContext';
import { useFilteredCOIs } from '../hooks/useFilteredCOIs';
import { useDebounce } from '../hooks/useDebounce';
import { isExpiringSoon } from '../utils/dateUtils';
import StatsCard from '../components/Dashboard/StatsCard';
import FilterBar from '../components/Dashboard/FilterBar';
import COITable from '../components/COI/COITable';
import COIForm from '../components/COI/COIForm';
import Pagination from '../components/Dashboard/Pagination';
import type { COI, COIStatus } from '../types/coi.types';

const DashboardPage: React.FC = () => {
  const {
    cois,
    selectedCOIs,
    filters,
    setFilters,
    addCOI,
    updateCOI,
    deleteCOI,
    toggleSelectCOI,
    selectAllCOIs,
    sendReminders,
    exportToCSV,
  } = useCOI();

  const [showCOIForm, setShowCOIForm] = useState(false);
  const [editingCOI, setEditingCOI] = useState<COI | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Debounce search query for better performance
  const debouncedFilters = useDebounce(filters, 300);
  const filteredCOIs = useFilteredCOIs(cois, debouncedFilters);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = cois.length;
    const accepted = cois.filter(c => c.status === 'Active').length;
    const rejected = cois.filter(c => c.status === 'Rejected').length;
    const expiringSoon = cois.filter(c => isExpiringSoon(c.expiryDate)).length;

    return { total, accepted, rejected, expiringSoon };
  }, [cois]);

  // Get unique properties for filter dropdown
  const uniqueProperties = useMemo(() => {
    return Array.from(new Set(cois.map(c => c.property))).sort();
  }, [cois]);

  // Sort COIs
  const sortedCOIs = useMemo(() => {
    const sorted = [...filteredCOIs];
    sorted.sort((a, b) => {
      let aVal: any = a[sortColumn as keyof COI];
      let bVal: any = b[sortColumn as keyof COI];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredCOIs, sortColumn, sortDirection]);

  // Paginate COIs
  const paginatedCOIs = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedCOIs.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedCOIs, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedCOIs.length / rowsPerPage);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleAddCOI = () => {
    setEditingCOI(null);
    setShowCOIForm(true);
  };

  const handleEditCOI = (coi: COI) => {
    setEditingCOI(coi);
    setShowCOIForm(true);
  };

  const handleSubmitCOI = (data: Partial<COI>) => {
    if (editingCOI) {
      updateCOI(editingCOI.id, data);
    } else {
      addCOI(data as Omit<COI, 'id' | 'createdAt'>);
    }
    setShowCOIForm(false);
    setEditingCOI(null);
  };

  const handleStatusChange = (id: string, status: COIStatus) => {
    updateCOI(id, { status });
  };

  const handleSendReminder = (id: string) => {
    sendReminders([id]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [debouncedFilters]);

  return (
    <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-950">
      <div className="p-6 max-w-[1800px]">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total COI Processed"
            value={stats.total}
            icon={<FileCheck2 size={24} />}
            bgColor="bg-blue-100 dark:bg-blue-900/30"
            iconColor="text-blue-600 dark:text-blue-400"
          />
          <StatsCard
            title="Accepted"
            value={stats.accepted}
            icon={<FileCheck2 size={24} />}
            bgColor="bg-green-100 dark:bg-green-900/30"
            iconColor="text-green-600 dark:text-green-400"
          />
          <StatsCard
            title="Rejected"
            value={stats.rejected}
            icon={<FileX2 size={24} />}
            bgColor="bg-red-100 dark:bg-red-900/30"
            iconColor="text-red-600 dark:text-red-400"
          />
          <StatsCard
            title="Expiring in 30 days"
            value={stats.expiringSoon}
            icon={<Clock size={24} />}
            bgColor="bg-orange-100 dark:bg-orange-900/30"
            iconColor="text-orange-600 dark:text-orange-400"
          />
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[calc(100vh-280px)]">
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            onAddCOI={handleAddCOI}
            onExportCSV={exportToCSV}
            uniqueProperties={uniqueProperties}
          />

          <div className="flex-1 min-h-0">
            <COITable
              cois={paginatedCOIs}
              selectedCOIs={selectedCOIs}
              onToggleSelect={toggleSelectCOI}
              onSelectAll={selectAllCOIs}
              onEdit={handleEditCOI}
              onDelete={deleteCOI}
              onSendReminder={handleSendReminder}
              onStatusChange={handleStatusChange}
              onSort={handleSort}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
            />
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </div>
      </div>

      {/* COI Form Modal */}
      <COIForm
        isOpen={showCOIForm}
        onClose={() => {
          setShowCOIForm(false);
          setEditingCOI(null);
        }}
        onSubmit={handleSubmitCOI}
        initialData={editingCOI}
      />
    </div>
  );
};

export default DashboardPage;
