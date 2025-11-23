export type COIStatus = 'Active' | 'Expired' | 'Rejected' | 'Expiring Soon' | 'Not Processed';

export type ReminderStatus = 'Not Sent' | 'Sent (30d)' | 'Sent (15d)' | 'Sent (7d)' | 'N/A';

export interface COI {
  id: string;
  property: string;
  tenantName: string;
  tenantEmail: string;
  unit: string;
  coiName: string;
  expiryDate: string;
  status: COIStatus;
  reminderStatus: ReminderStatus;
  createdAt: string;
}

export interface COIFilters {
  properties: string[];
  statuses: COIStatus[];
  expiryRange: 'all' | '30days' | '60days' | '90days';
  searchQuery: string;
}

export interface COIContextType {
  cois: COI[];
  selectedCOIs: string[];
  filters: COIFilters;
  setFilters: (filters: COIFilters) => void;
  addCOI: (coi: Omit<COI, 'id' | 'createdAt'>) => void;
  updateCOI: (id: string, updates: Partial<COI>) => void;
  deleteCOI: (id: string) => void;
  toggleSelectCOI: (id: string) => void;
  selectAllCOIs: (select: boolean) => void;
  sendReminders: (ids: string[]) => void;
  exportToCSV: () => void;
}
