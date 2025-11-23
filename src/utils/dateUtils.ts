import { format, differenceInDays, parseISO } from 'date-fns';

export const formatDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  } catch (error) {
    return dateString;
  }
};

export const isExpiringSoon = (expiryDate: string): boolean => {
  const days = differenceInDays(parseISO(expiryDate), new Date());
  return days >= 0 && days <= 30;
};

export const isExpired = (expiryDate: string): boolean => {
  const days = differenceInDays(parseISO(expiryDate), new Date());
  return days < 0;
};

export const getDaysUntilExpiry = (expiryDate: string): number => {
  return differenceInDays(parseISO(expiryDate), new Date());
};

export const isWithinDateRange = (expiryDate: string, range: string): boolean => {
  const days = differenceInDays(parseISO(expiryDate), new Date());

  switch (range) {
    case '30days':
      return days >= 0 && days <= 30;
    case '60days':
      return days >= 0 && days <= 60;
    case '90days':
      return days >= 0 && days <= 90;
    default:
      return true;
  }
};
