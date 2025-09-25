import React from 'react';

interface NavigationButtonsProps {
  currentStep: number;
  maxSteps: number;
  isSubmitting: boolean;
  loading: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep, maxSteps, isSubmitting, loading, isLastStep,
  onPrevious, onNext, onSubmit
}) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg flex items-center"
      >
        ← Anterior
      </button>

      {isLastStep ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg flex items-center"
        >
          {isSubmitting || loading ? 'Enviando...' : 'Enviar Denúncia'}
          {!isSubmitting && !loading && <span className="ml-2">📤</span>}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
        >
          Próximo
          <span className="ml-2">→</span>
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;