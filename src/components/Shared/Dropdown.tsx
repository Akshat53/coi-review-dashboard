import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  multiSelect?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedOptions,
  onChange,
  multiSelect = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: string) => {
    if (multiSelect) {
      if (selectedOptions.includes(option)) {
        onChange(selectedOptions.filter(item => item !== option));
      } else {
        onChange([...selectedOptions, option]);
      }
    } else {
      onChange([option]);
      setIsOpen(false);
    }
  };

  const displayLabel = selectedOptions.length > 0
    ? multiSelect
      ? `${selectedOptions.length} selected`
      : selectedOptions[0]
    : label;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
      >
        <span className="truncate max-w-[150px]">{displayLabel}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-64 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              <input
                type={multiSelect ? 'checkbox' : 'radio'}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionClick(option)}
                className="rounded text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
