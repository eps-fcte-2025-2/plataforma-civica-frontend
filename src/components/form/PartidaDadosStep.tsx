import React from 'react';

interface UF {
  sigla: string;
  nome: string;
}

interface PartidaDadosStepProps {
  torneio: string;
  localPartida: string;
  dataPartida: string;
  municipio: string;
  uf: string;
  timeA: string;
  timeB: string;
  ufs: UF[];
  ufsLoading: boolean;
  onUpdate: (updates: Partial<{
    torneio: string;
    localPartida: string;
    dataPartida: string;
    municipio: string;
    uf: string;
    timeA: string;
    timeB: string;
  }>) => void;
  hasFieldError?: (field: string) => boolean;
  getFieldError?: (field: string) => string | undefined;
}

const PartidaDadosStep: React.FC<PartidaDadosStepProps> = ({
  torneio, localPartida, dataPartida, municipio, uf, timeA, timeB,
  ufs, ufsLoading, onUpdate, hasFieldError, getFieldError
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dados da Partida</h2>
      
      {/* Torneio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Qual foi o torneio? *
        </label>
        <input
          type="text"
          value={torneio}
          onChange={(e) => onUpdate({ torneio: e.target.value })}
          className={getInputClasses('torneio')}
          placeholder="Digite o nome do torneio"
        />
        {renderFieldError('torneio')}
      </div>

      {/* Local da Partida */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Local da partida *
        </label>
        <input
          type="text"
          value={localPartida}
          onChange={(e) => onUpdate({ localPartida: e.target.value })}
          className={getInputClasses('localPartida')}
          placeholder="Digite o local da partida"
        />
        {renderFieldError('localPartida')}
      </div>

      {/* Data e Horário da Partida */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Data e horário da partida *
        </label>
        <input
          type="datetime-local"
          value={dataPartida}
          onChange={(e) => onUpdate({ dataPartida: e.target.value })}
          className={getInputClasses('dataPartida')}
        />
        {renderFieldError('dataPartida')}
      </div>

      {/* Município */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Município *
        </label>
        <input
          type="text"
          value={municipio}
          onChange={(e) => onUpdate({ municipio: e.target.value })}
          className={getInputClasses('municipio')}
          placeholder="Digite o nome do município"
        />
        {renderFieldError('municipio')}
      </div>

      {/* UF */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          UF *
        </label>
        <select
          value={uf}
          onChange={(e) => onUpdate({ uf: e.target.value })}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent ${
            hasFieldError?.('uf') 
              ? 'border-red-300 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-blue-500'
          }`}
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
        {renderFieldError('uf')}
      </div>

      {/* Times (Opcionais) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time A (opcional)
          </label>
          <input
            type="text"
            value={timeA}
            onChange={(e) => onUpdate({ timeA: e.target.value })}
            className={getInputClasses('timeA')}
            placeholder="Nome do time A"
          />
          {renderFieldError('timeA')}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time B (opcional)
          </label>
          <input
            type="text"
            value={timeB}
            onChange={(e) => onUpdate({ timeB: e.target.value })}
            className={getInputClasses('timeB')}
            placeholder="Nome do time B"
          />
          {renderFieldError('timeB')}
        </div>
      </div>
    </div>
  );
};

export default PartidaDadosStep;