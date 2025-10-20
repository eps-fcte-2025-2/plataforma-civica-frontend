// src/services/denunciaService.ts
import { apiService } from './api';
import {
  CreateReportDTO,
  CreateReportResponse,
  ReportDetail,
  ReportsListResponse,
  UpdateReportStatusDTO,
  UpdateStatusResponse,
  PaginationParams,
  UF
} from '../types/api';

export class DenunciaService {
  private static readonly REPORTS_ENDPOINT = '/v1/reports';
  private static readonly MUNICIPIOS_ENDPOINT = '/v1/reports/municipios';

  /**
   * Criar nova denúncia
   * POST /v1/reports/
   */
  static async createReport(data: CreateReportDTO): Promise<CreateReportResponse> {
    try {
      console.log('📝 Criando nova denúncia:', data);
      const response = await apiService.post<CreateReportResponse>(
        `${this.REPORTS_ENDPOINT}/`,
        data
      );
      console.log('✅ Denúncia criada com sucesso:', response);
      return response;
    } catch (error) {
      console.error('❌ Erro ao criar denúncia:', error);
      throw error;
    }
  }

  /**
   * Listar todas as denúncias com paginação
   * GET /v1/reports/
   */
  static async getReports(params?: PaginationParams): Promise<ReportsListResponse> {
    try {
      console.log('📋 Buscando denúncias com parâmetros:', params);
      const response = await apiService.get<ReportsListResponse>(
        `${this.REPORTS_ENDPOINT}/`,
        params as Record<string, unknown>
      );
      console.log('✅ Denúncias encontradas:', response.reports.length);
      return response;
    } catch (error) {
      console.error('❌ Erro ao buscar denúncias:', error);
      throw error;
    }
  }

  /**
   * Buscar denúncia por ID
   * GET /v1/reports/{id}
   */
  static async getReportById(id: string): Promise<ReportDetail> {
    try {
      console.log('🔍 Buscando denúncia por ID:', id);
      const response = await apiService.get<ReportDetail>(
        `${this.REPORTS_ENDPOINT}/${id}`
      );
      console.log('✅ Denúncia encontrada:', response.id);
      return response;
    } catch (error) {
      console.error('❌ Erro ao buscar denúncia por ID:', error);
      throw error;
    }
  }

  /**
   * Atualizar status da denúncia
   * PATCH /v1/reports/{id}
   */
  static async updateReportStatus(
    id: string,
    data: UpdateReportStatusDTO
  ): Promise<UpdateStatusResponse> {
    try {
      console.log('🔄 Atualizando status da denúncia:', id, data);
      const response = await apiService.patch<UpdateStatusResponse>(
        `${this.REPORTS_ENDPOINT}/${id}`,
        data
      );
      console.log('✅ Status atualizado com sucesso');
      return response;
    } catch (error) {
      console.error('❌ Erro ao atualizar status:', error);
      throw error;
    }
  }

  /**
   * Buscar UFs brasileiros para o formulário
   */
  static async getUFs(): Promise<UF[]> {
    try {
      console.log('🏛️ Carregando lista de UFs...');
      
      // Lista estática de UFs brasileiros
      const ufs: UF[] = [
        { sigla: 'AC', nome: 'Acre' },
        { sigla: 'AL', nome: 'Alagoas' },
        { sigla: 'AP', nome: 'Amapá' },
        { sigla: 'AM', nome: 'Amazonas' },
        { sigla: 'BA', nome: 'Bahia' },
        { sigla: 'CE', nome: 'Ceará' },
        { sigla: 'DF', nome: 'Distrito Federal' },
        { sigla: 'ES', nome: 'Espírito Santo' },
        { sigla: 'GO', nome: 'Goiás' },
        { sigla: 'MA', nome: 'Maranhão' },
        { sigla: 'MT', nome: 'Mato Grosso' },
        { sigla: 'MS', nome: 'Mato Grosso do Sul' },
        { sigla: 'MG', nome: 'Minas Gerais' },
        { sigla: 'PA', nome: 'Pará' },
        { sigla: 'PB', nome: 'Paraíba' },
        { sigla: 'PR', nome: 'Paraná' },
        { sigla: 'PE', nome: 'Pernambuco' },
        { sigla: 'PI', nome: 'Piauí' },
        { sigla: 'RJ', nome: 'Rio de Janeiro' },
        { sigla: 'RN', nome: 'Rio Grande do Norte' },
        { sigla: 'RS', nome: 'Rio Grande do Sul' },
        { sigla: 'RO', nome: 'Rondônia' },
        { sigla: 'RR', nome: 'Roraima' },
        { sigla: 'SC', nome: 'Santa Catarina' },
        { sigla: 'SP', nome: 'São Paulo' },
        { sigla: 'SE', nome: 'Sergipe' },
        { sigla: 'TO', nome: 'Tocantins' }
      ];
      
      console.log('✅ UFs carregados:', ufs.length);
      return ufs;
    } catch (error) {
      console.error('❌ Erro ao carregar UFs:', error);
      throw error;
    }
  }

  /**
   * Método utilitário para validar dados antes do envio
   */
  static validateReportData(data: CreateReportDTO): string[] {
    const errors: string[] = [];

    if (!data.tipoDenuncia) {
      errors.push('Tipo de denúncia é obrigatório');
    }

    if (!data.descricao || data.descricao.length < 10) {
      errors.push('Descrição deve ter pelo menos 10 caracteres');
    }

    if (data.descricao && data.descricao.length > 5000) {
      errors.push('Descrição não pode exceder 5000 caracteres');
    }

    if (!data.uf) {
      errors.push('UF é obrigatório');
    }

    if (data.uf && !/^[A-Z]{2}$/.test(data.uf)) {
      errors.push('UF deve ter 2 letras maiúsculas');
    }

    if (!data.pessoasEnvolvidas || data.pessoasEnvolvidas.length === 0) {
      errors.push('Pelo menos uma pessoa envolvida deve ser informada');
    }

    if (!data.focosManipulacao || data.focosManipulacao.length === 0) {
      errors.push('Pelo menos um foco de manipulação deve ser informado');
    }

    // Validar pessoas envolvidas
    data.pessoasEnvolvidas?.forEach((pessoa, index) => {
      if (!pessoa.nomePessoa || pessoa.nomePessoa.trim().length === 0) {
        errors.push(`Nome da pessoa ${index + 1} é obrigatório`);
      }
      if (!pessoa.funcaoPessoa || pessoa.funcaoPessoa.trim().length === 0) {
        errors.push(`Função da pessoa ${index + 1} é obrigatória`);
      }
    });

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
      tipoDenunciaFormatted: report.tipoDenuncia.replace('_', ' ').toLowerCase(),
      dataDenunciaFormatted: new Date(report.dataDenuncia).toLocaleDateString('pt-BR'),
      descricaoResumida: report.descricao.length > 100 
        ? `${report.descricao.substring(0, 100)}...` 
        : report.descricao
    };
  }
}

export default DenunciaService;