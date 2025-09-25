import React from 'react';
import { CreateReportResponse } from '@/types/api';

interface SuccessScreenProps {
  response: CreateReportResponse;
  onNewReport: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ response, onNewReport }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Denúncia Enviada com Sucesso!</h2>
        <p className="text-gray-600 mb-4">
          Sua denúncia foi registrada no sistema e receberá o número de protocolo:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="text-lg font-mono text-gray-800">{response?.id}</p>
          <p className="text-sm text-gray-600 mt-1">
            Data de criação: {response?.createdAt ? new Date(response.createdAt).toLocaleDateString('pt-BR') : 'Data não disponível'}
          </p>
        </div>
        <button
          onClick={onNewReport}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
        >
          Nova Denúncia
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;