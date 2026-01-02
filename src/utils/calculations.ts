import type {
  SIPInputs,
  StepUpSIPInputs,
  SWPInputs,
  CalculationResult,
  SWPCalculationResult,
  YearlyData,
  SWPYearlyData,
  ChartDataPoint,
  StepUpFrequency,
} from '../types';

/**
 * Round to 2 decimal places using banker's rounding
 */
function roundToTwo(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

/**
 * Calculate Regular SIP
 * Formula: FV = P × ((1 + r)^n - 1) / r × (1 + r)
 */
export function calculateSIP(inputs: SIPInputs): CalculationResult {
  const { monthlyInvestment, expectedReturn, tenure } = inputs;

  const monthlyRate = expectedReturn / 12 / 100;
  const yearlyData: YearlyData[] = [];

  let currentValue = 0;
  let cumulativeInvestment = 0;

  for (let year = 1; year <= tenure; year++) {
    const annualInvestment = monthlyInvestment * 12;

    // Calculate month by month for this year
    for (let month = 1; month <= 12; month++) {
      currentValue = (currentValue + monthlyInvestment) * (1 + monthlyRate);
      cumulativeInvestment += monthlyInvestment;
    }

    yearlyData.push({
      year,
      annualInvestment: roundToTwo(annualInvestment),
      cumulativeInvestment: roundToTwo(cumulativeInvestment),
      valueAtYearEnd: roundToTwo(currentValue),
      totalReturns: roundToTwo(currentValue - cumulativeInvestment),
    });
  }

  return {
    totalInvestment: roundToTwo(cumulativeInvestment),
    expectedReturns: roundToTwo(currentValue - cumulativeInvestment),
    maturityValue: roundToTwo(currentValue),
    yearlyData,
  };
}

/**
 * Get step-up interval in months based on frequency
 */
function getStepUpInterval(frequency: StepUpFrequency): number {
  switch (frequency) {
    case 'quarterly':
      return 3;
    case 'semi-annual':
      return 6;
    case 'annual':
    default:
      return 12;
  }
}

/**
 * Get step-up rate based on frequency
 */
function getStepUpRate(annualRate: number, frequency: StepUpFrequency): number {
  switch (frequency) {
    case 'quarterly':
      return annualRate / 4;
    case 'semi-annual':
      return annualRate / 2;
    case 'annual':
    default:
      return annualRate;
  }
}

/**
 * Calculate Step-Up SIP
 */
export function calculateStepUpSIP(inputs: StepUpSIPInputs): CalculationResult {
  const { monthlyInvestment, expectedReturn, tenure, stepUpPercentage, stepUpFrequency } = inputs;

  const monthlyRate = expectedReturn / 12 / 100;
  const stepUpInterval = getStepUpInterval(stepUpFrequency);
  const stepUpRate = getStepUpRate(stepUpPercentage, stepUpFrequency) / 100;

  const yearlyData: YearlyData[] = [];

  let currentValue = 0;
  let cumulativeInvestment = 0;
  let currentMonthlyAmount = monthlyInvestment;
  let monthsSinceLastStepUp = 0;

  for (let year = 1; year <= tenure; year++) {
    let annualInvestment = 0;
    const yearStartMonthlyAmount = currentMonthlyAmount;

    for (let month = 1; month <= 12; month++) {
      currentValue = (currentValue + currentMonthlyAmount) * (1 + monthlyRate);
      annualInvestment += currentMonthlyAmount;
      cumulativeInvestment += currentMonthlyAmount;
      monthsSinceLastStepUp++;

      // Apply step-up at the appropriate interval
      if (monthsSinceLastStepUp >= stepUpInterval) {
        currentMonthlyAmount = currentMonthlyAmount * (1 + stepUpRate);
        monthsSinceLastStepUp = 0;
      }
    }

    yearlyData.push({
      year,
      monthlyAmount: roundToTwo(yearStartMonthlyAmount),
      annualInvestment: roundToTwo(annualInvestment),
      cumulativeInvestment: roundToTwo(cumulativeInvestment),
      valueAtYearEnd: roundToTwo(currentValue),
      totalReturns: roundToTwo(currentValue - cumulativeInvestment),
    });
  }

  return {
    totalInvestment: roundToTwo(cumulativeInvestment),
    expectedReturns: roundToTwo(currentValue - cumulativeInvestment),
    maturityValue: roundToTwo(currentValue),
    yearlyData,
  };
}

/**
 * Calculate SWP (Systematic Withdrawal Plan)
 */
export function calculateSWP(inputs: SWPInputs): SWPCalculationResult {
  const { initialCorpus, monthlyWithdrawal, expectedReturn, tenure } = inputs;

  const monthlyRate = expectedReturn / 12 / 100;
  const yearlyData: SWPYearlyData[] = [];

  let currentCorpus = initialCorpus;
  let cumulativeWithdrawal = 0;

  for (let year = 1; year <= tenure; year++) {
    let annualWithdrawal = 0;
    let yearlyInterest = 0;

    for (let month = 1; month <= 12; month++) {
      if (currentCorpus <= 0) break;

      // Interest earned this month
      const monthlyInterest = currentCorpus * monthlyRate;
      yearlyInterest += monthlyInterest;

      // Apply interest then withdraw
      currentCorpus = currentCorpus * (1 + monthlyRate) - monthlyWithdrawal;

      // Ensure corpus doesn't go below 0
      if (currentCorpus < 0) {
        annualWithdrawal += monthlyWithdrawal + currentCorpus; // Partial withdrawal
        currentCorpus = 0;
      } else {
        annualWithdrawal += monthlyWithdrawal;
      }
    }

    cumulativeWithdrawal += annualWithdrawal;

    yearlyData.push({
      year,
      annualWithdrawal: roundToTwo(annualWithdrawal),
      cumulativeWithdrawal: roundToTwo(cumulativeWithdrawal),
      corpusAtYearEnd: roundToTwo(Math.max(0, currentCorpus)),
      interestEarned: roundToTwo(yearlyInterest),
    });

    if (currentCorpus <= 0) break;
  }

  return {
    totalWithdrawn: roundToTwo(cumulativeWithdrawal),
    remainingCorpus: roundToTwo(Math.max(0, currentCorpus)),
    yearlyData,
  };
}

/**
 * Convert yearly data to chart data points
 */
export function toChartData(yearlyData: YearlyData[]): ChartDataPoint[] {
  return [
    { year: 0, investment: 0, value: 0, returns: 0 },
    ...yearlyData.map((data) => ({
      year: data.year,
      investment: data.cumulativeInvestment,
      value: data.valueAtYearEnd,
      returns: data.totalReturns,
    })),
  ];
}

/**
 * Convert SWP yearly data to chart data points
 */
export function toSWPChartData(yearlyData: SWPYearlyData[], initialCorpus: number): ChartDataPoint[] {
  return [
    { year: 0, investment: initialCorpus, value: initialCorpus, returns: 0 },
    ...yearlyData.map((data) => ({
      year: data.year,
      investment: data.cumulativeWithdrawal,
      value: data.corpusAtYearEnd,
      returns: data.interestEarned,
    })),
  ];
}
