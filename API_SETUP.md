# Conexão com API - Guia de Uso

Este projeto inclui uma estrutura completa para conexão com APIs externas usando variáveis de ambiente.

## Configuração

### 1. Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e configure as variáveis:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:

```env
# URL base da sua API
NEXT_PUBLIC_API_BASE_URL=https://sua-api.com/api

# Chave de API (opcional)
API_KEY=sua-chave-secreta-aqui
```

### 2. Estrutura de Arquivos

```
src/
├── services/
│   ├── api.ts              # Serviço base para requisições HTTP
│   └── denunciaService.ts  # Exemplo de serviço específico
├── hooks/
│   └── useApiRequest.ts    # Hooks para uso em componentes React
└── app/
    └── (main)/
        └── denuncia/
            └── page.tsx    # Exemplo de uso em componente
```

## Como Usar

### 1. Serviço Base (api.ts)

O serviço base fornece métodos HTTP básicos:

```typescript
import { apiService } from '@/services/api';

// GET
const response = await apiService.get('/endpoint');

// POST
const response = await apiService.post('/endpoint', { data: 'value' });

// PUT
const response = await apiService.put('/endpoint/1', { data: 'updated' });

// DELETE
const response = await apiService.delete('/endpoint/1');
```

### 2. Serviços Específicos

Crie serviços específicos para cada recurso da API:

```typescript
// src/services/meuServicoService.ts
import { apiService, ApiResponse } from './api';

export interface MeuItem {
  id: string;
  nome: string;
  // ... outros campos
}

export class MeuServicoService {
  private static readonly ENDPOINT = '/meus-items';

  static async getAll(): Promise<ApiResponse<MeuItem[]>> {
    return apiService.get<MeuItem[]>(this.ENDPOINT);
  }

  static async create(data: Omit<MeuItem, 'id'>): Promise<ApiResponse<MeuItem>> {
    return apiService.post<MeuItem>(this.ENDPOINT, data);
  }
}
```

### 3. Hooks para React

Use os hooks personalizados em seus componentes:

```typescript
'use client';

import { useApiRequest, useApiMutation } from '@/hooks/useApiRequest';
import { MeuServicoService } from '@/services/meuServicoService';

export default function MeuComponente() {
  // Para buscar dados
  const { data, loading, error, execute } = useApiRequest(
    MeuServicoService.getAll,
    { immediate: true }
  );

  // Para mutações (criar, atualizar, deletar)
  const { mutate: createItem, loading: creating } = useApiMutation(
    MeuServicoService.create
  );

  const handleCreate = async () => {
    try {
      await createItem({ nome: 'Novo Item' });
      execute(); // Recarrega a lista
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      {data && data.map(item => (
        <div key={item.id}>{item.nome}</div>
      ))}
      <button onClick={handleCreate} disabled={creating}>
        {creating ? 'Criando...' : 'Criar Item'}
      </button>
    </div>
  );
}
```

## Tratamento de Erros

O sistema inclui tratamento automático de erros:

```typescript
interface ApiError {
  message: string;
  status: number;
}
```

Os erros são automaticamente capturados e podem ser tratados nos componentes:

```typescript
const { error } = useApiRequest(MinhaAPI.getData);

if (error) {
  console.log('Status:', error.status);
  console.log('Mensagem:', error.message);
}
```

## Autenticação

A API service suporta autenticação via Bearer Token ou API Key:

```env
# Bearer Token (padrão)
API_KEY=seu-jwt-token

# Ou API Key (descomente a linha no api.ts)
# headers['X-API-Key'] = this.apiKey;
```

## Exemplo Completo

Veja a implementação completa no arquivo `src/app/(main)/denuncia/page.tsx` que demonstra:

- Formulário para criar denúncias
- Lista de denúncias existentes
- Estados de loading e erro
- Atualização automática após criação

## Próximos Passos

1. Configure suas variáveis de ambiente no `.env.local`
2. Crie serviços específicos para seus endpoints
3. Use os hooks nos seus componentes React
4. Adicione validação de dados conforme necessário
5. Implemente autenticação se necessário

## Variáveis de Ambiente Disponíveis

- `NEXT_PUBLIC_API_BASE_URL`: URL base da API (público)
- `API_KEY`: Chave de autenticação da API (privado)
- `DATABASE_URL`: URL do banco de dados (se necessário)
- `NEXTAUTH_SECRET`: Secret para NextAuth (se usando autenticação)
- `NEXTAUTH_URL`: URL do app para NextAuth