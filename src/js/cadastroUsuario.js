const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // previne o comportamento padrão do formulário

    // cria um objeto com os dados do cadastro
    const data = {
        name: nameInput.value,
        email: emailInput.value
    };

    // envia uma solicitação HTTP POST para o servidor com os dados do cadastro
    fetch('url_do_servidor/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Cadastro salvo com sucesso:', data);
            // faça alguma coisa com a resposta do servidor, se necessário
        })
        .catch(error => {
            console.error('Erro ao salvar cadastro:', error);
            // faça alguma coisa com o erro, se necessário
        });
});

//  VERIFICAR SE FOI REALIZADA A ANOTAÇÃO @CROSSORIGIN (*) NO BACK E TESTAR;
// CHATGPT - Este exemplo assume que você tem um formulário HTML com dois campos de entrada para nome e email, e que você selecionou esses campos com document.querySelector. Em seguida, ele adiciona um ouvinte de eventos ao formulário para interceptar a submissão do formulário e enviar uma solicitação HTTP POST para o servidor com os dados do cadastro.

// Observe que estamos definindo o cabeçalho "Content-Type" como "application/json" e convertendo o objeto de dados em uma string JSON usando JSON.stringify. Isso é para garantir que o servidor possa entender o formato dos dados que estamos enviando.

// Lembre-se de substituir "url_do_servidor/cadastro" pela URL real do endpoint do servidor para salvar o cadastro. Além disso, certifique-se de validar e limpar os dados do usuário antes de enviá-los ao servidor para evitar vulnerabilidades de segurança