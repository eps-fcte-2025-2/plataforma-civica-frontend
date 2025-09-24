#!/bin/bash

# Script para executar testes E2E localmente
# Este script inicia o servidor e executa os testes do Cypress

echo "🚀 Iniciando servidor de desenvolvimento..."

# Inicia o servidor em background
npm run dev &
SERVER_PID=$!

# Aguarda o servidor inicializar
echo "⏳ Aguardando servidor inicializar..."
sleep 10

# Verifica se o servidor está rodando
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Servidor rodando em http://localhost:3000"
    
    echo "🧪 Executando testes E2E..."
    npx cypress run --headless
    
    TEST_RESULT=$?
else
    echo "❌ Servidor não está respondendo"
    TEST_RESULT=1
fi

# Para o servidor
echo "🛑 Parando servidor..."
kill $SERVER_PID 2>/dev/null

if [ $TEST_RESULT -eq 0 ]; then
    echo "✅ Todos os testes passaram!"
else
    echo "❌ Alguns testes falharam"
fi

exit $TEST_RESULT