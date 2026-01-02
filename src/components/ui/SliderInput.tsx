import { useCallback, useState, useEffect } from 'react';

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
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center gap-1">
          {prefix && <span className="text-sm text-gray-500">{prefix}</span>}
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            min={min}
            max={max}
            step={step}
            className="w-24 px-2 py-1 text-right text-sm font-medium border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {suffix && <span className="text-sm text-gray-500">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        value={value}
        onChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-400">
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
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}
