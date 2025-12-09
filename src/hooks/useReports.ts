// src/hooks/useReports.ts
import { useState, useCallback } from "react";
import logger from "@/lib/appLogger";
import DenunciaService from "../services/denunciaService";
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

export interface UseReportsState {
  loading: boolean;
  error: string | null;
  reports: ReportDetail[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  } | null;
}

export const useReports = () => {
  const [state, setState] = useState<UseReportsState>({
    loading: false,
    error: null,
    reports: [],
    pagination: null,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  // Buscar denúncias com paginação
  const fetchReports = useCallback(
    async (params?: PaginationParams) => {
      setLoading(true);
      clearError();

      try {
        const response: ReportsListResponse = await DenunciaService.getReports(params);
        setState((prev) => ({
          ...prev,
          reports: response.reports as ReportDetail[], // Convertendo para ReportDetail[]
          pagination: response.pagination,
        }));
        return response;
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Erro ao buscar denúncias";
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, clearError, setError],
  );

  // Buscar denúncia por ID
  const fetchReportById = useCallback(
    async (id: string): Promise<ReportDetail> => {
      setLoading(true);
      clearError();

      try {
        const report = await DenunciaService.getReportById(id);
        return report;
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Erro ao buscar denúncia";
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, clearError, setError],
  );

  // Criar nova denúncia
  const createReport = useCallback(
    async (data: CreateReportDTO): Promise<CreateReportResponse> => {
      setLoading(true);
      clearError();

      try {
        // Validar dados antes do envio
        const validationErrors = DenunciaService.validateReportData(data);
        if (validationErrors.length > 0) {
          const errorMessage = `Erros de validação: ${validationErrors.join(", ")}`;
          setError(errorMessage);
          throw new Error(errorMessage);
        }

        const response = await DenunciaService.createReport(data);
        return response;
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Erro ao criar denúncia";
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, clearError, setError],
  );

  // Atualizar status da denúncia
  const updateReportStatus = useCallback(
    async (id: string, data: UpdateReportStatusDTO): Promise<UpdateStatusResponse> => {
      setLoading(true);
      clearError();

      try {
        const response = await DenunciaService.updateReportStatus(id, data);
        return response;
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar status";
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, clearError, setError],
  );

  return {
    ...state,
    fetchReports,
    fetchReportById,
    createReport,
    updateReportStatus,
    clearError,
  };
};

// Hook para UFs
export const useUFs = () => {
  const [ufs, setUFs] = useState<UF[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUFs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      logger.debug({}, "Iniciando carregamento de UFs");
      const response = await DenunciaService.getUFs();
      logger.info({ count: response.length }, "UFs carregados");
      setUFs(response);
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao carregar UFs";
      logger.error({ error }, "Erro no hook de UFs");
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    ufs,
    loading,
    error,
    fetchUFs,
  };
};
