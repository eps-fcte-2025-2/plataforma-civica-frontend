'use client';

import React, { useState, useEffect } from 'react';
import { useReports, useUFs } from '../hooks/useReports';
import {
  CreateReportDTO,
  TipoDenuncia,
  ComoSoube,
  PontualOuDisseminado,
  Frequencia,
  FocoManipulacao,
  PessoaEnvolvida,
  ClubeEnvolvido,
  Partida,
  Evidencia,
  CreateReportResponse
} from '../types/api';

interface FormData extends CreateReportDTO {
  torneio?: string;
  dataPartida?: string;
  localPartida?: string;
  timeA?: string;
  timeB?: string;
  observacoesPartida?: string;
  partidasSuspeitas?: Array<{
    nome: string;
    data: string;
  }>;
}

const Form: React.FC = () => {
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
    uf: '',
    pessoasEnvolvidas: [{ nomePessoa: '', funcaoPessoa: '' }],
    clubesEnvolvidos: [],
    focosManipulacao: [FocoManipulacao.ATLETAS_DIRIGENTES_COMISSAO],
    evidencias: [],
    partidas: [],
    torneio: '',
    dataPartida: '',
    localPartida: '',
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

  // Função para converter data local para ISO 8601
  const formatDateToISO = (dateString: string): string => {
    if (!dateString) return '';
    try {
      // Se a data já está no formato ISO, retorna ela mesma
      if (dateString.includes('T') && dateString.includes('Z')) {
        return dateString;
      }
      // Converte data local para ISO 8601
      const date = new Date(dateString);
      return date.toISOString();
    } catch (error) {
      console.error('Erro ao converter data:', error);
      return dateString;
    }
  };

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

  const addPartidaSuspeita = () => {
    updateFormData({
      partidasSuspeitas: [...(formData.partidasSuspeitas || []), { nome: '', data: '' }]
    });
  };

  const updatePartidaSuspeita = (index: number, field: 'nome' | 'data', value: string) => {
    const novasPartidas = (formData.partidasSuspeitas || []).map((partida, i) => 
      i === index ? { ...partida, [field]: value } : partida
    );
    updateFormData({ partidasSuspeitas: novasPartidas });
  };

  const removePartidaSuspeita = (index: number) => {
    const novasPartidas = (formData.partidasSuspeitas || []).filter((_, i) => i !== index);
    updateFormData({ partidasSuspeitas: novasPartidas });
  };

  const toggleFocoManipulacao = (foco: FocoManipulacao) => {
    const novosFocos = formData.focosManipulacao.includes(foco)
      ? formData.focosManipulacao.filter(f => f !== foco)
      : [...formData.focosManipulacao, foco];
    updateFormData({ focosManipulacao: novosFocos });
  };

  const nextStep = () => {
    // Validações antes de avançar
    if (currentStep === 2) {
      // Validar etapa 2
      if (!formData.uf) {
        alert('Por favor, selecione uma UF');
        return;
      }
      if (formData.focosManipulacao.length === 0) {
        alert('Por favor, selecione pelo menos um foco de manipulação');
        return;
      }
    }
    
    if (currentStep === 3 && formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA) {
      // Validar campos da partida
      if (!formData.torneio) {
        alert('Por favor, informe o torneio');
        return;
      }
    }
    
    if (currentStep === 4) {
      // Validar pessoas envolvidas
      if (formData.pessoasEnvolvidas.some(p => !p.nomePessoa || !p.funcaoPessoa)) {
        alert('Por favor, preencha todos os campos de pessoas envolvidas');
        return;
      }
    }
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 5) {
      handleSubmit();
    }
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

      // Preparar dados para envio baseado no tipo de denúncia
      let dadosEnvio: CreateReportDTO;

      if (formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA) {
        dadosEnvio = {
          ...formData,
          partidas: [{
            torneio: formData.torneio || '',
            dataPartida: formatDateToISO(formData.dataPartida || ''),
            localPartida: formData.localPartida || '',
            timeA: formData.timeA || '',
            timeB: formData.timeB || '',
            observacoes: formData.observacoesPartida || '',
            uf: formData.uf
          }]
        };
      } else {
        // Para esquema de manipulação, converter partidas suspeitas
        dadosEnvio = {
          ...formData,
          partidas: (formData.partidasSuspeitas || []).map(partida => ({
            torneio: partida.nome,
            dataPartida: formatDateToISO(partida.data),
            localPartida: 'Local não especificado',
            timeA: 'Time A',
            timeB: 'Time B',
            observacoes: 'Partida suspeita identificada no esquema',
            uf: formData.uf
          }))
        };
      }

      const response = await createReport(dadosEnvio);
      setResponse(response);
      setCurrentStep(6); // Ir para tela de sucesso
    } catch (error: any) {
      console.error('Erro ao enviar denúncia:', error);
      setSubmitError(error.message || 'Erro ao enviar denúncia. Por favor, tente novamente.');
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
      uf: '',
      pessoasEnvolvidas: [{ nomePessoa: '', funcaoPessoa: '' }],
      clubesEnvolvidos: [],
      focosManipulacao: [FocoManipulacao.ATLETAS_DIRIGENTES_COMISSAO],
      evidencias: [],
      partidas: [],
      torneio: '',
      dataPartida: '',
      localPartida: '',
      timeA: '',
      timeB: '',
      observacoesPartida: '',
      partidasSuspeitas: []
    });
    setCurrentStep(1);
    setResponse(null);
  };

  if (response) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Denúncia Enviada com Sucesso!</h2>
          <p className="text-gray-600 mb-4">
            Sua denúncia foi registrada no sistema e receberá o número de protocolo:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-lg font-mono text-gray-800">{response.id}</p>
            <p className="text-sm text-gray-600 mt-1">
              Data de criação: {new Date(response.createdAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <button
            onClick={resetForm}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Nova Denúncia
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header com progresso */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {currentStep}
          </div>
          <span className="ml-3 text-lg font-semibold text-gray-700">
            Passos {currentStep} de 5
          </span>
        </div>
        <div className="flex-1 mx-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Erro:</strong> {error}
        </div>
      )}

      {/* Etapa 1: Primeira pergunta - Tipo de denúncia */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mr-2">O que você deseja denunciar?</h2>
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">?</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="tipoDenuncia"
                value={TipoDenuncia.PARTIDA_ESPECIFICA}
                checked={formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA}
                onChange={(e) => updateFormData({ tipoDenuncia: e.target.value as TipoDenuncia })}
                className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div>
                <span className="text-gray-700">
                  Quero denunciar uma fraude de manipulação sobre uma <strong>PARTIDA ESPECÍFICA</strong>
                </span>
              </div>
            </label>

            <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="tipoDenuncia"
                value={TipoDenuncia.ESQUEMA_DE_MANIPULACAO}
                checked={formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO}
                onChange={(e) => updateFormData({ tipoDenuncia: e.target.value as TipoDenuncia })}
                className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div>
                <span className="text-gray-700">
                  Quero denunciar um <strong>ESQUEMA DE MANIPULAÇÃO</strong> de resultados
                </span>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Etapa 2: Informações básicas */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA 
              ? 'Informações da Partida' 
              : 'Informações do Esquema'}
          </h2>
          
          {/* Como Soube */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA 
                ? 'Como soube da situação?' 
                : 'Como soube do esquema?'} *
            </label>
            <select
              value={formData.comoSoube}
              onChange={(e) => updateFormData({ comoSoube: e.target.value as ComoSoube })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={ComoSoube.VITIMA}>Fui vítima</option>
              <option value={ComoSoube.TERCEIROS}>Terceiros me informaram</option>
              <option value={ComoSoube.INTERNET}>Vi na internet</option>
              <option value={ComoSoube.PRESENCIAL}>Presenciei pessoalmente</option>
              <option value={ComoSoube.OBSERVACAO}>Observação</option>
              <option value={ComoSoube.OUTROS}>Outros</option>
            </select>
          </div>

          {/* UF */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              UF *
            </label>
            <select
              value={formData.uf}
              onChange={(e) => updateFormData({ uf: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={ufsLoading}
              required
            >
              <option value="">Selecione uma UF</option>
              {ufs.map((uf) => (
                <option key={uf.sigla} value={uf.sigla}>
                  {uf.sigla} - {uf.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Campos específicos para esquema de manipulação */}
          {formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO && (
            <>
              {/* Pontual ou Disseminado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  O esquema é pontual ou disseminado (cidade ou região)? *
                </label>
                <select
                  value={formData.pontualOuDisseminado}
                  onChange={(e) => updateFormData({ pontualOuDisseminado: e.target.value as PontualOuDisseminado })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={PontualOuDisseminado.PONTUAL}>Pontual</option>
                  <option value={PontualOuDisseminado.DISSEMINADO}>Disseminado (cidade ou região)</option>
                </select>
              </div>

              {/* Frequência */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fato isolado ou frequente? *
                </label>
                <select
                  value={formData.frequencia}
                  onChange={(e) => updateFormData({ frequencia: e.target.value as Frequencia })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={Frequencia.ISOLADO}>Isolado</option>
                  <option value={Frequencia.FREQUENTE}>Frequente</option>
                </select>
              </div>
            </>
          )}

          {/* Focos de Manipulação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA 
                ? 'Focos de Manipulação' 
                : 'O esquema de manipulação está focado em'} *
            </label>
            <div className="space-y-2">
              {Object.values(FocoManipulacao).map((foco) => (
                <label key={foco} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.focosManipulacao.includes(foco)}
                    onChange={() => toggleFocoManipulacao(foco)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">
                    {foco === FocoManipulacao.ATLETAS_DIRIGENTES_COMISSAO 
                      ? 'ATLETAS, DIRIGENTES OU COMISSÃO' 
                      : foco.replace('_', ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Etapa 3: Detalhes específicos da partida */}
      {currentStep === 3 && formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Detalhes da Partida</h2>
          
          {/* Torneio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qual foi o torneio? *
            </label>
            <input
              type="text"
              value={formData.torneio}
              onChange={(e) => updateFormData({ torneio: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite o nome do torneio"
              required
            />
          </div>

          {/* Detalhes da Partida */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qual o local da partida?
              </label>
              <input
                type="text"
                value={formData.localPartida}
                onChange={(e) => updateFormData({ localPartida: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite o local"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qual a data da partida?
              </label>
              <input
                type="datetime-local"
                value={formData.dataPartida}
                onChange={(e) => updateFormData({ dataPartida: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time A
              </label>
              <input
                type="text"
                value={formData.timeA}
                onChange={(e) => updateFormData({ timeA: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nome do time A"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time B
              </label>
              <input
                type="text"
                value={formData.timeB}
                onChange={(e) => updateFormData({ timeB: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nome do time B"
              />
            </div>
          </div>
        </div>
      )}

      {/* Etapa 3: Detalhes do esquema de manipulação */}
      {currentStep === 3 && formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Detalhes do Esquema</h2>
          
          {/* Descrição do esquema */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descreva o esquema de manipulação *
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 5000) {
                  updateFormData({ descricao: value });
                }
              }}
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descreva detalhadamente o esquema de manipulação que você conhece. Seja claro e objetivo."
              required
              minLength={10}
              maxLength={5000}
            />
            <div className="text-sm text-gray-500 mt-1">
              {formData.descricao.length}/5000 caracteres
            </div>
          </div>

          {/* Partidas Suspeitas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Possíveis partidas suspeitas
            </label>
            {(formData.partidasSuspeitas || []).map((partida, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Nome da partida"
                  value={partida.nome}
                  onChange={(e) => updatePartidaSuspeita(index, 'nome', e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={partida.data}
                  onChange={(e) => updatePartidaSuspeita(index, 'data', e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => removePartidaSuspeita(index)}
                  className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPartidaSuspeita}
              className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center"
            >
              <span className="mr-2">+</span> Adicionar Partida
            </button>
          </div>
        </div>
      )}

      {/* Etapa 4: Pessoas e clubes envolvidos */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Envolvidos</h2>
          
          {/* Clubes Envolvidos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quais clubes/times estão envolvidos?
            </label>
            {(formData.clubesEnvolvidos || []).map((clube, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Digite o nome do clube/time"
                  value={clube.nomeClube}
                  onChange={(e) => updateClubeEnvolvido(index, e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => removeClubeEnvolvido(index)}
                  className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addClubeEnvolvido}
              className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center"
            >
              <span className="mr-2">+</span> Adicionar Clube
            </button>
          </div>

          {/* Pessoas Envolvidas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quem são as pessoas envolvidas? *
            </label>
            {formData.pessoasEnvolvidas.map((pessoa, index) => (
              <div key={index} className="space-y-2 mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Digite o nome da pessoa"
                    value={pessoa.nomePessoa}
                    onChange={(e) => updatePessoaEnvolvida(index, 'nomePessoa', e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {formData.pessoasEnvolvidas.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePessoaEnvolvida(index)}
                      className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Qual a função da pessoa envolvida? *
                  </label>
                  <input
                    type="text"
                    placeholder="Digite a função (ex: jogador, técnico, dirigente...)"
                    value={pessoa.funcaoPessoa}
                    onChange={(e) => updatePessoaEnvolvida(index, 'funcaoPessoa', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addPessoaEnvolvida}
              className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center"
            >
              <span className="mr-2">+</span> Adicionar Pessoa
            </button>
          </div>

          {/* Descrição (para partida específica) */}
          {formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                O que aconteceu? *
              </label>
              <textarea
                value={formData.descricao}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 5000) {
                    updateFormData({ descricao: value });
                  }
                }}
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descreva o conteúdo de sua manifestação. Seja claro e objetivo. Informações pessoais, inclusive identificação, não devem ser inseridas a não ser que sejam essenciais para a caracterização da manifestação"
                required
                minLength={10}
                maxLength={5000}
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.descricao.length}/5000 caracteres
              </div>
            </div>
          )}

          {/* Upload de Arquivos - TODO: Implementar funcionalidade de upload */}
          {/*
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Envio de arquivos
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="mt-4">
                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Selecione o arquivo
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                São aceitos documentos de texto (.pdf, .doc, .docx, .txt), imagens (.jpeg, .jpg, .png, .bmp), planilhas (.xls, .xlsx) e multimídia (.mp3, .mp4)
              </p>
            </div>
          </div>
          */}
        </div>
      )}

      {/* Etapa 5: Revisão e Descrição Final */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Detalhes finais</h2>
          
          {/* Campo de descrição para esquema de manipulação na última etapa */}
          {formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição detalhada *
              </label>
              <textarea
                value={formData.descricao}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 5000) {
                    updateFormData({ descricao: value });
                  }
                }}
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descreva detalhadamente o esquema de manipulação..."
                required
                minLength={10}
                maxLength={5000}
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.descricao.length}/5000 caracteres
              </div>
            </div>
          )}
          
          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">Revisão da Denúncia</h3>
          
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Tipo de Denúncia:</h3>
              <p className="text-gray-600">
                {formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA 
                  ? 'Partida Específica' 
                  : 'Esquema de Manipulação'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Como soube:</h3>
              <p className="text-gray-600">{formData.comoSoube}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">UF:</h3>
              <p className="text-gray-600">
                {ufs.find(u => u.sigla === formData.uf)?.nome || 'Não selecionado'}
              </p>
            </div>

            {formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO && (
              <>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Tipo do esquema:</h3>
                  <p className="text-gray-600">{formData.pontualOuDisseminado}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Frequência:</h3>
                  <p className="text-gray-600">{formData.frequencia}</p>
                </div>
              </>
            )}

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Focos de manipulação:</h3>
              <p className="text-gray-600">
                {formData.focosManipulacao.map(foco => 
                  foco === FocoManipulacao.ATLETAS_DIRIGENTES_COMISSAO 
                    ? 'ATLETAS, DIRIGENTES OU COMISSÃO' 
                    : foco.replace('_', ' ')
                ).join(', ')}
              </p>
            </div>

            {formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA && formData.torneio && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Torneio:</h3>
                <p className="text-gray-600">{formData.torneio}</p>
              </div>
            )}

            {formData.clubesEnvolvidos && formData.clubesEnvolvidos.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Clubes envolvidos:</h3>
                <p className="text-gray-600">{formData.clubesEnvolvidos.map(c => c.nomeClube).join(', ')}</p>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Pessoas envolvidas:</h3>
              <ul className="text-gray-600">
                {formData.pessoasEnvolvidas.map((pessoa, index) => (
                  <li key={index}>• {pessoa.nomePessoa} - {pessoa.funcaoPessoa}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Descrição:</h3>
              <p className="text-gray-600">{formData.descricao}</p>
            </div>
          </div>
        </div>
      )}

      {/* Etapa 6: Tela de Sucesso */}
      {currentStep === 6 && response && (
        <div className="text-center space-y-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900">Denúncia enviada com sucesso!</h2>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <p className="text-lg text-gray-700 mb-2">
              Sua denúncia foi registrada com o protocolo:
            </p>
            <p className="text-2xl font-mono font-bold text-green-700">
              {response.id}
            </p>
          </div>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Guarde este número de protocolo para acompanhamento futuro. 
            Sua contribuição é fundamental para combater a manipulação de resultados esportivos.
          </p>
          
          <button
            type="button"
            onClick={resetForm}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Nova Denúncia
          </button>
        </div>
      )}

      {/* Mensagem de Erro */}
      {submitError && currentStep !== 6 && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {submitError}
          </p>
        </div>
      )}

      {/* Botões de Navegação */}
      {currentStep !== 6 && (
        <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg flex items-center"
        >
          <span className="mr-2">←</span> Anterior
        </button>

        {currentStep === 5 ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg flex items-center"
          >
            {isSubmitting || loading ? 'Enviando...' : 'Enviar Denúncia'}
            {!isSubmitting && !loading && <span className="ml-2">→</span>}
          </button>
        ) : (
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
          >
            Próximo
            <span className="ml-2">→</span>
          </button>
        )}
      </div>
      )}
    </div>
  );
};

export default Form;