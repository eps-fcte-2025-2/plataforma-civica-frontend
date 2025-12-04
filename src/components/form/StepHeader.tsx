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
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black font-bold">
            {currentStep}
          </div>
          <span className="ml-3 text-lg font-semibold text-foreground">
            Passos {currentStep} de {maxSteps}
          </span>
        </div>
        <div className="flex-1 mx-6">
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / maxSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-destructive border border-destructive text-background px-4 py-3 rounded mb-6">
          <strong>Erro:</strong> {error}
        </div>
      )}
    </>
  );
};

export default StepHeader;
