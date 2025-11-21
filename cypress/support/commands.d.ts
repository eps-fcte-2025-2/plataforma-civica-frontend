/// <reference types="cypress" />

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

export {};
