# Documentação Técnica - Chatbot Neppo

## 🏗️ Arquitetura do Sistema

### Visão Geral
O Chatbot Neppo é uma aplicação web single-page desenvolvida com arquitetura baseada em máquina de estados finitos. A aplicação utiliza JavaScript vanilla para máxima compatibilidade e performance.

### Componentes Principais

#### 1. Interface de Usuário (UI)
- **Arquivo**: `src/html/index.html`
- **Responsabilidade**: Estrutura HTML da aplicação
- **Elementos principais**:
  - Container do chat
  - Área de mensagens
  - Campo de input
  - Área de botões/opções

#### 2. Estilização (CSS)
- **Arquivo**: `src/css/style.css`
- **Responsabilidade**: Aparência e responsividade
- **Características**:
  - Design responsivo (mobile-first)
  - Tema verde corporativo
  - Animações suaves
  - Compatibilidade cross-browser

#### 3. Lógica de Negócio (JavaScript)
- **Arquivo**: `src/js/main.js`
- **Responsabilidade**: Controle da aplicação
- **Módulos**:
  - Máquina de estados
  - Validações
  - Integração com API
  - Gerenciamento de dados

## 🔄 Máquina de Estados

### Diagrama de Estados
```
[INITIAL] → [ASK_EMAIL] → [CLIENT_MENU] → [END_CONVERSATION]
    ↓
[ASK_NAME] → [ASK_NEW_EMAIL] → [ASK_PHONE] → [ASK_CEP] → [VALIDATE_CEP] → [CONFIRM_ADDRESS] → [REGISTER_USER] → [CLIENT_MENU]
```

### Definição dos Estados

#### INITIAL
- **Propósito**: Estado inicial do chatbot
- **Ações**: Exibe saudação e opções principais
- **Transições**:
  - "Já sou cliente" → ASK_EMAIL
  - "Ainda não sou cliente" → ASK_NAME

#### ASK_EMAIL
- **Propósito**: Coleta e-mail de cliente existente
- **Validações**: Formato de e-mail válido
- **Transições**:
  - E-mail válido e encontrado → CLIENT_MENU
  - E-mail inválido ou não encontrado → INITIAL

#### ASK_NAME
- **Propósito**: Coleta nome para cadastro
- **Validações**: Campo não vazio
- **Transições**: Nome válido → ASK_NEW_EMAIL

#### ASK_NEW_EMAIL
- **Propósito**: Coleta e-mail para cadastro
- **Validações**: Formato de e-mail válido
- **Transições**: E-mail válido → ASK_PHONE

#### ASK_PHONE
- **Propósito**: Coleta telefone para cadastro
- **Validações**: 10-11 dígitos numéricos
- **Transições**: Telefone válido → ASK_CEP

#### ASK_CEP
- **Propósito**: Coleta CEP para validação
- **Validações**: 8 dígitos numéricos
- **Transições**: CEP válido → VALIDATE_CEP

#### VALIDATE_CEP
- **Propósito**: Valida CEP via API ViaCEP
- **Ações**: Requisição HTTP para API externa
- **Transições**:
  - CEP encontrado → CONFIRM_ADDRESS
  - CEP não encontrado → ASK_CEP

#### CONFIRM_ADDRESS
- **Propósito**: Confirma endereço com usuário
- **Ações**: Exibe endereço completo
- **Transições**:
  - "Sim" → REGISTER_USER
  - "Não" → ASK_CEP

#### REGISTER_USER
- **Propósito**: Registra novo cliente
- **Ações**: Adiciona cliente ao array
- **Transições**: Automática → CLIENT_MENU

#### CLIENT_MENU
- **Propósito**: Menu de opções para clientes
- **Opções**: 2ª via, Problemas, Atendente, Encerrar
- **Transições**: Todas → END_CONVERSATION

#### END_CONVERSATION
- **Propósito**: Finaliza conversa
- **Ações**: Exibe mensagem de despedida

## 🔧 Implementação Técnica

### Estrutura de Dados

#### Cliente
```javascript
{
    name: String,      // Nome completo
    email: String,     // E-mail válido
    phone: String,     // Telefone com DDD
    address: String    // Endereço completo da API
}
```

#### Estado da Máquina
```javascript
{
    message: String,           // Mensagem do bot
    options: Array<String>,    // Opções de botões (opcional)
    handleInput: Function,     // Handler para input de texto (opcional)
    handleOption: Function     // Handler para clique em botão (opcional)
}
```

### Validações Implementadas

#### Validação de E-mail
```javascript
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
```

#### Validação de Telefone
```javascript
function isValidPhone(phone) {
    const re = /^\d{10,11}$/;
    return re.test(phone);
}
```

#### Validação de CEP
```javascript
function isValidCep(cep) {
    const re = /^\d{8}$/;
    return re.test(cep);
}
```

### Integração com API

#### ViaCEP API
- **URL**: `https://viacep.com.br/ws/{cep}/json/`
- **Método**: GET
- **Resposta**:
```json
{
    "cep": "01310-100",
    "logradouro": "Avenida Paulista",
    "complemento": "",
    "bairro": "Bela Vista",
    "localidade": "São Paulo",
    "uf": "SP",
    "ibge": "3550308",
    "gia": "1004",
    "ddd": "11",
    "siafi": "7107"
}
```

