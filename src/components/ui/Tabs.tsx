import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange?: (tabId: string) => void;
  isMobile?: boolean;
}

export function Tabs({ tabs, activeTab, isMobile = false }: TabsProps) {
  return (
    <div className={isMobile ? '' : 'border-b border-gray-200 dark:border-slate-700'}>
      <nav
        className={`
          flex
          ${isMobile
            ? 'overflow-x-auto scrollbar-hide px-4 gap-1 snap-x snap-mandatory'
            : 'gap-1'
          }
        `}
        aria-label="Tabs"
      >
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={`/${tab.id}`}
            className={`
              flex items-center gap-2 text-sm font-medium
              border-b-2 transition-colors duration-200 whitespace-nowrap
              ${isMobile
                ? 'px-4 py-3 snap-start shrink-0'
                : 'px-4 py-3'
              }
              ${activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20'
                : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 hover:border-gray-300 dark:hover:border-slate-500'
              }
            `}
          >
            {tab.icon}
            <span className={isMobile ? 'text-xs' : ''}>{tab.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
