import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Folder, BarChart3, Settings } from 'lucide-react';

interface SidebarProps {
  onNewCOI: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNewCOI }) => {
  const location = useLocation();

  const menuItems = [
    { icon: Folder, label: 'Contract Vault', path: '/contract-vault', disabled: true },
    { icon: FileText, label: 'COI Dashboard', path: '/', disabled: false },
    { icon: BarChart3, label: 'Analysis Results', path: '/analysis', disabled: true },
    { icon: Settings, label: 'Setting', path: '/settings', disabled: true },
  ];

  return (
    <div className="w-60 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen shrink-0 hidden lg:flex">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold shrink-0">
            L
          </div>
          <span className="font-semibold text-gray-900 dark:text-white truncate">LegalGraph AI</span>
        </div>

        <button
          onClick={onNewCOI}
          className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          <span className="text-lg leading-none">+</span>
          <span>Review documents</span>
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.disabled ? '#' : item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors text-sm ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                  : item.disabled
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={(e) => item.disabled && e.preventDefault()}
            >
              <Icon size={20} className="shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
