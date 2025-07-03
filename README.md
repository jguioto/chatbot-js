# Chatbot Neppo

Um chatbot interativo desenvolvido em JavaScript com máquina de estados simples, integração com API pública de CEP e sistema de cadastro de clientes.

## 📋 Descrição do Projeto

O Chatbot Neppo é uma aplicação web que simula um atendimento automatizado para uma empresa fictícia. O bot é capaz de:

- Identificar clientes existentes através do e-mail
- Realizar cadastro de novos clientes com validação de dados
- Consultar e validar CEPs através da API ViaCEP
- Oferecer menu de opções para clientes cadastrados
- Manter conversas fluidas através de uma máquina de estados

## 🚀 Funcionalidades

### Para Clientes Existentes
- Login através do e-mail cadastrado
- Acesso ao menu de cliente com opções:
  - 2ª via do boleto
  - Problemas no acesso
  - Falar com atendente
  - Encerrar conversa

### Para Novos Clientes
- Cadastro completo com validação de:
  - Nome (obrigatório)
  - E-mail (formato válido)
  - Telefone (10-11 dígitos)
  - CEP (8 dígitos, validado via API)
- Confirmação de endereço através da API ViaCEP
- Redirecionamento automático para o menu de cliente após cadastro

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da interface
- **CSS3**: Estilização e responsividade
- **JavaScript (ES6+)**: Lógica do chatbot e máquina de estados
- **API ViaCEP**: Validação e consulta de endereços
- **Fetch API**: Requisições HTTP assíncronas

## 📁 Estrutura do Projeto

```
chatbot-neppo/
├── src/
│   ├── html/
│   │   └── index.html          # Interface principal
│   ├── css/
│   │   └── style.css           # Estilos da aplicação
│   └── js/
│       └── main.js             # Lógica do chatbot
├── README.md                   # Documentação
└── todo.md                     # Lista de tarefas do projeto
```

## 🎯 Arquitetura - Máquina de Estados

O chatbot utiliza uma máquina de estados simples com os seguintes estados:

1. **INITIAL**: Saudação e opções iniciais
2. **ASK_EMAIL**: Solicitação de e-mail para clientes existentes
3. **CLIENT_MENU**: Menu de opções para clientes
4. **ASK_NAME**: Solicitação de nome para cadastro
5. **ASK_NEW_EMAIL**: Solicitação de e-mail para cadastro
6. **ASK_PHONE**: Solicitação de telefone
7. **ASK_CEP**: Solicitação de CEP
8. **VALIDATE_CEP**: Validação via API ViaCEP
9. **CONFIRM_ADDRESS**: Confirmação do endereço
10. **REGISTER_USER**: Registro do novo cliente
11. **END_CONVERSATION**: Finalização da conversa

## 🔧 Como Executar

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexão com a internet (para API de CEP)

### Instalação e Execução
1. Clone ou baixe o projeto
2. Navegue até a pasta do projeto
3. Abra o arquivo `src/html/index.html` em seu navegador
4. Comece a interagir com o chatbot!

### Exemplo de Uso
1. Acesse a aplicação
2. Escolha "Ainda não sou cliente" para testar o cadastro
3. Preencha os dados solicitados:
   - Nome: João Silva
   - E-mail: joao.silva@email.com
   - Telefone: 11987654321
   - CEP: 01310100
4. Confirme o endereço retornado pela API
5. Acesse o menu de cliente e teste as opções

## 🧪 Validações Implementadas

### E-mail
- Formato válido usando regex
- Verificação de existência na lista de clientes

### Telefone
- 10 ou 11 dígitos numéricos
- Formato: DDD + número

### CEP
- 8 dígitos numéricos
- Validação via API ViaCEP
- Tratamento de erros para CEPs inexistentes

### Nome
- Campo obrigatório
- Não pode estar vazio

## 🌐 API Utilizada

**ViaCEP** - Webservice gratuito de consulta de CEP
- URL: `https://viacep.com.br/ws/{cep}/json/`
- Retorna: logradouro, bairro, cidade, UF
- Tratamento de erros para CEPs inválidos

