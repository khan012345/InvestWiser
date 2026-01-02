import type { ReactNode } from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  variant: 'investment' | 'returns' | 'maturity';
}

const variantStyles = {
  investment: {
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    valueColor: 'text-blue-700',
  },
  returns: {
    bg: 'bg-green-50',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    valueColor: 'text-green-700',
  },
  maturity: {
    bg: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    valueColor: 'text-purple-700',
  },
};

export function SummaryCard({ title, value, icon, variant }: SummaryCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`${styles.bg} rounded-xl p-4 transition-all duration-300`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-600">{title}</p>
          <p className={`text-xl font-bold ${styles.valueColor}`}>{value}</p>
        </div>
        <div className={`${styles.iconBg} ${styles.iconColor} p-2 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
