/// <reference types="cypress" />

Cypress.Commands.add('limparBancoDeDados', () => {
  cy.log('Limpando banco de dados (mock)');
});

Cypress.Commands.add('selecionarUF', (uf: string) => {
  cy.get('select').eq(1).select(uf);
});

Cypress.Commands.add('selecionarFocoManipulacao', (foco: string) => {
  cy.contains('label', foco).click();
});

Cypress.Commands.add('preencherPessoaEnvolvida', (index: number, nome: string, funcao: string) => {
  cy.get('input[placeholder="Nome da pessoa"]').eq(index).type(nome);
  cy.get('input[placeholder="Função/Cargo"]').eq(index).type(funcao);
});

Cypress.Commands.add('verificarSucesso', () => {
  cy.contains('Denúncia enviada com sucesso').should('be.visible');
  cy.contains('Protocolo').should('be.visible');
});
