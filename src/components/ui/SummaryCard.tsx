import type { ReactNode } from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  variant: 'investment' | 'returns' | 'maturity' | 'inflation';
  className?: string;
  subtitle?: string;
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
  inflation: {
    bg: 'bg-gradient-to-br from-amber-50 to-orange-100/50 dark:from-amber-900/30 dark:to-orange-800/20',
    border: 'border-amber-200/50 dark:border-amber-700/50',
    iconBg: 'bg-amber-500',
    iconColor: 'text-white',
    valueColor: 'text-amber-700 dark:text-amber-400',
    hoverBg: 'hover:from-amber-100 hover:to-orange-100/70 dark:hover:from-amber-900/40 dark:hover:to-orange-800/30',
  },
};

export function SummaryCard({ title, value, icon, variant, className = '', subtitle }: SummaryCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`
        ${styles.bg} ${styles.border}
        rounded-lg px-3 py-2.5 md:rounded-xl md:p-5 border
        transition-all duration-200
        hover:shadow-sm md:hover:shadow-md dark:hover:shadow-black/20
        cursor-default group
        ${className}
      `}
    >
      <div className="flex flex-col items-center text-center gap-1.5 md:gap-0 md:space-y-3">
        <div
          className={`
            ${styles.iconBg} ${styles.iconColor}
            p-1.5 rounded-md md:p-3 md:rounded-xl
            transition-transform duration-200
            group-hover:scale-105 md:group-hover:scale-110
          `}
        >
          {icon}
        </div>
        <div className="md:space-y-1">
          <p className="text-xs md:text-sm md:font-medium text-gray-600 dark:text-slate-400">{title}</p>
          <p className={`text-base md:text-xl font-bold ${styles.valueColor} leading-tight`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-[10px] md:text-xs text-gray-500 dark:text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
