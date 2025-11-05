
import React from 'react';

interface CalculatorInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({ id, label, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-slate-300">
      {label}
    </label>
    <input
      type="number"
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-300"
      min="0"
    />
  </div>
);

export default CalculatorInput;
