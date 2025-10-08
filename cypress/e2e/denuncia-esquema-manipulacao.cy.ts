describe('Denúncia de Esquema de Manipulação', () => {
  beforeEach(() => {
    cy.visit('/denuncia');
    cy.limparBancoDeDados();
  });

  it('criar uma denúncia de esquema de manipulação com múltiplas partidas', () => {

    // passo 1
    cy.contains('O que você deseja denunciar?').should('be.visible');
    cy.contains('label', 'ESQUEMA DE MANIPULAÇÃO').click();
    cy.proximoPasso();

    // passo 2: Informações básicas
    cy.preencherPasso2Esquema('TERCEIROS', 'Pontual', 'Frequente', 'Rio de Janeiro', 'RJ', )

    // passo 3: Focos de manipulação
    cy.selecionarFocoManipulacao('Atletas');
    cy.selecionarFocoManipulacao('Apostadores');
    cy.selecionarFocoManipulacao('Juízes');

    cy.proximoPasso();

    // passo 4: Detalhes do esquema
    cy.contains('Detalhes do Esquema').should('be.visible');

    const listaJuizes = ['João da Silva'];
    cy.adicionarJuizes(listaJuizes);

    cy.contains('Informações sobre Apostadores Envolvidos').should('be.visible');
    const listaApostadores = ['Maria de Souza'];
    cy.adicionarApostadores(listaApostadores);

    const partidas = [
        {
            nome: 'Flamengo x Vasco - Campeonato Carioca',
            dataHora: '2024-11-20T20:00',
            municipio: 'Rio de Janeiro'
        },
        {
            nome: 'Botafogo x Fluminense - Copa do Brasil',
            dataHora: '2024-11-25T18:30',
            local: 'Nilton Santos',
            municipio: 'Rio de Janeiro'
        },
        {
            nome: 'Flamengo x Botafogo - Brasileirão',
            dataHora: '2024-12-01T21:45',
            local: 'Maracanã',
            municipio: 'Rio de Janeiro'
        },
    ];
    cy.adicionarMultiplasPartidas(partidas);

    const clubes = ['Flamengo', 'Botafogo', 'Vasco'];
    cy.adicionarClubesEnvolvidos(clubes);

    const pessoas = [
        { nome: 'Carlos Manipulador', funcao: 'Dirigente' },
        { nome: 'Roberto Apostador', funcao: 'Comissão Técnica' },
        { nome: 'Pedro Jogador', funcao: 'Atleta' }
    ];

    cy.adicionarPessoasEnvolvidas(pessoas);

    const descricao = 'Esquema complexo de manipulação de resultados envolvendo múltiplos jogos do futebol carioca. O organizador Carlos Manipulador coordena uma rede que inclui jogadores, árbitros e apostadores profissionais. As partidas são previamente combinadas com resultados específicos, incluindo número de cartões, escanteios e até mesmo o minuto exato de gols. O esquema opera há pelo menos 6 meses e já manipulou dezenas de partidas. Há evidências de transferências bancárias suspeitas e comunicações via aplicativos de mensagem entre os envolvidos. O prejuízo estimado às casas de apostas ultrapassa R$ 5 milhões.';

    cy.get('textarea').type(descricao, {delay : 0});

    cy.intercept('POST', '**/v1/reports/', {
      statusCode: 200,
      body: {
        id: '987e6543-e21b-98d7-a765-543298765432',
        message: 'Denúncia criada com sucesso',
        createdAt: new Date().toISOString()
      }
    }).as('criarDenunciaEsquema');

    cy.get('button').contains('Enviar Denúncia').click();

    cy.wait('@criarDenunciaEsquema').then((interception) => {
      const requestBody = interception.request.body;

      expect(requestBody.tipoDenuncia).to.equal('ESQUEMA_DE_MANIPULACAO');
      expect(requestBody.comoSoube).to.equal('TERCEIROS');

      expect(requestBody.pontualOuDisseminado).to.equal('PONTUAL');

      expect(requestBody.frequencia).to.equal('FREQUENTE');
      expect(requestBody.uf).to.equal('RJ');
      expect(requestBody.municipio).to.equal('Rio de Janeiro');
      expect(requestBody.descricao).to.equal(descricao);

      expect(requestBody.partidas).to.have.length(3);
      expect(requestBody.clubesEnvolvidos).to.have.length(3);

      expect(requestBody.pessoasEnvolvidas).to.have.length(5, 'esperado 5 envolvidos totais (Pessoas + Juízes + Apostadores)');

      expect(requestBody.focosManipulacao).to.include.members([
          'ATLETAS_DIRIGENTES_COMISSAO',
          'APOSTADORES',
          'JUIZES'
      ]);

    });

    cy.verificarSucesso();
  });


/*
  it('remover partidas, clubes e pessoas adicionados', () => {
    // Navegar até a etapa de partidas
    cy.contains('label', 'ESQUEMA DE MANIPULAÇÃO').click();
    cy.get('button').contains('Próximo').click();

    cy.get('select').first().select('INTERNET');
    cy.selecionarUF('SP');
    cy.selecionarFocoManipulacao('Atletas');
    cy.get('button').contains('Próximo').click();

    // Adicionar várias partidas
    cy.get('input[placeholder="Nome da partida"]').type('Partida 1');
    cy.get('input[placeholder="Data e horário]').type('2024-12-01');

    cy.get('button').contains('Adicionar Partida').click();
    cy.get('input[placeholder="Nome da partida"]').eq(1).type('Partida 2');
    cy.get('input[placeholder="Data e horário]').eq(1).type('2024-12-02');

    cy.get('button').contains('Adicionar Partida').click();
    cy.get('input[placeholder="Nome da partida"]').eq(2).type('Partida 3');
    cy.get('input[placeholder="Data e horário]').eq(2).type('2024-12-03');

    // Verificar que existem 3 partidas
    cy.get('input[placeholder="Nome da partida"]').should('have.length', 3);

    // Remover a partida do meio
    cy.get('button').contains('Remover').eq(1).click();

    // Verificar que restam 2 partidas
    cy.get('input[placeholder="Nome da partida"]').should('have.length', 2);

    // Verificar que as partidas corretas permaneceram
    cy.get('input[placeholder="Nome da partida"]').eq(0).should('have.value', 'Partida 1');
    cy.get('input[placeholder="Nome da partida"]').eq(1).should('have.value', 'Partida 3');

    cy.get('button').contains('Próximo').click();

    // Testar remoção de clubes e pessoas
    cy.get('button').contains('Adicionar Clube').click();
    cy.get('button').contains('Adicionar Clube').click();
    cy.get('button').contains('Adicionar Clube').click();

    cy.get('input[placeholder="Nome do clube"]').should('have.length', 3);
    cy.get('button').contains('Remover').first().click();
    cy.get('input[placeholder="Nome do clube"]').should('have.length', 2);
  });

  it('deve validar descrição mínima de 10 caracteres', () => {
    // Preencher formulário rapidamente até a última etapa
    cy.contains('label', 'ESQUEMA DE MANIPULAÇÃO').click();
    cy.get('button').contains('Próximo').click();

    cy.get('select').first().select('OUTROS');
    cy.selecionarUF('BA');
    cy.selecionarFocoManipulacao('Apostadores');
    cy.get('button').contains('Próximo').click();

    // Adicionar uma partida
    cy.get('input[placeholder="Nome da partida"]').type('Partida Teste');
    cy.get('input[placeholder="Data e horário]').type('2024-12-15');
    cy.get('button').contains('Próximo').click();

    // Adicionar pessoa obrigatória
    cy.preencherPessoaEnvolvida(0, 'Teste', 'Teste');
    cy.get('button').contains('Próximo').click();

    // Tentar enviar com descrição muito curta
    cy.get('textarea').type('Curta');
    cy.get('button').contains('Enviar Denúncia').click();

    // Deve permanecer na mesma tela
    cy.contains('Detalhes finais').should('be.visible');

    // Adicionar descrição válida
    cy.get('textarea').clear().type('Descrição válida com mais de 10 caracteres');

    //adicionar ** antes de /v1/
    cy.intercept('POST', '/v1/reports/', {
      statusCode: 200,
      body: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        message: 'Denúncia criada com sucesso',
        createdAt: new Date().toISOString()
      }
    }).as('criarDenuncia');

    cy.get('button').contains('Enviar Denúncia').click();
    cy.wait('@criarDenuncia');

    cy.verificarSucesso();
  });

  it('deve manter dados ao navegar entre etapas no esquema de manipulação', () => {
    // Preencher todas as etapas
    cy.contains('label', 'ESQUEMA DE MANIPULAÇÃO').click();
    cy.get('button').contains('Próximo').click();

    // Etapa 2
    cy.get('select').first().select('OBSERVACAO');
    cy.selecionarUF('PR');
    cy.get('select').contains('Pontual').parent().select('DISSEMINADO');
    cy.get('select').contains('Isolado').parent().select('FREQUENTE');
    cy.selecionarFocoManipulacao('Juízes');
    cy.get('button').contains('Próximo').click();

    // Etapa 3
    cy.get('input[placeholder="Nome da partida"]').type('Athletico x Coritiba');
    cy.get('input[placeholder="Data e horário]').type('2024-12-20');
    cy.get('button').contains('Adicionar Partida').click();
    cy.get('input[placeholder="Nome da partida"]').eq(1).type('Paraná x Londrina');
    cy.get('input[placeholder="Data e horário]').eq(1).type('2024-12-22');
    cy.get('button').contains('Próximo').click();

    // Etapa 4
    cy.get('button').contains('Adicionar Clube').click();
    cy.get('input[placeholder="Nome do clube"]').type('Athletico PR');
    cy.preencherPessoaEnvolvida(0, 'João Esquema', 'Organizador');
    cy.get('button').contains('Próximo').click();

    // Etapa 5
    cy.get('textarea').type('Descrição do esquema de manipulação');

    // Navegar de volta por todas as etapas
    cy.get('button').contains('Anterior').click();
    cy.contains('Envolvidos').should('be.visible');
    cy.get('input[placeholder="Nome do clube"]').should('have.value', 'Athletico PR');
    cy.get('input[placeholder="Nome da pessoa"]').should('have.value', 'João Esquema');

    cy.get('button').contains('Anterior').click();
    cy.contains('Partidas suspeitas').should('be.visible');
    cy.get('input[placeholder="Nome da partida"]').eq(0).should('have.value', 'Athletico x Coritiba');
    cy.get('input[placeholder="Nome da partida"]').eq(1).should('have.value', 'Paraná x Londrina');

    cy.get('button').contains('Anterior').click();
    cy.contains('Informações básicas').should('be.visible');
    cy.get('select').first().should('have.value', 'OBSERVACAO');
    cy.get('select').eq(1).should('have.value', 'PR');
    cy.get('select').eq(2).should('have.value', 'DISSEMINADO');
    cy.get('select').eq(3).should('have.value', 'FREQUENTE');

    cy.get('button').contains('Anterior').click();
    cy.contains('O que você deseja denunciar?').should('be.visible');
    cy.get('input[value="ESQUEMA_DE_MANIPULACAO"]').should('be.checked');
  });*/
});
