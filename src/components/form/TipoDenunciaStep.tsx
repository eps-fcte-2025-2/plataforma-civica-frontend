import React from 'react';
import { TipoDenuncia } from '@/types/api';

interface TipoDenunciaStepProps {
  tipoDenuncia: TipoDenuncia;
  onUpdate: (updates: { tipoDenuncia: TipoDenuncia }) => void;
  hasFieldError?: (field: string) => boolean;
  getFieldError?: (field: string) => string | undefined;
}

const TipoDenunciaStep: React.FC<TipoDenunciaStepProps> = ({ 
  tipoDenuncia, 
  onUpdate, 
  hasFieldError, 
  getFieldError 
}) => {
  // Helper para mostrar mensagem de erro
  const renderFieldError = () => {
    const error = getFieldError ? getFieldError('tipoDenuncia') : undefined;
    if (!error) return null;
    
    return (
      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-600">
          {error}
        </p>
      </div>
    );
  };

  const hasError = hasFieldError ? hasFieldError('tipoDenuncia') : false;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mr-2">O que você deseja denunciar?</h2>
        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 text-sm">?</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <label className={`flex items-start p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
          hasError ? 'border-red-300' : 'border-gray-200'
        }`}>
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

        <label className={`flex items-start p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
          hasError ? 'border-red-300' : 'border-gray-200'
        }`}>
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
      
      {renderFieldError()}
    </div>
  );
};

export default TipoDenunciaStep;