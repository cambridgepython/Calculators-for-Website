
import React from 'react';
import { PayFrequency } from '../types';

interface PayFrequencySelectProps {
  value: PayFrequency;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const options = [
  { value: PayFrequency.TWICE_MONTHLY, label: 'Twice a month (24/year)' },
  { value: PayFrequency.BI_WEEKLY, label: 'Every 2 weeks (26/year)' },
  { value: PayFrequency.MONTHLY, label: 'Once a month (12/year)' },
];

const PayFrequencySelect: React.FC<PayFrequencySelectProps> = ({ value, onChange }) => (
  <div>
    <label htmlFor="payFrequency" className="block mb-2 text-sm font-medium text-slate-300">
      Pay Frequency
    </label>
    <select
      id="payFrequency"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-300 appearance-none bg-no-repeat bg-right-4"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundSize: '1.5em 1.5em',
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default PayFrequencySelect;
