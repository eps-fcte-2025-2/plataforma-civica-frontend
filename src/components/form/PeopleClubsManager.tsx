import React from 'react';
import { PessoaEnvolvida, ClubeEnvolvido } from '@/types/api';

interface PeopleClubsManagerProps {
  pessoasEnvolvidas: PessoaEnvolvida[];
  clubesEnvolvidos: ClubeEnvolvido[];
  onAddPessoa: () => void;
  onUpdatePessoa: (index: number, field: keyof PessoaEnvolvida, value: string) => void;
  onRemovePessoa: (index: number) => void;
  onAddClube: () => void;
  onUpdateClube: (index: number, value: string) => void;
  onRemoveClube: (index: number) => void;
}

const PeopleClubsManager: React.FC<PeopleClubsManagerProps> = ({
  pessoasEnvolvidas,
  clubesEnvolvidos,
  onAddPessoa,
  onUpdatePessoa,
  onRemovePessoa,
  onAddClube,
  onUpdateClube,
  onRemoveClube
}) => {
  return (
    <div className="space-y-8">
      {/* Pessoas Envolvidas */}
      <div>
        <label className="block text-lg font-medium text-foreground mb-4">
          Pessoas Envolvidas *
        </label>
        
        {pessoasEnvolvidas.map((pessoa, index) => (
          <div key={index} className="flex gap-4 mb-4 p-4 border border-border rounded-lg">
            <div className="flex-1">
              <input
                type="text"
                value={pessoa.nomePessoa}
                onChange={(e) => onUpdatePessoa(index, 'nomePessoa', e.target.value)}
                className="w-full p-3 border border-input-border rounded-lg focus:ring-2 focus:ring-input-focus focus:border-transparent"
                placeholder="Nome da pessoa"
                required
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={pessoa.funcaoPessoa}
                onChange={(e) => onUpdatePessoa(index, 'funcaoPessoa', e.target.value)}
                className="w-full p-3 border border-input-border rounded-lg focus:ring-2 focus:ring-input-focus focus:border-transparent"
                placeholder="Função (ex: jogador, técnico, árbitro)"
                required
              />
            </div>
            {pessoasEnvolvidas.length > 1 && (
              <button
                type="button"
                onClick={() => onRemovePessoa(index)}
                className="px-4 py-2 bg-destructive0 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Remover
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={onAddPessoa}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          + Adicionar Pessoa
        </button>
      </div>

      {/* Clubes Envolvidos */}
      <div>
        <label className="block text-lg font-medium text-foreground mb-4">
          Clubes Envolvidos (Opcional)
        </label>
        
        {clubesEnvolvidos.map((clube, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={clube.nomeClube}
                onChange={(e) => onUpdateClube(index, e.target.value)}
                className="w-full p-3 border border-input-border rounded-lg focus:ring-2 focus:ring-input-focus focus:border-transparent"
                placeholder="Nome do clube"
              />
            </div>
            <button
              type="button"
              onClick={() => onRemoveClube(index)}
              className="px-4 py-2 bg-destructive0 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Remover
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={onAddClube}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          + Adicionar Clube
        </button>
      </div>
    </div>
  );
};

export default PeopleClubsManager;