## 📱 Responsividade

A interface foi desenvolvida para funcionar em:
- Desktop (telas grandes)
- Tablets (telas médias)
- Smartphones (telas pequenas)

## 🎨 Design

- Interface limpa e intuitiva
- Cores: Verde (#4CAF50) para header e botões principais
- Mensagens diferenciadas por cor (bot vs usuário)
- Botões com hover effects
- Layout centralizado e responsivo

## 🔍 Tratamento de Erros

- Validação de entrada em tempo real
- Mensagens de erro claras e específicas
- Fallback para falhas na API
- Prevenção de estados inválidos

## 🚀 Possíveis Melhorias

- Persistência de dados em localStorage/banco de dados
- Integração com mais APIs (telefone, e-mail)
- Sistema de logs e monitoramento
- Testes automatizados
- Internacionalização (i18n)
- Acessibilidade (ARIA labels)

## 👨‍💻 Desenvolvedor

Projeto desenvolvido como parte de um desafio técnico para vaga de desenvolvedor de chatbot.

## 📄 Licença

Este projeto é de uso livre para fins educacionais e de demonstração.



## 🆕 Novas Funcionalidades (v1.1)

### Entrada de Texto para Opções
O chatbot agora aceita tanto cliques nos botões quanto entrada de texto para todas as opções disponíveis:

#### Estado Inicial
- **Botões**: "Já sou cliente" / "Ainda não sou cliente"
- **Texto aceito**: 
  - "já sou cliente", "sou cliente", "1"
  - "ainda não sou cliente", "não sou cliente", "cadastro", "2"

#### Menu de Cliente
- **Botões**: "2a via do boleto", "Problemas no acesso", "Falar com atendente", "Encerrar conversa"
- **Texto aceito**:
  - "2a via", "segunda via", "boleto", "1"
  - "problemas", "problema", "acesso", "2"
  - "falar", "atendente", "humano", "3"
  - "encerrar", "sair", "tchau", "bye", "4"

#### Confirmação de Endereço
- **Botões**: "Sim" / "Não"
- **Texto aceito**:
  - "sim", "correto", "certo", "s", "1"
  - "não", "nao", "errado", "incorreto", "n", "2"

### Normalização de Texto
- Remove acentos automaticamente
- Ignora maiúsculas/minúsculas
- Remove pontuação
- Aceita números como atalhos (1, 2, 3, 4)

### Tratamento de Erros
- Mensagens claras quando o texto não é reconhecido
- Sugestões de opções válidas
- Fallback para uso dos botões


## 🆕 Versão 2.0 - Persistência e Personalização

### 💾 **Persistência de Dados**
- **localStorage**: Dados salvos permanentemente no navegador
- **Clientes pré-cadastrados**: 4 clientes de exemplo já incluídos
- **Backup automático**: Salva a cada novo cadastro
- **Recuperação**: Dados mantidos após fechar/reabrir navegador

### 👋 **Saudação Personalizada**
- **Login**: "Olá, [Nome]! Bem-vindo(a) de volta!"
- **Despedida**: "Obrigado por usar o Chatbot Neppo, [Nome]! Até mais."
- **Reconhecimento**: Extrai primeiro nome automaticamente

### 📋 **Clientes Pré-Cadastrados**
Para facilitar testes, o sistema inclui:
- **João Silva** (joao.silva@email.com)
- **Maria Santos** (maria.santos@email.com)  
- **Pedro Oliveira** (pedro.oliveira@email.com)
- **Ana Costa** (ana.costa@email.com)

### 🔄 **Funcionalidades Aprimoradas**
- **Detecção de e-mail duplicado**: Redireciona para menu se já cadastrado
- **Validação robusta**: Verifica e-mails existentes antes de cadastrar
- **Estado do cliente**: Mantém referência do cliente logado
- **Limpeza de sessão**: Remove referência ao finalizar conversa

### 🛡️ **Tratamento de Erros**
- **localStorage indisponível**: Fallback para array em memória
- **Dados corrompidos**: Recuperação automática com clientes padrão
- **Console logging**: Informações de debug para desenvolvedores

