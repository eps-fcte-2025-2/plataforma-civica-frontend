import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { TipoDenuncia } from '@/types/api';

interface StepNavigationContextType {
  currentStep: number;
  maxSteps: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  getMaxStepsForType: (tipoDenuncia: TipoDenuncia) => number;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const StepNavigationContext = createContext<StepNavigationContextType | undefined>(undefined);

interface StepNavigationProviderProps {
  children: ReactNode;
  tipoDenuncia: TipoDenuncia;
}

export const StepNavigationProvider: React.FC<StepNavigationProviderProps> = ({ 
  children, 
  tipoDenuncia 
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const getMaxStepsForType = (tipo: TipoDenuncia): number => {
    if (tipo === TipoDenuncia.PARTIDA_ESPECIFICA) {
      return 4; // 1: tipo, 2: dados partida, 3: envolvidos, 4: descrição
    }

    // Esquema de manipulação: 1: tipo, 2: info básica, 3: focos, 4: detalhes condicionais
    return 4;
  };

  const maxSteps = getMaxStepsForType(tipoDenuncia);

  const previousTipoRef = useRef<TipoDenuncia>(tipoDenuncia);

  useEffect(() => {
    if (previousTipoRef.current !== tipoDenuncia) {
      previousTipoRef.current = tipoDenuncia;
      setCurrentStep(1);
    }
  }, [tipoDenuncia]);

  useEffect(() => {
    if (currentStep > maxSteps) {
      setCurrentStep(maxSteps);
    }
  }, [currentStep, maxSteps]);

  const nextStep = () => {
    if (currentStep < maxSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === maxSteps;

  return (
    <StepNavigationContext.Provider value={{
      currentStep,
      maxSteps,
      setCurrentStep,
      nextStep,
      prevStep,
      getMaxStepsForType,
      isFirstStep,
      isLastStep
    }}>
      {children}
    </StepNavigationContext.Provider>
  );
};

export const useStepNavigation = (): StepNavigationContextType => {
  const context = useContext(StepNavigationContext);
  if (context === undefined) {
    throw new Error('useStepNavigation must be used within a StepNavigationProvider');
  }
  return context;
};
