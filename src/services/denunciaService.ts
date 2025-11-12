// src/services/denunciaService.ts
import { apiService } from "./api";
import logger from "@/lib/appLogger";
import {
  CreateReportDTO,
  CreateReportResponse,
  ReportDetail,
  ReportsListResponse,
  UpdateReportStatusDTO,
  UpdateStatusResponse,
  PaginationParams,
  UF,
} from "../types/api";

export class DenunciaService {
  private static readonly REPORTS_ENDPOINT = "/v1/reports";
  private static readonly MUNICIPIOS_ENDPOINT = "/v1/reports/municipios";

  /**
   * Criar nova denúncia
   * POST /v1/reports/
   */
  static async createReport(data: CreateReportDTO): Promise<CreateReportResponse> {
    try {
      logger.info({ data }, "Criando nova denúncia");
      const response = await apiService.post<CreateReportResponse>(
        `${this.REPORTS_ENDPOINT}/`,
        data,
      );
      logger.info({ id: response.id }, "Denúncia criada com sucesso");
      return response;
    } catch (error) {
      logger.error({ error }, "Erro ao criar denúncia");
      throw error;
    }
  }

  /**
   * Listar todas as denúncias com paginação
   * GET /v1/reports/
   */
  static async getReports(params?: PaginationParams): Promise<ReportsListResponse> {
    try {
      logger.debug({ params }, "Buscando denúncias com parâmetros");
      const response = await apiService.get<ReportsListResponse>(
        `${this.REPORTS_ENDPOINT}/`,
        params as unknown as Record<string, unknown>,
      );
      logger.info({ count: response.reports.length }, "Denúncias encontradas");
      return response;
    } catch (error) {
      logger.error({ error }, "Erro ao buscar denúncias");
      throw error;
    }
  }

  /**
   * Buscar denúncia por ID
   * GET /v1/reports/{id}
   */
  static async getReportById(id: string): Promise<ReportDetail> {
    try {
      logger.debug({ id }, "Buscando denúncia por ID");
      const response = await apiService.get<ReportDetail>(`${this.REPORTS_ENDPOINT}/${id}`);
      logger.info({ id: response.id }, "Denúncia encontrada");
      return response;
    } catch (error) {
      logger.error({ error, id }, "Erro ao buscar denúncia por ID");
      throw error;
    }
  }

  /**
   * Atualizar status da denúncia
   * PATCH /v1/reports/{id}
   */
  static async updateReportStatus(
    id: string,
    data: UpdateReportStatusDTO,
  ): Promise<UpdateStatusResponse> {
    try {
      logger.info({ id, data }, "Atualizando status da denúncia");
      const response = await apiService.patch<UpdateStatusResponse>(
        `${this.REPORTS_ENDPOINT}/${id}`,
        data,
      );
      logger.info({ id }, "Status atualizado com sucesso");
      return response;
    } catch (error) {
      logger.error({ error, id }, "Erro ao atualizar status");
      throw error;
    }
  }

  /**
   * Buscar UFs brasileiros para o formulário
   */
  static async getUFs(): Promise<UF[]> {
    try {
      logger.debug({}, "Carregando lista de UFs");

      // Lista estática de UFs brasileiros
      const ufs: UF[] = [
        { sigla: "AC", nome: "Acre" },
        { sigla: "AL", nome: "Alagoas" },
        { sigla: "AP", nome: "Amapá" },
        { sigla: "AM", nome: "Amazonas" },
        { sigla: "BA", nome: "Bahia" },
        { sigla: "CE", nome: "Ceará" },
        { sigla: "DF", nome: "Distrito Federal" },
        { sigla: "ES", nome: "Espírito Santo" },
        { sigla: "GO", nome: "Goiás" },
        { sigla: "MA", nome: "Maranhão" },
        { sigla: "MT", nome: "Mato Grosso" },
        { sigla: "MS", nome: "Mato Grosso do Sul" },
        { sigla: "MG", nome: "Minas Gerais" },
        { sigla: "PA", nome: "Pará" },
        { sigla: "PB", nome: "Paraíba" },
        { sigla: "PR", nome: "Paraná" },
        { sigla: "PE", nome: "Pernambuco" },
        { sigla: "PI", nome: "Piauí" },
        { sigla: "RJ", nome: "Rio de Janeiro" },
        { sigla: "RN", nome: "Rio Grande do Norte" },
        { sigla: "RS", nome: "Rio Grande do Sul" },
        { sigla: "RO", nome: "Rondônia" },
        { sigla: "RR", nome: "Roraima" },
        { sigla: "SC", nome: "Santa Catarina" },
        { sigla: "SP", nome: "São Paulo" },
        { sigla: "SE", nome: "Sergipe" },
        { sigla: "TO", nome: "Tocantins" },
      ];

      logger.info({ count: ufs.length }, "UFs carregados");
      return ufs;
    } catch (error) {
      logger.error({ error }, "Erro ao carregar UFs");
      throw error;
    }
  }

  /**
   * Método utilitário para validar dados antes do envio
   */
  static validateReportData(data: CreateReportDTO): string[] {
    const errors: string[] = [];
    const isPartidaEspecifica = data.tipoDenuncia === "PARTIDA_ESPECIFICA";

    if (!data.tipoDenuncia) {
      errors.push("Tipo de denúncia é obrigatório");
    }

    if (!data.descricao || data.descricao.length < 10) {
      errors.push("Descrição deve ter pelo menos 10 caracteres");
    }

    if (data.descricao && data.descricao.length > 5000) {
      errors.push("Descrição não pode exceder 5000 caracteres");
    }

    if (!data.uf) {
      errors.push("UF é obrigatório");
    }

    if (data.uf && !/^[A-Z]{2}$/.test(data.uf)) {
      errors.push("UF deve ter 2 letras maiúsculas");
    }

    if (!data.focosManipulacao || data.focosManipulacao.length === 0) {
      errors.push("Pelo menos um foco de manipulação deve ser informado");
    }

    // Sanitizar e validar pessoas envolvidas
    const pessoasSanitizadas = (data.pessoasEnvolvidas || [])
      .map((p) => ({
        nomePessoa: (p.nomePessoa || "").trim(),
        funcaoPessoa: (p.funcaoPessoa || "").trim(),
      }))
      .filter((p) => p.nomePessoa || p.funcaoPessoa);

    if (isPartidaEspecifica) {
      if (pessoasSanitizadas.length === 0) {
        errors.push("Pelo menos uma pessoa deve estar envolvida");
      }
      pessoasSanitizadas.forEach((pessoa, index) => {
        if (!pessoa.nomePessoa) {
          errors.push(`Nome da pessoa ${index + 1} é obrigatório`);
        }
        if (!pessoa.funcaoPessoa) {
          errors.push(`Função da pessoa ${index + 1} é obrigatória`);
        }
      });
    }

    return errors;
  }

  /**
   * Método utilitário para formatar dados para exibição
   */
  static formatReportForDisplay(report: ReportDetail): ReportDetail & {
    tipoDenunciaFormatted: string;
    dataDenunciaFormatted: string;
    descricaoResumida: string;
  } {
    return {
      ...report,
      tipoDenunciaFormatted: report.tipoDenuncia.replace("_", " ").toLowerCase(),
      dataDenunciaFormatted: new Date(report.dataDenuncia).toLocaleDateString("pt-BR"),
      descricaoResumida:
        report.descricao.length > 100
          ? `${report.descricao.substring(0, 100)}...`
          : report.descricao,
    };
  }
}

export default DenunciaService;
