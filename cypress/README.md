# Testes E2E com Cypress

## Configuração

O projeto está configurado com Cypress para testes de ponta a ponta (E2E). 

### Estrutura de arquivos

```
cypress/
├── e2e/              # Testes E2E
│   └── home.cy.ts    # Teste da página inicial
├── fixtures/         # Dados mock para testes
│   └── example.json  # Exemplo de fixture
└── support/          # Arquivos de suporte
    ├── commands.ts   # Comandos customizados
    └── e2e.ts       # Configurações globais
cypress.config.ts     # Configuração principal do Cypress
```

## Como executar os testes

### Pré-requisitos

1. Certifique-se de que o servidor de desenvolvimento está rodando:
```bash
npm run dev
```

### Executar testes

1. **Modo headless (CI/CD)**:
```bash
npm run test:e2e
```

2. **Modo interativo (desenvolvimento)**:
```bash
npm run test:e2e:open
```

## Testes implementados

### Teste da Página Inicial (`home.cy.ts`)

- ✅ Verifica se a página carrega corretamente
- ✅ Confirma que contém o texto "Bem-vindo!"
- ✅ Testa a interação com botões
- ✅ Valida a estrutura dos componentes ExampleCard
- ✅ Verifica alertas JavaScript

### Cenários de teste cobertos

1. **Carregamento da página**: Verifica se a página inicial renderiza sem erros
2. **Conteúdo textual**: Confirma se os textos esperados estão presentes
3. **Interatividade**: Testa cliques em botões e alertas
4. **Estrutura de componentes**: Valida a hierarquia correta dos elementos

## Configuração do Cypress

O arquivo `cypress.config.ts` contém:
- Base URL configurada para `http://localhost:3000`
- Viewport de 1280x720 pixels
- Screenshots habilitados em caso de falha
- Vídeos desabilitados por padrão

## Adicionando novos testes

1. Crie um arquivo `.cy.ts` na pasta `cypress/e2e/`
2. Use a estrutura padrão do Cypress:

```typescript
describe('Nome do teste', () => {
  beforeEach(() => {
    cy.visit('/sua-pagina');
  });

  it('deve fazer algo específico', () => {
    // Seu teste aqui
  });
});
```

## Comandos úteis

- `cy.visit('/')` - Navega para uma página
- `cy.get('selector')` - Seleciona elementos
- `cy.contains('texto')` - Encontra elementos por texto
- `cy.click()` - Clica em elementos
- `cy.should('be.visible')` - Verifica visibilidade

## Troubleshooting

### Servidor não está rodando
Se você receber erro "Cypress could not verify that this server is running", certifique-se de que o servidor Next.js está rodando em `http://localhost:3000`.

### Testes falhando
1. Verifique se os textos e elementos testados existem na aplicação
2. Confirme se os seletores CSS estão corretos
3. Use `cy.debug()` para pausar e inspecionar o estado da aplicação