#!/bin/bash

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker compose down

# Limpar cache do Docker se necessário
if [ "$1" = "--clean" ]; then
    echo "🧹 Limpando cache do Docker..."
    docker system prune -f
    docker volume prune -f
fi

# Construir e iniciar em modo de produção
echo "🚀 Iniciando aplicação em modo de produção com Docker..."
docker compose up --build --force-recreate

echo "✅ Aplicação disponível em http://localhost:3000"