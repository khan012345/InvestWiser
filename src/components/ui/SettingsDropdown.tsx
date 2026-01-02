import { useState, useRef, useEffect } from 'react';
import { Settings, ChevronDown } from 'lucide-react';
import type { Region } from '../../types';

interface SettingsDropdownProps {
  region: Region;
  onRegionChange: (region: Region) => void;
  showInflation: boolean;
  onInflationToggle: (show: boolean) => void;
}

export function SettingsDropdown({
  region,
  onRegionChange,
  showInflation,
  onInflationToggle,
}: SettingsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          p-2 rounded-lg transition-all duration-200 flex items-center gap-1
          ${isOpen
            ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
          }
        `}
        aria-label="Settings"
      >
        <Settings className="w-5 h-5" />
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50">
          <div className="px-3 py-2 border-b border-gray-100 dark:border-slate-700">
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              Settings
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="px-3 py-3 border-b border-gray-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Currency</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Switch between INR and USD</p>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-700 rounded-lg p-0.5">
                <button
                  onClick={() => onRegionChange('INR')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                    region === 'INR'
                      ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  ₹ INR
                </button>
                <button
                  onClick={() => onRegionChange('USD')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                    region === 'USD'
                      ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  $ USD
                </button>
              </div>
            </div>
          </div>

          {/* Inflation Toggle */}
          <div className="px-3 py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Inflation Adjusted</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Show inflation indicators</p>
              </div>
              <button
                onClick={() => onInflationToggle(!showInflation)}
                className={`
                  relative w-11 h-6 rounded-full transition-colors duration-200
                  ${showInflation
                    ? 'bg-indigo-600'
                    : 'bg-gray-300 dark:bg-slate-600'
                  }
                `}
                role="switch"
                aria-checked={showInflation}
              >
                <span
                  className={`
                    absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm
                    transition-transform duration-200
                    ${showInflation ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
