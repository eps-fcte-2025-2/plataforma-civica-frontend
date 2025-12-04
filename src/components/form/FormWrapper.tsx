"use client";

import React, { useState, useEffect } from "react";
import { useReports, useUFs } from "@/hooks/useReports";
import {
  CreateReportDTO,
  CreateReportResponse,
  TipoDenuncia,
  ComoSoube,
  PontualOuDisseminado,
  Frequencia,
  FocoManipulacao,
  PessoaEnvolvida,
} from "@/types/api";
import { FormValidator } from "./FormValidator";

// Importar os componentes
import StepHeader from "./StepHeader";
import TipoDenunciaStep from "./TipoDenunciaStep";
import PartidaDadosStep from "./PartidaDadosStep";
import PartidaEnvolvidosStep from "./PartidaEnvolvidosStep";
import DescricaoStep from "./DescricaoStep";
import EsquemaInfoBasicaStep from "./EsquemaInfoBasicaStep";
import EsquemaFocoStep from "./EsquemaFocoStep";
import EsquemaDetalhesStep from "./EsquemaDetalhesStep";
import NavigationButtons from "./NavigationButtons";
import SuccessScreen from "./SuccessScreen";

interface PartidaSuspeita {
  nome: string;
  data: string;
  local: string;
  municipio: string;
}

interface FormData extends CreateReportDTO {
  torneio?: string;
  dataPartida?: string;
  localPartida?: string;
  municipioPartida?: string;
  timeA?: string;
  timeB?: string;
  observacoesPartida?: string;
  partidasSuspeitas?: PartidaSuspeita[];
}

