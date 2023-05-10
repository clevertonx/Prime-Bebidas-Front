const botaoSubmit = document.getElementById('botao-estabelecimento');

// Função para obter o valor do cookie do Id do Usuário
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

// Função para cadastrar um estabelecimento, com vinculo do Usuário 
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

    // Objeto do estabelecimento
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
            // Redireciona ou executa outras ações após o cadastro
            window.location.href = 'estabelecimentos.html';
            console.log(response.data.id);
            if (response.data && response.data.id) {
                // O servidor retornou uma resposta válida com a propriedade data.id
                // Prossiga com a configuração do cookie
                document.cookie = 'idEstabelecimento=' + response.data.id;
                alert("O estabelecimento " + response.data.nome + " foi criado com sucesso");
            } else {
                // A resposta do servidor não contém a propriedade data.id
                console.log("Resposta inválida do servidor após o cadastro do estabelecimento");
            }
            // Gera Cookie para o Estabelecimento cadastrado
            document.cookie = 'idEstabelecimento=' + response.data.id;
        })
        .catch((error) => {
            // Erros da requisição (fazer)
            console.log(error);
        });
}
document.addEventListener('DOMContentLoaded', function () {
    botaoSubmit.addEventListener('click', (event) => {
        event.preventDefault(); // Previne o envio padrão do formulário
        cadastrarEstabelecimento(); // Chama a função para cadastro do estabelecimento
    });
});