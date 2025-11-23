import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import type { COI, COIStatus } from '../../types/coi.types';
import COITableRow from './COITableRow';

interface COITableProps {
  cois: COI[];
  selectedCOIs: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: (select: boolean) => void;
  onEdit: (coi: COI) => void;
  onDelete: (id: string) => void;
  onSendReminder: (id: string) => void;
  onStatusChange: (id: string, status: COIStatus) => void;
  onSort: (column: string) => void;
  sortColumn: string;
  sortDirection?: 'asc' | 'desc';
}

const COITable: React.FC<COITableProps> = ({
  cois,
  selectedCOIs,
  onToggleSelect,
  onSelectAll,
  onEdit,
  onDelete,
  onSendReminder,
  onStatusChange,
  onSort,
  sortColumn,
}) => {
  const allSelected = cois.length > 0 && selectedCOIs.length === cois.length;
  const someSelected = selectedCOIs.length > 0 && selectedCOIs.length < cois.length;

  const SortIcon: React.FC<{ column: string }> = ({ column }) => (
    <button
      onClick={() => onSort(column)}
      className={`ml-0.5 ${
        sortColumn === column ? 'text-gray-600' : 'text-gray-400 opacity-50'
      }`}
    >
      <ArrowUpDown size={12} />
    </button>
  );

  return (
    <div className="overflow-y-auto bg-white dark:bg-gray-900 h-full">
      <table className="w-full table-fixed">
        <thead className="bg-gray-50/60 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10 backdrop-blur-sm">
          <tr>
            <th className="px-4 py-3 text-left w-12">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = someSelected;
                  }
                }}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded"
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 w-[12%]">
              <div className="flex items-center gap-1">
                Property
                <SortIcon column="property" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 w-[14%]">
              <div className="flex items-center gap-1">
                Tenant Name
                <SortIcon column="tenantName" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 w-[8%]">
              Unit
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 w-[15%]">
              COI Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 w-[12%]">
              <div className="flex items-center gap-1">
                Expiry Date
                <SortIcon column="expiryDate" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 w-[13%]">
              <div className="flex items-center gap-1">
                Status
                <SortIcon column="status" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 w-[13%]">
              Reminder Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 w-[8%]">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900">
          {cois.map((coi) => (
            <COITableRow
              key={coi.id}
              coi={coi}
              isSelected={selectedCOIs.includes(coi.id)}
              onToggleSelect={onToggleSelect}
              onEdit={onEdit}
              onDelete={onDelete}
              onSendReminder={onSendReminder}
              onStatusChange={onStatusChange}
            />
          ))}
        </tbody>
      </table>
      {cois.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No COIs found matching your filters
        </div>
      )}
    </div>
  );
};

export default COITable;
