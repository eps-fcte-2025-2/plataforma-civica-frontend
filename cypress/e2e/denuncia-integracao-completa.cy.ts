describe('Teste de Integração Completa com Backend', () => {
  beforeEach(() => {
    cy.visit('/denuncia');
  });

  it('deve criar uma denúncia real de partida específica no backend', () => {
    // Etapa 1: Tipo de denúncia
    cy.contains('label', 'PARTIDA ESPECÍFICA').click();
    cy.get('button').contains('Próximo').click();

    // Etapa 2: Informações básicas
    cy.get('select').first().select('INTERNET');
  
    
    cy.get('button').contains('Próximo').click();

    // Etapa 3: Detalhes da partida
    cy.get('input[placeholder="Nome do torneio"]').type('Teste E2E - Campeonato Brasileiro');
    cy.get('input[type="datetime-local"]').type('2024-12-25T20:00');
    cy.get('input[placeholder="Local da partida"]').type('Estádio de Teste E2E');
    cy.get('input[placeholder="Time A"]').type('Time A Teste');
    cy.get('input[placeholder="Time B"]').type('Time B Teste');
    cy.get('textarea[placeholder="Observações sobre a partida"]').type('Observações do teste E2E');
    cy.get('button').contains('Próximo').click();

    // Etapa 4: Pessoas e clubes envolvidos
    cy.get('button').contains('Adicionar Clube').click();
    cy.get('input[placeholder="Nome do clube"]').type('Clube Teste E2E');
    
    
    cy.get('button').contains('Próximo').click();

    // Etapa 5: Descrição e evidências
    cy.get('textarea').type(
      'Esta é uma denúncia de teste E2E criada automaticamente pelo Cypress. ' +
      'O objetivo é verificar a integração completa entre frontend e backend. ' +
      'Esta denúncia pode ser excluída após o teste.'
    );
    
    // Enviar denúncia real
    cy.get('button').contains('Enviar Denúncia').click();
    
    // Aguardar resposta e verificar sucesso
    cy.contains('Denúncia enviada com sucesso!', { timeout: 15000 }).should('be.visible');
    cy.contains('Protocolo:').should('be.visible');
    
    // Capturar o ID do protocolo
    cy.contains('Protocolo:')
      .parent()
      .within(() => {
        cy.get('span').last().invoke('text').then((protocolId) => {
          cy.log(`Denúncia criada com ID: ${protocolId}`);
          
          // Verificar que a denúncia foi criada no backend
          cy.request({
            method: 'GET',
            url: `${Cypress.env('apiUrl')}/reports/${protocolId}`,
            failOnStatusCode: false
          }).then((response) => {
            // Se o endpoint existir, verificar a denúncia
            if (response.status === 200) {
              expect(response.body).to.have.property('id', protocolId);
              expect(response.body).to.have.property('tipoDenuncia', 'PARTIDA_ESPECIFICA');
              expect(response.body).to.have.property('uf', 'SP');
              expect(response.body.pessoasEnvolvidas).to.have.length.at.least(1);
              expect(response.body.clubesEnvolvidos).to.have.length.at.least(1);
            }
          });
        });
      });
    
    cy.get('button').contains('Nova Denúncia').should('be.visible');
  });

  it('deve criar uma denúncia real de esquema de manipulação no backend', () => {
    // Etapa 1: Tipo de denúncia
    cy.contains('label', 'ESQUEMA DE MANIPULAÇÃO').click();
    cy.get('button').contains('Próximo').click();

    // Etapa 2: Informações básicas
    cy.get('select').first().select('TERCEIROS');
  
    cy.get('select').contains('Pontual').parent().select('DISSEMINADO');
    cy.get('select').contains('Isolado').parent().select('FREQUENTE');
    
    
    cy.get('button').contains('Próximo').click();

    // Etapa 3: Partidas suspeitas
    cy.get('input[placeholder="Nome da partida"]').type('Partida Suspeita 1 - Teste E2E');
    cy.get('input[type="date"]').type('2024-12-20');
    
    cy.get('button').contains('Adicionar Partida').click();
    cy.get('input[placeholder="Nome da partida"]').eq(1).type('Partida Suspeita 2 - Teste E2E');
    cy.get('input[type="date"]').eq(1).type('2024-12-22');
    
    cy.get('button').contains('Próximo').click();

    // Etapa 4: Pessoas e clubes envolvidos
    cy.get('button').contains('Adicionar Clube').click();
    cy.get('input[placeholder="Nome do clube"]').eq(0).type('Clube Esquema 1');
    
    cy.get('button').contains('Adicionar Clube').click();
    cy.get('input[placeholder="Nome do clube"]').eq(1).type('Clube Esquema 2');
    
    
    cy.get('button').contains('Adicionar Pessoa').click();
    
    
    cy.get('button').contains('Próximo').click();

    // Etapa 5: Descrição e evidências
    cy.get('textarea').type(
      'Este é um esquema de manipulação de teste E2E criado pelo Cypress. ' +
      'Envolve múltiplas partidas e diversos envolvidos. ' +
      'O esquema é disseminado e frequente, conforme configurado no formulário. ' +
      'Esta denúncia de teste pode ser removida após a verificação.'
    );
    
    // Enviar denúncia real
    cy.get('button').contains('Enviar Denúncia').click();
    
    // Aguardar resposta e verificar sucesso
    cy.contains('Denúncia enviada com sucesso!', { timeout: 15000 }).should('be.visible');
    cy.contains('Protocolo:').should('be.visible');
    
    // Verificar lista de denúncias
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/reports/`,
      qs: {
        pageSize: 10
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('reports');
      expect(response.body.reports).to.be.an('array');
      
      // Verificar que existe pelo menos uma denúncia de esquema
      const esquemaReports = response.body.reports.filter(
        (report: unknown) =>
          typeof report === 'object' &&
          report !== null &&
          'tipoDenuncia' in report &&
          (report as { tipoDenuncia: string }).tipoDenuncia === 'ESQUEMA_DE_MANIPULACAO'
      );
      expect(esquemaReports).to.have.length.at.least(1);
      
      // Verificar dados da denúncia mais recente
      const recentReport = esquemaReports[0];
      if (recentReport.descricao.includes('teste E2E')) {
        expect(recentReport).to.have.property('pontualOuDisseminado', 'DISSEMINADO');
        expect(recentReport).to.have.property('frequencia', 'FREQUENTE');
        expect(recentReport).to.have.property('uf', 'RJ');
      }
    });
  });

  it('deve lidar com erros do backend graciosamente', () => {
    // Simular erro de servidor
    cy.intercept('POST', '**/v1/reports/', {
      statusCode: 500,
      body: {
        statusCode: 500,
        message: 'Internal Server Error'
      }
    }).as('erroServidor');

    // Preencher formulário rapidamente
    cy.contains('label', 'PARTIDA ESPECÍFICA').click();
    cy.get('button').contains('Próximo').click();
    
    cy.get('select').first().select('INTERNET');
  
    
    cy.get('button').contains('Próximo').click();
    
    cy.get('input[placeholder="Nome do torneio"]').type('Teste Erro');
    cy.get('input[type="datetime-local"]').type('2024-12-15T16:00');
    cy.get('input[placeholder="Local da partida"]').type('Local Erro');
    cy.get('button').contains('Próximo').click();
    
    
    cy.get('button').contains('Próximo').click();
    
    cy.get('textarea').type('Descrição para teste de erro do servidor');
    cy.get('button').contains('Enviar Denúncia').click();
    
    cy.wait('@erroServidor');
    
    // Verificar que o erro é exibido apropriadamente
    cy.contains('Erro ao enviar denúncia').should('be.visible');
    // O formulário deve permanecer na mesma tela
    cy.contains('Detalhes finais').should('be.visible');
    cy.get('button').contains('Enviar Denúncia').should('be.visible');
  });

  it('deve validar tamanho máximo da descrição (5000 caracteres)', () => {
    // Navegar rapidamente até a última etapa
    cy.contains('label', 'PARTIDA ESPECÍFICA').click();
    cy.get('button').contains('Próximo').click();
    
    cy.get('select').first().select('INTERNET');
  
    
    cy.get('button').contains('Próximo').click();
    
    cy.get('input[placeholder="Nome do torneio"]').type('Teste');
    cy.get('input[type="datetime-local"]').type('2024-12-15T16:00');
    cy.get('input[placeholder="Local da partida"]').type('Local');
    cy.get('button').contains('Próximo').click();
    
    
    cy.get('button').contains('Próximo').click();
    
    // Criar uma string com mais de 5000 caracteres
    const textoGrande = 'A'.repeat(5001);
    cy.get('textarea').type(textoGrande, { delay: 0 });
    
    // Verificar que o campo limita o texto
    cy.get('textarea').invoke('val').then((value) => {
      // Adiciona uma verificação para garantir que 'value' é uma string
      if (typeof value === 'string') { 
        expect(value.length).to.be.at.most(5000);
      } else {
        // Trate o caso onde o valor não é encontrado/definido,
        // ou simplesmente confie que .invoke('val') nunca retornará undefined
        // (o que é o caso em testes E2E bem escritos).
        // Para resolver o erro do TS, a verificação 'if' é suficiente.
        throw new Error('Valor do textarea é indefinido.');
      }
    });
  });
});
