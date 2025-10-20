import React from 'react';

interface DescricaoStepProps {
  descricao: string;
  titulo: string;
  placeholder: string;
  onUpdate: (descricao: string) => void;
  hasFieldError?: (field: string) => boolean;
  getFieldError?: (field: string) => string | undefined;
}

const DescricaoStep: React.FC<DescricaoStepProps> = ({
  descricao, titulo, placeholder, onUpdate, hasFieldError, getFieldError
}) => {
  // Helper para obter classes de input baseado em erro
  const getInputClasses = () => {
    const hasError = hasFieldError ? hasFieldError('descricao') : false;
    return hasError
      ? "w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
      : "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  };

  // Helper para mostrar mensagem de erro
  const renderFieldError = () => {
    const error = getFieldError ? getFieldError('descricao') : undefined;
    if (!error) return null;
    
    return (
      <p className="text-sm text-red-600 mt-1">
        {error}
      </p>
    );
  };
  // Mínimo 10 caracteres, máximo 5000 caracteres
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{titulo}</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descrição da situação *
        </label>
        <textarea
          value={descricao}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 5000) {
              onUpdate(value);
            }
          }}
          rows={6}
          className={getInputClasses()}
          placeholder={placeholder}
          maxLength={5000}
        />
        <p className="mt-1 text-sm text-gray-500">
          Mínimo 10 caracteres, máximo 5000 caracteres ({descricao.length}/5000)
        </p>
        
        <div className="flex justify-between items-start mt-1">
          <div>
            {renderFieldError()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescricaoStep;