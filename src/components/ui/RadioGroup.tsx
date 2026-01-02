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
      <label className="text-sm font-medium text-gray-700 dark:text-slate-300">{label}</label>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 cursor-pointer ${
              value === option.value
                ? 'border-indigo-500 bg-indigo-500 text-white shadow-sm'
                : 'border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
