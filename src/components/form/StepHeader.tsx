import React from 'react';

interface StepHeaderProps {
  currentStep: number;
  maxSteps: number;
  error?: string | null;
}

const StepHeader: React.FC<StepHeaderProps> = ({ currentStep, maxSteps, error }) => {
  return (
    <>
      {/* Header com progresso */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {currentStep}
          </div>
          <span className="ml-3 text-lg font-semibold text-gray-700">
            Passos {currentStep} de {maxSteps}
          </span>
        </div>
        <div className="flex-1 mx-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / maxSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Erro:</strong> {error}
        </div>
      )}
    </>
  );
};

export default StepHeader;