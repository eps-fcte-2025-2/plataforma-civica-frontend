import React from 'react';

interface DescricaoStepProps {
  descricao: string;
  titulo: string;
  placeholder: string;
  onUpdate: (descricao: string) => void;
}

const DescricaoStep: React.FC<DescricaoStepProps> = ({
  descricao, titulo, placeholder, onUpdate
}) => {
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={placeholder}
          required
          minLength={10}
          maxLength={5000}
        />
        <div className="text-sm text-gray-500 mt-1">
          {descricao.length}/5000 caracteres
        </div>
      </div>
    </div>
  );
};

export default DescricaoStep;