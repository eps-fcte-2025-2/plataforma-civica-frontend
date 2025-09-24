'use client';

import Form from '@/components/Form';

export default function DenunciasPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Denúncias de Apostas
          </h1>
          <p className="text-gray-600">
            Registre denúncias sobre manipulação de resultados esportivos
          </p>
        </div>
        
        <Form />
      </div>
    </div>
  );
}