#### Implementação
```javascript
async function validateCep(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            // CEP não encontrado
            displayMessage('CEP não encontrado. Por favor, tente novamente.', 'bot');
        } else {
            // CEP válido, processa endereço
            const address = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
            // ... resto da lógica
        }
    } catch (error) {
        // Erro de rede ou API
        displayMessage('Ocorreu um erro ao validar o CEP. Por favor, tente novamente.', 'bot');
    }
}
```

## 🎨 Interface e UX

### Design System

#### Cores
- **Primária**: #4CAF50 (Verde)
- **Secundária**: #008CBA (Azul)
- **Fundo**: #f0f2f5 (Cinza claro)
- **Mensagem Bot**: #dcf8c6 (Verde claro)
- **Mensagem Usuário**: #e0e0e0 (Cinza)

#### Tipografia
- **Fonte**: Arial, sans-serif
- **Tamanhos**: 1em (padrão), 1.2em (header)

#### Espaçamento
- **Padding**: 8px-15px
- **Margin**: 5px-15px
- **Border-radius**: 5px-20px

### Responsividade

#### Breakpoints
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

#### Adaptações
- Container fixo de 400px em desktop
- Container fluido em mobile
- Botões empilhados em telas pequenas
- Texto redimensionado automaticamente

## 🔒 Segurança e Performance

### Segurança
- **XSS Prevention**: Uso de `textContent` em vez de `innerHTML`
- **Input Sanitization**: Validação rigorosa de entradas
- **API Security**: Apenas requisições GET para API pública
- **Data Privacy**: Dados armazenados apenas em memória

### Performance
- **Vanilla JavaScript**: Sem dependências externas
- **Lazy Loading**: Carregamento sob demanda
- **Minimal DOM**: Manipulação eficiente do DOM
- **Async Operations**: Requisições não bloqueantes

### Otimizações
- **CSS Minificado**: Estilos otimizados
- **Event Delegation**: Gerenciamento eficiente de eventos
- **Memory Management**: Limpeza automática de dados

## 🧪 Testes e Qualidade

### Cenários de Teste

#### Teste Funcional
1. **Fluxo Completo**: Cadastro → Confirmação → Menu
2. **Validações**: Todos os campos com dados inválidos
3. **API**: CEPs válidos e inválidos
4. **Estados**: Transições corretas entre estados

#### Teste de Interface
1. **Responsividade**: Diferentes resoluções
2. **Navegadores**: Chrome, Firefox, Safari, Edge
3. **Dispositivos**: Desktop, tablet, mobile
4. **Acessibilidade**: Navegação por teclado

#### Teste de Erro
1. **Rede**: Sem conexão com internet
2. **API**: Indisponibilidade da ViaCEP
3. **JavaScript**: Erros de execução
4. **Dados**: Entradas malformadas

### Métricas de Qualidade

#### Performance
- **Tempo de carregamento**: < 2 segundos
- **Tempo de resposta**: < 500ms
- **Tamanho total**: < 50KB

#### Compatibilidade
- **Navegadores**: 95%+ dos usuários
- **Dispositivos**: Mobile + Desktop
- **Acessibilidade**: WCAG 2.1 AA

## 🔧 Manutenção e Evolução

### Estrutura Modular
O código foi desenvolvido com separação clara de responsabilidades:
- **HTML**: Estrutura semântica
- **CSS**: Estilos isolados
- **JavaScript**: Lógica modularizada

### Pontos de Extensão

#### Novos Estados
Para adicionar novos estados à máquina:
1. Definir novo estado no objeto `stateMachine`
2. Implementar handlers necessários
3. Atualizar transições existentes

#### Novas Validações
Para adicionar validações:
1. Criar função de validação
2. Integrar no handler do estado
3. Adicionar mensagens de erro

#### Novas APIs
Para integrar novas APIs:
1. Criar função assíncrona
2. Implementar tratamento de erro
3. Atualizar fluxo de estados

### Monitoramento

#### Logs Recomendados
- Transições de estado
- Erros de validação
- Falhas de API
- Interações do usuário

#### Métricas Sugeridas
- Taxa de conclusão de cadastro
- Tempo médio de interação
- Erros mais frequentes
- Dispositivos mais utilizados

## 📚 Referências Técnicas

### APIs Utilizadas
- **ViaCEP**: https://viacep.com.br/
- **Fetch API**: MDN Web Docs
- **DOM API**: W3C Specification

### Padrões Seguidos
- **ES6+**: JavaScript moderno
- **Semantic HTML**: HTML5 semântico
- **CSS3**: Flexbox e Grid
- **Progressive Enhancement**: Funcionalidade básica primeiro

### Bibliotecas Consideradas
- **React**: Descartado por simplicidade
- **jQuery**: Descartado por performance
- **Bootstrap**: Descartado por customização
- **Axios**: Descartado por Fetch nativo

---

**Versão**: 1.0.0  
**Última atualização**: Dezembro 2024  
**Autor**: Chatbot Neppo Development Team

