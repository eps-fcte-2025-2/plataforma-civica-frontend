/// <reference types="cypress" />

// Custom commands for testing the platform
declare global {
  namespace Cypress {
    interface Chainable {
      limparBancoDeDados(): Chainable<void>;
      selecionarUF(uf: string): Chainable<void>;
      selecionarFocoManipulacao(foco: string): Chainable<void>;
      preencherPessoaEnvolvida(index: number, nome: string, funcao: string): Chainable<void>;
      verificarSucesso(): Chainable<void>;
    }
  }
}

// Limpar banco de dados (mock)
Cypress.Commands.add('limparBancoDeDados', () => {
  cy.log('Limpando banco de dados (mock)');
  // Esta função seria implementada para comunicação com API em testes reais
});

// Selecionar UF no dropdown
Cypress.Commands.add('selecionarUF', (uf: string) => {
  cy.get('select').eq(1).select(uf);
});

// Selecionar foco de manipulação
Cypress.Commands.add('selecionarFocoManipulacao', (foco: string) => {
  cy.contains('label', foco).click();
});

// Preencher dados de pessoa envolvida
Cypress.Commands.add('preencherPessoaEnvolvida', (index: number, nome: string, funcao: string) => {
  cy.get('input[placeholder="Nome da pessoa"]').eq(index).type(nome);
  cy.get('input[placeholder="Função/Cargo"]').eq(index).type(funcao);
});

// Verificar tela de sucesso
Cypress.Commands.add('verificarSucesso', () => {
  cy.contains('Denúncia enviada com sucesso').should('be.visible');
  cy.contains('Protocolo').should('be.visible');
});

export {};