const FormWrapper: React.FC = () => {
  const { createReport, loading, error } = useReports();
  const { ufs, loading: ufsLoading, fetchUFs } = useUFs();

  const [currentStep, setCurrentStep] = useState(1);
  const [response, setResponse] = useState<CreateReportResponse | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<FormData>({
    tipoDenuncia: TipoDenuncia.PARTIDA_ESPECIFICA,
    descricao: "",
    comoSoube: ComoSoube.OUTROS,
    pontualOuDisseminado: PontualOuDisseminado.PONTUAL,
    frequencia: Frequencia.ISOLADO,
    municipio: "",
    uf: "",
    pessoasEnvolvidas: [{ nomePessoa: "", funcaoPessoa: "" }],
    clubesEnvolvidos: [],
    focosManipulacao: [],
    evidencias: [],
    partidas: [],
    torneio: "",
    dataPartida: "",
    localPartida: "",
    municipioPartida: "",
    timeA: "",
    timeB: "",
    observacoesPartida: "",
    partidasSuspeitas: [],
  });

  useEffect(() => {
    fetchUFs();
  }, [fetchUFs]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    // Limpar erros dos campos que foram atualizados
    const updatedFields = Object.keys(updates);
    const newErrors = { ...fieldErrors };
    updatedFields.forEach((field) => {
      delete newErrors[field];
    });
    setFieldErrors(newErrors);
  };

  // Função para validar campos obrigatórios
  const validateCurrentStep = (): boolean => {
    const errors: { [key: string]: string } = {};

    // Validação da etapa 1 - Tipo de denúncia
    if (currentStep === 1) {
      if (!formData.tipoDenuncia) {
        errors.tipoDenuncia = "Por favor, selecione o tipo de denúncia";
      }
    }

    // Validações para Partida Específica
    if (formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA) {
      if (currentStep === 2) {
        if (!formData.torneio?.trim()) {
          errors.torneio = "Por favor, informe o torneio";
        }
        if (!formData.localPartida?.trim()) {
          errors.localPartida = "Por favor, informe o local da partida";
        }
        if (!formData.dataPartida) {
          errors.dataPartida = "Por favor, informe a data da partida";
        }
        if (!formData.municipio?.trim()) {
          errors.municipio = "Por favor, informe o município";
        }
        if (!formData.uf) {
          errors.uf = "Por favor, selecione uma UF";
        }
      }

      if (currentStep === 3) {
        formData.pessoasEnvolvidas.forEach((pessoa, index) => {
          if (!pessoa.nomePessoa?.trim()) {
            errors[`pessoa_${index}_nome`] = "Nome obrigatório";
          }
          if (!pessoa.funcaoPessoa?.trim()) {
            errors[`pessoa_${index}_funcao`] = "Função obrigatória";
          }
        });
      }

      if (currentStep === 4) {
        if (!formData.descricao?.trim()) {
          errors.descricao = "A descrição é obrigatória";
        } else if (formData.descricao.length < 10) {
          errors.descricao = "A descrição deve ter pelo menos 10 caracteres";
        }
      }
    }

    // Validações para Esquema de Manipulação
    if (formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO) {
      if (currentStep === 2) {
        // Campos obrigatórios: comoSoube, pontualOuDisseminado, frequencia, municipio, uf
        if (!formData.comoSoube) {
          errors.comoSoube = "Por favor, informe como soube do esquema";
        }
        if (!formData.pontualOuDisseminado) {
          errors.pontualOuDisseminado =
            "Por favor, selecione se o esquema é pontual ou disseminado";
        }
        if (!formData.frequencia) {
          errors.frequencia = "Por favor, selecione a frequência do esquema";
        }
        if (!formData.municipio?.trim()) {
          errors.municipio = "Por favor, informe o município";
        }
        if (!formData.uf) {
          errors.uf = "Por favor, selecione uma UF";
        }
      }

      if (currentStep === 3) {
        if (formData.focosManipulacao.length === 0) {
          errors.focosManipulacao = "Por favor, selecione pelo menos um foco do esquema";
        }
      }

      if (currentStep === 4) {
        // Exigir pessoas por foco selecionado
        const pessoas = formData.pessoasEnvolvidas || [];
        const focos = formData.focosManipulacao || [];
        const sanitize = (v?: string) => (v || "").trim();

        if (focos.includes(FocoManipulacao.JUIZES)) {
          const juizes = pessoas.filter((p) => p.funcaoPessoa === "Juiz");
          if (juizes.length === 0 || juizes.every((p) => !sanitize(p.nomePessoa))) {
            errors["pessoas_juizes"] = "Informe ao menos um juiz envolvido";
          }
        }

        if (focos.includes(FocoManipulacao.APOSTADORES)) {
          const apostadores = pessoas.filter((p) => p.funcaoPessoa === "Apostador");
          if (apostadores.length === 0 || apostadores.every((p) => !sanitize(p.nomePessoa))) {
            errors["pessoas_apostadores"] = "Informe ao menos um apostador envolvido";
          }
        }

        if (focos.includes(FocoManipulacao.ATLETAS_DIRIGENTES_COMISSAO)) {
          const funcoesValidas = ["Atleta", "Dirigente", "Comissão Técnica"];
          const pessoasValidas = pessoas.filter((p) => funcoesValidas.includes(p.funcaoPessoa));
          if (pessoasValidas.length === 0 || pessoasValidas.every((p) => !sanitize(p.nomePessoa))) {
            errors["pessoas_atletas_dirigentes"] =
              "Informe ao menos um atleta, dirigente ou membro da comissão técnica envolvido";
          }
        }

        // Coerência básica nos registros informados
        formData.pessoasEnvolvidas.forEach((pessoa, index) => {
          if (pessoa.nomePessoa?.trim() && !pessoa.funcaoPessoa?.trim()) {
            errors[`pessoa_${index}_funcao`] = "Defina a função da pessoa";
          }
        });

        // Partidas suspeitas obrigatórias para todos os focos
        const partidas = formData.partidasSuspeitas || [];
        if (partidas.length === 0) {
          errors["partidasSuspeitas"] =
            "Informe ao menos uma partida suspeita (nome, data, local e município)";
        }
        partidas.forEach((p, idx) => {
          const nome = sanitize(p.nome);
          const data = sanitize(p.data);
          const local = sanitize(p.local);
          const municipio = sanitize(p.municipio);
          if (!nome) {
            errors[`partida_${idx}_nome`] = "Nome da partida é obrigatório";
          }
          if (!data) {
            errors[`partida_${idx}_data`] = "Data e horário são obrigatórios";
          }
          if (!local) {
            errors[`partida_${idx}_local`] = "Local é obrigatório";
          }
          if (!municipio) {
            errors[`partida_${idx}_municipio`] = "Município é obrigatório";
          }
        });

        if (!formData.descricao?.trim()) {
          errors.descricao = "A descrição é obrigatória";
        } else if (formData.descricao.length < 10) {
          errors.descricao = "A descrição deve ter pelo menos 10 caracteres";
        }
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Função para verificar se um campo tem erro
  const hasFieldError = (field: string): boolean => {
    return field in fieldErrors;
  };

  // Função para obter mensagem de erro de um campo
  const getFieldError = (field: string): string | undefined => {
    return fieldErrors[field];
  };

  const getMaxStepsForType = () => {
    if (formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA) {
      return 4; // 1: tipo, 2: dados partida, 3: envolvidos, 4: descrição
    } else {
      return 4; // Para esquema: 1: tipo, 2: info básica, 3: focos, 4: detalhes condicionais
    }
  };

  // Função para converter data local para ISO 8601 com Z no final
  const formatDateToISO = (dateString: string): string => {
    if (!dateString) return "";
    try {
      if (dateString.includes("T") && dateString.endsWith("Z")) {
        return dateString;
      }
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Data inválida");
      }
      return date.toISOString();
    } catch (error) {
      console.error("Erro ao converter data:", error);
      return "";
    }
  };

  // Funções para gerenciar pessoas envolvidas
  const addPessoaEnvolvida = () => {
    updateFormData({
      pessoasEnvolvidas: [...formData.pessoasEnvolvidas, { nomePessoa: "", funcaoPessoa: "" }],
    });
  };

  const updatePessoaEnvolvida = (index: number, field: keyof PessoaEnvolvida, value: string) => {
    const novasPessoas = formData.pessoasEnvolvidas.map((pessoa, i) =>
      i === index ? { ...pessoa, [field]: value } : pessoa,
    );
    updateFormData({ pessoasEnvolvidas: novasPessoas });
  };

  const removePessoaEnvolvida = (index: number) => {
    const novasPessoas = formData.pessoasEnvolvidas.filter((_, i) => i !== index);
    updateFormData({ pessoasEnvolvidas: novasPessoas });
  };

  // Funções para gerenciar clubes envolvidos
  const addClubeEnvolvido = () => {
    updateFormData({
      clubesEnvolvidos: [...(formData.clubesEnvolvidos || []), { nomeClube: "" }],
    });
  };

  const updateClubeEnvolvido = (index: number, value: string) => {
    const novosClubes = (formData.clubesEnvolvidos || []).map((clube, i) =>
      i === index ? { ...clube, nomeClube: value } : clube,
    );
    updateFormData({ clubesEnvolvidos: novosClubes });
  };

  const removeClubeEnvolvido = (index: number) => {
    const novosClubes = (formData.clubesEnvolvidos || []).filter((_, i) => i !== index);
    updateFormData({ clubesEnvolvidos: novosClubes });
  };

  const nextStep = () => {
    // Validar a etapa atual
    if (!validateCurrentStep()) {
      // Se há erros de validação, parar aqui (os campos já ficaram vermelhos)
      return;
    }

    // Se é a última etapa, submeter
    if (currentStep === getMaxStepsForType()) {
      handleSubmit();
      return;
    }

    // Avançar para próxima etapa
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      // Limpar erros ao voltar para etapa anterior
      setFieldErrors({});
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      // Validação final abrangente para travar todos os campos obrigatórios
      const finalValidation = FormValidator.validateForSubmission(
        formData as unknown as import("./FormDataContext").FormData,
      );
      if (!finalValidation.isValid) {
        throw new Error(finalValidation.message || "Preencha todos os campos obrigatórios");
      }

      // Validar descrição mínima
      if (formData.descricao.length < 10) {
        throw new Error("A descrição deve ter pelo menos 10 caracteres");
      }

      // Preparar dados para envio
      let dadosEnvio: CreateReportDTO;

      if (formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA) {
        const sanitizePessoas = (pessoas: PessoaEnvolvida[] = []) =>
          pessoas
            .map((pessoa) => ({
              nomePessoa: (pessoa.nomePessoa || "").trim(),
              funcaoPessoa: (pessoa.funcaoPessoa || "").trim(),
            }))
            .filter((pessoa) => pessoa.nomePessoa && pessoa.funcaoPessoa);
        const sanitizeClubes = (clubes: { nomeClube: string }[] = []) =>
          clubes
            .map((clube) => ({ nomeClube: (clube.nomeClube || "").trim() }))
            .filter((clube) => clube.nomeClube);
        dadosEnvio = {
          ...formData,
          pessoasEnvolvidas: sanitizePessoas(formData.pessoasEnvolvidas),
          clubesEnvolvidos: sanitizeClubes(formData.clubesEnvolvidos),
          focosManipulacao: [FocoManipulacao.ATLETAS_DIRIGENTES_COMISSAO], // valor padrão para partida específica
          partidas: [
            {
              torneio: formData.torneio || "",
              dataPartida: formatDateToISO(formData.dataPartida || ""),
              localPartida: formData.localPartida || "",
              municipio: formData.municipioPartida || formData.municipio,
              timeA: formData.timeA || "",
              timeB: formData.timeB || "",
              observacoes: formData.observacoesPartida || "",
              uf: formData.uf,
            },
          ],
        };
      } else {
        // Para esquema de manipulação
        const sanitizePessoas = (pessoas: PessoaEnvolvida[] = []) =>
          pessoas
            .map((pessoa) => ({
              nomePessoa: (pessoa.nomePessoa || "").trim(),
              funcaoPessoa: (pessoa.funcaoPessoa || "").trim(),
            }))
            .filter((pessoa) => pessoa.nomePessoa && pessoa.funcaoPessoa);
        const sanitizeClubes = (clubes: { nomeClube: string }[] = []) =>
          clubes
            .map((clube) => ({ nomeClube: (clube.nomeClube || "").trim() }))
            .filter((clube) => clube.nomeClube);
        dadosEnvio = {
          ...formData,
          pessoasEnvolvidas: sanitizePessoas(formData.pessoasEnvolvidas),
          clubesEnvolvidos: sanitizeClubes(formData.clubesEnvolvidos),
          partidas: (formData.partidasSuspeitas || [])
            .filter(
              (p) =>
                (p.nome || "").trim() &&
                (p.data || "").trim() &&
                (p.local || "").trim() &&
                (p.municipio || "").trim(),
            )
            .map((partida) => ({
              torneio: partida.nome.trim(),
              dataPartida: formatDateToISO(partida.data),
              localPartida: partida.local.trim(),
              municipio: partida.municipio.trim(),
              timeA: "",
              timeB: "",
              observacoes: "",
              uf: formData.uf,
            })),
        };
      }

      const response = await createReport(dadosEnvio);
      setResponse(response);
    } catch (error: unknown) {
      console.error("Erro ao enviar denúncia:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao enviar denúncia. Por favor, tente novamente.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      tipoDenuncia: TipoDenuncia.PARTIDA_ESPECIFICA,
      descricao: "",
      comoSoube: ComoSoube.OUTROS,
      pontualOuDisseminado: PontualOuDisseminado.PONTUAL,
      frequencia: Frequencia.ISOLADO,
      municipio: "",
      uf: "",
      pessoasEnvolvidas: [{ nomePessoa: "", funcaoPessoa: "" }],
      clubesEnvolvidos: [],
      focosManipulacao: [],
      evidencias: [],
      partidas: [],
      torneio: "",
      dataPartida: "",
      localPartida: "",
      municipioPartida: "",
      timeA: "",
      timeB: "",
      observacoesPartida: "",
      partidasSuspeitas: [],
    });
    setCurrentStep(1);
    setResponse(null);
    setSubmitError(null);
  };

  if (response) {
    return <SuccessScreen response={response} onNewReport={resetForm} />;
  }

  const maxSteps = getMaxStepsForType();


  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-card-bg p-6 shadow-lg">
      <StepHeader currentStep={currentStep} maxSteps={getMaxStepsForType()} error={error} />

      {/* Etapa 1: Tipo de Denúncia */}
      {currentStep === 1 && (
        <div>
          <TipoDenunciaStep
            tipoDenuncia={formData.tipoDenuncia}
            onUpdate={updateFormData}
            hasFieldError={hasFieldError}
            getFieldError={getFieldError}
          />
        </div>
      )}

      {/* Etapa 2: Dados da Partida (Partida Específica) */}
      {currentStep === 2 && formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA && (
        <PartidaDadosStep
          torneio={formData.torneio || ""}
          localPartida={formData.localPartida || ""}
          dataPartida={formData.dataPartida || ""}
          municipio={formData.municipio}
          uf={formData.uf}
          timeA={formData.timeA || ""}
          timeB={formData.timeB || ""}
          ufs={ufs}
          ufsLoading={ufsLoading}
          onUpdate={updateFormData}
          hasFieldError={hasFieldError}
          getFieldError={getFieldError}
        />
      )}

      {/* Etapa 3: Envolvidos (Partida Específica) */}
      {currentStep === 3 && formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA && (
        <PartidaEnvolvidosStep
          pessoasEnvolvidas={formData.pessoasEnvolvidas}
          clubesEnvolvidos={formData.clubesEnvolvidos || []}
          onAddPessoa={addPessoaEnvolvida}
          onUpdatePessoa={updatePessoaEnvolvida}
          onRemovePessoa={removePessoaEnvolvida}
          onAddClube={addClubeEnvolvido}
          onUpdateClube={updateClubeEnvolvido}
          onRemoveClube={removeClubeEnvolvido}
          hasFieldError={hasFieldError}
          getFieldError={getFieldError}
        />
      )}

      {/* Etapa 4: Descrição (Partida Específica) */}
      {currentStep === 4 && formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA && (
        <DescricaoStep
          descricao={formData.descricao}
          titulo="O que aconteceu?"
          placeholder="Descreva o que aconteceu na partida. Seja claro e objetivo. Informações pessoais, inclusive identificação, não devem ser inseridas a não ser que sejam essenciais para a caracterização da manifestação"
          onUpdate={(descricao) => updateFormData({ descricao })}
          hasFieldError={hasFieldError}
          getFieldError={getFieldError}
        />
      )}

      {/* Etapa 2: Informações Básicas (Esquema de Manipulação) */}
      {currentStep === 2 && formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO && (
        <div>
          <EsquemaInfoBasicaStep
            comoSoube={formData.comoSoube || ComoSoube.OUTROS}
            pontualOuDisseminado={formData.pontualOuDisseminado || PontualOuDisseminado.PONTUAL}
            frequencia={formData.frequencia || Frequencia.ISOLADO}
            municipio={formData.municipio}
            uf={formData.uf}
            ufs={ufs}
            ufsLoading={ufsLoading}
            onUpdate={updateFormData}
            hasFieldError={hasFieldError}
            getFieldError={getFieldError}
          />
        </div>
      )}

      {/* Etapa 3: Foco do Esquema (Esquema de Manipulação) */}
      {currentStep === 3 && formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO && (
        <EsquemaFocoStep
          focosManipulacao={formData.focosManipulacao}
          onUpdate={(focosManipulacao) => updateFormData({ focosManipulacao })}
          hasFieldError={hasFieldError}
          getFieldError={getFieldError}
        />
      )}

      {/* Etapa 4: Detalhes Condicionais (Esquema de Manipulação) */}
      {currentStep === 4 && formData.tipoDenuncia === TipoDenuncia.ESQUEMA_DE_MANIPULACAO && (
        <EsquemaDetalhesStep
          focosManipulacao={formData.focosManipulacao}
          pessoasEnvolvidas={formData.pessoasEnvolvidas}
          clubesEnvolvidos={formData.clubesEnvolvidos || []}
          partidasSuspeitas={formData.partidasSuspeitas || []}
          descricao={formData.descricao}
          onUpdatePessoas={(pessoasEnvolvidas) => updateFormData({ pessoasEnvolvidas })}
          onUpdateClubes={(clubesEnvolvidos) => updateFormData({ clubesEnvolvidos })}
          onUpdatePartidas={(partidasSuspeitas) => updateFormData({ partidasSuspeitas })}
          onUpdateDescricao={(descricao) => updateFormData({ descricao })}
          hasFieldError={hasFieldError}
          getFieldError={getFieldError}
        />
      )}

      {/* Mensagem de Erro */}
      {submitError && (
        <div className="mt-4 rounded-lg border border-red-200 bg-destructive p-4">
          <p className="flex items-center text-destructive">
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            {submitError}
          </p>
        </div>
      )}

      {/* Botões de Navegação */}
      <NavigationButtons
        currentStep={currentStep}
        maxSteps={maxSteps} 
        isSubmitting={isSubmitting}
        loading={loading}
        isLastStep={currentStep === getMaxStepsForType()}
        onPrevious={prevStep}
        onNext={nextStep}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FormWrapper;

