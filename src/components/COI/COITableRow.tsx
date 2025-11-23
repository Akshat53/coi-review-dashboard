import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Edit2, MoreVertical, Trash2, Send } from 'lucide-react';
import type { COI, COIStatus } from '../../types/coi.types';
import { formatDate } from '../../utils/dateUtils';
import { getStatusColor } from '../../utils/statusUtils';

interface COITableRowProps {
  coi: COI;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (coi: COI) => void;
  onDelete: (id: string) => void;
  onSendReminder: (id: string) => void;
  onStatusChange: (id: string, status: COIStatus) => void;
}

const COITableRow: React.FC<COITableRowProps> = ({
  coi,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
  onSendReminder,
  onStatusChange,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [statusDropdownPosition, setStatusDropdownPosition] = useState({ top: 0, left: 0 });

  const actionButtonRef = useRef<HTMLButtonElement>(null);
  const statusButtonRef = useRef<HTMLButtonElement>(null);

  const statuses: COIStatus[] = ['Active', 'Expired', 'Rejected', 'Expiring Soon', 'Not Processed'];

  useEffect(() => {
    if (showActions && actionButtonRef.current) {
      const rect = actionButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.top - 160, // Position above the button
        left: rect.left - 192 + rect.width, // Align to right
      });
    }
  }, [showActions]);

  useEffect(() => {
    if (showStatusDropdown && statusButtonRef.current) {
      const rect = statusButtonRef.current.getBoundingClientRect();
      setStatusDropdownPosition({
        top: rect.top - 240, // Position above the button
        left: rect.left,
      });
    }
  }, [showStatusDropdown]);

  return (
    <tr className="border-b border-gray-50 dark:border-gray-800/30 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 relative">
      <td className="px-4 py-3.5 text-sm">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(coi.id)}
          className="rounded border-gray-300"
        />
      </td>
      <td className="px-4 py-3.5 text-sm text-gray-900 dark:text-white">
        <div className="truncate">
          {coi.property}
        </div>
      </td>
      <td className="px-4 py-3.5 text-sm text-gray-700 dark:text-gray-300">
        <div className="truncate">
          {coi.tenantName}
        </div>
      </td>
      <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400">
        <div className="truncate">
          {coi.unit}
        </div>
      </td>
      <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400">
        <div className="truncate">
          {coi.coiName}
        </div>
      </td>
      <td className="px-4 py-3.5 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="whitespace-nowrap">{formatDate(coi.expiryDate)}</span>
          <button
            onClick={() => onEdit(coi)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex-shrink-0"
          >
            <Edit2 size={14} />
          </button>
        </div>
      </td>
      <td className="px-4 py-3.5 relative">
        <button
          ref={statusButtonRef}
          onClick={() => setShowStatusDropdown(!showStatusDropdown)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium ${getStatusColor(coi.status)} whitespace-nowrap inline-flex items-center gap-1`}
        >
          {coi.status}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {showStatusDropdown && createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setShowStatusDropdown(false)}
            />
            <div
              className="fixed z-[9999] w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl max-h-60 overflow-auto"
              style={{
                top: `${statusDropdownPosition.top}px`,
                left: `${statusDropdownPosition.left}px`,
              }}
            >
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    onStatusChange(coi.id, status);
                    setShowStatusDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                >
                  {status}
                </button>
              ))}
            </div>
          </>,
          document.body
        )}
      </td>
      <td className="px-4 py-3.5 text-sm">
        <div className="truncate">
          <span
            className={`${
              coi.reminderStatus === 'Not Sent'
                ? 'text-gray-500 dark:text-gray-400'
                : coi.reminderStatus === 'N/A'
                ? 'text-gray-400 dark:text-gray-500'
                : 'text-green-600 dark:text-green-400'
            }`}
          >
            {coi.reminderStatus}
          </span>
        </div>
      </td>
      <td className="px-4 py-3.5 relative">
        <button
          ref={actionButtonRef}
          onClick={() => setShowActions(!showActions)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <MoreVertical size={18} />
        </button>
        {showActions && createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setShowActions(false)}
            />
            <div
              className="fixed z-[9999] w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl overflow-hidden"
              style={{
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
              }}
            >
              <button
                onClick={() => {
                  onEdit(coi);
                  setShowActions(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Edit2 size={16} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  onSendReminder(coi.id);
                  setShowActions(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Send size={16} />
                <span>Send Reminder</span>
              </button>
              <button
                onClick={() => {
                  onDelete(coi.id);
                  setShowActions(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </>,
          document.body
        )}
      </td>
    </tr>
  );
};

export default COITableRow;
