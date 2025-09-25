export { default as FormWrapper } from './FormWrapper';
// Main components
export { default as FormWrapperNew } from './FormWrapperNew';
export { default as FormWrapperLegacy } from './FormWrapper'; // Legacy

// Step components
export { default as StepHeader } from './StepHeader';
export { default as TipoDenunciaStep } from './TipoDenunciaStep';
export { default as PartidaDadosStep } from './PartidaDadosStep';
export { default as PartidaEnvolvidosStep } from './PartidaEnvolvidosStep';
export { default as DescricaoStep } from './DescricaoStep';
export { default as NavigationButtons } from './NavigationButtons';
export { default as SuccessScreen } from './SuccessScreen';

// Utility components
export { default as PeopleClubsManager } from './PeopleClubsManager';

// Contexts and hooks
export { FormProvider, useFormData } from './FormDataContext';
export { StepNavigationProvider, useStepNavigation } from './StepNavigationContext';
export { useFormSubmission } from './useFormSubmission';

// Utils
export { FormValidator } from './FormValidator';