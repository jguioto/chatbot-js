document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatOptions = document.getElementById('chat-options');

    const clients = []; // Array para armazenar clientes cadastrados

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
            }
        },
        ASK_EMAIL: {
            message: 'Por favor, digite seu e-mail de cadastro.',
            handleInput: (email) => {
                if (isValidEmail(email)) {
                    const client = clients.find(c => c.email === email);
                    if (client) {
                        currentState = 'CLIENT_MENU';
                        displayMessage(stateMachine[currentState].message, 'bot');
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
                    displayMessage(stateMachine[currentState].message, 'bot');
                    hideOptions();
                } else {
                    displayMessage('Essa opção é demonstrativa. Valeu!', 'bot');
                    currentState = 'END_CONVERSATION';
                    setTimeout(() => {
                        displayMessage(stateMachine[currentState].message, 'bot');
                        hideOptions();
                    }, 1500);
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
                    clients[clients.length - 1].email = email;
                    currentState = 'ASK_PHONE';
                    displayMessage(stateMachine[currentState].message, 'bot');
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
                    setTimeout(() => {
                        currentState = 'CLIENT_MENU';
                        displayMessage(stateMachine[currentState].message, 'bot');
                        displayOptions(stateMachine[currentState].options);
                    }, 1500);
                } else {
                    currentState = 'ASK_CEP';
                    displayMessage('Por favor, digite seu CEP novamente.', 'bot');
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
            displayMessage(message, 'user');
            if (stateMachine[currentState].handleInput) {
                stateMachine[currentState].handleInput(message);
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
});


