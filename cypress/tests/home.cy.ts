/// <reference types="cypress" />

describe('Página Inicial', () => {
  beforeEach(() => {
    // Visita a página inicial antes de cada teste
    cy.visit('/');
  });

  it('deve carregar a página inicial corretamente', () => {
    // Verifica se a página carrega
    cy.get('body').should('be.visible');
    
    // Verifica se contém o texto "Bem-vindo!"
    cy.contains('Bem-vindo!').should('be.visible');
    
    // Verifica se contém a descrição do card
    cy.contains('Este é um exemplo de card reutilizável.').should('be.visible');
  });

  it('deve exibir os botões interativos', () => {
    // Verifica se os botões existem usando data-testids
    cy.get('[data-testid="button-primary"]').should('be.visible');
    cy.get('[data-testid="button-secondary"]').should('be.visible');
    
    // Verifica o conteúdo dos botões
    cy.contains('button', 'Botão principal').should('be.visible');
    cy.contains('button', 'Botão secundário').should('be.visible');
  });

  it('deve permitir interação com o botão principal', () => {
    // Intercepta o alert do navegador
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert');
    });
    
    // Clica no botão principal usando data-testid
    cy.get('[data-testid="button-primary"]').click();
    
    // Verifica se o alert foi chamado com a mensagem correta
    cy.get('@windowAlert').should('have.been.calledWith', 'Você clicou no botão principal!');
  });

  it('deve exibir a estrutura correta de cards', () => {
    // Verifica se existem exatamente 2 cards na página
    cy.get('[data-testid="example-card"]').should('have.length', 2);
    
    // Verifica o primeiro card
    cy.get('[data-testid="example-card"]').first().within(() => {
      cy.get('[data-testid="card-title"]').should('contain.text', 'Bem-vindo!');
      cy.get('[data-testid="card-description"]').should('contain.text', 'Este é um exemplo de card reutilizável.');
      cy.get('[data-testid="button-primary"]').should('be.visible');
    });
    
    // Verifica o segundo card
    cy.get('[data-testid="example-card"]').last().within(() => {
      cy.get('[data-testid="card-title"]').should('contain.text', 'Outro exemplo');
      cy.get('[data-testid="card-description"]').should('contain.text', 'Você pode criar quantos cards quiser.');
      cy.get('[data-testid="button-secondary"]').should('be.visible');
    });
  });

  it('deve ter layout responsivo correto', () => {
    // Verifica se os cards estão dispostos corretamente
    cy.get('[data-testid="example-card"]').should('be.visible');
    
    // Testa em viewport mobile
    cy.viewport(375, 667);
    cy.get('[data-testid="example-card"]').should('be.visible');
    
    // Volta para viewport desktop
    cy.viewport(1280, 720);
    cy.get('[data-testid="example-card"]').should('be.visible');
  });
});