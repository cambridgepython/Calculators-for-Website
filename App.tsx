import React, { useState, useCallback } from 'react';
import { PayFrequency } from './types';
import CalculatorInput from './components/CalculatorInput';
import PayFrequencySelect from './components/PayFrequencySelect';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [payFrequency, setPayFrequency] = useState<PayFrequency>(PayFrequency.BI_WEEKLY);
  const [totalPaychecks, setTotalPaychecks] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCalculate = useCallback(() => {
    const currentAgeNum = parseInt(currentAge, 10);
    const retirementAgeNum = parseInt(retirementAge, 10);

    if (isNaN(currentAgeNum) || isNaN(retirementAgeNum) || currentAgeNum <= 0 || retirementAgeNum <= 0) {
      setError('Please enter valid, positive ages.');
      setTotalPaychecks(null);
      setIsSuccess(false);
      return;
    }

    if (retirementAgeNum <= currentAgeNum) {
      setError('Retirement age must be greater than your current age.');
      setTotalPaychecks(null);
      setIsSuccess(false);
      return;
    }

    setError(null);
    const yearsToRetirement = retirementAgeNum - currentAgeNum;
    let paychecks = 0;

    switch (payFrequency) {
      case PayFrequency.TWICE_MONTHLY:
        paychecks = yearsToRetirement * 24;
        break;
      case PayFrequency.BI_WEEKLY:
        paychecks = yearsToRetirement * 26;
        break;
      case PayFrequency.MONTHLY:
        paychecks = yearsToRetirement * 12;
        break;
      default:
        break;
    }
    setTotalPaychecks(Math.round(paychecks));
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 1500);
  }, [currentAge, retirementAge, payFrequency]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <main className="w-full max-w-md mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl shadow-indigo-500/10">
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-100">Retirement Countdown</h1>
            <p className="text-slate-400 mt-2">Calculate your remaining paychecks.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleCalculate(); }} className="space-y-6">
            <CalculatorInput
              id="currentAge"
              label="Current Age"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              placeholder="e.g., 30"
            />
            <CalculatorInput
              id="retirementAge"
              label="Desired Retirement Age"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              placeholder="e.g., 65"
            />
            <PayFrequencySelect
              value={payFrequency}
              onChange={(e) => setPayFrequency(e.target.value as PayFrequency)}
            />
            
            <button
              type="submit"
              disabled={isSuccess}
              className={`w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 shadow-lg ${isSuccess ? 'animate-success' : 'hover:from-indigo-600 hover:to-purple-700 hover:scale-105'}`}
            >
              {isSuccess ? 'Calculated!' : 'Calculate'}
            </button>
          </form>

          {error && <div className="mt-6 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}

          {totalPaychecks !== null && <ResultDisplay paychecks={totalPaychecks} />}
        </div>
      </main>
      <footer className="text-center mt-8 text-slate-500 text-sm">
        <p>A tool for financial planning & perspective.</p>
      </footer>
       <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
        }
        @keyframes success-pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
          70% {
            transform: scale(1.02);
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }
        .animate-success {
            animation: success-pulse 1.5s ease-out;
        }
       `}</style>
    </div>
  );
};

export default App;
