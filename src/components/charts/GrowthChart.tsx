import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { ChartDataPoint, Region } from '../../types';
import { formatCurrencyCompact, formatCurrency } from '../../utils/formatCurrency';
import { CHART_COLORS } from '../../utils/constants';

interface GrowthChartProps {
  data: ChartDataPoint[];
  region: Region;
}

interface TooltipPayload {
  color: string;
  name: string;
  value: number;
  dataKey: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: number;
  region: Region;
}

function CustomTooltip({ active, payload, label, region }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const investmentData = payload.find((p) => p.dataKey === 'investment');
  const valueData = payload.find((p) => p.dataKey === 'value');

  const investment = investmentData?.value || 0;
  const value = valueData?.value || 0;
  const returns = value - investment;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
      <p className="font-semibold text-gray-900 mb-2">Year {label}</p>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-gray-600">Investment:</span>
          <span className="font-medium text-blue-600">
            {formatCurrency(investment, region)}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600">Returns:</span>
          <span className="font-medium text-green-600">
            {formatCurrency(returns, region)}
          </span>
        </div>
        <div className="flex justify-between gap-4 pt-1 border-t border-gray-100">
          <span className="text-gray-600">Total Value:</span>
          <span className="font-medium text-purple-600">
            {formatCurrency(value, region)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function GrowthChart({ data, region }: GrowthChartProps) {
  const formatYAxis = (value: number) => formatCurrencyCompact(value, region);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorInvestment" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.investment} stopOpacity={0.8} />
              <stop offset="95%" stopColor={CHART_COLORS.investment} stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.returns} stopOpacity={0.8} />
              <stop offset="95%" stopColor={CHART_COLORS.returns} stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickFormatter={(value) => `Y${value}`}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickFormatter={formatYAxis}
            width={70}
          />
          <Tooltip content={<CustomTooltip region={region} />} />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => (
              <span className="text-sm text-gray-600">
                {value === 'investment' ? 'Total Investment' : 'Total Value'}
              </span>
            )}
          />
          <Area
            type="monotone"
            dataKey="investment"
            stackId="1"
            stroke={CHART_COLORS.investment}
            fill="url(#colorInvestment)"
            name="investment"
          />
          <Area
            type="monotone"
            dataKey="value"
            stackId="2"
            stroke={CHART_COLORS.returns}
            fill="url(#colorValue)"
            name="value"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
