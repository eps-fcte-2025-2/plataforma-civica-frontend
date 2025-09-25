// src/types/api.ts - Tipos baseados no OpenAPI

// Enums
export enum TipoDenuncia {
  PARTIDA_ESPECIFICA = 'PARTIDA_ESPECIFICA',
  ESQUEMA_DE_MANIPULACAO = 'ESQUEMA_DE_MANIPULACAO'
}

export enum ComoSoube {
  VITIMA = 'VITIMA',
  TERCEIROS = 'TERCEIROS',
  INTERNET = 'INTERNET',
  PRESENCIAL = 'PRESENCIAL',
  OBSERVACAO = 'OBSERVACAO',
  OUTROS = 'OUTROS'
}

export enum PontualOuDisseminado {
  PONTUAL = 'PONTUAL',
  DISSEMINADO = 'DISSEMINADO'
}

export enum Frequencia {
  ISOLADO = 'ISOLADO',
  FREQUENTE = 'FREQUENTE'
}

export enum FocoManipulacao {
  ATLETAS_DIRIGENTES_COMISSAO = 'ATLETAS_DIRIGENTES_COMISSAO',
  APOSTADORES = 'APOSTADORES',
  JUIZES = 'JUIZES'
}

export enum TipoEvidencia {
  DOCUMENTO = 'DOCUMENTO',
  IMAGEM = 'IMAGEM',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  OUTRO = 'OUTRO'
}

export enum StatusReport {
  PENDENTE = 'PENDENTE',
  EM_ANALISE = 'EM_ANALISE',
  APROVADA = 'APROVADA',
  REJEITADA = 'REJEITADA',
  ARQUIVADA = 'ARQUIVADA'
}

// Interfaces base
export interface UF {
  sigla: string;
  nome: string;
}

export interface PessoaEnvolvida {
  id?: string;
  nomePessoa: string;
  funcaoPessoa: string;
}

export interface ClubeEnvolvido {
  id?: string;
  nomeClube: string;
}

export interface FocoManipulacaoEntity {
  id?: string;
  foco: FocoManipulacao;
}

export interface Evidencia {
  id?: string;
  nomeOriginal: string;
  nomeArquivo: string;
  caminhoArquivo: string;
  tamanhoBytes: number;
  mimeType: string;
  tipo: TipoEvidencia;
  descricao?: string;
  dataUpload?: string;
}

export interface Partida {
  id?: string;
  torneio: string;
  dataPartida: string;
  localPartida: string;
  timeA?: string;
  timeB?: string;
  observacoes?: string;
  municipio: string;
  uf: string;
}

// DTOs de Request
export interface CreateReportDTO {
  tipoDenuncia: TipoDenuncia;
  descricao: string;
  comoSoube?: ComoSoube;
  pontualOuDisseminado?: PontualOuDisseminado;
  frequencia?: Frequencia;
  municipio: string;
  uf: string;
  pessoasEnvolvidas: PessoaEnvolvida[];
  clubesEnvolvidos?: ClubeEnvolvido[];
  focosManipulacao: FocoManipulacao[];
  evidencias?: Evidencia[];
  partidas?: Partida[];
}

export interface UpdateReportStatusDTO {
  status: StatusReport;
  observacoes?: string;
}

// DTOs de Response
export interface CreateReportResponse {
  id: string;
  message: string;
  createdAt: string;
}

export interface ReportListItem {
  id: string;
  tipoDenuncia: TipoDenuncia;
  descricao: string;
  pontualOuDisseminado: PontualOuDisseminado;
  frequencia: Frequencia;
  dataDenuncia: string;
  uf: string;
  totalPessoas: number;
  totalClubes: number;
  totalEvidencias: number;
}

export interface ReportDetail extends ReportListItem {
  comoSoube?: ComoSoube;
  pessoasEnvolvidas: PessoaEnvolvida[];
  clubesEnvolvidos: ClubeEnvolvido[];
  focosManipulacao: FocoManipulacaoEntity[];
  evidencias: Evidencia[];
  partidas: Partida[];
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ReportsListResponse {
  reports: ReportListItem[];
  pagination: PaginationInfo;
}

export interface UpdateStatusResponse {
  message: string;
}

// Parâmetros de query
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  details?: any;
}
