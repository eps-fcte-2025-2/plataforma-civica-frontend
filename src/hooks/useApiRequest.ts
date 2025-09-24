// src/hooks/useApiRequest.ts

import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '@/services/api';

interface UseApiRequestState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiRequestOptions {
  immediate?: boolean; // Se deve executar imediatamente ao montar o componente
}

export function useApiRequest<T>(
  apiCall: () => Promise<{ data: T; success: boolean }>,
  options: UseApiRequestOptions = { immediate: true }
) {
  const [state, setState] = useState<UseApiRequestState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiCall();
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setState({
        data: null,
        loading: false,
        error: apiError,
      });
      throw error;
    }
  }, [apiCall]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, [execute, options.immediate]);

  return {
    ...state,
    execute,
    reset,
    isSuccess: !state.loading && !state.error && state.data !== null,
    isError: !state.loading && state.error !== null,
  };
}

// Hook específico para mutações (POST, PUT, DELETE)
export function useApiMutation<TData, TVariables = void>(
  apiCall: (variables: TVariables) => Promise<{ data: TData; success: boolean }>
) {
  const [state, setState] = useState<UseApiRequestState<TData>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = useCallback(async (variables: TVariables) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiCall(variables);
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setState({
        data: null,
        loading: false,
        error: apiError,
      });
      throw error;
    }
  }, [apiCall]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    mutate,
    reset,
    isSuccess: !state.loading && !state.error && state.data !== null,
    isError: !state.loading && state.error !== null,
  };
}