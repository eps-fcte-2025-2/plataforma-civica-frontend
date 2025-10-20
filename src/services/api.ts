// src/services/api.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
}

class ApiService {
  private axiosInstance: AxiosInstance;
  private baseURL: string;
  private apiKey?: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    this.apiKey = process.env.NEXT_PUBLIC_API_KEY;

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.apiKey) {
          config.headers.Authorization = `Bearer ${this.apiKey}`;
        }
        if (process.env.NODE_ENV === 'development') {
          console.log(`📡 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const responseData = error.response?.data as Record<string, unknown> | undefined;

        // Para erro 422, deixa o frontend tratar
        if (error.response?.status === 422) {
          return Promise.reject(error);
        }

        const errorMessage = (responseData?.message as string) || error.message || 'Erro desconhecido';
        const apiError: ApiError = {
          message: errorMessage,
          status: error.response?.status || 0,
        };

        return Promise.reject(apiError);
      }
    );
  }

  // Métodos HTTP
  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint, { params });
    return response.data;
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data);
    return response.data;
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data);
    return response.data;
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.axiosInstance.patch<T>(endpoint, data);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint);
    return response.data;
  }

  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Instância singleton
export const apiService = new ApiService();

// Hook para uso em componentes React
export const useApi = () => apiService;
