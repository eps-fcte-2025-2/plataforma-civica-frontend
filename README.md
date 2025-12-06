# Plataforma Cívica Frontend

Frontend da Plataforma Cívica desenvolvido com Next.js 15, React 19 e Tailwind CSS.

## Tecnologias

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Docker** - Containerização

## Instalação e Execução

### Desenvolvimento Local

```bash
# Instalar dependências
npm install
# ou
yarn install

# Configurar variáveis de ambiente (copiar .env.example para .env)
cp .env.example .env

# Executar servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

**Nota:** A aplicação funciona sem o arquivo `.env` usando valores padrão, mas é recomendado criar o arquivo `.env` a partir do `.env.example` para configurações personalizadas.

Acesse [http://localhost:3000](http://localhost:3000) para visualizar a aplicação.

### Docker

O mesmo Dockerfile funciona para desenvolvimento e produção, apenas muda como você executa.

#### Desenvolvimento (com hot reload)
```bash
# Executar com hot reload usando docker-compose.dev.yml
docker compose -f docker-compose.dev.yml up --build

# Executar em background
docker compose -f docker-compose.dev.yml up -d

# Parar containers
docker compose -f docker-compose.dev.yml down

# Ver logs
docker compose -f docker-compose.dev.yml logs -f
```

**Características do desenvolvimento:**
- ✅ **Hot reload** - Mudanças no código refletem instantaneamente
- ✅ **Volumes mapeados** - Código local sincronizado com container
- ✅ **Logs detalhados** - Mostra erros e warnings
- ✅ **Desenvolvimento rápido** - Não precisa rebuildar a cada mudança
- ✅ **Polling habilitado** - Detecta mudanças em sistemas de arquivos que não suportam inotify

#### Produção
```bash
# Build da imagem
docker build -t plataforma-civica-frontend .

# Executar container de produção
docker run -p 3000:3000 -e NODE_ENV=production plataforma-civica-frontend
```

**Características da produção:**
- ✅ **Otimizado** - Código compilado e minificado
- ✅ **Sem hot reload** - Aplicação estática
- ✅ **Logs mínimos** - Apenas erros críticos
- ✅ **Performance máxima** - Sem overhead de desenvolvimento

#### Diferenças Práticas

| Aspecto | Desenvolvimento | Produção |
|---------|----------------|----------|
| **Hot Reload** | ✅ Sim | ❌ Não |
| **Volumes** | ✅ Mapeados | ❌ Não |
| **Logs** | 🔍 Detalhados | ⚡ Mínimos |
| **Performance** | 🐌 Mais lento | 🚀 Otimizada |
| **Uso** | 👨‍💻 Para codificar | 🌐 Para usuários |

## 🛠️ Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código
- `npm run format` - Formatação de código

## Docker

A aplicação está configurada com Docker multi-stage para otimização:

- **Dockerfile** - Build otimizado com 3 stages
- **docker-compose.yml** - Orquestração de containers
- **.dockerignore** - Exclusão de arquivos desnecessários