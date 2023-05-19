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
    const imagem = document.getElementById('imagem').value;

    // Objeto do estabelecimento
    const produtoData = {
        nome,
        descricao,
        marca,
        preco,
        categoria,
        imagem,
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
            // Demonstra o id do usuário
            console.log(response);
            // Gera Cookie para o Estabelecimento cadastrado
            document.cookie = 'idProduto=' + response.data.id;
            // Aviso o usuário que o produto, vinculado ao estabelecimento específico foi criado 
            alert("O Produto " + response.data.nome + " foi cadastrado no estabelecimento " + idEstabelecimento + " com sucesso");
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
    axios.get('http://localhost:8080/estabelecimento', {
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

window.onload = function () {
    obterDadosEstabelecimentos();
};











document.getElementById("logout").addEventListener.addEventListener('click', () => {
    document.cookie = 'idUsuario=';
});
