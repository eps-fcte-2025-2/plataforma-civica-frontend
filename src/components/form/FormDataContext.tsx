import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  CreateReportDTO,
  TipoDenuncia,
  ComoSoube,
  PontualOuDisseminado,
  Frequencia
} from '@/types/api';

interface PartidaSuspeita {
  nome: string;
  data: string;
  local: string;
  municipio: string;
}

export interface FormData extends CreateReportDTO {
  torneio?: string;
  dataPartida?: string;
  localPartida?: string;
  municipioPartida?: string;
  timeA?: string;
  timeB?: string;
  observacoesPartida?: string;
  partidasSuspeitas?: PartidaSuspeita[];
}

interface FormContextType {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  resetFormData: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const initialFormData: FormData = {
  tipoDenuncia: TipoDenuncia.PARTIDA_ESPECIFICA,
  descricao: '',
  comoSoube: ComoSoube.OUTROS,
  pontualOuDisseminado: PontualOuDisseminado.PONTUAL,
  frequencia: Frequencia.ISOLADO,
  municipio: '',
  uf: '',
  pessoasEnvolvidas: [{ nomePessoa: '', funcaoPessoa: '' }],
  clubesEnvolvidos: [],
  focosManipulacao: [],
  evidencias: [],
  partidas: [],
  torneio: '',
  dataPartida: '',
  localPartida: '',
  municipioPartida: '',
  timeA: '',
  timeB: '',
  observacoesPartida: '',
  partidasSuspeitas: []
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormData must be used within a FormProvider');
  }
  return context;
};