import { useState, useMemo, useCallback, useEffect } from 'react';
import { Wallet, TrendingUp, PiggyBank, RotateCcw, TrendingDown } from 'lucide-react';
import type { Region } from '../../types';
import { calculateSIP, toChartData } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatCurrency';
import { DEFAULT_VALUES, INPUT_RANGES } from '../../utils/constants';
import { SliderInput, SummaryCard, Button } from '../ui';
import { ChartTabs } from '../charts';
import { SIPYearlyTable } from './YearlyTable';
import { useSEO, SEO_CONFIG } from '../../hooks/useSEO';

interface SIPCalculatorProps {
  region: Region;
  showInflation: boolean;
}

export function SIPCalculator({ region, showInflation }: SIPCalculatorProps) {
  useSEO(SEO_CONFIG['sip-calculator']);

  const [monthlyInvestment, setMonthlyInvestment] = useState(
    DEFAULT_VALUES.monthlyInvestment[region]
  );
  const [expectedReturn, setExpectedReturn] = useState(DEFAULT_VALUES.expectedReturn);
  const [tenure, setTenure] = useState(DEFAULT_VALUES.tenure);
  const [inflationRate, setInflationRate] = useState(DEFAULT_VALUES.inflationRate[region]);

  // Update values when region changes
  useEffect(() => {
    setMonthlyInvestment(DEFAULT_VALUES.monthlyInvestment[region]);
    setInflationRate(DEFAULT_VALUES.inflationRate[region]);
  }, [region]);

  const result = useMemo(
    () =>
      calculateSIP({
        monthlyInvestment,
        expectedReturn,
        tenure,
        region,
      }, inflationRate),
    [monthlyInvestment, expectedReturn, tenure, region, inflationRate]
  );

  const chartData = useMemo(() => toChartData(result.yearlyData), [result.yearlyData]);

  const handleReset = useCallback(() => {
    setMonthlyInvestment(DEFAULT_VALUES.monthlyInvestment[region]);
    setExpectedReturn(DEFAULT_VALUES.expectedReturn);
    setTenure(DEFAULT_VALUES.tenure);
    setInflationRate(DEFAULT_VALUES.inflationRate[region]);
  }, [region]);

  const currencySymbol = region === 'INR' ? '₹' : '$';
  const ranges = INPUT_RANGES.monthlyInvestment[region];

  return (
    <div className="md:space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-5">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          {/* Mobile: edge-to-edge section */}
          <div className="bg-white dark:bg-slate-800 md:rounded-xl md:border md:border-gray-100 md:dark:border-slate-700 md:shadow-sm">
            <div className="px-4 py-4 md:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">SIP Parameters</h2>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>

              <SliderInput
                label="Monthly Investment"
                value={monthlyInvestment}
                onChange={setMonthlyInvestment}
                min={ranges.min}
                max={ranges.max}
                step={ranges.step}
                prefix={currencySymbol}
              />

              <SliderInput
                label="Expected Return Rate"
                value={expectedReturn}
                onChange={setExpectedReturn}
                min={INPUT_RANGES.expectedReturn.min}
                max={INPUT_RANGES.expectedReturn.max}
                step={INPUT_RANGES.expectedReturn.step}
                suffix="%"
                hint="Common range: 8-15% for equity, 6-9% for debt"
              />

              <SliderInput
                label="Investment Tenure"
                value={tenure}
                onChange={setTenure}
                min={INPUT_RANGES.tenure.min}
                max={INPUT_RANGES.tenure.max}
                step={INPUT_RANGES.tenure.step}
                suffix=" years"
              />

              {showInflation && (
                <SliderInput
                  label="Expected Inflation Rate"
                  value={inflationRate}
                  onChange={setInflationRate}
                  min={INPUT_RANGES.inflationRate.min}
                  max={INPUT_RANGES.inflationRate.max}
                  step={INPUT_RANGES.inflationRate.step}
                  suffix="%"
                  hint={`Typical: ${region === 'INR' ? '5-7%' : '2-4%'} - Adjusts future value to today's money`}
                />
              )}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 md:space-y-5">
          {/* Summary Cards - Mobile: with subtle top border */}
          <div className="border-t border-gray-100 dark:border-slate-700 md:border-0 bg-white dark:bg-slate-800 md:bg-transparent px-4 py-4 md:p-0">
            <div className={`grid grid-cols-2 ${showInflation ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-2 md:gap-3 transition-all duration-300`}>
              <SummaryCard
                title="Total Investment"
                value={formatCurrency(result.totalInvestment, region)}
                icon={<Wallet className="w-5 h-5" />}
                variant="investment"
              />
              <SummaryCard
                title="Expected Returns"
                value={formatCurrency(result.expectedReturns, region)}
                icon={<TrendingUp className="w-5 h-5" />}
                variant="returns"
              />
              <SummaryCard
                title="Maturity Value"
                value={formatCurrency(result.maturityValue, region)}
                icon={<PiggyBank className="w-5 h-5" />}
                variant="maturity"
              />
              <div
                className={`transition-all duration-300 ease-in-out ${
                  showInflation
                    ? 'opacity-100 scale-100 max-w-full'
                    : 'opacity-0 scale-95 max-w-0 overflow-hidden'
                }`}
              >
                {showInflation && (
                  <SummaryCard
                    title="Inflation Adjusted"
                    value={formatCurrency(result.inflationAdjustedMaturity || result.maturityValue, region)}
                    icon={<TrendingDown className="w-5 h-5" />}
                    variant="inflation"
                    subtitle="Today's value"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Charts - Mobile: edge-to-edge with border */}
          <div className="border-t border-gray-100 dark:border-slate-700 md:border-0">
            <ChartTabs
              chartData={chartData}
              investment={result.totalInvestment}
              returns={result.expectedReturns}
              region={region}
              showInflation={showInflation && inflationRate > 0}
            />
          </div>
        </div>
      </div>

      {/* Yearly Table - Full Width with top border on mobile */}
      <div className="border-t border-gray-100 dark:border-slate-700 md:border-0">
        <SIPYearlyTable data={result.yearlyData} region={region} showInflation={showInflation} />
      </div>
    </div>
  );
}
