import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { COI, COIFilters, COIContextType, ReminderStatus } from '../types/coi.types';
import { mockCOIs } from '../data/mockCOIs';

const COIContext = createContext<COIContextType | undefined>(undefined);

const STORAGE_KEY = 'coi-dashboard-data';

export const COIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cois, setCois] = useState<COI[]>([]);
  const [selectedCOIs, setSelectedCOIs] = useState<string[]>([]);
  const [filters, setFilters] = useState<COIFilters>({
    properties: [],
    statuses: [],
    expiryRange: 'all',
    searchQuery: '',
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setCois(parsed);
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        setCois(mockCOIs);
      }
    } else {
      setCois(mockCOIs);
    }
  }, []);

  // Save to localStorage whenever cois change
  useEffect(() => {
    if (cois.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cois));
    }
  }, [cois]);

  const addCOI = (coiData: Omit<COI, 'id' | 'createdAt'>) => {
    const newCOI: COI = {
      ...coiData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setCois(prev => [newCOI, ...prev]);
  };

  const updateCOI = (id: string, updates: Partial<COI>) => {
    setCois(prev =>
      prev.map(coi => (coi.id === id ? { ...coi, ...updates } : coi))
    );
  };

  const deleteCOI = (id: string) => {
    setCois(prev => prev.filter(coi => coi.id !== id));
    setSelectedCOIs(prev => prev.filter(selectedId => selectedId !== id));
  };

  const toggleSelectCOI = (id: string) => {
    setSelectedCOIs(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const selectAllCOIs = (select: boolean) => {
    if (select) {
      setSelectedCOIs(cois.map(coi => coi.id));
    } else {
      setSelectedCOIs([]);
    }
  };

  const sendReminders = (ids: string[]) => {
    const reminderStatus: ReminderStatus = 'Sent (30d)';
    setCois(prev =>
      prev.map(coi =>
        ids.includes(coi.id) ? { ...coi, reminderStatus } : coi
      )
    );
    // Clear selection after sending reminders
    setSelectedCOIs([]);
  };

  const exportToCSV = () => {
    const headers = [
      'Property',
      'Tenant Name',
      'Tenant Email',
      'Unit',
      'COI Name',
      'Expiry Date',
      'Status',
      'Reminder Status',
      'Created At',
    ];

    const csvContent = [
      headers.join(','),
      ...cois.map(coi =>
        [
          `"${coi.property}"`,
          `"${coi.tenantName}"`,
          `"${coi.tenantEmail}"`,
          `"${coi.unit}"`,
          `"${coi.coiName}"`,
          coi.expiryDate,
          `"${coi.status}"`,
          `"${coi.reminderStatus}"`,
          coi.createdAt,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `coi-data-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const value: COIContextType = {
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
  };

  return <COIContext.Provider value={value}>{children}</COIContext.Provider>;
};

export const useCOI = () => {
  const context = useContext(COIContext);
  if (context === undefined) {
    throw new Error('useCOI must be used within a COIProvider');
  }
  return context;
};
