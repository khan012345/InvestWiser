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
      <div className="flex flex-wrap gap-1.5 mt-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 cursor-pointer ${
              value === option.value
                ? 'border-indigo-500 bg-indigo-500 text-white shadow-sm'
                : 'border-gray-300 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
