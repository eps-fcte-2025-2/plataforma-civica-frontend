'use client';

import React from 'react';
import { useReports, useUFs } from '@/hooks/useReports';
import { TipoDenuncia, PessoaEnvolvida, ComoSoube, PontualOuDisseminado, Frequencia } from '@/types/api';

// Context Providers
import { FormProvider, useFormData } from './FormDataContext';
import { StepNavigationProvider, useStepNavigation } from './StepNavigationContext';

// Components
import StepHeader from './StepHeader';
import TipoDenunciaStep from './TipoDenunciaStep';
import PartidaDadosStep from './PartidaDadosStep';
import PartidaEnvolvidosStep from './PartidaEnvolvidosStep';
import DescricaoStep from './DescricaoStep';
import EsquemaInfoBasicaStep from './EsquemaInfoBasicaStep';
import EsquemaFocoStep from './EsquemaFocoStep';
import EsquemaDetalhesStep from './EsquemaDetalhesStep';
import NavigationButtons from './NavigationButtons';
import SuccessScreen from './SuccessScreen';

// Hooks and Utils
import { useFormSubmission } from './useFormSubmission';
import { FormValidator } from './FormValidator';

const FormSteps: React.FC = () => {
  const { ufs, loading: ufsLoading, fetchUFs } = useUFs();
  const { loading, error } = useReports();
  const { formData, updateFormData, resetFormData } = useFormData();
  const { currentStep, maxSteps, isLastStep, nextStep, prevStep } = useStepNavigation();
  const { isSubmitting, submitError, response, handleSubmit, clearResponse } = useFormSubmission();

  React.useEffect(() => {
    fetchUFs();
  }, [fetchUFs]);

  const handleTipoDenunciaUpdate = ({ tipoDenuncia }: { tipoDenuncia: TipoDenuncia }) => {
    if (tipoDenuncia === formData.tipoDenuncia) {
      return;
    }

    resetFormData();

    if (tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO) {
      updateFormData({
        tipoDenuncia,
        pessoasEnvolvidas: [],
        clubesEnvolvidos: [],
        focosManipulacao: [],
        partidasSuspeitas: [],
        descricao: '',
        municipio: '',
        uf: '',
      });
      return;
    }

    updateFormData({
      tipoDenuncia,
      pessoasEnvolvidas: [{ nomePessoa: '', funcaoPessoa: '' }],
      clubesEnvolvidos: [],
      focosManipulacao: [],
      partidasSuspeitas: [],
      descricao: '',
    });
  };

  React.useEffect(() => {
    if (
      formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA &&
      formData.pessoasEnvolvidas.length === 0
    ) {
      updateFormData({ pessoasEnvolvidas: [{ nomePessoa: '', funcaoPessoa: '' }] });
    }
  }, [formData.tipoDenuncia, formData.pessoasEnvolvidas.length, updateFormData]);

  // People management functions
  const addPessoaEnvolvida = () => {
    updateFormData({
      pessoasEnvolvidas: [...formData.pessoasEnvolvidas, { nomePessoa: '', funcaoPessoa: '' }]
    });
  };

  const updatePessoaEnvolvida = (index: number, field: keyof PessoaEnvolvida, value: string) => {
    const novasPessoas = formData.pessoasEnvolvidas.map((pessoa, i) => 
      i === index ? { ...pessoa, [field]: value } : pessoa
    );
    updateFormData({ pessoasEnvolvidas: novasPessoas });
  };

  const removePessoaEnvolvida = (index: number) => {
    const novasPessoas = formData.pessoasEnvolvidas.filter((_, i) => i !== index);
    updateFormData({ pessoasEnvolvidas: novasPessoas });
  };

  // Club management functions
  const addClubeEnvolvido = () => {
    updateFormData({
      clubesEnvolvidos: [...(formData.clubesEnvolvidos || []), { nomeClube: '' }]
    });
  };

  const updateClubeEnvolvido = (index: number, value: string) => {
    const novosClubes = (formData.clubesEnvolvidos || []).map((clube, i) => 
      i === index ? { ...clube, nomeClube: value } : clube
    );
    updateFormData({ clubesEnvolvidos: novosClubes });
  };

  const removeClubeEnvolvido = (index: number) => {
    const novosClubes = (formData.clubesEnvolvidos || []).filter((_, i) => i !== index);
    updateFormData({ clubesEnvolvidos: novosClubes });
  };

  const handleNextStep = () => {
    const validation = FormValidator.validateStep(currentStep, formData);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    if (isLastStep) {
      handleSubmit(formData);
    } else {
      nextStep();
    }
  };

  const resetForm = () => {
    clearResponse();
    resetFormData();
  };

  if (response) {
    return <SuccessScreen response={response} onNewReport={resetForm} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-card-bg rounded-lg shadow-lg">
      <StepHeader 
        currentStep={currentStep} 
        maxSteps={maxSteps} 
        error={error} 
      />

      {/* Step 1: Tipo de Denúncia */}
      {currentStep === 1 && (
        <TipoDenunciaStep
          tipoDenuncia={formData.tipoDenuncia}
          onUpdate={handleTipoDenunciaUpdate}
        />
      )}

      {/* Step 2: Dados da Partida */}
      {currentStep === 2 && formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA && (
        <PartidaDadosStep
          torneio={formData.torneio || ''}
          localPartida={formData.localPartida || ''}
          dataPartida={formData.dataPartida || ''}
          municipio={formData.municipio}
          uf={formData.uf}
          timeA={formData.timeA || ''}
          timeB={formData.timeB || ''}
          ufs={ufs}
          ufsLoading={ufsLoading}
          onUpdate={updateFormData}
        />
      )}

      {currentStep === 2 && formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO && (
        <EsquemaInfoBasicaStep
          comoSoube={formData.comoSoube ?? ComoSoube.OUTROS}
          pontualOuDisseminado={formData.pontualOuDisseminado ?? PontualOuDisseminado.PONTUAL}
          frequencia={formData.frequencia ?? Frequencia.ISOLADO}
          municipio={formData.municipio}
          uf={formData.uf}
          ufs={ufs}
          ufsLoading={ufsLoading}
          onUpdate={updateFormData}
        />
      )}

      {/* Step 3: Envolvidos */}
      {currentStep === 3 && formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA && (
        <PartidaEnvolvidosStep
          pessoasEnvolvidas={formData.pessoasEnvolvidas}
          clubesEnvolvidos={formData.clubesEnvolvidos || []}
          onAddPessoa={addPessoaEnvolvida}
          onUpdatePessoa={updatePessoaEnvolvida}
          onRemovePessoa={removePessoaEnvolvida}
          onAddClube={addClubeEnvolvido}
          onUpdateClube={updateClubeEnvolvido}
          onRemoveClube={removeClubeEnvolvido}
        />
      )}

      {currentStep === 3 && formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO && (
        <EsquemaFocoStep
          focosManipulacao={formData.focosManipulacao}
          onUpdate={(focos) => updateFormData({ focosManipulacao: focos })}
          // As validações visuais neste wrapper simplificado não usam field map, então omitimos
        />
      )}

      {/* Step 4: Descrição */}
      {currentStep === 4 && formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA && (
        <DescricaoStep
          descricao={formData.descricao}
          titulo="O que aconteceu?"
          placeholder="Descreva o que aconteceu na partida. Seja claro e objetivo. Informações pessoais, inclusive identificação, não devem ser inseridas a não ser que sejam essenciais para a caracterização da manifestação"
          onUpdate={(descricao) => updateFormData({ descricao })}
        />
      )}

      {currentStep === 4 && formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO && (
        <EsquemaDetalhesStep
          focosManipulacao={formData.focosManipulacao}
          pessoasEnvolvidas={formData.pessoasEnvolvidas}
          clubesEnvolvidos={formData.clubesEnvolvidos || []}
          partidasSuspeitas={formData.partidasSuspeitas || []}
          descricao={formData.descricao}
          onUpdatePessoas={(pessoas) => updateFormData({ pessoasEnvolvidas: pessoas })}
          onUpdateClubes={(clubes) => updateFormData({ clubesEnvolvidos: clubes })}
          onUpdatePartidas={(partidas) => updateFormData({ partidasSuspeitas: partidas })}
          onUpdateDescricao={(descricao) => updateFormData({ descricao })}
          // Sem exibição de erros campo-a-campo neste wrapper
        />
      )}

      {/* Error Message */}
      {submitError && (
        <div className="mt-4 p-4 bg-destructive border border-red-200 rounded-lg">
          <p className="text-destructive flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            {submitError}
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <NavigationButtons
        currentStep={currentStep}
        maxSteps={maxSteps}
        isSubmitting={isSubmitting}
        loading={loading}
        isLastStep={isLastStep}
        onPrevious={prevStep}
        onNext={handleNextStep}
        onSubmit={() => handleSubmit(formData)}
      />
    </div>
  );
};

const FormWithNavigation: React.FC = () => {
  const { formData } = useFormData();
  
  return (
    <StepNavigationProvider tipoDenuncia={formData.tipoDenuncia}>
      <FormSteps />
    </StepNavigationProvider>
  );
};

const FormWrapperNew: React.FC = () => {
  return (
    <FormProvider>
      <FormWithNavigation />
    </FormProvider>
  );
};

export default FormWrapperNew;

