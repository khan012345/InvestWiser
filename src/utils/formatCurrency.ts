import type { Region } from '../types';

/**
 * Format number to Indian numbering system (lakhs and crores)
 */
function formatIndianNumber(num: number): string {
  const absNum = Math.abs(num);

  // For crores (1 crore = 10,000,000)
  if (absNum >= 10000000) {
    const crores = num / 10000000;
    return `${crores.toFixed(2)} Cr`;
  }

  // For lakhs and below, use Indian comma formatting
  const numStr = absNum.toFixed(2);
  const [intPart, decPart] = numStr.split('.');

  // Indian format: last 3 digits, then groups of 2
  let result = '';
  const len = intPart.length;

  if (len <= 3) {
    result = intPart;
  } else {
    result = intPart.slice(-3);
    let remaining = intPart.slice(0, -3);

    while (remaining.length > 0) {
      const chunk = remaining.slice(-2);
      result = chunk + ',' + result;
      remaining = remaining.slice(0, -2);
    }
  }

  return (num < 0 ? '-' : '') + result + '.' + decPart;
}

/**
 * Format number to US numbering system (thousands, millions)
 */
function formatUSNumber(num: number): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Format currency based on region
 */
export function formatCurrency(amount: number, region: Region): string {
  const symbol = region === 'INR' ? '₹' : '$';

  if (region === 'INR') {
    return `${symbol}${formatIndianNumber(amount)}`;
  }

  return `${symbol}${formatUSNumber(amount)}`;
}

/**
 * Format currency for display in compact form (for charts, etc.)
 */
export function formatCurrencyCompact(amount: number, region: Region): string {
  const symbol = region === 'INR' ? '₹' : '$';

  if (region === 'INR') {
    if (amount >= 10000000) {
      return `${symbol}${(amount / 10000000).toFixed(1)} Cr`;
    }
    if (amount >= 100000) {
      return `${symbol}${(amount / 100000).toFixed(1)} L`;
    }
    if (amount >= 1000) {
      return `${symbol}${(amount / 1000).toFixed(1)}K`;
    }
  } else {
    if (amount >= 1000000) {
      return `${symbol}${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${symbol}${(amount / 1000).toFixed(1)}K`;
    }
  }

  return `${symbol}${amount.toFixed(0)}`;
}

/**
 * Parse currency string back to number
 */
export function parseCurrencyInput(value: string): number {
  // Remove currency symbols and commas
  const cleaned = value.replace(/[₹$,\s]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}
