# Clientes Pré-Cadastrados - Chatbot Neppo

## 📋 Lista de Clientes para Teste

O chatbot vem com 4 clientes pré-cadastrados para facilitar os testes e demonstrações:

### 👤 Cliente 1: João Silva
- **Nome**: João Silva
- **E-mail**: joao.silva@email.com
- **Telefone**: 11987654321
- **Endereço**: Rua das Flores, 123, Centro, São Paulo - SP

### 👤 Cliente 2: Maria Santos
- **Nome**: Maria Santos
- **E-mail**: maria.santos@email.com
- **Telefone**: 11999887766
- **Endereço**: Avenida Paulista, 1000, Bela Vista, São Paulo - SP

### 👤 Cliente 3: Pedro Oliveira
- **Nome**: Pedro Oliveira
- **E-mail**: pedro.oliveira@email.com
- **Telefone**: 11955443322
- **Endereço**: Rua Augusta, 500, Consolação, São Paulo - SP

### 👤 Cliente 4: Ana Costa
- **Nome**: Ana Costa
- **E-mail**: ana.costa@email.com
- **Telefone**: 11944332211
- **Endereço**: Rua Oscar Freire, 200, Jardins, São Paulo - SP

## 🧪 Como Testar

1. **Acesse o chatbot** e clique em "Já sou cliente"
2. **Digite qualquer um dos e-mails** listados acima
3. **Observe a saudação personalizada**: "Olá, [Nome]! Bem-vindo(a) de volta!"
4. **Teste as funcionalidades** do menu de cliente
5. **Finalize a conversa** e veja a despedida personalizada

## 🔄 Persistência de Dados

- **Armazenamento**: localStorage do navegador
- **Duração**: Permanente até limpar dados do navegador
- **Backup**: Automático a cada novo cadastro
- **Recuperação**: Automática ao recarregar a página

## ➕ Adicionando Novos Clientes

Novos clientes cadastrados através do fluxo "Ainda não sou cliente" são automaticamente:
- ✅ Salvos no localStorage
- ✅ Disponíveis para login futuro
- ✅ Reconhecidos com saudação personalizada

## 🔧 Gerenciamento de Dados

### Limpar Dados (Para Testes)
```javascript
// No console do navegador:
localStorage.removeItem('neppo_clients');
location.reload();
```

### Visualizar Dados Salvos
```javascript
// No console do navegador:
console.log(JSON.parse(localStorage.getItem('neppo_clients')));
```

### Adicionar Cliente Manualmente
```javascript
// No console do navegador:
const clients = JSON.parse(localStorage.getItem('neppo_clients')) || [];
clients.push({
    name: 'Novo Cliente',
    email: 'novo@email.com',
    phone: '11999999999',
    address: 'Endereço completo'
});
localStorage.setItem('neppo_clients', JSON.stringify(clients));
```

## 📊 Estatísticas de Uso

O sistema mantém registro de:
- Total de clientes cadastrados
- Histórico de logins (via console)
- Dados de endereço validados via API ViaCEP

---

**Versão**: 2.0.0  
**Última atualização**: Dezembro 2024  
**Funcionalidade**: Persistência de dados e saudação personalizada

