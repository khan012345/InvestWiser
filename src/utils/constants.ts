import type { Region, StepUpFrequency } from '../types';

export const DEFAULT_VALUES = {
  monthlyInvestment: {
    INR: 25000,
    USD: 300,
  },
  initialCorpus: {
    INR: 5000000,
    USD: 60000,
  },
  monthlyWithdrawal: {
    INR: 50000,
    USD: 600,
  },
  expectedReturn: 10,
  tenure: 10,
  stepUpPercentage: 10,
  stepUpFrequency: 'annual' as StepUpFrequency,
  region: 'INR' as Region,
};

export const INPUT_RANGES = {
  monthlyInvestment: {
    INR: { min: 500, max: 1000000, step: 500 },
    USD: { min: 10, max: 10000, step: 10 },
  },
  initialCorpus: {
    INR: { min: 100000, max: 100000000, step: 100000 },
    USD: { min: 1000, max: 1000000, step: 1000 },
  },
  monthlyWithdrawal: {
    INR: { min: 1000, max: 500000, step: 1000 },
    USD: { min: 100, max: 10000, step: 100 },
  },
  expectedReturn: { min: 1, max: 30, step: 0.5 },
  tenure: { min: 1, max: 50, step: 1 },
  stepUpPercentage: { min: 0, max: 25, step: 0.5 },
};

export const STEP_UP_FREQUENCY_OPTIONS = [
  { value: 'annual', label: 'Annual' },
  { value: 'semi-annual', label: 'Semi-Annual (every 6 months)' },
  { value: 'quarterly', label: 'Quarterly (every 3 months)' },
];

export const CHART_COLORS = {
  investment: '#3b82f6', // Blue
  returns: '#10b981', // Green
  maturity: '#8b5cf6', // Purple
  investmentLight: '#93c5fd',
  returnsLight: '#6ee7b7',
};
