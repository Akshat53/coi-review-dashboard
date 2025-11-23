import type { COIStatus } from '../types/coi.types';

export const getStatusColor = (status: COIStatus): string => {
  switch (status) {
    case 'Active':
      return 'bg-blue-50/50 text-blue-600 border border-blue-100 dark:bg-blue-900 dark:text-blue-200';
    case 'Expired':
      return 'bg-red-50/50 text-red-600 border border-red-100 dark:bg-red-900 dark:text-red-200';
    case 'Rejected':
      return 'bg-red-50/50 text-red-600 border border-red-100 dark:bg-red-900 dark:text-red-200';
    case 'Expiring Soon':
      return 'bg-orange-50/50 text-orange-600 border border-orange-100 dark:bg-orange-900 dark:text-orange-200';
    case 'Not Processed':
      return 'bg-gray-50 text-gray-600 border border-gray-100 dark:bg-gray-700 dark:text-gray-200';
    default:
      return 'bg-gray-50 text-gray-600 border border-gray-100';
  }
};

export const getStatusBadgeColor = (status: COIStatus): string => {
  switch (status) {
    case 'Active':
      return 'border-blue-500 bg-blue-50';
    case 'Expired':
      return 'border-red-500 bg-red-50';
    case 'Rejected':
      return 'border-red-500 bg-red-50';
    case 'Expiring Soon':
      return 'border-orange-500 bg-orange-50';
    case 'Not Processed':
      return 'border-gray-500 bg-gray-50';
    default:
      return 'border-gray-500 bg-gray-50';
  }
};
