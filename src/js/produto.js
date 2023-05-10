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

document.getElementById("logout").addEventListener(() => {
    document.cookie = 'idUsuario=';
})







// talvez esteja errado
// function exibirCard(idProduto, idEstabelecimento) {
//     axios.get(`/produto/${idProduto}/estabelecimento/${idEstabelecimento}`)
//         .then(response => {
//             // Atualiza o HTML do card com os dados do produto
//             document.getElementById("nome").innerText = response.data.nome;
//             document.getElementById("descricao").innerText = response.data.descricao;
//             document.getElementById("preco").innerText = response.data.valor;
//             document.getElementById("categoria").innerText = response.data.valor;
//             document.getElementById("marca").innerText = response.data.valor;
//             document.getElementById("imagem").innerText = response.data.valor;
//             document.getElementById("estabelecimento").innerText = response.data.valor;
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }



