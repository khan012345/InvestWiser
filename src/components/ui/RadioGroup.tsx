interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

export function RadioGroup({ label, options, value, onChange }: RadioGroupProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 ${
              value === option.value
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
