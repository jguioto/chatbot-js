# Instruções de Execução - Chatbot Neppo

## 🎯 Objetivo
Este documento fornece instruções detalhadas para executar o Chatbot Neppo em qualquer ambiente.

## 📋 Pré-requisitos

### Requisitos Mínimos
- **Navegador Web**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Conexão com Internet**: Necessária para API de CEP
- **JavaScript**: Habilitado no navegador

### Requisitos Recomendados
- **Navegador Atualizado**: Versão mais recente para melhor compatibilidade
- **Resolução**: Mínima de 320px (mobile) até 1920px (desktop)

## 🚀 Métodos de Execução

### Método 1: Execução Local Simples
1. **Download do Projeto**
   - Baixe o arquivo ZIP do repositório
   - Extraia para uma pasta de sua escolha
   - OU clone via Git: `git clone [URL_DO_REPOSITORIO]`

2. **Navegação**
   - Abra o explorador de arquivos
   - Navegue até a pasta `chatbot-neppo/src/html/`
   - Localize o arquivo `index.html`

3. **Execução**
   - Clique duplo no arquivo `index.html`
   - OU clique com botão direito → "Abrir com" → Seu navegador preferido
   - O chatbot será carregado automaticamente

### Método 2: Servidor Local (Recomendado)
Para evitar problemas de CORS e ter melhor experiência:

#### Usando Python (se disponível)
```bash
# Python 3
cd chatbot-neppo/src/html
python -m http.server 8000

# Python 2
cd chatbot-neppo/src/html
python -m SimpleHTTPServer 8000
```
Acesse: `http://localhost:8000`

#### Usando Node.js (se disponível)
```bash
# Instalar servidor simples
npm install -g http-server

# Executar
cd chatbot-neppo/src/html
http-server -p 8000
```
Acesse: `http://localhost:8000`

#### Usando PHP (se disponível)
```bash
cd chatbot-neppo/src/html
php -S localhost:8000
```
Acesse: `http://localhost:8000`

### Método 3: Hospedagem Online
1. Faça upload dos arquivos para qualquer serviço de hospedagem
2. Acesse via URL fornecida pelo serviço

## 🧪 Testando o Chatbot

### Teste 1: Fluxo "Já sou cliente"
1. Clique em "Já sou cliente"
2. Digite um e-mail qualquer (ex: `teste@email.com`)
3. **Resultado esperado**: Mensagem de e-mail não encontrado

### Teste 2: Fluxo "Ainda não sou cliente" (Cadastro Completo)
1. Clique em "Ainda não sou cliente"
2. **Nome**: Digite qualquer nome (ex: "João Silva")
3. **E-mail**: Digite um e-mail válido (ex: "joao@email.com")
4. **Telefone**: Digite 10-11 dígitos (ex: "11987654321")
5. **CEP**: Digite um CEP válido (ex: "01310100" - Av. Paulista, SP)
6. **Confirmação**: Clique "Sim" para confirmar o endereço
7. **Resultado esperado**: Acesso ao menu de cliente

### Teste 3: Menu de Cliente
1. Complete o cadastro (Teste 2)
2. Teste cada opção do menu:
   - "2ª via do boleto"
   - "Problemas no acesso"
   - "Falar com atendente"
   - "Encerrar conversa"
3. **Resultado esperado**: Mensagem "Essa opção é demonstrativa. Valeu!"

### Teste 4: Validações de Erro
1. **E-mail inválido**: Digite "email-inválido" → Deve mostrar erro
2. **Telefone inválido**: Digite "123" → Deve mostrar erro
3. **CEP inválido**: Digite "00000000" → Deve mostrar erro da API
4. **Nome vazio**: Deixe em branco → Deve mostrar erro

## 🔧 Solução de Problemas

### Problema: Chatbot não carrega
**Possíveis causas:**
- JavaScript desabilitado
- Arquivo corrompido
- Navegador muito antigo

**Soluções:**
1. Verifique se JavaScript está habilitado
2. Tente outro navegador
3. Baixe novamente o projeto

### Problema: API de CEP não funciona
**Possíveis causas:**
- Sem conexão com internet
- Bloqueio de CORS
- API temporariamente indisponível

**Soluções:**
1. Verifique sua conexão
2. Use servidor local (Método 2)
3. Tente novamente mais tarde

### Problema: Interface quebrada
**Possíveis causas:**
- Arquivos CSS não carregados
- Resolução muito baixa
- Zoom do navegador

**Soluções:**
1. Verifique se todos os arquivos estão presentes
2. Ajuste o zoom para 100%
3. Teste em resolução maior

### Problema: Botões não funcionam
**Possíveis causas:**
- JavaScript com erro
- Arquivo JS corrompido
- Conflito com extensões

**Soluções:**
1. Abra o Console do navegador (F12)
2. Verifique se há erros JavaScript
3. Desabilite extensões temporariamente

## 📱 Compatibilidade

### Navegadores Testados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dispositivos Testados
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Tablet (iPad, Android)
- ✅ Smartphone (iOS, Android)

### Funcionalidades por Dispositivo
| Funcionalidade | Desktop | Tablet | Mobile |
|----------------|---------|--------|--------|
| Interface | ✅ | ✅ | ✅ |
| Botões | ✅ | ✅ | ✅ |
| Input de texto | ✅ | ✅ | ✅ |
| API CEP | ✅ | ✅ | ✅ |
| Responsividade | ✅ | ✅ | ✅ |

