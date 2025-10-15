'use client';

import React from 'react';
import { ComoSoube, PontualOuDisseminado, Frequencia } from '@/types/api';

interface EsquemaInfoBasicaStepProps {
  comoSoube: ComoSoube;
  pontualOuDisseminado: PontualOuDisseminado;
  frequencia: Frequencia;
  municipio: string;
  uf: string;
  ufs: Array<{ sigla: string; nome: string }>;
  ufsLoading: boolean;
  onUpdate: (updates: {
    comoSoube?: ComoSoube;
    pontualOuDisseminado?: PontualOuDisseminado;
    frequencia?: Frequencia;
    municipio?: string;
    uf?: string;
  }) => void;
  hasFieldError?: (field: string) => boolean;
  getFieldError?: (field: string) => string | undefined;
}

const EsquemaInfoBasicaStep: React.FC<EsquemaInfoBasicaStepProps> = ({
  comoSoube,
  pontualOuDisseminado,
  frequencia,
  municipio,
  uf,
  ufs,
  ufsLoading,
  onUpdate,
  hasFieldError,
  getFieldError,
}) => {
  // Helper para obter classes de input baseado em erro
  const getInputClasses = (fieldName: string) => {
    const hasError = hasFieldError ? hasFieldError(fieldName) : false;
    return hasError
      ? "w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      : "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  };

  // Helper para mostrar mensagem de erro
  const renderFieldError = (fieldName: string) => {
    const error = getFieldError ? getFieldError(fieldName) : undefined;
    if (!error) return null;
    
    return (
      <p className="text-sm text-red-600 mt-1">
        {error}
      </p>
    );
  };
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Informações Básicas do Esquema
      </h3>

      {/* Como soube do esquema */}
      <div>
        <label htmlFor="comoSoube" className="block text-sm font-medium text-gray-700 mb-2">
          Como soube do esquema? *
        </label>
        <select
          id="comoSoube"
          value={comoSoube}
          onChange={(e) => onUpdate({ comoSoube: e.target.value as ComoSoube })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value={ComoSoube.VITIMA}>Vítima</option>
          <option value={ComoSoube.TERCEIROS}>Terceiros</option>
          <option value={ComoSoube.INTERNET}>Internet</option>
          <option value={ComoSoube.PRESENCIAL}>Presencial</option>
          <option value={ComoSoube.OBSERVACAO}>Observação</option>
          <option value={ComoSoube.OUTROS}>Outros</option>
        </select>
      </div>

      {/* É pontual ou disseminado */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          É pontual ou disseminado? *
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="pontualOuDisseminado"
              value={PontualOuDisseminado.PONTUAL}
              checked={pontualOuDisseminado === PontualOuDisseminado.PONTUAL}
              onChange={(e) => onUpdate({ pontualOuDisseminado: e.target.value as PontualOuDisseminado })}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Pontual</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="pontualOuDisseminado"
              value={PontualOuDisseminado.DISSEMINADO}
              checked={pontualOuDisseminado === PontualOuDisseminado.DISSEMINADO}
              onChange={(e) => onUpdate({ pontualOuDisseminado: e.target.value as PontualOuDisseminado })}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Disseminado</span>
          </label>
        </div>
      </div>

      {/* Frequência */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Frequência *
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="frequencia"
              value={Frequencia.ISOLADO}
              checked={frequencia === Frequencia.ISOLADO}
              onChange={(e) => onUpdate({ frequencia: e.target.value as Frequencia })}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Isolado</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="frequencia"
              value={Frequencia.FREQUENTE}
              checked={frequencia === Frequencia.FREQUENTE}
              onChange={(e) => onUpdate({ frequencia: e.target.value as Frequencia })}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Frequente</span>
          </label>
        </div>
      </div>

      {/* Município */}
      <div>
        <label htmlFor="municipio" className="block text-sm font-medium text-gray-700 mb-2">
          Município *
        </label>
        <input
          type="text"
          id="municipio"
          value={municipio}
          onChange={(e) => onUpdate({ municipio: e.target.value })}
          placeholder="Digite o município"
          className={getInputClasses('municipio')}
        />
        {renderFieldError('municipio')}
      </div>

      {/* UF */}
      <div>
        <label htmlFor="uf" className="block text-sm font-medium text-gray-700 mb-2">
          UF (Estado) *
        </label>
        <select
          id="uf"
          value={uf}
          onChange={(e) => onUpdate({ uf: e.target.value })}
          className={getInputClasses('uf')}
          disabled={ufsLoading}
        >
          <option value="">Selecione uma UF</option>
          {ufs.map((ufItem) => (
            <option key={ufItem.sigla} value={ufItem.sigla}>
              {ufItem.sigla} - {ufItem.nome}
            </option>
          ))}
        </select>
        {ufsLoading && (
          <p className="mt-1 text-sm text-gray-500">Carregando estados...</p>
        )}
        {renderFieldError('uf')}
      </div>
    </div>
  );
};

export default EsquemaInfoBasicaStep;