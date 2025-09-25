import React from 'react';
import { PessoaEnvolvida, ClubeEnvolvido } from '@/types/api';

interface PartidaEnvolvidosStepProps {
  pessoasEnvolvidas: PessoaEnvolvida[];
  clubesEnvolvidos: ClubeEnvolvido[];
  onAddPessoa: () => void;
  onUpdatePessoa: (index: number, field: keyof PessoaEnvolvida, value: string) => void;
  onRemovePessoa: (index: number) => void;
  onAddClube: () => void;
  onUpdateClube: (index: number, value: string) => void;
  onRemoveClube: (index: number) => void;
}

const PartidaEnvolvidosStep: React.FC<PartidaEnvolvidosStepProps> = ({
  pessoasEnvolvidas, clubesEnvolvidos,
  onAddPessoa, onUpdatePessoa, onRemovePessoa,
  onAddClube, onUpdateClube, onRemoveClube
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Envolvidos na Partida</h2>
      
      {/* Clubes Envolvidos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Clubes envolvidos (opcional)
        </label>
        {clubesEnvolvidos.map((clube, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={clube.nomeClube}
              onChange={(e) => onUpdateClube(index, e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nome do clube"
            />
            <button
              type="button"
              onClick={() => onRemoveClube(index)}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              🗑️
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={onAddClube}
          className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center"
        >
          ➕ Adicionar Clube
        </button>
      </div>

      {/* Pessoas Envolvidas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pessoas envolvidas *
        </label>
        {pessoasEnvolvidas.map((pessoa, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              value={pessoa.nomePessoa}
              onChange={(e) => onUpdatePessoa(index, 'nomePessoa', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nome da pessoa"
              required
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={pessoa.funcaoPessoa}
                onChange={(e) => onUpdatePessoa(index, 'funcaoPessoa', e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Função da pessoa"
                required
              />
              {pessoasEnvolvidas.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemovePessoa(index)}
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={onAddPessoa}
          className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center"
        >
          ➕ Adicionar Pessoa
        </button>
      </div>
    </div>
  );
};

export default PartidaEnvolvidosStep;