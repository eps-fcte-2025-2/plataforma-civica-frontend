#!/usr/bin/env node

/**
 * Script de Teste Manual para Sistema de Denúncias
 * 
 * Este script testa a integração entre frontend e backend
 * sem depender do Cypress, útil para validação rápida.
 */

const axios = require('axios');

const API_BASE = 'http://localhost:3333/v1';
const FRONTEND_URL = 'http://localhost:3002';

// Dados de teste para partida específica
const denunciaPartidaEspecifica = {
  tipoDenuncia: 'PARTIDA_ESPECIFICA',
  descricao: 'Teste manual - Denúncia de partida específica com manipulação de resultado detectada através de padrões anômalos de apostas.',
  comoSoube: 'INTERNET',
  pontualOuDisseminado: 'PONTUAL',
  frequencia: 'ISOLADO',
  uf: 'SP',
  pessoasEnvolvidas: [
    {
      nomePessoa: 'João Teste Manual',
      funcaoPessoa: 'Jogador'
    }
  ],
  clubesEnvolvidos: [
    {
      nomeClube: 'Clube Teste Manual'
    }
  ],
  focosManipulacao: ['ATLETAS_DIRIGENTES_COMISSAO'],
  evidencias: [],
  partidas: [
    {
      torneio: 'Teste Manual - Campeonato',
      dataPartida: new Date('2024-12-25T20:00:00Z').toISOString(),
      localPartida: 'Estádio Teste Manual',
      timeA: 'Time A',
      timeB: 'Time B',
      observacoes: 'Observações do teste manual',
      uf: 'SP'
    }
  ]
};

// Dados de teste para esquema de manipulação
const denunciaEsquemaManipulacao = {
  tipoDenuncia: 'ESQUEMA_DE_MANIPULACAO',
  descricao: 'Teste manual - Esquema complexo de manipulação envolvendo múltiplas partidas e diversos atores, incluindo jogadores, apostadores e intermediários.',
  comoSoube: 'TERCEIROS',
  pontualOuDisseminado: 'DISSEMINADO',
  frequencia: 'FREQUENTE',
  uf: 'RJ',
  pessoasEnvolvidas: [
    {
      nomePessoa: 'Carlos Organizador Teste',
      funcaoPessoa: 'Organizador do Esquema'
    },
    {
      nomePessoa: 'Maria Apostadora Teste',
      funcaoPessoa: 'Apostadora'
    }
  ],
  clubesEnvolvidos: [
    {
      nomeClube: 'Clube A Teste'
    },
    {
      nomeClube: 'Clube B Teste'
    }
  ],
  focosManipulacao: ['ATLETAS_DIRIGENTES_COMISSAO', 'APOSTADORES', 'JUIZES'],
  evidencias: [],
  partidas: [
    {
      torneio: 'Partida Suspeita 1',
      dataPartida: new Date('2024-12-20T19:00:00Z').toISOString(),
      localPartida: 'Local não especificado',
      timeA: 'Time A',
      timeB: 'Time B',
      observacoes: 'Partida suspeita identificada no esquema',
      uf: 'RJ'
    },
    {
      torneio: 'Partida Suspeita 2',
      dataPartida: new Date('2024-12-22T16:00:00Z').toISOString(),
      localPartida: 'Local não especificado',
      timeA: 'Time C',
      timeB: 'Time D',
      observacoes: 'Segunda partida suspeita do esquema',
      uf: 'RJ'
    }
  ]
};

async function testBackendConnection() {
  console.log('🔍 Testando conexão com o backend...');
  
  try {
    const response = await axios.get(`${API_BASE}/reports/`);
    console.log('✅ Backend conectado com sucesso');
    console.log(`📊 Denúncias existentes: ${response.data.reports.length}`);
    return true;
  } catch (error) {
    console.error('❌ Erro de conexão com backend:', error.message);
    console.log('💡 Certifique-se que o backend está rodando em http://localhost:3333');
    return false;
  }
}

async function testFrontendConnection() {
  console.log('🔍 Testando conexão com o frontend...');
  
  try {
    const response = await axios.get(FRONTEND_URL);
    console.log('✅ Frontend conectado com sucesso');
    return true;
  } catch (error) {
    console.error('❌ Erro de conexão com frontend:', error.message);
    console.log('💡 Certifique-se que o frontend está rodando em http://localhost:3002');
    return false;
  }
}

