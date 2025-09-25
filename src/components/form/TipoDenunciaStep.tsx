import React from 'react';
import { TipoDenuncia } from '@/types/api';

interface TipoDenunciaStepProps {
  tipoDenuncia: TipoDenuncia;
  onUpdate: (updates: { tipoDenuncia: TipoDenuncia }) => void;
}

const TipoDenunciaStep: React.FC<TipoDenunciaStepProps> = ({ tipoDenuncia, onUpdate }) => {
  return (
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
            checked={tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA}
            onChange={(e) => onUpdate({ tipoDenuncia: e.target.value as TipoDenuncia })}
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
            checked={tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO}
            onChange={(e) => onUpdate({ tipoDenuncia: e.target.value as TipoDenuncia })}
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
  );
};

export default TipoDenunciaStep;