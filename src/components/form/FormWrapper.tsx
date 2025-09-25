'use client';

import React, { useState, useEffect } from 'react';
import { useReports, useUFs } from '@/hooks/useReports';
import {
  CreateReportDTO,
  CreateReportResponse,
  TipoDenuncia,
  ComoSoube,
  PontualOuDisseminado,
  Frequencia,
  FocoManipulacao,
  PessoaEnvolvida
} from '@/types/api';

// Importar os componentes
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

interface PartidaSuspeita {
  nome: string;
  data: string;
  local: string;
  municipio: string;
}

interface FormData extends CreateReportDTO {
  torneio?: string;
  dataPartida?: string;
  localPartida?: string;
  municipioPartida?: string;
  timeA?: string;
  timeB?: string;
  observacoesPartida?: string;
  partidasSuspeitas?: PartidaSuspeita[];
}

const FormWrapper: React.FC = () => {
  const { createReport, loading, error } = useReports();
  const { ufs, loading: ufsLoading, fetchUFs } = useUFs();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [response, setResponse] = useState<CreateReportResponse | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    tipoDenuncia: TipoDenuncia.PARTIDA_ESPECIFICA,
    descricao: '',
    comoSoube: ComoSoube.OUTROS,
    pontualOuDisseminado: PontualOuDisseminado.PONTUAL,
    frequencia: Frequencia.ISOLADO,
    municipio: '',
    uf: '',
    pessoasEnvolvidas: [{ nomePessoa: '', funcaoPessoa: '' }],
    clubesEnvolvidos: [],
    focosManipulacao: [],
    evidencias: [],
    partidas: [],
    torneio: '',
    dataPartida: '',
    localPartida: '',
    municipioPartida: '',
    timeA: '',
    timeB: '',
    observacoesPartida: '',
    partidasSuspeitas: []
  });

  useEffect(() => {
    fetchUFs();
  }, [fetchUFs]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const getMaxStepsForType = () => {
    if (formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA) {
      return 4; // 1: tipo, 2: dados partida, 3: envolvidos, 4: descrição
    } else {
      return 4; // Para esquema: 1: tipo, 2: info básica, 3: focos, 4: detalhes condicionais
    }
  };

  // Função para converter data local para ISO 8601 com Z no final
  const formatDateToISO = (dateString: string): string => {
    if (!dateString) return '';
    try {
      if (dateString.includes('T') && dateString.endsWith('Z')) {
        return dateString;
      }
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Data inválida');
      }
      return date.toISOString();
    } catch (error) {
      console.error('Erro ao converter data:', error);
      return '';
    }
  };

  // Funções para gerenciar pessoas envolvidas
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

  // Funções para gerenciar clubes envolvidos
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

  const nextStep = () => {
    // Validações para Partida Específica
    if (currentStep === 2 && formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA) {
      if (!formData.torneio) {
        alert('Por favor, informe o torneio');
        return;
      }
      if (!formData.localPartida) {
        alert('Por favor, informe o local da partida');
        return;
      }
      if (!formData.municipio) {
        alert('Por favor, informe o município');
        return;
      }
      if (!formData.uf) {
        alert('Por favor, selecione uma UF');
        return;
      }
    }
    
    if (currentStep === 3 && formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA) {
      if (formData.pessoasEnvolvidas.some(p => !p.nomePessoa || !p.funcaoPessoa)) {
        alert('Por favor, preencha todos os campos de pessoas envolvidas');
        return;
      }
    }
    
    if (currentStep === 4 && formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA) {
      if (formData.descricao.length < 10) {
        alert('A descrição deve ter pelo menos 10 caracteres');
        return;
      }
      // Se é a última etapa, submeter
      handleSubmit();
      return;
    }

    // Validações para Esquema de Manipulação
    if (currentStep === 2 && formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO) {
      if (!formData.municipio) {
        alert('Por favor, informe o município');
        return;
      }
      if (!formData.uf) {
        alert('Por favor, selecione uma UF');
        return;
      }
    }

    if (currentStep === 3 && formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO) {
      if (formData.focosManipulacao.length === 0) {
        alert('Por favor, selecione pelo menos um foco do esquema');
        return;
      }
    }

    if (currentStep === 4 && formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO) {
      if (formData.pessoasEnvolvidas.some(p => p.nomePessoa && !p.funcaoPessoa)) {
        alert('Por favor, defina a função de todas as pessoas envolvidas');
        return;
      }
      if (formData.descricao.length < 10) {
        alert('A descrição deve ter pelo menos 10 caracteres');
        return;
      }
      // Se é a última etapa, submeter
      handleSubmit();
      return;
    }
    
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    setIsSubmitting(true);
    
    try {
      // Validar descrição mínima
      if (formData.descricao.length < 10) {
        throw new Error('A descrição deve ter pelo menos 10 caracteres');
      }

      // Preparar dados para envio
      let dadosEnvio: CreateReportDTO;

      if (formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA) {
        dadosEnvio = {
          ...formData,
          focosManipulacao: [FocoManipulacao.ATLETAS_DIRIGENTES_COMISSAO], // valor padrão para partida específica
          partidas: [{
            torneio: formData.torneio || '',
            dataPartida: formatDateToISO(formData.dataPartida || ''),
            localPartida: formData.localPartida || '',
            municipio: formData.municipioPartida || formData.municipio,
            timeA: formData.timeA || '',
            timeB: formData.timeB || '',
            observacoes: formData.observacoesPartida || '',
            uf: formData.uf
          }]
        };
      } else {
        // Para esquema de manipulação
        dadosEnvio = {
          ...formData,
          partidas: (formData.partidasSuspeitas || []).map(partida => ({
            torneio: partida.nome,
            dataPartida: formatDateToISO(partida.data),
            localPartida: partida.local,
            municipio: partida.municipio,
            timeA: '',
            timeB: '',
            observacoes: '',
            uf: formData.uf
          }))
        };
      }

      const response = await createReport(dadosEnvio);
      setResponse(response);
    } catch (error: unknown) {
      console.error('Erro ao enviar denúncia:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar denúncia. Por favor, tente novamente.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      tipoDenuncia: TipoDenuncia.PARTIDA_ESPECIFICA,
      descricao: '',
      comoSoube: ComoSoube.OUTROS,
      pontualOuDisseminado: PontualOuDisseminado.PONTUAL,
      frequencia: Frequencia.ISOLADO,
      municipio: '',
      uf: '',
      pessoasEnvolvidas: [{ nomePessoa: '', funcaoPessoa: '' }],
      clubesEnvolvidos: [],
      focosManipulacao: [],
      evidencias: [],
      partidas: [],
      torneio: '',
      dataPartida: '',
      localPartida: '',
      municipioPartida: '',
      timeA: '',
      timeB: '',
      observacoesPartida: '',
      partidasSuspeitas: []
    });
    setCurrentStep(1);
    setResponse(null);
    setSubmitError(null);
  };

  if (response) {
    return <SuccessScreen response={response} onNewReport={resetForm} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <StepHeader 
        currentStep={currentStep} 
        maxSteps={getMaxStepsForType()} 
        error={error} 
      />

      {/* Etapa 1: Tipo de Denúncia */}
      {currentStep === 1 && (
        <div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
            <p className="text-yellow-800">DEBUG: Tipo selecionado: {formData.tipoDenuncia}</p>
          </div>
          <TipoDenunciaStep
            tipoDenuncia={formData.tipoDenuncia}
            onUpdate={updateFormData}
          />
        </div>
      )}

      {/* Etapa 2: Dados da Partida (Partida Específica) */}
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

      {/* Etapa 3: Envolvidos (Partida Específica) */}
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

      {/* Etapa 4: Descrição (Partida Específica) */}
      {currentStep === 4 && formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA && (
        <DescricaoStep
          descricao={formData.descricao}
          titulo="O que aconteceu?"
          placeholder="Descreva o que aconteceu na partida. Seja claro e objetivo. Informações pessoais, inclusive identificação, não devem ser inseridas a não ser que sejam essenciais para a caracterização da manifestação"
          onUpdate={(descricao) => updateFormData({ descricao })}
        />
      )}

      {/* Etapa 2: Informações Básicas (Esquema de Manipulação) */}
      {currentStep === 2 && formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO && (
        <div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
            <p className="text-blue-800">DEBUG: Esquema de Manipulação - Etapa 2 - currentStep: {currentStep}</p>
          </div>
          <EsquemaInfoBasicaStep
            comoSoube={formData.comoSoube || ComoSoube.OUTROS}
            pontualOuDisseminado={formData.pontualOuDisseminado || PontualOuDisseminado.PONTUAL}
            frequencia={formData.frequencia || Frequencia.ISOLADO}
            municipio={formData.municipio}
            uf={formData.uf}
            ufs={ufs}
            ufsLoading={ufsLoading}
            onUpdate={updateFormData}
          />
        </div>
      )}

      {/* Etapa 3: Foco do Esquema (Esquema de Manipulação) */}
      {currentStep === 3 && formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO && (
        <EsquemaFocoStep
          focosManipulacao={formData.focosManipulacao}
          onUpdate={(focosManipulacao) => updateFormData({ focosManipulacao })}
        />
      )}

      {/* Etapa 4: Detalhes Condicionais (Esquema de Manipulação) */}
      {currentStep === 4 && formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO && (
        <EsquemaDetalhesStep
          focosManipulacao={formData.focosManipulacao}
          pessoasEnvolvidas={formData.pessoasEnvolvidas}
          clubesEnvolvidos={formData.clubesEnvolvidos || []}
          partidasSuspeitas={formData.partidasSuspeitas || []}
          descricao={formData.descricao}
          onUpdatePessoas={(pessoasEnvolvidas) => updateFormData({ pessoasEnvolvidas })}
          onUpdateClubes={(clubesEnvolvidos) => updateFormData({ clubesEnvolvidos })}
          onUpdatePartidas={(partidasSuspeitas) => updateFormData({ partidasSuspeitas })}
          onUpdateDescricao={(descricao) => updateFormData({ descricao })}
        />
      )}

      {/* Mensagem de Erro */}
      {submitError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            {submitError}
          </p>
        </div>
      )}

      {/* Botões de Navegação */}
      <NavigationButtons
        currentStep={currentStep}
        maxSteps={getMaxStepsForType()}
        isSubmitting={isSubmitting}
        loading={loading}
        isLastStep={currentStep === getMaxStepsForType()}
        onPrevious={prevStep}
        onNext={nextStep}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FormWrapper;