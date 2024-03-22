function obterIdProduto() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function preencherCamposProduto(produto) {
    document.getElementById('nome').value = produto.nome;
    document.getElementById('descricao').value = produto.descricao;
    document.getElementById('marca').value = produto.marca;
    document.getElementById('preco').value = produto.preco;
    var selectCategoria = document.getElementById('categoria');
    for (var i = 0; i < selectCategoria.options.length; i++) {
        if (selectCategoria.options[i].value === produto.categoria) {
            selectCategoria.selectedIndex = i;
            break;
        }
    }
}


function carregarProduto(idProduto) {
    const token = valorCookie('token');

    axios.get('http://localhost:8080/produto/' + idProduto, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(function (response) {
            // Dados obtidos com sucesso
            var produto = response.data;
            preencherCamposProduto(produto);
        })
        .catch(function (error) {
            // Ocorreu um erro ao obter os dados da API
            console.log(error);
        });
}

// Obtém o ID do estabelecimento da URL e carrega os dados do estabelecimento correspondente
const idProduto = obterIdProduto();
carregarProduto(idProduto);

function salvarAlteracoes(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém o ID do estabelecimento
    const idProduto = obterIdProduto();

    // Obtém os valores dos campos
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const marca = document.getElementById('marca').value;
    const preco = document.getElementById('preco').value;
    const categoria = document.getElementById('categoria').value;
    // Obtenha os valores dos outros campos aqui...

    // Crie um objeto com os dados do estabelecimento
    const produto = {
        nome: nome,
        descricao: descricao,
        marca: marca,
        preco: preco,
        categoria: categoria,
        // Adicione os outros campos ao objeto aqui...
    };

    produto['_method'] = 'PUT';

    // Faça uma requisição PUT para salvar as alterações
    axios.put(`http://localhost:8080/produto/${idProduto}`, produto)
        .then(function (response) {
            // Alterações salvas com sucesso
            console.log(response.data);
            // Faça algo após salvar as alterações, como redirecionar para outra página
            const url = `./produtos.html?id=${idProduto}&nome=${nome}&descricao=${descricao}&marca=${marca}&preco=${preco}&categoria=${categoria}`;
            // Navegue para a página anterior com os dados atualizados
            window.location.href = url;
        })
        .catch(function (error) {
            // Ocorreu um erro ao salvar as alterações
            console.log(error);
            // Lide com o erro de acordo com seus requisitos
        });
}

// Adicione o evento de envio do formulário à função salvarAlteracoes
document.getElementById('form-produtos').addEventListener('submit', salvarAlteracoes);

function editarProduto(idProduto) {
    window.location.href = './editarProduto.html?id=' + idProduto;
}