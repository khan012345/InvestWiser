import type { YearlyData, SWPYearlyData, Region } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import { Card, CardHeader, CardTitle, CardContent } from '../ui';
import { Table } from 'lucide-react';

interface SIPYearlyTableProps {
  data: YearlyData[];
  region: Region;
  showMonthlyAmount?: boolean;
}

export function SIPYearlyTable({ data, region, showMonthlyAmount = false }: SIPYearlyTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Table className="w-5 h-5 text-indigo-600" />
        <CardTitle>Year-on-Year Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="table-container max-h-96 overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Year
                </th>
                {showMonthlyAmount && (
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Monthly SIP
                  </th>
                )}
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Annual Investment
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cumulative Investment
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Value at Year-End
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Returns
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row, index) => (
                <tr
                  key={row.year}
                  className={`
                    ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                    ${row.year % 5 === 0 ? 'bg-indigo-50/50' : ''}
                    hover:bg-indigo-50/30 transition-colors
                  `}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {row.year}
                  </td>
                  {showMonthlyAmount && (
                    <td className="px-4 py-3 text-sm text-right text-gray-700">
                      {formatCurrency(row.monthlyAmount || 0, region)}
                    </td>
                  )}
                  <td className="px-4 py-3 text-sm text-right text-gray-700">
                    {formatCurrency(row.annualInvestment, region)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-blue-600 font-medium">
                    {formatCurrency(row.cumulativeInvestment, region)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-purple-600 font-medium">
                    {formatCurrency(row.valueAtYearEnd, region)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-green-600 font-medium">
                    {formatCurrency(row.totalReturns, region)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 border-t-2 border-gray-200">
                <td className="px-4 py-3 text-sm font-bold text-gray-900">
                  Total
                </td>
                {showMonthlyAmount && <td />}
                <td className="px-4 py-3 text-sm text-right text-gray-500">-</td>
                <td className="px-4 py-3 text-sm text-right text-blue-700 font-bold">
                  {data.length > 0
                    ? formatCurrency(data[data.length - 1].cumulativeInvestment, region)
                    : '-'}
                </td>
                <td className="px-4 py-3 text-sm text-right text-purple-700 font-bold">
                  {data.length > 0
                    ? formatCurrency(data[data.length - 1].valueAtYearEnd, region)
                    : '-'}
                </td>
                <td className="px-4 py-3 text-sm text-right text-green-700 font-bold">
                  {data.length > 0
                    ? formatCurrency(data[data.length - 1].totalReturns, region)
                    : '-'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

interface SWPYearlyTableProps {
  data: SWPYearlyData[];
  region: Region;
}

export function SWPYearlyTable({ data, region }: SWPYearlyTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Table className="w-5 h-5 text-indigo-600" />
        <CardTitle>Year-on-Year Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="table-container max-h-96 overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Annual Withdrawal
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cumulative Withdrawal
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Corpus at Year-End
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Interest Earned
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row, index) => (
                <tr
                  key={row.year}
                  className={`
                    ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                    ${row.year % 5 === 0 ? 'bg-indigo-50/50' : ''}
                    hover:bg-indigo-50/30 transition-colors
                  `}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {row.year}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-700">
                    {formatCurrency(row.annualWithdrawal, region)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-red-600 font-medium">
                    {formatCurrency(row.cumulativeWithdrawal, region)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-purple-600 font-medium">
                    {formatCurrency(row.corpusAtYearEnd, region)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-green-600 font-medium">
                    {formatCurrency(row.interestEarned, region)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 border-t-2 border-gray-200">
                <td className="px-4 py-3 text-sm font-bold text-gray-900">
                  Total
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-500">-</td>
                <td className="px-4 py-3 text-sm text-right text-red-700 font-bold">
                  {data.length > 0
                    ? formatCurrency(data[data.length - 1].cumulativeWithdrawal, region)
                    : '-'}
                </td>
                <td className="px-4 py-3 text-sm text-right text-purple-700 font-bold">
                  {data.length > 0
                    ? formatCurrency(data[data.length - 1].corpusAtYearEnd, region)
                    : '-'}
                </td>
                <td className="px-4 py-3 text-sm text-right text-green-700 font-bold">
                  {data.length > 0
                    ? formatCurrency(
                        data.reduce((sum, row) => sum + row.interestEarned, 0),
                        region
                      )
                    : '-'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
