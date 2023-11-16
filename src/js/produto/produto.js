const botaoSubmit = document.getElementById('botao-produto');

function aplicarMascarasValidacoes() {
    // Máscara e validação para o campo de nome
    $('#nome').inputmask({ regex: "[A-Za-zÀ-ÿ ]{1,60}" });

    // Máscara para o campo de telefone
    $('#descricao').inputmask({ regex: "[A-Za-zÀ-ÿ1-9 ]{1,250}" });

    // Máscara para o campo de horário de atendimento
    $('#marca').inputmask({ regex: "[A-Za-zÀ-ÿ ]{1,30}" });

    // Máscara para o campo de CNPJ
    $('#preco').inputmask({ regex: "[0-9.]{1,15}" });
}

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

// Função para cadastrar um produto, com vinculo do Estabelecimento 
function cadastrarProduto() {
    const idEstabelecimento = document.getElementById('estabelecimentos-cadastrados').value;

    // Dados do formulário
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const marca = document.getElementById('marca').value;
    const preco = document.getElementById('preco').value;
    const categoria = document.getElementById('categoria').value;
    const imagemInput = document.getElementById('imagem-input');

    const produtoData = {
        nome,
        descricao,
        marca,
        preco,
        categoria,
        idEstabelecimento: idEstabelecimento
    };

    if (imagemInput.files.length > 0) {
        const imagemFile = imagemInput.files[0];
        const reader = new FileReader();

        reader.onloadend = function () {
            // Converte a imagem para uma string e adiciona ao objeto produtoData
            produtoData.imagem = reader.result;

            // Faz a requisição POST para cadastrar o produto
            enviarProduto(produtoData);
        };

        reader.readAsDataURL(imagemFile);
    } else {
        // Se nenhuma imagem foi selecionada, faça a requisição POST sem a propriedade imagem
        enviarProduto(produtoData);
    }
}

function enviarProduto(produtoData) {
    const idEstabelecimento = valorCookie('idEstabelecimento'); // Obtém o ID do usuário dos cookies
    const token = valorCookie('token'); // Obtém o ID do usuário dos cookies

    axios.post('http://localhost:8080/produto', produtoData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
            // Gera Cookie para o Produto cadastrado
            document.cookie = 'idProduto=' + response.data.id;
        })
        .catch((error) => {
            // Erros da requisição (fazer)
            console.log(error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    botaoSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        cadastrarProduto();
    });
});

function obterDadosEstabelecimentos() {
    const token = valorCookie('token'); // Obtém o ID do usuário dos cookies
    const idUsuario = valorCookie('idUsuario');

    axios.get('http://localhost:8080/usuario/' + idUsuario + '/estabelecimento', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(function (response) {
            // Dados obtidos com sucesso
            const estabelecimentos = response.data;
            console.log(response.data);

            // Chama a função para popular o select
            popularSelect(estabelecimentos);
        })
        .catch(function (error) {
            // Ocorreu um erro ao obter os dados da API
            console.log(error);
        });
}

function obterDadosProduto() {
    const token = valorCookie('token'); // Obtém o ID do usuário dos cookies
    const idUsuario = valorCookie('idUsuario');

    axios.get('http://localhost:8080/produto/usuario/' + idUsuario, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(function (response) {
            const dados = response.data;

            const promises = dados.map(function (produto) {
                return obterNomeEstabelecimento(produto.idEstabelecimento)
                    .then(function (nomeEstabelecimento) {
                        produto.nomeEstabelecimento = nomeEstabelecimento;
                        return produto;
                    });
            });

            Promise.all(promises)
                .then(function (produtosAtualizados) {
                    popularTabela(produtosAtualizados);
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
        .catch(function (error) {
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
        option.value = estabelecimento.id;
        selectElement.add(option);
    }
    selectElement.addEventListener('change', function () {
        const idEstabelecimentoSelecionado = selectElement.value;
        document.cookie = 'idEstabelecimento=' + idEstabelecimentoSelecionado;
        // Atualiza o valor do cookie com o ID do estabelecimento selecionado
    });
}

function obterNomeEstabelecimento(idEstabelecimento) {
    const token = valorCookie('token'); // Obtém o ID do usuário dos cookies
    // const idUsuario = valorCookie('idUsuario');

    return axios.get('http://localhost:8080/estabelecimento/' + idEstabelecimento, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(function (response) {
            return response.data.nome;
        })
        .catch(function (error) {
            console.log(error);
            return '';
        });
}

// Função para preenchimento dinâmico da tabela
function popularTabela(dados) {
    const tabelaBody = document.getElementById('tabela-produto');

    // Limpa o conteúdo atual da tabela
    tabelaBody.innerHTML = '';

    // Percorre os dados e cria as linhas da tabela
    for (var i = 0; i < dados.length; i++) {
        var linha = document.createElement('tr');
        linha.innerHTML = '<td>' + dados[i].nomeEstabelecimento + '</td>' +
            '<td>' + dados[i].nome + '</td>' +
            '<td>' + dados[i].descricao + '</td>' +
            '<td>' + dados[i].marca + '</td>' +
            '<td>' + dados[i].preco + '</td>' +
            '<td>' + dados[i].categoria + '</td>' +
            '<td><button class="editar" onclick="editarProduto(' + dados[i].id + ')">Editar</button></td>' +
            '<td><button class="excluir" onclick="excluirProduto(' + dados[i].id + ')">Excluir</button></td>';

        tabelaBody.appendChild(linha);
    }
}

document.getElementById("logout").addEventListener('click', () => {
    document.cookie = 'idUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'idEstabelecimento=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'idProduto=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
});

window.onload = function () {
    obterDadosEstabelecimentos();
    obterDadosProduto();
    cadastrarProduto();
    aplicarMascarasValidacoes();
};