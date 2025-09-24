// ***********************************************************
// This file is processed and loaded automatically before your test files.
// ***********************************************************

import '@testing-library/cypress/add-commands';

// Commands para facilitar os testes
Cypress.Commands.add('limparBancoDeDados', () => {
  // Este comando pode ser usado para limpar o banco entre testes
  // Por enquanto, vamos apenas fazer uma requisição GET para verificar a API
  cy.request('GET', `${Cypress.env('apiUrl')}/reports/`).then((response) => {
    expect(response.status).to.equal(200);
  });
});

Cypress.Commands.add('selecionarUF', (uf: string) => {
  cy.get('select').contains('Selecione uma UF').parent().select(uf);
});

Cypress.Commands.add('preencherPessoaEnvolvida', (index: number, nome: string, funcao: string) => {
  cy.get(`input[placeholder="Nome da pessoa"]`).eq(index).type(nome);
  cy.get(`input[placeholder="Função da pessoa"]`).eq(index).type(funcao);
});

Cypress.Commands.add('selecionarFocoManipulacao', (foco: string) => {
  cy.contains('label', foco).find('input[type="checkbox"]').check();
});

Cypress.Commands.add('verificarSucesso', () => {
  cy.contains('Denúncia enviada com sucesso!').should('be.visible');
  cy.contains('Protocolo:').should('be.visible');
  cy.get('button').contains('Nova Denúncia').should('be.visible');
});

// Declaração de tipos para TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      limparBancoDeDados(): Chainable<void>;
      selecionarUF(uf: string): Chainable<void>;
      preencherPessoaEnvolvida(index: number, nome: string, funcao: string): Chainable<void>;
      selecionarFocoManipulacao(foco: string): Chainable<void>;
      verificarSucesso(): Chainable<void>;
    }
  }
}

export {};
