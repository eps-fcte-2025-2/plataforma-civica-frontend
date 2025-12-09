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
  hasFieldError?: (field: string) => boolean;
  getFieldError?: (field: string) => string | undefined;
}

const PartidaEnvolvidosStep: React.FC<PartidaEnvolvidosStepProps> = ({
  pessoasEnvolvidas, clubesEnvolvidos,
  onAddPessoa, onUpdatePessoa, onRemovePessoa,
  onAddClube, onUpdateClube, onRemoveClube,
  hasFieldError, getFieldError
}) => {
  // Helper para obter classes de input baseado em erro
  const getInputClasses = (fieldName: string) => {
    const hasError = hasFieldError ? hasFieldError(fieldName) : false;
    return hasError
      ? "flex-1 p-3 border border-destructive rounded-lg focus:ring-2 focus:ring-destructive focus:border-transparent bg-input-bg text-foreground"
      : "flex-1 p-3 border border-input-border rounded-lg focus:ring-2 focus:ring-input-focus focus:border-transparent bg-input-bg text-foreground";
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
      <h2 className="text-2xl font-bold text-foreground mb-6">Envolvidos na Partida</h2>
      
      {/* Clubes Envolvidos */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Clubes envolvidos (opcional)
        </label>
        {clubesEnvolvidos.map((clube, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={clube.nomeClube}
              onChange={(e) => onUpdateClube(index, e.target.value)}
              className="flex-1 p-3 border border-input-border rounded-lg focus:ring-2 focus:ring-input-focus focus:border-transparent"
              placeholder="Nome do clube"
            />
            <button
              type="button"
              onClick={() => onRemoveClube(index)}
              className="px-3 py-2 bg-destructive0 hover:bg-red-600 text-white rounded-lg"
            >
              🗑️
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={onAddClube}
          className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 w-full md:w-52"
        >
          <span>➕</span>
          <span>Adicionar Clube</span>
        </button>
      </div>

      {/* Pessoas Envolvidas */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Pessoas envolvidas *
        </label>
        {pessoasEnvolvidas.map((pessoa, index) => (
          <div key={index} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <input
                  type="text"
                  value={pessoa.nomePessoa}
                  onChange={(e) => onUpdatePessoa(index, 'nomePessoa', e.target.value)}
                  className={getInputClasses(`pessoa_${index}_nome`)}
                  placeholder="Nome da pessoa"
                />
                {renderFieldError(`pessoa_${index}_nome`)}
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={pessoa.funcaoPessoa}
                    onChange={(e) => onUpdatePessoa(index, 'funcaoPessoa', e.target.value)}
                    className={getInputClasses(`pessoa_${index}_funcao`)}
                    placeholder="Função da pessoa"
                  />
                  {renderFieldError(`pessoa_${index}_funcao`)}
                </div>
                {pessoasEnvolvidas.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemovePessoa(index)}
                    className="px-3 py-2 bg-destructive0 hover:bg-red-600 text-white rounded-lg"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={onAddPessoa}
          className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 w-full md:w-52"
        >
          <span>➕</span>
          <span>Adicionar Pessoa</span>
        </button>
      </div>
    </div>
  );
};

export default PartidaEnvolvidosStep;
