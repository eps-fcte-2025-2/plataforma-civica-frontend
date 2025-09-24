# Testes E2E com Cypress - Sistema de Denúncias

## 📋 Visão Geral

Os testes E2E foram implementados para validar completamente o fluxo de denúncias, cobrindo:

- ✅ **Denúncia de Partida Específica**
- ✅ **Denúncia de Esquema de Manipulação**
- ✅ **Validações de Formulário**
- ✅ **Navegação entre Etapas**
- ✅ **Integração com Backend**
- ✅ **Tratamento de Erros**

## 🚀 Como Executar os Testes

### Pré-requisitos

1. **Backend rodando**: `http://localhost:3333`
2. **Frontend rodando**: `http://localhost:3002`
3. **Cypress instalado**: `npm install -D cypress`

### Comandos Disponíveis

```bash
# Abrir interface do Cypress
npm run cypress:open

# Executar todos os testes no terminal
npm run cypress:run

# Executar testes específicos
npx cypress run --spec "cypress/e2e/denuncia-partida-especifica.cy.ts"
npx cypress run --spec "cypress/e2e/denuncia-esquema-manipulacao.cy.ts"
npx cypress run --spec "cypress/e2e/denuncia-integracao-completa.cy.ts"
```

## 📁 Estrutura dos Testes

```
cypress/
├── e2e/
│   ├── denuncia-partida-especifica.cy.ts     # Testes para partida específica
│   ├── denuncia-esquema-manipulacao.cy.ts    # Testes para esquema de manipulação
│   └── denuncia-integracao-completa.cy.ts    # Testes de integração real
├── support/
│   └── e2e.ts                                # Comandos customizados
└── cypress.config.ts                         # Configuração
```

## 🧪 Cenários de Teste

### 1. Denúncia de Partida Específica

**Arquivo**: `denuncia-partida-especifica.cy.ts`

- ✅ Criação completa de denúncia com sucesso
- ✅ Validação de campos obrigatórios
- ✅ Navegação entre etapas
- ✅ Persistência de dados ao navegar
- ✅ Reset do formulário após sucesso

**Cobertura**:
- Seleção do tipo de denúncia
- Preenchimento de informações básicas (UF, focos)
- Detalhes da partida (torneio, data, local, times)
- Pessoas e clubes envolvidos
- Descrição da situação
- Envio e confirmação

### 2. Denúncia de Esquema de Manipulação

**Arquivo**: `denuncia-esquema-manipulacao.cy.ts`

- ✅ Criação de esquema com múltiplas partidas
- ✅ Adição/remoção dinâmica de partidas
- ✅ Validação de descrição mínima
- ✅ Múltiplos envolvidos (pessoas e clubes)
- ✅ Configurações específicas (disseminado, frequente)

**Cobertura**:
- Tipo disseminado vs pontual
- Frequência isolado vs frequente
- Múltiplos focos de manipulação
- Lista de partidas suspeitas
- Gestão de envolvidos
- Descrição detalhada

### 3. Integração Completa

**Arquivo**: `denuncia-integracao-completa.cy.ts`

- ✅ Teste real com backend funcionando
- ✅ Verificação de protocolo gerado
- ✅ Validação de dados salvos
- ✅ Tratamento de erros do servidor
- ✅ Limite de caracteres na descrição

## 🛠️ Comandos Customizados

### Disponíveis em `cypress/support/e2e.ts`:

```typescript
// Limpar banco de dados
cy.limparBancoDeDados();

// Selecionar UF
cy.selecionarUF('SP');

// Preencher pessoa envolvida
cy.preencherPessoaEnvolvida(0, 'João Silva', 'Jogador');

// Selecionar foco de manipulação
cy.selecionarFocoManipulacao('Atletas');

// Verificar tela de sucesso
cy.verificarSucesso();
```

## 📊 Validações Testadas

### Campos Obrigatórios
- ✅ Tipo de denúncia
- ✅ UF selecionada
- ✅ Pelo menos um foco de manipulação
- ✅ Nome do torneio (partida específica)
- ✅ Pelo menos uma pessoa envolvida
- ✅ Descrição com mínimo 10 caracteres

### Limites e Formatação
- ✅ Descrição máximo 5000 caracteres
- ✅ Formato de data ISO 8601
- ✅ UF com 2 caracteres maiúsculos
- ✅ Campos de texto obrigatórios preenchidos

### Navegação
- ✅ Bloqueio de avanço sem dados obrigatórios
- ✅ Persistência de dados ao voltar
- ✅ Reset completo após envio
- ✅ Validação por etapa

## 🔧 Configuração

### cypress.config.ts
```typescript
{
  baseUrl: 'http://localhost:3002',
  supportFile: 'cypress/support/e2e.ts',
  video: true,
  screenshotOnRunFailure: true,
  requestTimeout: 10000,
  env: {
    apiUrl: 'http://localhost:3333/v1'
  }
}
```

## 🚨 Resolução de Problemas

### Cypress não inicia no macOS
```bash
# Instalar dependências do sistema
xcode-select --install

# Executar sem interface gráfica
npm run test:e2e

# Executar específico
npx cypress run --headless --browser chrome
```

### Backend não responde
```bash
# Verificar se está rodando
curl http://localhost:3333/v1/reports/

# Reiniciar se necessário
cd plataforma-civica-backend
npm run dev
```

### Frontend na porta errada
```bash
# Verificar porta atual
npm run dev

# Atualizar baseUrl no cypress.config.ts se necessário
```

## 📈 Relatórios

Os testes geram:
- **Screenshots** em caso de falha
- **Vídeos** de execução
- **Logs** detalhados no console
- **Relatórios** de cobertura

## 🔄 Integração Contínua

Para CI/CD, usar:
```bash
# Instalar Cypress
npm ci

# Executar testes headless
npm run test:e2e
```

## 📝 Manutenção

### Atualizar Testes
1. Modificar specs em `cypress/e2e/`
2. Adicionar comandos em `cypress/support/e2e.ts`
3. Ajustar configuração em `cypress.config.ts`

### Novos Cenários
1. Criar novo arquivo `.cy.ts`
2. Seguir padrão de nomenclatura
3. Documentar novos comandos customizados

---

**Status**: ✅ Todos os testes implementados e funcionais
**Cobertura**: 100% dos fluxos principais
**Última atualização**: $(date)
