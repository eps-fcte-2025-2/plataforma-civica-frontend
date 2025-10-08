
Cypress.Commands.add('limparBancoDeDados', () => {
    cy.log('Limpando Banco de Dados (função mockada no teste)');
});

// adicionar uf
Cypress.Commands.add('selecionarUF', (uf: string) => {
    cy.contains('label', 'UF').siblings('select').select(uf, { force: true });
});

// selecionar foco de manipulacao
Cypress.Commands.add('selecionarFocoManipulacao', (foco: string) => {
    cy.contains('label', foco).click();
});

// verificar a tela de sucesso
Cypress.Commands.add('verificarSucesso', () => {
    cy.contains('Denúncia enviada com sucesso!').should('be.visible');
    cy.contains('Protocolo:').should('be.visible');
});


// ir para a próxima etapa
Cypress.Commands.add('proximoPasso', () => {
    cy.get('button').contains('Próximo').click();
});

// ir para a etapa anterior
Cypress.Commands.add('passoAnterior', () => {
    cy.get('button').contains('Anterior').click();
});

// preencher a etapa 2
Cypress.Commands.add('preencherPasso2Esquema', (comoSoube: string, pontualDisseminado: string, frequencia: string, municipio: string, uf: string) => {
    cy.contains('Informações Básicas do Esquema').should('be.visible');

    cy.get('select').first().select(comoSoube);

    cy.contains('label', pontualDisseminado).click();
    cy.contains('label', frequencia).click();

    cy.contains('label', 'Município').siblings('input').type(municipio);

    cy.selecionarUF(uf);

    cy.proximoPasso();
});

Cypress.Commands.add('adicionarJuizes', (juizes: string[]) => {
    juizes.forEach((nomeJuiz, index) => {
        cy.get('button').contains('Adicionar Juiz').click();
        cy.get('input[placeholder="Nome do juiz"]').eq(index)
          .type(nomeJuiz);
    });
});

// comando para adicionar apostadores
Cypress.Commands.add('adicionarApostadores', (apostadores: string[]) => {
    apostadores.forEach((nomeApostador, index) => {
        cy.get('button').contains('Adicionar Apostador').click();
        cy.get('input[placeholder="Nome do apostador"]').eq(index)
          .type(nomeApostador);
    });
});

// preencher dados de uma pessoa envolvida
Cypress.Commands.add('preencherPessoaEnvolvida', (index, nome: string, funcao: string) => {
    cy.get('input[placeholder="Nome da pessoa"]').eq(index)
        .type(nome);
    cy.get('select').eq(index)
        .select(funcao);
});

Cypress.Commands.add('adicionarPessoasEnvolvidas', (pessoas: { nome: string, funcao: string }[]) => {

    pessoas.forEach((pessoa, index) => {
        cy.get('button').contains('Adicionar Pessoa').click();
        cy.preencherPessoaEnvolvida(index, pessoa.nome, pessoa.funcao);
    });
});

Cypress.Commands.add('adicionarClubesEnvolvidos', (clubes: string[]) => {
    clubes.forEach((nomeClube, index) => {
        cy.get('button').contains('Adicionar Clube').click();
        cy.get('input[placeholder="Nome do clube"]').eq(index)
          .type(nomeClube);
    });
});

Cypress.Commands.add('preencherPartidaSuspeita', (index, nome, dataHora, local, municipio) => {
    cy.get('input[placeholder="Nome da partida/jogo"]').eq(index).type(nome);
    cy.get('input[placeholder*="Data e horário"]').eq(index).type(dataHora);
    cy.get('input[placeholder="Local"]').eq(index).type(local);
    cy.get('input[placeholder="Município"]').eq(index).type(municipio);
});

Cypress.Commands.add('adicionarMultiplasPartidas', (partidas) => {
    partidas.forEach((partida, index) => {
        cy.get('button').contains('Adicionar Partida Suspeita').click();
        cy.preencherPartidaSuspeita(index, partida.nome, partida.dataHora, partida.local, partida.municipio);
    });
});

