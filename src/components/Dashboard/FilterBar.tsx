import React, { useState } from 'react';
import { Search, Settings, Plus, Download } from 'lucide-react';
import type { COIFilters, COIStatus } from '../../types/coi.types';
import Dropdown from '../Shared/Dropdown';

interface FilterBarProps {
  filters: COIFilters;
  onFiltersChange: (filters: COIFilters) => void;
  onAddCOI: () => void;
  onExportCSV: () => void;
  uniqueProperties: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  onAddCOI,
  onExportCSV,
  uniqueProperties,
}) => {
  const [searchInput, setSearchInput] = useState(filters.searchQuery);

  const statusOptions: COIStatus[] = [
    'Active',
    'Expired',
    'Rejected',
    'Expiring Soon',
    'Not Processed',
  ];

  const expiryOptions = [
    { value: 'all', label: 'Filter by Expiry' },
    { value: '30days', label: 'Next 30 days' },
    { value: '60days', label: 'Next 60 days' },
    { value: '90days', label: 'Next 90 days' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    onFiltersChange({ ...filters, searchQuery: value });
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between gap-3 flex-wrap lg:flex-nowrap">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 flex-wrap sm:flex-nowrap min-w-0">
          <Dropdown
            label="All Properties"
            options={uniqueProperties}
            selectedOptions={filters.properties}
            onChange={(selected) =>
              onFiltersChange({ ...filters, properties: selected })
            }
            multiSelect
          />

          <Dropdown
            label="Status"
            options={statusOptions}
            selectedOptions={filters.statuses}
            onChange={(selected) =>
              onFiltersChange({ ...filters, statuses: selected as COIStatus[] })
            }
            multiSelect
          />

          <div className="relative">
            <select
              value={filters.expiryRange}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  expiryRange: e.target.value as any,
                })
              }
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {expiryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by tenant, properties, or unit..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExportCSV}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Export to CSV"
            >
              <Download size={20} />
            </button>

            <button
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        <button
          onClick={onAddCOI}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap text-sm font-medium"
        >
          <Plus size={18} />
          <span>ADD COI</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
