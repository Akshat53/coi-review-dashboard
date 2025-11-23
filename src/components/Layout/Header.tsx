import React from 'react';
import { ChevronDown, Sparkles, HelpCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  onSendBulkReminder: () => void;
  selectedCount: number;
}

const Header: React.FC<HeaderProps> = ({ onSendBulkReminder, selectedCount }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-4 shrink-0">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-shrink-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white truncate">
            COI Review Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
            Overview of all Certificate of Insurance
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onSendBulkReminder}
            disabled={selectedCount === 0}
            className={`hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg transition-colors text-sm whitespace-nowrap ${
              selectedCount > 0
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
          >
            <span className="hidden lg:inline">Send Bulk Reminder</span>
            <span className="lg:hidden">Remind</span>
            <ChevronDown size={16} />
          </button>

          <button className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm whitespace-nowrap">
            <Sparkles size={18} />
            <span className="hidden lg:inline">Ask LegalGraph AI</span>
            <span className="lg:hidden">AI</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title="Help"
          >
            <HelpCircle size={20} />
          </button>

          <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0">
              S
            </div>
            <div className="hidden lg:flex items-center gap-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Shubham</span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
