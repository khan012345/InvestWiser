import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
  secondary:
    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
  ghost:
    'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
