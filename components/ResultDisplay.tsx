
import React from 'react';

interface ResultDisplayProps {
  paychecks: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ paychecks }) => (
  <div className="mt-8 text-center bg-slate-900/50 p-6 rounded-lg border border-slate-700 animate-fade-in">
    <p className="text-lg text-slate-400">You have an estimated</p>
    <p className="text-5xl md:text-6xl font-extrabold my-2 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
      {paychecks.toLocaleString()}
    </p>
    <p className="text-lg text-slate-400">paychecks left until retirement.</p>
  </div>
);

export default ResultDisplay;
