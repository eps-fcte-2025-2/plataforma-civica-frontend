import { useState } from 'react';
import { useReports } from '@/hooks/useReports';
import { CreateReportDTO, CreateReportResponse, TipoDenuncia, FocoManipulacao, PessoaEnvolvida, ClubeEnvolvido } from '@/types/api';
import { FormData } from './FormDataContext';
import { FormValidator, formatDateToISO } from './FormValidator';

interface UseFormSubmissionReturn {
  isSubmitting: boolean;
  submitError: string | null;
  response: CreateReportResponse | null;
  handleSubmit: (formData: FormData) => Promise<void>;
  clearResponse: () => void;
  clearError: () => void;
}

export const useFormSubmission = (): UseFormSubmissionReturn => {
  const { createReport } = useReports();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [response, setResponse] = useState<CreateReportResponse | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      // Validar antes do envio
      const validation = FormValidator.validateForSubmission(formData);
      if (!validation.isValid) {
        throw new Error(validation.message || 'Dados inválidos');
      }

      const sanitizePessoas = (pessoas: PessoaEnvolvida[] = []) =>
        pessoas
          .map(pessoa => ({
            nomePessoa: pessoa.nomePessoa.trim(),
            funcaoPessoa: pessoa.funcaoPessoa.trim()
          }))
          .filter(pessoa => pessoa.nomePessoa && pessoa.funcaoPessoa);

      const sanitizeClubes = (clubes: ClubeEnvolvido[] = []) =>
        clubes
          .map(clube => ({ nomeClube: clube.nomeClube.trim() }))
          .filter(clube => clube.nomeClube);

      let dadosEnvio: CreateReportDTO;

      if (formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA) {
        dadosEnvio = {
          tipoDenuncia: formData.tipoDenuncia,
          descricao: formData.descricao,
          comoSoube: formData.comoSoube,
          pontualOuDisseminado: formData.pontualOuDisseminado,
          frequencia: formData.frequencia,
          municipio: formData.municipio,
          uf: formData.uf,
          pessoasEnvolvidas: sanitizePessoas(formData.pessoasEnvolvidas),
          clubesEnvolvidos: sanitizeClubes(formData.clubesEnvolvidos),
          evidencias: formData.evidencias || [],
          focosManipulacao: [FocoManipulacao.ATLETAS_DIRIGENTES_COMISSAO],
          partidas: [{
            torneio: formData.torneio || '',
            dataPartida: formatDateToISO(formData.dataPartida || ''),
            localPartida: formData.localPartida || '',
            municipio: formData.municipio || '',
            timeA: formData.timeA || '',
            timeB: formData.timeB || '',
            observacoes: formData.observacoesPartida || '',
            uf: formData.uf
          }]
        };
      } else {
        const partidasSuspeitas = (formData.partidasSuspeitas || [])
          .map(partida => ({
            torneio: partida.nome?.trim() || '',
            dataPartida: formatDateToISO(partida.data || ''),
            localPartida: partida.local?.trim() || '',
            municipio: partida.municipio?.trim() || '',
            timeA: '',
            timeB: '',
            observacoes: '',
            uf: formData.uf
          }))
          .filter(partida => partida.torneio || partida.dataPartida || partida.localPartida || partida.municipio);

        dadosEnvio = {
          tipoDenuncia: formData.tipoDenuncia,
          descricao: formData.descricao,
          comoSoube: formData.comoSoube,
          pontualOuDisseminado: formData.pontualOuDisseminado,
          frequencia: formData.frequencia,
          municipio: formData.municipio,
          uf: formData.uf,
          pessoasEnvolvidas: sanitizePessoas(formData.pessoasEnvolvidas),
          clubesEnvolvidos: sanitizeClubes(formData.clubesEnvolvidos),
          evidencias: formData.evidencias || [],
          focosManipulacao: formData.focosManipulacao,
          partidas: partidasSuspeitas
        };
      }

      const response = await createReport(dadosEnvio);
      setResponse(response);
    } catch (error: unknown) {
      console.error('Erro ao enviar denúncia:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Erro ao enviar denúncia. Por favor, tente novamente.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearResponse = () => {
    setResponse(null);
  };

  const clearError = () => {
    setSubmitError(null);
  };

  return {
    isSubmitting,
    submitError,
    response,
    handleSubmit,
    clearResponse,
    clearError
  };
};
