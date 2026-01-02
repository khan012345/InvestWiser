import type { YearlyData, SWPYearlyData, Region } from '../types';
import { formatCurrency } from './formatCurrency';

/**
 * Convert data to CSV format
 */
function toCSV(headers: string[], rows: string[][]): string {
  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');
  return csvContent;
}

/**
 * Trigger file download
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export SIP yearly data
 */
export function exportSIPData(
  data: YearlyData[],
  region: Region,
  format: 'csv' | 'excel',
  showMonthlyAmount: boolean = false
): void {
  const headers = showMonthlyAmount
    ? ['Year', 'Monthly SIP', 'Annual Investment', 'Cumulative Investment', 'Value at Year-End', 'Total Returns']
    : ['Year', 'Annual Investment', 'Cumulative Investment', 'Value at Year-End', 'Total Returns'];

  const rows = data.map((row) => {
    const baseRow = [
      row.year.toString(),
      ...(showMonthlyAmount ? [formatCurrency(row.monthlyAmount || 0, region)] : []),
      formatCurrency(row.annualInvestment, region),
      formatCurrency(row.cumulativeInvestment, region),
      formatCurrency(row.valueAtYearEnd, region),
      formatCurrency(row.totalReturns, region),
    ];
    return baseRow;
  });

  // Add summary row
  if (data.length > 0) {
    const lastRow = data[data.length - 1];
    rows.push([
      'Total',
      ...(showMonthlyAmount ? ['-'] : []),
      '-',
      formatCurrency(lastRow.cumulativeInvestment, region),
      formatCurrency(lastRow.valueAtYearEnd, region),
      formatCurrency(lastRow.totalReturns, region),
    ]);
  }

  const csvContent = toCSV(headers, rows);
  const filename = `sip-breakdown-${new Date().toISOString().split('T')[0]}`;

  if (format === 'csv') {
    downloadFile(csvContent, `${filename}.csv`, 'text/csv;charset=utf-8;');
  } else {
    // For Excel, we use CSV with .xls extension (Excel can open CSV files)
    downloadFile(csvContent, `${filename}.xls`, 'application/vnd.ms-excel;charset=utf-8;');
  }
}

/**
 * Export SWP yearly data
 */
export function exportSWPData(
  data: SWPYearlyData[],
  region: Region,
  format: 'csv' | 'excel'
): void {
  const headers = ['Year', 'Annual Withdrawal', 'Cumulative Withdrawal', 'Corpus at Year-End', 'Interest Earned'];

  const rows = data.map((row) => [
    row.year.toString(),
    formatCurrency(row.annualWithdrawal, region),
    formatCurrency(row.cumulativeWithdrawal, region),
    formatCurrency(row.corpusAtYearEnd, region),
    formatCurrency(row.interestEarned, region),
  ]);

  // Add summary row
  if (data.length > 0) {
    const lastRow = data[data.length - 1];
    const totalInterest = data.reduce((sum, row) => sum + row.interestEarned, 0);
    rows.push([
      'Total',
      '-',
      formatCurrency(lastRow.cumulativeWithdrawal, region),
      formatCurrency(lastRow.corpusAtYearEnd, region),
      formatCurrency(totalInterest, region),
    ]);
  }

  const csvContent = toCSV(headers, rows);
  const filename = `swp-breakdown-${new Date().toISOString().split('T')[0]}`;

  if (format === 'csv') {
    downloadFile(csvContent, `${filename}.csv`, 'text/csv;charset=utf-8;');
  } else {
    downloadFile(csvContent, `${filename}.xls`, 'application/vnd.ms-excel;charset=utf-8;');
  }
}
