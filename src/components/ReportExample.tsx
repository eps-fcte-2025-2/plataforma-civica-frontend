// src/components/ReportExample.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useReports, useMunicipios } from '../hooks/useReports';
import {
  CreateReportDTO,
  TipoDenuncia,
  ComoSoube,
  PontualOuDisseminado,
  Frequencia,
  FocoManipulacao,
  PessoaEnvolvida
} from '../types/api';

export const ReportExample: React.FC = () => {
  const { reports, loading, error, fetchReports, createReport } = useReports();
  const { municipios, loading: municipiosLoading, fetchMunicipios } = useMunicipios();
  
  const [formData, setFormData] = useState<CreateReportDTO>({
    tipoDenuncia: TipoDenuncia.PARTIDA_ESPECIFICA,
    descricao: '',
    comoSoube: ComoSoube.OUTROS,
    pontualOuDisseminado: PontualOuDisseminado.PONTUAL,
    frequencia: Frequencia.ISOLADO,
    municipioId: '',
    pessoasEnvolvidas: [{ nomePessoa: '', funcaoPessoa: '' }],
    clubesEnvolvidos: [],
    focosManipulacao: [FocoManipulacao.ATLETAS_DIRIGENTES_COMISSAO],
    evidencias: [],
    partidas: []
  });

  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchReports({ page: 1, pageSize: 10 });
    fetchMunicipios();
  }, [fetchReports, fetchMunicipios]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    
    try {
      const response = await createReport(formData);
      setSuccessMessage(`Denúncia criada com sucesso! ID: ${response.id}`);
      setShowForm(false);
      // Reset form
      setFormData({
        tipoDenuncia: TipoDenuncia.PARTIDA_ESPECIFICA,
        descricao: '',
        comoSoube: ComoSoube.OUTROS,
        pontualOuDisseminado: PontualOuDisseminado.PONTUAL,
        frequencia: Frequencia.ISOLADO,
        municipioId: '',
        pessoasEnvolvidas: [{ nomePessoa: '', funcaoPessoa: '' }],
        clubesEnvolvidos: [],
        focosManipulacao: [FocoManipulacao.ATLETAS_DIRIGENTES_COMISSAO],
        evidencias: [],
        partidas: []
      });
    } catch (error) {
      console.error('Erro ao criar denúncia:', error);
    }
  };

  const addPessoaEnvolvida = () => {
    setFormData(prev => ({
      ...prev,
      pessoasEnvolvidas: [...prev.pessoasEnvolvidas, { nomePessoa: '', funcaoPessoa: '' }]
    }));
  };

  const updatePessoaEnvolvida = (index: number, field: keyof PessoaEnvolvida, value: string) => {
    setFormData(prev => ({
      ...prev,
      pessoasEnvolvidas: prev.pessoasEnvolvidas.map((pessoa, i) => 
        i === index ? { ...pessoa, [field]: value } : pessoa
      )
    }));
  };

  const removePessoaEnvolvida = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pessoasEnvolvidas: prev.pessoasEnvolvidas.filter((_, i) => i !== index)
    }));
  };

  const toggleFocoManipulacao = (foco: FocoManipulacao) => {
    setFormData(prev => ({
      ...prev,
      focosManipulacao: prev.focosManipulacao.includes(foco)
        ? prev.focosManipulacao.filter(f => f !== foco)
        : [...prev.focosManipulacao, foco]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Sistema de Denúncias - Exemplo de Uso
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Erro:</strong> {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <strong>Sucesso:</strong> {successMessage}
        </div>
      )}

      {/* Botão para mostrar/ocultar formulário */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
      >
        {showForm ? 'Ocultar Formulário' : 'Nova Denúncia'}
      </button>

      {/* Formulário de criação */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">Nova Denúncia</h2>
          
          {/* Tipo de Denúncia */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tipo de Denúncia
            </label>
            <select
              value={formData.tipoDenuncia}
              onChange={(e) => setFormData(prev => ({ ...prev, tipoDenuncia: e.target.value as TipoDenuncia }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value={TipoDenuncia.PARTIDA_ESPECIFICA}>Partida Específica</option>
              <option value={TipoDenuncia.ESQUEMA_DE_MANIPULACAO}>Esquema de Manipulação</option>
            </select>
          </div>

          {/* Descrição */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Descrição *
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={4}
              placeholder="Descreva os detalhes da denúncia..."
              required
            />
          </div>

          {/* Município */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Município *
            </label>
            <select
              value={formData.municipioId}
              onChange={(e) => setFormData(prev => ({ ...prev, municipioId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={municipiosLoading}
              required
            >
              <option value="">Selecione um município</option>
              {municipios.map((municipio) => (
                <option key={municipio.id} value={municipio.id}>
                  {municipio.nome} - {municipio.uf}
                </option>
              ))}
            </select>
          </div>

          {/* Pessoas Envolvidas */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Pessoas Envolvidas *
            </label>
            {formData.pessoasEnvolvidas.map((pessoa, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Nome da pessoa"
                  value={pessoa.nomePessoa}
                  onChange={(e) => updatePessoaEnvolvida(index, 'nomePessoa', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Função"
                  value={pessoa.funcaoPessoa}
                  onChange={(e) => updatePessoaEnvolvida(index, 'funcaoPessoa', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                {formData.pessoasEnvolvidas.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePessoaEnvolvida(index)}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPessoaEnvolvida}
              className="bg-green-500 hover:bg-green-700 text-white px-3 py-2 rounded"
            >
              Adicionar Pessoa
            </button>
          </div>

          {/* Focos de Manipulação */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Focos de Manipulação *
            </label>
            {Object.values(FocoManipulacao).map((foco) => (
              <label key={foco} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={formData.focosManipulacao.includes(foco)}
                  onChange={() => toggleFocoManipulacao(foco)}
                  className="mr-2"
                />
                {foco.replace('_', ' ')}
              </label>
            ))}
          </div>

          {/* Botões */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? 'Criando...' : 'Criar Denúncia'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Lista de denúncias */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Denúncias Existentes</h2>
        {loading ? (
          <p>Carregando denúncias...</p>
        ) : reports.length === 0 ? (
          <p>Nenhuma denúncia encontrada.</p>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {report.tipoDenuncia.replace('_', ' ')}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {new Date(report.dataDenuncia).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-gray-700 mt-2">
                      {report.descricao.length > 100 
                        ? `${report.descricao.substring(0, 100)}...` 
                        : report.descricao}
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      <span>Município: {report.municipio.nome} - {report.municipio.uf}</span>
                      <span className="ml-4">Pessoas: {report.totalPessoas}</span>
                      <span className="ml-4">Clubes: {report.totalClubes}</span>
                      <span className="ml-4">Evidências: {report.totalEvidencias}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
