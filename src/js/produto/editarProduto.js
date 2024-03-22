function obterIdProduto() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function preencherCamposProduto(produto) {
    document.getElementById('nome').value = produto.nome;
    document.getElementById('descricao').value = produto.descricao;
    document.getElementById('marca').value = produto.marca;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('categoria').value = produto.categoria;
    document.getElementById('imagem').value = produto.imagem;
    
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

// Obtém o ID do produto da URL e carrega os dados do produto correspondente
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
    const imagem = document.getElementById('imagem').value;
    // Obtenha os valores dos outros campos aqui...

    // Crie um objeto com os dados do estabelecimento
    const produto = {
        nome: nome,
        descricao: descricao,
        marca: marca,
        preco: preco,
        categoria: categoria,
        imagem: imagem,
        // Adicione os outros campos ao objeto aqui...
    };

    produto['_method'] = 'PUT';

    const token = valorCookie('token');

    // Faça uma requisição PUT para salvar as alterações
    axios.put(`http://localhost:8080/produto/${idProduto}`, produto, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(function (response) {
            // Alterações salvas com sucesso
            console.log(response.data);
            // Faça algo após salvar as alterações, como redirecionar para outra página
            const url = `./produtos.html?id=${idProduto}&nome=${nome}&descricao=${descricao}&marca=${marca}&preco=${preco}&categoria=${categoria}&imagem=${categoria}&imagem=${imagem}`;
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

document.addEventListener("DOMContentLoaded", function () {
    // var redirecionaHome = document.getElementById("link-cabecalho-logado");

    // redirecionaHome.addEventListener("click", function () {
    //     window.location.href = "./logado.html";
    // });

    // Adiciona o ouvinte de evento de clique ao botão "Salvar"
    document.getElementById('botao-editarProduto').addEventListener('click', salvarAlteracoes);
});