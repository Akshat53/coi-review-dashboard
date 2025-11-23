import { useMemo } from 'react';
import type { COI, COIFilters } from '../types/coi.types';
import { isWithinDateRange } from '../utils/dateUtils';

export const useFilteredCOIs = (cois: COI[], filters: COIFilters): COI[] => {
  return useMemo(() => {
    let filtered = [...cois];

    // Filter by properties
    if (filters.properties.length > 0) {
      filtered = filtered.filter(coi =>
        filters.properties.includes(coi.property)
      );
    }

    // Filter by statuses
    if (filters.statuses.length > 0) {
      filtered = filtered.filter(coi =>
        filters.statuses.includes(coi.status)
      );
    }

    // Filter by expiry range
    if (filters.expiryRange !== 'all') {
      filtered = filtered.filter(coi =>
        isWithinDateRange(coi.expiryDate, filters.expiryRange)
      );
    }

    // Filter by search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        coi =>
          coi.property.toLowerCase().includes(query) ||
          coi.tenantName.toLowerCase().includes(query) ||
          coi.unit.toLowerCase().includes(query) ||
          coi.coiName.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [cois, filters]);
};
