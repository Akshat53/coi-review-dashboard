import React, { useState, useEffect } from 'react';
import type { COI, COIStatus } from '../../types/coi.types';
import Modal from '../Shared/Modal';

interface COIFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<COI>) => void;
  initialData?: COI | null;
}

const COIForm: React.FC<COIFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    property: '',
    tenantName: '',
    tenantEmail: '',
    unit: '',
    coiName: '',
    expiryDate: '',
    status: 'Active' as COIStatus,
    reminderStatus: 'Not Sent' as any,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        property: initialData.property,
        tenantName: initialData.tenantName,
        tenantEmail: initialData.tenantEmail,
        unit: initialData.unit,
        coiName: initialData.coiName,
        expiryDate: initialData.expiryDate,
        status: initialData.status,
        reminderStatus: initialData.reminderStatus,
      });
    } else {
      setFormData({
        property: '',
        tenantName: '',
        tenantEmail: '',
        unit: '',
        coiName: '',
        expiryDate: '',
        status: 'Active',
        reminderStatus: 'Not Sent',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.property.trim()) {
      newErrors.property = 'Property is required';
    }
    if (!formData.tenantName.trim()) {
      newErrors.tenantName = 'Tenant name is required';
    }
    if (!formData.tenantEmail.trim()) {
      newErrors.tenantEmail = 'Tenant email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.tenantEmail)) {
      newErrors.tenantEmail = 'Invalid email format';
    }
    if (!formData.unit.trim()) {
      newErrors.unit = 'Unit is required';
    }
    if (!formData.coiName.trim()) {
      newErrors.coiName = 'COI name is required';
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit COI' : 'Add New COI'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Property *
            </label>
            <input
              type="text"
              name="property"
              value={formData.property}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                errors.property
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter property name"
            />
            {errors.property && (
              <p className="text-red-500 text-xs mt-1">{errors.property}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tenant Name *
            </label>
            <input
              type="text"
              name="tenantName"
              value={formData.tenantName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                errors.tenantName
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter tenant name"
            />
            {errors.tenantName && (
              <p className="text-red-500 text-xs mt-1">{errors.tenantName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tenant Email *
            </label>
            <input
              type="email"
              name="tenantEmail"
              value={formData.tenantEmail}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                errors.tenantEmail
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="tenant@example.com"
            />
            {errors.tenantEmail && (
              <p className="text-red-500 text-xs mt-1">{errors.tenantEmail}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Unit *
            </label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                errors.unit
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="e.g., 101, Suite 300"
            />
            {errors.unit && (
              <p className="text-red-500 text-xs mt-1">{errors.unit}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              COI Name *
            </label>
            <input
              type="text"
              name="coiName"
              value={formData.coiName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                errors.coiName
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter COI name"
            />
            {errors.coiName && (
              <p className="text-red-500 text-xs mt-1">{errors.coiName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Expiry Date *
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                errors.expiryDate
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Rejected">Rejected</option>
              <option value="Expiring Soon">Expiring Soon</option>
              <option value="Not Processed">Not Processed</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {initialData ? 'Update COI' : 'Add COI'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default COIForm;
