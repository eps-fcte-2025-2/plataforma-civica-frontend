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
      ? "w-full p-3 border border-destructive rounded-lg focus:ring-2 focus:ring-destructive focus:border-transparent bg-input-bg text-foreground"
      : "w-full p-3 border border-input-border rounded-lg focus:ring-2 focus:ring-input-focus focus:border-transparent bg-input-bg text-foreground";
  };

  // Helper para mostrar mensagem de erro
  const renderFieldError = (fieldName: string) => {
    const error = getFieldError ? getFieldError(fieldName) : undefined;
    if (!error) return null;
    
    return (
      <p className="text-sm text-destructive mt-1">
        {error}
      </p>
    );
  };
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Informações Básicas do Esquema
      </h3>

      {/* Como soube do esquema */}
      <div>
        <label htmlFor="comoSoube" className="block text-sm font-medium text-foreground mb-2">
          Como soube do esquema? *
        </label>
        <select
          id="comoSoube"
          value={comoSoube}
          onChange={(e) => onUpdate({ comoSoube: e.target.value as ComoSoube })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent bg-input-bg text-foreground ${hasFieldError?.('comoSoube') ? 'border-destructive focus:ring-destructive' : 'border-input-border focus:ring-input-focus'}`}
          required
        >
          <option value={ComoSoube.VITIMA}>Vítima</option>
          <option value={ComoSoube.TERCEIROS}>Terceiros</option>
          <option value={ComoSoube.INTERNET}>Internet</option>
          <option value={ComoSoube.PRESENCIAL}>Presencial</option>
          <option value={ComoSoube.OBSERVACAO}>Observação</option>
          <option value={ComoSoube.OUTROS}>Outros</option>
        </select>
        {getFieldError?.('comoSoube') && (
          <p className="text-sm text-destructive mt-1">{getFieldError('comoSoube')}</p>
        )}
      </div>

      {/* É pontual ou disseminado */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          É pontual ou disseminado? *
        </label>
        <div className={`space-y-2 rounded-md ${hasFieldError?.('pontualOuDisseminado') ? 'border border-destructive p-3' : ''}`}>
          <label className="flex items-center">
            <input
              type="radio"
              name="pontualOuDisseminado"
              value={PontualOuDisseminado.PONTUAL}
              checked={pontualOuDisseminado === PontualOuDisseminado.PONTUAL}
              onChange={(e) => onUpdate({ pontualOuDisseminado: e.target.value as PontualOuDisseminado })}
              className="mr-2 accent-primary"
            />
            <span className="text-sm text-foreground">Pontual</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="pontualOuDisseminado"
              value={PontualOuDisseminado.DISSEMINADO}
              checked={pontualOuDisseminado === PontualOuDisseminado.DISSEMINADO}
              onChange={(e) => onUpdate({ pontualOuDisseminado: e.target.value as PontualOuDisseminado })}
              className="mr-2 accent-primary"
            />
            <span className="text-sm text-foreground">Disseminado</span>
          </label>
        </div>
        {getFieldError?.('pontualOuDisseminado') && (
          <p className="text-sm text-destructive mt-1">{getFieldError('pontualOuDisseminado')}</p>
        )}
      </div>

      {/* Frequência */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Frequência *
        </label>
        <div className={`space-y-2 rounded-md ${hasFieldError?.('frequencia') ? 'border border-destructive p-3' : ''}`}>
          <label className="flex items-center">
            <input
              type="radio"
              name="frequencia"
              value={Frequencia.ISOLADO}
              checked={frequencia === Frequencia.ISOLADO}
              onChange={(e) => onUpdate({ frequencia: e.target.value as Frequencia })}
              className="mr-2 accent-primary"
            />
            <span className="text-sm text-foreground">Isolado</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="frequencia"
              value={Frequencia.FREQUENTE}
              checked={frequencia === Frequencia.FREQUENTE}
              onChange={(e) => onUpdate({ frequencia: e.target.value as Frequencia })}
              className="mr-2 accent-primary"
            />
            <span className="text-sm text-foreground">Frequente</span>
          </label>
        </div>
        {getFieldError?.('frequencia') && (
          <p className="text-sm text-destructive mt-1">{getFieldError('frequencia')}</p>
        )}
      </div>

      {/* Município */}
      <div>
        <label htmlFor="municipio" className="block text-sm font-medium text-foreground mb-2">
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
        <label htmlFor="uf" className="block text-sm font-medium text-foreground mb-2">
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
          <p className="mt-1 text-sm text-muted">Carregando estados...</p>
        )}
        {renderFieldError('uf')}
      </div>
    </div>
  );
};

export default EsquemaInfoBasicaStep;
