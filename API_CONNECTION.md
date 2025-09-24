# Conexão com Backend - Plataforma Cívica

Este documento explica como usar a conexão com o backend da API de denúncias.

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto frontend com:

```env
# Configuração do Backend
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

# Configurações opcionais
# NEXT_PUBLIC_API_KEY=sua_chave_api_aqui
```

### 2. Dependências

O projeto já inclui as dependências necessárias:
- `axios` - Para requisições HTTP
- `typescript` - Para tipagem

## Estrutura dos Arquivos

```
src/
├── services/
│   ├── api.ts              # Configuração base do axios
│   └── denunciaService.ts  # Serviços específicos de denúncias
├── types/
│   └── api.ts              # Tipos TypeScript baseados no OpenAPI
├── hooks/
│   └── useReports.ts       # Hooks React para gerenciar estado
└── components/
    └── ReportExample.tsx   # Exemplo de uso completo
```

## Como Usar

### 1. Importar os Serviços

```typescript
import DenunciaService from '../services/denunciaService';
import { useReports, useMunicipios } from '../hooks/useReports';
```

### 2. Criar uma Nova Denúncia

```typescript
import { CreateReportDTO, TipoDenuncia, FocoManipulacao } from '../types/api';

const novaDenuncia: CreateReportDTO = {
  tipoDenuncia: TipoDenuncia.PARTIDA_ESPECIFICA,
  descricao: "Descrição detalhada da denúncia...",
  municipioId: "uuid-do-municipio",
  pessoasEnvolvidas: [
    { nomePessoa: "João Silva", funcaoPessoa: "Jogador" }
  ],
  focosManipulacao: [FocoManipulacao.ATLETAS_DIRIGENTES_COMISSAO]
};

// Criar denúncia
const response = await DenunciaService.createReport(novaDenuncia);
console.log('Denúncia criada:', response.id);
```

### 3. Usar Hooks React

```typescript
function MeuComponente() {
  const { reports, loading, error, createReport } = useReports();
  const { municipios, fetchMunicipios } = useMunicipios();

  useEffect(() => {
    fetchMunicipios();
  }, [fetchMunicipios]);

  const handleCriarDenuncia = async (dados) => {
    try {
      await createReport(dados);
      console.log('Denúncia criada com sucesso!');
    } catch (error) {
      console.error('Erro:', error.message);
    }
  };

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {/* Seu componente aqui */}
    </div>
  );
}
```

### 4. Buscar Denúncias

```typescript
// Buscar todas as denúncias
const denuncias = await DenunciaService.getReports({ page: 1, pageSize: 10 });

// Buscar denúncia específica
const denuncia = await DenunciaService.getReportById('uuid-da-denuncia');

// Buscar municípios
const municipios = await DenunciaService.getMunicipios();
```

### 5. Atualizar Status

```typescript
import { StatusReport } from '../types/api';

await DenunciaService.updateReportStatus('uuid-da-denuncia', {
  status: StatusReport.EM_ANALISE,
  observacoes: 'Iniciando análise da denúncia'
});
```

## Endpoints Disponíveis

Baseado no OpenAPI, os seguintes endpoints estão disponíveis:

- `POST /v1/reports/` - Criar nova denúncia
- `GET /v1/reports/` - Listar denúncias (com paginação)
- `GET /v1/reports/{id}` - Buscar denúncia por ID
- `PATCH /v1/reports/{id}` - Atualizar status da denúncia
- `GET /v1/reports/municipios` - Listar municípios

## Validação de Dados

O serviço inclui validação automática dos dados:

```typescript
const erros = DenunciaService.validateReportData(dadosDenuncia);
if (erros.length > 0) {
  console.error('Erros de validação:', erros);
}
```

## Tratamento de Erros

Todos os métodos incluem tratamento de erro adequado:

```typescript
try {
  const resultado = await DenunciaService.createReport(dados);
} catch (error) {
  console.error('Erro na API:', error.message);
  console.error('Status HTTP:', error.status);
}
```

## Logs de Debug

A configuração do axios inclui logs detalhados para debug:

- 🚀 Requisições sendo enviadas
- ✅ Respostas bem-sucedidas
- ❌ Erros de requisição

## Exemplo Completo

Veja o arquivo `src/components/ReportExample.tsx` para um exemplo completo de como usar todos os recursos da API em um componente React.

## Configurações Avançadas

### Timeout

O axios está configurado com timeout de 10 segundos. Para alterar:

```typescript
// Em src/services/api.ts
this.axiosInstance = axios.create({
  baseURL: this.baseURL,
  timeout: 15000, // 15 segundos
  // ...
});
```

### Headers Personalizados

Para adicionar headers personalizados:

```typescript
// Em src/services/api.ts, no interceptor de request
config.headers['X-Custom-Header'] = 'valor';
```

### Interceptadores

Os interceptadores podem ser modificados em `src/services/api.ts` para:
- Adicionar autenticação
- Logs personalizados
- Transformação de dados
- Tratamento global de erros
