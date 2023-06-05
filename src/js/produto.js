const botaoSubmit = document.getElementById('botao-produto');

// Função para obter o valor do cookie do Id do Usuário
function valorCookie(idEstabelecimento) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(idEstabelecimento + '=')) {
            return cookie.substring(idEstabelecimento.length + 1);
        }
    }
    return null;
}

// Função para cadastrar um estabelecimento, com vinculo do Usuário 
function cadastrarProduto() {
    const idEstabelecimento = valorCookie('idEstabelecimento'); // Obtém o ID do estabelecimento dos cookies

    // Dados do formulário
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const marca = document.getElementById('marca').value;
    const preco = document.getElementById('preco').value;
    const categoria = document.getElementById('categoria').value;

    // Objeto do produto
    const produtoData = {
        nome,
        descricao,
        marca,
        preco,
        categoria,
        idEstabelecimento: idEstabelecimento
    };

    // Faz a requisição POST para cadastrar o estabelecimento
    axios.post('http://localhost:8080/produto', produtoData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            // Redireciona ou executa outras ações após o cadastro
            window.location.href = 'produtos.html';
            console.log(response.data.id);
            if (response.data && response.data.id) {
                // O servidor retornou uma resposta válida com a propriedade data.id
                // Prossiga com a configuração do cookie
                document.cookie = 'idProduto=' + response.data.id;
                alert("O produto " + response.data.nome + " foi criado com sucesso");
            } else {
                // A resposta do servidor não contém a propriedade data.id
                console.log("Resposta inválida do servidor após o cadastro do produto");
            }
            // Gera Cookie para o Estabelecimento cadastrado
            document.cookie = 'idProduto=' + response.data.id;
        })
        .catch((error) => {
            // Erros da requisição (fazer)
            console.log(error);
        });
}
document.addEventListener('DOMContentLoaded', function () {
    botaoSubmit.addEventListener('click', (event) => {
        event.preventDefault(); // Previne o envio padrão do formulário
        cadastrarProduto(); // Chama a função para cadastro do estabelecimento
    });
});




function obterDadosEstabelecimentos() {

    const idUsuario = valorCookie('idUsuario');

    axios.get('http://localhost:8080/usuario/' + idUsuario + '/estabelecimento', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            // Dados obtidos com sucesso
            const estabelecimentos = response.data;

            // Chama a função para popular o select
            popularSelect(estabelecimentos);
        })
        .catch(function (error) {
            // Ocorreu um erro ao obter os dados da API
            console.log(error);
        });
}

function obterDadosProduto() {

    const idEstabelecimento = valorCookie('idEstabelecimento');

    axios.get('http://localhost:8080/estabelecimento/' + idEstabelecimento + '/produto', {
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


function popularSelect(estabelecimentos) {

    const selectElement = document.getElementById('estabelecimentos-cadastrados');

    // Limpa o conteúdo atual do select
    selectElement.innerHTML = '';

    // Cria a opção padrão
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Selecione um estabelecimento';
    defaultOption.value = '';
    selectElement.add(defaultOption);

    // Percorre os estabelecimentos e cria as opções do select
    for (var i = 0; i < estabelecimentos.length; i++) {
        const estabelecimento = estabelecimentos[i];

        const option = document.createElement('option');
        option.text = estabelecimento.nome;
        option.value = estabelecimento.idEstabelecimento;
        selectElement.add(option);
    }
}

// Função para preenchimento dinâmico da tabela
function popularTabela(dados) {
    const tabelaBody = document.getElementById('tabela-produto');

    // Limpa o conteúdo atual da tabela
    tabelaBody.innerHTML = '';

    // Percorre os dados e cria as linhas da tabela
    for (var i = 0; i < dados.length; i++) {
        var linha = document.createElement('tr');
        linha.innerHTML = '<td>' + dados[i].id + '</td>' +
            '<td>' + dados[i].nome + '</td>' +
            '<td>' + dados[i].descricao + '</td>' +
            '<td>' + dados[i].marca + '</td>' +
            '<td>' + dados[i].preco + '</td>' +
            '<td>' + dados[i].categoria + '</td>' +
            '<td><button class="editar" onclick="editarRegistro(' + dados[i].id + ')">Editar</button></td>' +
            '<td><button class="excluir" onclick="excluirRegistro(' + dados[i].id + ')">Excluir</button></td>';

        tabelaBody.appendChild(linha);
    }
}

window.onload = function () {
    obterDadosEstabelecimentos();
};


