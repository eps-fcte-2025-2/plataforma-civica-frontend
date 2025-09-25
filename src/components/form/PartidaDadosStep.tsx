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
}

const PartidaDadosStep: React.FC<PartidaDadosStepProps> = ({
  torneio, localPartida, dataPartida, municipio, uf, timeA, timeB,
  ufs, ufsLoading, onUpdate
}) => {
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Digite o nome do torneio"
          required
        />
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Digite o local da partida"
          required
        />
      </div>

      {/* Data e Horário da Partida */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Data e horário da partida
        </label>
        <input
          type="datetime-local"
          value={dataPartida}
          onChange={(e) => onUpdate({ dataPartida: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Digite o nome do município"
          required
        />
      </div>

      {/* UF */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          UF *
        </label>
        <select
          value={uf}
          onChange={(e) => onUpdate({ uf: e.target.value })}
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nome do time A"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time B (opcional)
          </label>
          <input
            type="text"
            value={timeB}
            onChange={(e) => onUpdate({ timeB: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nome do time B"
          />
        </div>
      </div>
    </div>
  );
};

export default PartidaDadosStep;