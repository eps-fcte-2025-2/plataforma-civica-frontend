# Formulário Multi-Step - Sistema de Denúncias

## 📋 Visão Geral

O formulário foi criado seguindo o design da prototipação fornecida, implementando um sistema de 2 etapas para registro de denúncias de manipulação de apostas esportivas.

## 🎯 Funcionalidades Implementadas

### ✅ **Etapa 1: Informações Básicas**
- **Tipo de Denúncia**: Partida Específica ou Esquema de Manipulação
- **Como Soube**: Opções pré-definidas (vítima, terceiros, internet, etc.)
- **Município**: Seleção obrigatória de município
- **Focos de Manipulação**: Checkboxes para diferentes tipos (atletas, apostadores, juízes)

### ✅ **Etapa 2: Detalhes da Denúncia**
- **Torneio**: Campo específico para denúncias de partida
- **Clubes/Times**: Adição dinâmica de múltiplos clubes
- **Pessoas Envolvidas**: Sistema completo com nome e função
- **Detalhes da Partida**: Local, data, times A e B
- **Descrição**: Textarea com instruções específicas
- **Upload de Arquivos**: Interface para envio de evidências

### ✅ **Navegação e UX**
- **Barra de Progresso**: Visual clara do andamento
- **Botões de Navegação**: Anterior/Seguinte/Enviar
- **Validação**: Campos obrigatórios marcados
- **Estados de Loading**: Feedback visual durante envio
- **Tela de Sucesso**: Confirmação com número de protocolo

## 🔧 Integração com Backend

### **Endpoints Utilizados**
- `GET /v1/reports/municipios` - Lista de municípios
- `POST /v1/reports/` - Criação da denúncia

### **Tipos TypeScript**
Todos os tipos seguem exatamente o schema do OpenAPI:
- `CreateReportDTO`
- `CreateReportResponse`
- `Municipio`
- `PessoaEnvolvida`
- `ClubeEnvolvido`
- `FocoManipulacao`
- `TipoDenuncia`

## 📱 Design Responsivo

O formulário é totalmente responsivo com:
- **Mobile First**: Otimizado para dispositivos móveis
- **Tailwind CSS**: Classes utilitárias para design consistente
- **Grid System**: Layout adaptável para diferentes telas
- **Touch Friendly**: Botões e campos otimizados para touch

## 🎨 Componentes Visuais

### **Barra de Progresso**
```jsx
<div className="w-full bg-gray-200 rounded-full h-2">
  <div 
    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
    style={{ width: `${(currentStep / 2) * 100}%` }}
  />
</div>
```

### **Campos Dinâmicos**
- **Adicionar/Remover Pessoas**: Sistema intuitivo com botões +/-
- **Adicionar/Remover Clubes**: Interface limpa para múltiplos clubes
- **Checkboxes**: Para seleção de focos de manipulação

### **Tela de Sucesso**
- **Ícone de Confirmação**: Check verde em círculo
- **Número de Protocolo**: Exibição clara do ID
- **Data de Criação**: Timestamp formatado
- **Botão Nova Denúncia**: Para reiniciar o processo

## 🔄 Fluxo de Dados

1. **Inicialização**: Carrega municípios automaticamente
2. **Preenchimento**: Usuário navega entre etapas
3. **Validação**: Campos obrigatórios verificados
4. **Envio**: Dados preparados e enviados ao backend
5. **Resposta**: Tela de sucesso com protocolo
6. **Reset**: Opção de nova denúncia

## 🛡️ Validação e Segurança

### **Validação Frontend**
- Campos obrigatórios marcados com *
- Validação de tipos de dados
- Verificação de arrays vazios
- Mensagens de erro claras

### **Validação Backend**
- Schema validation no serviço
- Tratamento de erros HTTP
- Logs detalhados para debug

## 📊 Estados Gerenciados

```typescript
const [currentStep, setCurrentStep] = useState(1);
const [response, setResponse] = useState<CreateReportResponse | null>(null);
const [formData, setFormData] = useState<FormData>({...});
```

## 🚀 Como Usar

1. **Importar o componente**:
```jsx
import Form from '@/components/Form';
```

2. **Usar na página**:
```jsx
export default function DenunciasPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Form />
    </div>
  );
}
```

## 🎯 Próximas Melhorias

- [ ] Upload real de arquivos
- [ ] Validação mais robusta
- [ ] Autosave do formulário
- [ ] Preview antes do envio
- [ ] Integração com autenticação
- [ ] Histórico de denúncias

## 📝 Observações Técnicas

- **Performance**: Lazy loading de municípios
- **Acessibilidade**: Labels e ARIA adequados
- **SEO**: Meta tags apropriadas
- **Error Handling**: Tratamento completo de erros
- **Type Safety**: TypeScript em 100% do código
