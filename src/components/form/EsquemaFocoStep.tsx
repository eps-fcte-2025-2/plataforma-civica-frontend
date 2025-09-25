'use client';

import React from 'react';
import { FocoManipulacao } from '@/types/api';

interface EsquemaFocoStepProps {
  focosManipulacao: FocoManipulacao[];
  onUpdate: (focos: FocoManipulacao[]) => void;
}

const EsquemaFocoStep: React.FC<EsquemaFocoStepProps> = ({
  focosManipulacao,
  onUpdate,
}) => {
  const handleFocoChange = (foco: FocoManipulacao, checked: boolean) => {
    if (checked) {
      // Adicionar o foco se não estiver presente
      if (!focosManipulacao.includes(foco)) {
        onUpdate([...focosManipulacao, foco]);
      }
    } else {
      // Remover o foco
      onUpdate(focosManipulacao.filter(f => f !== foco));
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Foco do Esquema
      </h3>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-4">
          Selecione o(s) foco(s) do esquema de manipulação: *
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Você pode selecionar múltiplas opções conforme aplicável ao caso.
        </p>

        <div className="space-y-4">
          {/* Juízes */}
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={focosManipulacao.includes(FocoManipulacao.JUIZES)}
              onChange={(e) => handleFocoChange(FocoManipulacao.JUIZES, e.target.checked)}
              className="mr-3 mt-1"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Juízes</span>
              <p className="text-xs text-gray-500 mt-1">
                Esquema envolvendo árbitros ou outros membros da arbitragem
              </p>
            </div>
          </label>

          {/* Apostadores */}
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={focosManipulacao.includes(FocoManipulacao.APOSTADORES)}
              onChange={(e) => handleFocoChange(FocoManipulacao.APOSTADORES, e.target.checked)}
              className="mr-3 mt-1"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Apostadores</span>
              <p className="text-xs text-gray-500 mt-1">
                Esquema envolvendo apostadores ou casas de apostas
              </p>
            </div>
          </label>

          {/* Atletas, dirigentes ou comissão técnica */}
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={focosManipulacao.includes(FocoManipulacao.ATLETAS_DIRIGENTES_COMISSAO)}
              onChange={(e) => handleFocoChange(FocoManipulacao.ATLETAS_DIRIGENTES_COMISSAO, e.target.checked)}
              className="mr-3 mt-1"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">
                Atletas, dirigentes ou comissão técnica
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Esquema envolvendo jogadores, dirigentes, técnicos ou outros membros dos clubes
              </p>
            </div>
          </label>
        </div>

        {focosManipulacao.length === 0 && (
          <p className="text-red-500 text-sm mt-4">
            Selecione pelo menos um foco para continuar.
          </p>
        )}
      </div>
    </div>
  );
};

export default EsquemaFocoStep;