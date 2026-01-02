export type Region = 'INR' | 'USD';

export type CalculatorType = 'sip' | 'stepup' | 'swp';

export type StepUpFrequency = 'annual' | 'semi-annual' | 'quarterly';

export interface SIPInputs {
  monthlyInvestment: number;
  expectedReturn: number;
  tenure: number;
  region: Region;
}

export interface StepUpSIPInputs extends SIPInputs {
  stepUpPercentage: number;
  stepUpFrequency: StepUpFrequency;
}

export interface SWPInputs {
  initialCorpus: number;
  monthlyWithdrawal: number;
  expectedReturn: number;
  tenure: number;
  region: Region;
}

export interface YearlyData {
  year: number;
  monthlyAmount?: number;
  annualInvestment: number;
  cumulativeInvestment: number;
  valueAtYearEnd: number;
  totalReturns: number;
}

export interface SWPYearlyData {
  year: number;
  annualWithdrawal: number;
  cumulativeWithdrawal: number;
  corpusAtYearEnd: number;
  interestEarned: number;
}

export interface CalculationResult {
  totalInvestment: number;
  expectedReturns: number;
  maturityValue: number;
  yearlyData: YearlyData[];
}

export interface SWPCalculationResult {
  totalWithdrawn: number;
  remainingCorpus: number;
  yearlyData: SWPYearlyData[];
}

export interface ChartDataPoint {
  year: number;
  investment: number;
  value: number;
  returns: number;
}

export interface PieChartData {
  name: string;
  value: number;
  color: string;
}
