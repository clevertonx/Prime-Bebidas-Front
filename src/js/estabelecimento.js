
const botaoSubmit = document.getElementById('botao-estabelecimento');

// Função para obter o valor do cookie pelo nome
function valorCookie(idUsuario) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(idUsuario + '=')) {
            return cookie.substring(idUsuario.length + 1);
        }
    }
    return null;
}

// Função para cadastrar um estabelecimento
function cadastrarEstabelecimento() {
    const idUsuario = valorCookie('idUsuario'); // Obtém o ID do usuário dos cookies

    // Dados do formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const horarioAtendimento = document.getElementById('horarioAtendimento').value;
    const numero = document.getElementById('numero').value;
    const cidade = document.getElementById('cidade').value;
    const logradouro = document.getElementById('logradouro').value;
    const estado = document.getElementById('estado').value;
    const cnpj = document.getElementById('cnpj').value;

    // Objeto de dados do estabelecimento
    const estabelecimentoData = {
        nome,
        telefone,
        horarioAtendimento,
        numero,
        cidade,
        logradouro,
        estado,
        cnpj,
        idUsuario: idUsuario

    };

    // Faz a requisição POST para cadastrar o estabelecimento
    axios.post('http://localhost:8080/estabelecimento', estabelecimentoData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            // Manipula a resposta da requisição
            // console.log(response.data);
            window.location.href = 'estabelecimentos.html';
            // Redireciona ou executa outras ações após o cadastro
            console.log(response);

        })
        .catch((error) => {
            // Manipula erros da requisição
            console.log(error);
        });
}
document.addEventListener('DOMContentLoaded', function () {
    // Adiciona um ouvinte de evento para o formulário de cadastro
    botaoSubmit.addEventListener('click', (event) => {
        event.preventDefault(); // Previne o envio padrão do formulário
        cadastrarEstabelecimento(); // Chama a função para cadastrar o estabelecimento
    });
});