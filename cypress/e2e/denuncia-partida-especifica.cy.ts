describe('Denúncia de Partida Específica', () => {
  beforeEach(() => {
    cy.visit('/denuncia');
  });

  it('deve criar uma denúncia de partida específica com sucesso', () => {
    // Etapa 1: Tipo de denúncia
    cy.contains('O que você deseja denunciar?').should('be.visible');
    cy.contains('label', 'PARTIDA ESPECÍFICA').click();
    cy.get('button').contains('Próximo').click();

    // Etapa 2: Informações básicas
    cy.contains('Informações básicas').should('be.visible');
    
    // Como soube
    cy.get('select').first().select('INTERNET');
    
      
    cy.get('button').contains('Próximo').click();

    // Etapa 3: Detalhes da partida
    cy.contains('Detalhes da partida').should('be.visible');
    
    // Informações da partida
    cy.get('input[placeholder="Nome do torneio"]').type('Campeonato Brasileiro 2024');
    cy.get('input[type="datetime-local"]').type('2024-12-15T16:00');
    cy.get('input[placeholder="Local da partida"]').type('Estádio Morumbi, São Paulo');
    cy.get('input[placeholder="Time A"]').type('São Paulo FC');
    cy.get('input[placeholder="Time B"]').type('Corinthians');
    cy.get('textarea[placeholder="Observações sobre a partida"]').type('Movimentações suspeitas de apostas detectadas antes da partida');
    
    cy.get('button').contains('Próximo').click();

    // Etapa 4: Pessoas e clubes envolvidos
    cy.contains('Envolvidos').should('be.visible');
    
    // Adicionar clube
    cy.get('button').contains('Adicionar Clube').click();
    cy.get('input[placeholder="Nome do clube"]').type('São Paulo FC');
    
    // Adicionar pessoa
    
    cy.get('button').contains('Adicionar Pessoa').click();
    
    
    cy.get('button').contains('Próximo').click();

    // Etapa 5: Descrição e evidências
    cy.contains('Detalhes finais').should('be.visible');
    
    // Descrição detalhada
    cy.get('textarea').should('have.attr', 'placeholder').and('include', 'Descreva detalhadamente');
    cy.get('textarea').type(
      'Durante a partida entre São Paulo e Corinthians, foram observados padrões anormais de apostas ' +
      'nas casas de apostas online. O jogador João Silva apresentou comportamento suspeito, ' +
      'recebendo cartão amarelo desnecessário aos 15 minutos do primeiro tempo, exatamente ' +
      'conforme previsto em apostas específicas. Há evidências de comunicação entre o jogador ' +
      'e a apostadora Maria Santos.'
    );
    
    // Interceptar a requisição e mockar resposta de sucesso
    cy.intercept('POST', '**/v1/reports/', {
      statusCode: 200,
      body: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        message: 'Denúncia criada com sucesso',
        createdAt: new Date().toISOString()
      }
    }).as('criarDenuncia');
    
    // Enviar denúncia
    cy.get('button').contains('Enviar Denúncia').click();
    
    // Verificar chamada da API
    cy.wait('@criarDenuncia');
    
  });

  it('deve validar campos obrigatórios', () => {
    // Selecionar tipo de denúncia
    cy.contains('label', 'PARTIDA ESPECÍFICA').click();
    cy.get('button').contains('Próximo').click();

    // Tentar avançar sem preencher campos obrigatórios
    cy.get('button').contains('Próximo').click();
    
    // Deve permanecer na mesma tela
    cy.contains('Informações básicas').should('be.visible');
    
    // Preencher apenas alguns campos e tentar avançar
    cy.get('select').first().select('INTERNET');
    cy.get('button').contains('Próximo').click();
    
    // Ainda deve estar na mesma tela por falta da UF
    cy.contains('Informações básicas').should('be.visible');
    
    // Preencher UF mas não selecionar focos
    
    cy.get('button').contains('Próximo').click();
    
    // Deve exigir pelo menos um foco de manipulação
    cy.contains('Informações básicas').should('be.visible');
  });

  it('deve permitir navegação entre etapas', () => {
    // Preencher primeira etapa
    cy.contains('label', 'PARTIDA ESPECÍFICA').click();
    cy.get('button').contains('Próximo').click();

    // Preencher segunda etapa
    cy.get('select').first().select('PRESENCIAL');
    
    
    cy.get('button').contains('Próximo').click();

    // Verificar que está na terceira etapa
    cy.contains('Detalhes da partida').should('be.visible');
    
    // Voltar para etapa anterior
    cy.get('button').contains('Anterior').click();
    cy.contains('Informações básicas').should('be.visible');
    
    // Verificar que dados foram mantidos
    cy.get('select').first().should('have.value', 'PRESENCIAL');
    cy.get('select').eq(1).should('have.value', 'MG');
    
    // Voltar para primeira etapa
    cy.get('button').contains('Anterior').click();
    cy.contains('O que você deseja denunciar?').should('be.visible');
    
    // Verificar que seleção foi mantida
    cy.get('input[value="PARTIDA_ESPECIFICA"]').should('be.checked');
  });

  it('deve limpar formulário ao clicar em Nova Denúncia após sucesso', () => {
    // Preencher formulário rapidamente
    cy.contains('label', 'PARTIDA ESPECÍFICA').click();
    cy.get('button').contains('Próximo').click();
    
    cy.get('select').first().select('INTERNET');
    
    
    cy.get('button').contains('Próximo').click();
    
    cy.get('input[placeholder="Nome do torneio"]').type('Test');
    cy.get('input[type="datetime-local"]').type('2024-12-15T16:00');
    cy.get('input[placeholder="Local da partida"]').type('Test');
    cy.get('button').contains('Próximo').click();
    
    
    cy.get('button').contains('Próximo').click();
    
    cy.get('textarea').type('Descrição de teste com mais de 10 caracteres');
    
    cy.intercept('POST', '**/v1/reports/', {
      statusCode: 200,
      body: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        message: 'Denúncia criada com sucesso',
        createdAt: new Date().toISOString()
      }
    }).as('criarDenuncia');
    
    cy.get('button').contains('Enviar Denúncia').click();
    cy.wait('@criarDenuncia');
    
    // Clicar em Nova Denúncia
    cy.get('button').contains('Nova Denúncia').click();
    
    // Verificar que voltou ao início
    cy.contains('O que você deseja denunciar?').should('be.visible');
    cy.get('input[type="radio"]').should('not.be.checked');
  });
});
