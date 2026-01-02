import type { Region } from '../../types';

interface RegionToggleProps {
  value: Region;
  onChange: (region: Region) => void;
}

export function RegionToggle({ value, onChange }: RegionToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
      <button
        onClick={() => onChange('INR')}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
          value === 'INR'
            ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
            : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="text-base">₹</span>
          INR
        </span>
      </button>
      <button
        onClick={() => onChange('USD')}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
          value === 'USD'
            ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
            : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="text-base">$</span>
          USD
        </span>
      </button>
    </div>
  );
}
