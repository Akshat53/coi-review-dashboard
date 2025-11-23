import React, { type ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  bgColor: string;
  iconColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  bgColor,
  iconColor,
}) => {
  return (
    <div className={`${bgColor} rounded-xl p-6 border-0`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">{title}</p>
          <div className="flex items-center gap-2">
            <div className={`${iconColor} bg-white dark:bg-gray-800 p-1.5 rounded`}>
              {icon}
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