## 🎨 Personalização

### Alterando Cores
Edite o arquivo `src/css/style.css`:
```css
/* Cor principal (verde) */
.chat-header { background-color: #4CAF50; }

/* Cor dos botões */
.chat-options button { background-color: #008CBA; }
```

### Alterando Mensagens
Edite o arquivo `src/js/main.js`:
```javascript
// Mensagem inicial
INITIAL: {
    message: 'Sua nova mensagem aqui!',
    // ...
}
```

### Adicionando Nova API
Para trocar a API de CEP, modifique a função `validateCep()` em `main.js`.

## 📊 Monitoramento

### Console do Navegador
1. Pressione F12
2. Vá para aba "Console"
3. Monitore erros e logs

### Dados de Teste
O chatbot armazena clientes em memória. Para dados persistentes, implemente localStorage ou banco de dados.

## 🔒 Segurança

### Dados Sensíveis
- E-mails são armazenados apenas em memória
- Nenhum dado é enviado para servidores externos (exceto API CEP)
- Limpe o cache do navegador para remover dados

### HTTPS
Para produção, sempre use HTTPS para proteger dados em trânsito.

## 📞 Suporte

Em caso de problemas:
1. Verifique este documento
2. Consulte o README.md
3. Verifique o console do navegador
4. Teste em navegador diferente

---

**Última atualização**: Dezembro 2024  
**Versão**: 1.0.0



## 🆕 Novos Testes (v1.1)

### Teste 5: Entrada de Texto para Opções Iniciais
1. Digite "cadastro" ou "ainda não sou cliente"
2. **Resultado esperado**: Inicia fluxo de cadastro
3. Digite "já sou cliente" ou "1"
4. **Resultado esperado**: Solicita e-mail

### Teste 6: Entrada de Texto no Menu de Cliente
1. Complete um cadastro
2. No menu de cliente, digite:
   - "boleto" → Deve reconhecer como "2a via do boleto"
   - "problemas" → Deve reconhecer como "Problemas no acesso"
   - "atendente" → Deve reconhecer como "Falar com atendente"
   - "sair" → Deve reconhecer como "Encerrar conversa"

### Teste 7: Confirmação de Endereço por Texto
1. Complete cadastro até o CEP
2. Digite "sim" ou "s" → Deve confirmar endereço
3. OU digite "não" ou "n" → Deve solicitar CEP novamente

### Teste 8: Atalhos Numéricos
1. Digite "1" no estado inicial → "Já sou cliente"
2. Digite "2" no estado inicial → "Ainda não sou cliente"
3. No menu de cliente:
   - "1" → 2a via do boleto
   - "2" → Problemas no acesso
   - "3" → Falar com atendente
   - "4" → Encerrar conversa

### Teste 9: Texto Não Reconhecido
1. Digite texto aleatório em qualquer estado com opções
2. **Resultado esperado**: Mensagem de erro com sugestões


## 🆕 Novos Testes v2.0 - Persistência e Personalização

### Teste 10: Clientes Pré-Cadastrados
1. Clique em "Já sou cliente"
2. Digite: `joao.silva@email.com`
3. **Resultado esperado**: "Olá, João! Bem-vindo(a) de volta!"
4. Teste outros e-mails:
   - `maria.santos@email.com` → "Olá, Maria!"
   - `pedro.oliveira@email.com` → "Olá, Pedro!"
   - `ana.costa@email.com` → "Olá, Ana!"

### Teste 11: Persistência de Dados
1. Cadastre um novo cliente completo
2. **Feche o navegador** completamente
3. **Reabra** e acesse o chatbot
4. Tente fazer login com o e-mail cadastrado
5. **Resultado esperado**: Login bem-sucedido com saudação personalizada

### Teste 12: Saudação Personalizada
1. Faça login com qualquer cliente
2. **Observe**: Mensagem personalizada no menu
3. Escolha "Encerrar conversa"
4. **Resultado esperado**: "Obrigado por usar o Chatbot Neppo, [Nome]! Até mais."

### Teste 13: E-mail Duplicado
1. Inicie cadastro de novo cliente
2. Digite nome: "Teste Duplicado"
3. Digite e-mail já existente: `joao.silva@email.com`
4. **Resultado esperado**: "Este e-mail já está cadastrado. Redirecionando..."
5. **Deve**: Ir direto para menu de cliente do João

### Teste 14: Persistência Após Recarregar
1. Cadastre um cliente novo
2. **Recarregue a página** (F5)
3. Tente login com o e-mail do cliente recém-cadastrado
4. **Resultado esperado**: Login bem-sucedido

### Teste 15: Console de Debug
1. Abra o **Console do Navegador** (F12)
2. Recarregue a página
3. **Resultado esperado**: Lista de clientes pré-cadastrados no console
4. Digite: `localStorage.getItem('neppo_clients')`
5. **Resultado esperado**: JSON com todos os clientes salvos

### Teste 16: Limpeza de Dados
1. No console, digite: `localStorage.removeItem('neppo_clients')`
2. Recarregue a página
3. **Resultado esperado**: Volta aos 4 clientes pré-cadastrados padrão

### Teste 17: Fluxo Completo com Persistência
1. **Cadastre** um novo cliente completo
2. **Finalize** a conversa
3. **Recarregue** a página
4. **Faça login** com o cliente cadastrado
5. **Use** uma opção do menu
6. **Finalize** novamente
7. **Resultado esperado**: Todas as interações com saudação personalizada

