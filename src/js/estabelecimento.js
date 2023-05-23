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


// Função para obter os dados do Cadastro
function obterDadosDaAPI() {

    const idUsuario = valorCookie('idUsuario');

    axios.get('http://localhost:8080/usuario/' + idUsuario + '/estabelecimento', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            // Dados obtidos com sucesso
            var dados = response.data;
            popularTabela(dados);
        })
        .catch(function (error) {
            // Ocorreu um erro ao obter os dados da API
            console.log(error);
        });
}

// Função para preenchimento dinâmico da tabela
function popularTabela(dados) {
    const tabelaBody = document.getElementById('tabela-body');

    // Limpa o conteúdo atual da tabela
    tabelaBody.innerHTML = '';

    // Percorre os dados e cria as linhas da tabela
    for (var i = 0; i < dados.length; i++) {
        var linha = document.createElement('tr');
        linha.innerHTML = '<td>' + dados[i].id + '</td>' +
            '<td>' + dados[i].nome + '</td>' +
            '<td>' + dados[i].logradouro + '</td>' +
            '<td>' + dados[i].telefone + '</td>' +
            '<td>' + dados[i].cnpj + '</td>' +
            '<td><button class="editar" onclick="editarRegistro(' + dados[i].id + ')">Editar</button></td>' +
            '<td><button class="excluir" onclick="excluirRegistro(' + dados[i].id + ')">Excluir</button></td>';

        tabelaBody.appendChild(linha);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // ...

    // Adiciona o evento de clique aos botões de exclusão
    const botoesExcluir = document.getElementsByClassName('excluir');
    for (let i = 0; i < botoesExcluir.length; i++) {
        botoesExcluir[i].addEventListener('click', function () {
            const idEstabelecimento = parseInt(this.getAttribute('data-id'));
            excluirRegistro(idEstabelecimento);
        });
    }
});

function editarRegistro() {
    // FAZER
}

function excluirRegistro(id) {
    axios.delete(`http://localhost:8080/estabelecimento/${id}`)
        .then((response) => {
            if (response.status === 200) {
                console.log("Registro excluído com sucesso");
            } else {
                console.log("Falha ao excluir o registro");
            }
        })
        .catch((error) => {
            console.log("Erro ao excluir o registro:", error);
        });
    location.reload();
}

window.onload = function () {
    obterDadosDaAPI();
};

document.getElementById("logout").addEventListener.addEventListener('click', () => {
    document.cookie = 'idUsuario=';
});