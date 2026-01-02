import type { ReactNode } from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  variant: 'investment' | 'returns' | 'maturity';
  className?: string;
}

const variantStyles = {
  investment: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/20',
    border: 'border-blue-200/50 dark:border-blue-700/50',
    iconBg: 'bg-blue-500',
    iconColor: 'text-white',
    valueColor: 'text-blue-700 dark:text-blue-400',
    hoverBg: 'hover:from-blue-100 hover:to-blue-100/70 dark:hover:from-blue-900/40 dark:hover:to-blue-800/30',
  },
  returns: {
    bg: 'bg-gradient-to-br from-green-50 to-emerald-100/50 dark:from-green-900/30 dark:to-emerald-800/20',
    border: 'border-green-200/50 dark:border-green-700/50',
    iconBg: 'bg-green-500',
    iconColor: 'text-white',
    valueColor: 'text-green-700 dark:text-green-400',
    hoverBg: 'hover:from-green-100 hover:to-emerald-100/70 dark:hover:from-green-900/40 dark:hover:to-emerald-800/30',
  },
  maturity: {
    bg: 'bg-gradient-to-br from-purple-50 to-violet-100/50 dark:from-purple-900/30 dark:to-violet-800/20',
    border: 'border-purple-200/50 dark:border-purple-700/50',
    iconBg: 'bg-purple-500',
    iconColor: 'text-white',
    valueColor: 'text-purple-700 dark:text-purple-400',
    hoverBg: 'hover:from-purple-100 hover:to-violet-100/70 dark:hover:from-purple-900/40 dark:hover:to-violet-800/30',
  },
};

export function SummaryCard({ title, value, icon, variant, className = '' }: SummaryCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`
        ${styles.bg} ${styles.border}
        rounded-lg p-4 border
        transition-all duration-200
        hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20
        cursor-default group
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-600 dark:text-slate-400">{title}</p>
          <p className={`text-xl font-bold ${styles.valueColor}`}>
            {value}
          </p>
        </div>
        <div
          className={`
            ${styles.iconBg} ${styles.iconColor}
            p-2 rounded-lg
            transition-transform duration-200
            group-hover:scale-105
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