async function createTestReport(reportData, testName) {
  console.log(`\n📝 Criando ${testName}...`);
  
  try {
    const response = await axios.post(`${API_BASE}/reports/`, reportData);
    
    console.log('✅ Denúncia criada com sucesso!');
    console.log(`🆔 ID: ${response.data.id}`);
    console.log(`📅 Data: ${response.data.createdAt}`);
    console.log(`💬 Mensagem: ${response.data.message}`);
    
    return response.data.id;
  } catch (error) {
    console.error('❌ Erro ao criar denúncia:', error.response?.data || error.message);
    return null;
  }
}

async function validateReportCreation(reportId) {
  if (!reportId) return false;
  
  console.log(`\n🔍 Validando denúncia criada (ID: ${reportId})...`);
  
  try {
    const response = await axios.get(`${API_BASE}/reports/${reportId}`);
    console.log('✅ Denúncia encontrada no banco de dados');
    console.log(`📋 Tipo: ${response.data.tipoDenuncia}`);
    console.log(`🌍 UF: ${response.data.uf || response.data.municipio?.uf}`);
    console.log(`👥 Pessoas envolvidas: ${response.data.pessoasEnvolvidas?.length || 0}`);
    console.log(`🏟️ Clubes envolvidos: ${response.data.clubesEnvolvidos?.length || 0}`);
    console.log(`⚽ Partidas: ${response.data.partidas?.length || 0}`);
    return true;
  } catch (error) {
    console.error('❌ Erro ao validar denúncia:', error.response?.status === 404 ? 'Não encontrada' : error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 Iniciando testes manuais do Sistema de Denúncias\n');
  
  // Teste de conectividade
  const backendOk = await testBackendConnection();
  const frontendOk = await testFrontendConnection();
  
  if (!backendOk) {
    console.log('\n❌ Backend não está disponível. Interrompendo testes.');
    process.exit(1);
  }
  
  if (!frontendOk) {
    console.log('\n⚠️ Frontend não está disponível, mas continuando com testes de API.');
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🧪 EXECUTANDO TESTES DE CRIAÇÃO DE DENÚNCIAS');
  console.log('='.repeat(60));
  
  // Teste 1: Denúncia de Partida Específica
  const partidaId = await createTestReport(
    denunciaPartidaEspecifica, 
    'Denúncia de Partida Específica'
  );
  await validateReportCreation(partidaId);
  
  // Teste 2: Esquema de Manipulação
  const esquemaId = await createTestReport(
    denunciaEsquemaManipulacao,
    'Denúncia de Esquema de Manipulação'
  );
  await validateReportCreation(esquemaId);
  
  // Resumo final
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO DOS TESTES');
  console.log('='.repeat(60));
  
  const successCount = [partidaId, esquemaId].filter(Boolean).length;
  const totalTests = 2;
  
  console.log(`✅ Testes bem-sucedidos: ${successCount}/${totalTests}`);
  console.log(`❌ Testes falharam: ${totalTests - successCount}/${totalTests}`);
  
  if (successCount === totalTests) {
    console.log('\n🎉 Todos os testes passaram! Sistema funcionando corretamente.');
  } else {
    console.log('\n⚠️ Alguns testes falharam. Verifique os logs acima.');
  }
  
  console.log('\n💡 Para testar o frontend manualmente:');
  console.log(`   1. Acesse: ${FRONTEND_URL}/denuncia`);
  console.log('   2. Preencha o formulário completamente');
  console.log('   3. Verifique se a denúncia é criada com sucesso');
  console.log('   4. Anote o protocolo gerado');
  
  if (frontendOk) {
    console.log(`\n🌐 Frontend disponível em: ${FRONTEND_URL}/denuncia`);
  }
}

// Executar testes se script foi chamado diretamente
if (require.main === module) {
  runAllTests().catch(error => {
    console.error('💥 Erro fatal durante execução dos testes:', error.message);
    process.exit(1);
  });
}

module.exports = {
  testBackendConnection,
  testFrontendConnection,
  createTestReport,
  validateReportCreation,
  runAllTests
};
