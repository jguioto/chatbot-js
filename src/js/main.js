document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatOptions = document.getElementById('chat-options');

    // Clientes pré-cadastrados e carregamento do localStorage
    let clients = loadClients();
    let currentClient = null; // Cliente atual logado

    let currentState = 'INITIAL';

    const stateMachine = {
        INITIAL: {
            message: 'Olá! Bem-vindo ao Chatbot Neppo. Como posso ajudar?',
            options: ['Já sou cliente', 'Ainda não sou cliente'],
            handleOption: (option) => {
                if (option === 'Já sou cliente') {
                    currentState = 'ASK_EMAIL';
                    displayMessage(stateMachine[currentState].message, 'bot');
                    hideOptions();
                } else if (option === 'Ainda não sou cliente') {
                    currentState = 'ASK_NAME';
                    displayMessage(stateMachine[currentState].message, 'bot');
                    hideOptions();
                }
            },
            handleInput: (input) => {
                // Processa entrada de texto para as opções
                const normalizedInput = normalizeText(input);
                if (normalizedInput.includes('ja sou cliente') || normalizedInput.includes('sou cliente') || normalizedInput === '1') {
                    displayMessage('Já sou cliente', 'user');
                    stateMachine[currentState].handleOption('Já sou cliente');
                } else if (normalizedInput.includes('ainda nao sou cliente') || normalizedInput.includes('nao sou cliente') || normalizedInput.includes('cadastro') || normalizedInput === '2') {
                    displayMessage('Ainda não sou cliente', 'user');
                    stateMachine[currentState].handleOption('Ainda não sou cliente');
                } else {
                    displayMessage('Desculpe, não entendi. Por favor, escolha uma das opções: "Já sou cliente" ou "Ainda não sou cliente".', 'bot');
                }
            }
        },
        ASK_EMAIL: {
            message: 'Por favor, digite seu e-mail de cadastro.',
            handleInput: (email) => {
                if (isValidEmail(email)) {
                    const client = clients.find(c => c.email === email);
                    if (client) {
                        currentClient = client;
                        currentState = 'CLIENT_MENU';
                        const firstName = client.name.split(' ')[0];
                        const personalizedMessage = `Olá, ${firstName}! ${stateMachine[currentState].message}`;
                        displayMessage(personalizedMessage, 'bot');
                        displayOptions(stateMachine[currentState].options);
                    } else {
                        displayMessage('E-mail não encontrado. Por favor, tente novamente ou cadastre-se.', 'bot');
                        currentState = 'INITIAL';
                        setTimeout(() => {
                            displayMessage(stateMachine[currentState].message, 'bot');
                            displayOptions(stateMachine[currentState].options);
                        }, 1500);
                    }
                } else {
                    displayMessage('E-mail inválido. Por favor, digite um e-mail válido.', 'bot');
                }
            }
        },
        CLIENT_MENU: {
            message: 'Bem-vindo(a) de volta! O que você gostaria de fazer hoje?',
            options: ['2a via do boleto', 'Problemas no acesso', 'Falar com atendente', 'Encerrar conversa'],
            handleOption: (option) => {
                if (option === 'Encerrar conversa') {
                    currentState = 'END_CONVERSATION';
                    const firstName = currentClient ? currentClient.name.split(' ')[0] : '';
                    const personalizedMessage = firstName ? 
                        `Obrigado por usar o Chatbot Neppo, ${firstName}! Até mais.` : 
                        stateMachine['END_CONVERSATION'].message;
                    displayMessage(personalizedMessage, 'bot');
                    hideOptions();
                    currentClient = null; // Limpa cliente atual
                } else {
                    displayMessage('Essa opção é demonstrativa. Valeu!', 'bot');
                    currentState = 'END_CONVERSATION';
                    setTimeout(() => {
                        const firstName = currentClient ? currentClient.name.split(' ')[0] : '';
                        const personalizedMessage = firstName ? 
                            `Obrigado por usar o Chatbot Neppo, ${firstName}! Até mais.` : 
                            stateMachine['END_CONVERSATION'].message;
                        displayMessage(personalizedMessage, 'bot');
                        hideOptions();
                        currentClient = null; // Limpa cliente atual
                    }, 1500);
                }
            },
            handleInput: (input) => {
                // Processa entrada de texto para as opções do menu
                const normalizedInput = normalizeText(input);
                if (normalizedInput.includes('2a via') || normalizedInput.includes('segunda via') || normalizedInput.includes('boleto') || normalizedInput === '1') {
                    displayMessage('2a via do boleto', 'user');
                    stateMachine[currentState].handleOption('2a via do boleto');
                } else if (normalizedInput.includes('problemas') || normalizedInput.includes('problema') || normalizedInput.includes('acesso') || normalizedInput === '2') {
                    displayMessage('Problemas no acesso', 'user');
                    stateMachine[currentState].handleOption('Problemas no acesso');
                } else if (normalizedInput.includes('falar') || normalizedInput.includes('atendente') || normalizedInput.includes('humano') || normalizedInput === '3') {
                    displayMessage('Falar com atendente', 'user');
                    stateMachine[currentState].handleOption('Falar com atendente');
                } else if (normalizedInput.includes('encerrar') || normalizedInput.includes('sair') || normalizedInput.includes('tchau') || normalizedInput.includes('bye') || normalizedInput === '4') {
                    displayMessage('Encerrar conversa', 'user');
                    stateMachine[currentState].handleOption('Encerrar conversa');
                } else {
                    displayMessage('Desculpe, não entendi. Por favor, escolha uma das opções: "2a via do boleto", "Problemas no acesso", "Falar com atendente" ou "Encerrar conversa".', 'bot');
                }
            }
        },
        ASK_NAME: {
            message: 'Para começarmos, qual é o seu nome?',
            handleInput: (name) => {
                if (name.trim() !== '') {
                    clients.push({ name });
                    currentState = 'ASK_NEW_EMAIL';
                    displayMessage(stateMachine[currentState].message, 'bot');
                } else {
                    displayMessage('Nome inválido. Por favor, digite seu nome.', 'bot');
                }
            }
        },
        ASK_NEW_EMAIL: {
            message: 'Agora, digite seu melhor e-mail.',
            handleInput: (email) => {
                if (isValidEmail(email)) {
                    // Verifica se e-mail já existe
                    const existingClient = clients.find(c => c.email === email);
                    if (existingClient) {
                        displayMessage('Este e-mail já está cadastrado. Redirecionando para o menu de cliente...', 'bot');
                        currentClient = existingClient;
                        currentState = 'CLIENT_MENU';
                        setTimeout(() => {
                            const firstName = existingClient.name.split(' ')[0];
                            const personalizedMessage = `Olá, ${firstName}! ${stateMachine[currentState].message}`;
                            displayMessage(personalizedMessage, 'bot');
                            displayOptions(stateMachine[currentState].options);
                        }, 1500);
                    } else {
                        clients[clients.length - 1].email = email;
                        currentState = 'ASK_PHONE';
                        displayMessage(stateMachine[currentState].message, 'bot');
                    }
                } else {
                    displayMessage('E-mail inválido. Por favor, digite um e-mail válido.', 'bot');
                }
            }
        },
        ASK_PHONE: {
            message: 'Qual o seu telefone com DDD?',
            handleInput: (phone) => {
                if (isValidPhone(phone)) {
                    clients[clients.length - 1].phone = phone;
                    currentState = 'ASK_CEP';
                    displayMessage(stateMachine[currentState].message, 'bot');
                } else {
                    displayMessage('Telefone inválido. Por favor, digite um telefone válido com DDD.', 'bot');
                }
            }
        },
        ASK_CEP: {
            message: 'Por favor, digite seu CEP para validarmos seu endereço.',
            handleInput: (cep) => {
                if (isValidCep(cep)) {
                    validateCep(cep);
                } else {
                    displayMessage('CEP inválido. Por favor, digite um CEP válido.', 'bot');
                }
            }
        },
        CONFIRM_ADDRESS: {
            message: 'Confirme seu endereço: [Endereço completo da API]. Está correto?',
            options: ['Sim', 'Não'],
            handleOption: (option) => {
                if (option === 'Sim') {
                    currentState = 'REGISTER_USER';
                    displayMessage(stateMachine[currentState].message, 'bot');
                    // Salva o novo cliente no localStorage
                    saveClients();
                    currentClient = clients[clients.length - 1];
                    setTimeout(() => {
                        currentState = 'CLIENT_MENU';
                        const firstName = currentClient.name.split(' ')[0];
                        const personalizedMessage = `Olá, ${firstName}! ${stateMachine[currentState].message}`;
                        displayMessage(personalizedMessage, 'bot');
                        displayOptions(stateMachine[currentState].options);
                    }, 1500);
                } else {
                    currentState = 'ASK_CEP';
                    displayMessage('Por favor, digite seu CEP novamente.', 'bot');
                }
            },
            handleInput: (input) => {
                // Processa entrada de texto para confirmação de endereço
                const normalizedInput = normalizeText(input);
                if (normalizedInput.includes('sim') || normalizedInput.includes('correto') || normalizedInput.includes('certo') || normalizedInput === 's' || normalizedInput === '1') {
                    displayMessage('Sim', 'user');
                    stateMachine[currentState].handleOption('Sim');
                } else if (normalizedInput.includes('nao') || normalizedInput.includes('não') || normalizedInput.includes('errado') || normalizedInput.includes('incorreto') || normalizedInput === 'n' || normalizedInput === '2') {
                    displayMessage('Não', 'user');
                    stateMachine[currentState].handleOption('Não');
                } else {
                    displayMessage('Desculpe, não entendi. Por favor, responda "Sim" se o endereço está correto ou "Não" se está incorreto.', 'bot');
                }
            }
        },
        REGISTER_USER: {
            message: 'Cadastro concluído com sucesso!',
        },
        END_CONVERSATION: {
            message: 'Obrigado por usar o Chatbot Neppo! Até mais.'
        }
    };

    // Funções de persistência de dados
    function loadClients() {
        try {
            const savedClients = localStorage.getItem('neppo_clients');
            if (savedClients) {
                return JSON.parse(savedClients);
            } else {
                // Clientes pré-cadastrados para demonstração
                const defaultClients = [
                    {
                        name: 'João Silva',
                        email: 'joao.silva@email.com',
                        phone: '11987654321',
                        address: 'Rua das Flores, 123, Centro, São Paulo - SP'
                    },
                    {
                        name: 'Maria Santos',
                        email: 'maria.santos@email.com',
                        phone: '11999887766',
                        address: 'Avenida Paulista, 1000, Bela Vista, São Paulo - SP'
                    },
                    {
                        name: 'Pedro Oliveira',
                        email: 'pedro.oliveira@email.com',
                        phone: '11955443322',
                        address: 'Rua Augusta, 500, Consolação, São Paulo - SP'
                    },
                    {
                        name: 'Ana Costa',
                        email: 'ana.costa@email.com',
                        phone: '11944332211',
                        address: 'Rua Oscar Freire, 200, Jardins, São Paulo - SP'
                    }
                ];
                saveClientsToStorage(defaultClients);
                return defaultClients;
            }
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
            return [];
        }
    }

    function saveClients() {
        saveClientsToStorage(clients);
    }

    function saveClientsToStorage(clientsArray) {
        try {
            localStorage.setItem('neppo_clients', JSON.stringify(clientsArray));
        } catch (error) {
            console.error('Erro ao salvar clientes:', error);
        }
    }

    function normalizeText(text) {
        return text.toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '') // Remove acentos
                  .replace(/[^\w\s]/g, '') // Remove pontuação
                  .trim();
    }

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function displayOptions(options) {
        chatOptions.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => {
                displayMessage(option, 'user');
                stateMachine[currentState].handleOption(option);
            });
            chatOptions.appendChild(button);
        });
        chatOptions.style.display = 'flex';
    }

    function hideOptions() {
        chatOptions.style.display = 'none';
    }

    function handleUserInput() {
        const message = userInput.value.trim();
        if (message) {
            // Verifica se o estado atual tem handleInput
            if (stateMachine[currentState].handleInput) {
                stateMachine[currentState].handleInput(message);
            } else {
                // Se não tem handleInput, exibe mensagem padrão
                displayMessage(message, 'user');
                displayMessage('Desculpe, não entendi. Por favor, use os botões disponíveis ou digite uma das opções válidas.', 'bot');
            }
            userInput.value = '';
        }
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function isValidPhone(phone) {
        const re = /^\d{10,11}$/;
        return re.test(phone);
    }

    function isValidCep(cep) {
        const re = /^\d{8}$/;
        return re.test(cep);
    }

    async function validateCep(cep) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (data.erro) {
                displayMessage('CEP não encontrado. Por favor, tente novamente.', 'bot');
            } else {
                const address = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
                clients[clients.length - 1].address = address;
                currentState = 'CONFIRM_ADDRESS';
                displayMessage(`Confirme seu endereço: ${address}. Está correto?`, 'bot');
                displayOptions(stateMachine[currentState].options);
            }
        } catch (error) {
            displayMessage('Ocorreu um erro ao validar o CEP. Por favor, tente novamente.', 'bot');
        }
    }

    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

    // Inicia a conversa
    displayMessage(stateMachine.INITIAL.message, 'bot');
    displayOptions(stateMachine.INITIAL.options);

    // Exibe informações sobre clientes pré-cadastrados (apenas para demonstração)
    console.log('Clientes pré-cadastrados para teste:');
    clients.forEach(client => {
        console.log(`- ${client.name} (${client.email})`);
    });
});

