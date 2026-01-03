import { useCallback, useState, useEffect, useMemo } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
}

export function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = '',
  suffix = '',
  hint,
}: SliderInputProps) {
  const [inputValue, setInputValue] = useState(value.toString());
  const [isFocused, setIsFocused] = useState(false);
  const { isDark } = useTheme();

  // Calculate percentage for gradient fill
  const percentage = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  // Dynamic track colors based on theme
  const trackColor = isDark ? '#334155' : '#e2e8f0';

  // Sync input value when prop value changes
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      onChange(newValue);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setInputValue(raw);

      const parsed = parseFloat(raw);
      if (!isNaN(parsed)) {
        const clamped = Math.min(Math.max(parsed, min), max);
        onChange(clamped);
      }
    },
    [onChange, min, max]
  );

  const handleInputBlur = useCallback(() => {
    // On blur, ensure the input shows the actual value
    setInputValue(value.toString());
    setIsFocused(false);
  }, [value]);

  return (
    <div className="space-y-2 md:space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs md:text-sm font-medium text-gray-700 dark:text-slate-300">{label}</label>
        <div className="flex items-center gap-1">
          {prefix && <span className="text-xs md:text-sm text-gray-500 dark:text-slate-400">{prefix}</span>}
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={handleInputBlur}
            min={min}
            max={max}
            step={step}
            inputMode="decimal"
            className={`
              w-20 md:w-24 px-2 py-1.5 md:py-1 text-right text-xs md:text-sm font-medium
              border rounded-lg transition-all duration-200
              bg-white dark:bg-slate-700 text-gray-900 dark:text-white
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              ${isFocused
                ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500'
              }
              focus:outline-none
            `}
          />
          {suffix && <span className="text-xs md:text-sm text-gray-500 dark:text-slate-400">{suffix}</span>}
        </div>
      </div>
      {/* Larger touch target wrapper for mobile */}
      <div className="py-1 -my-1">
        <input
          type="range"
          value={value}
          onChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
          className="w-full touch-pan-x"
          style={{
            background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${percentage}%, ${trackColor} ${percentage}%, ${trackColor} 100%)`
          }}
        />
      </div>
      <div className="flex justify-between text-[10px] md:text-xs text-gray-400 dark:text-slate-500">
        <span>
          {prefix}
          {min.toLocaleString()}
          {suffix}
        </span>
        <span>
          {prefix}
          {max.toLocaleString()}
          {suffix}
        </span>
      </div>
      {hint && <p className="text-[10px] md:text-xs text-gray-500 dark:text-slate-400 mt-0.5 md:mt-1">{hint}</p>}
    </div>
  );
}
