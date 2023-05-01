// Eu tenho o backend (java) e frontend (html, css e javascript) de um site. Eu possuo as classes de Usuário, Estabelecimento e Produto.
// Um usuário pode possuir vários estabelecimentos, mas um estabelecimento só pode ter um usuário.
// Um Estabelecimento pode possuir vários produtos, mas um produto só pode ter um estabelecimento.
// Os atributos das classes são: 
// Usuario -  Id (Long), email (String), senha (String) e um mapper "usuario" com uma lista de estabelecimento (Estabelecimento)
// Estabelecimento - Id (Long), nome (String ), telefone(String), horarioAtendimento (String), numero(int), cidade (String), logradouro (String), estado (String), cnpj (String) e  e temos um joinColumn com o usuario_id e um mapper "estabelecimento" com uma lista de produtos (Produtos)
// Produto -   Id (Long), nome (String), descircao (String), marca (Sring), preco (Double), categoria (Categoria), imagem (String) e temos um joinColumn com o estabelecimento_id.

// No frontend, na aba "meus produtos", além do usuário poder adicionar um novo produto (informando o nome estabelecimento que está adicionando este produto), quero que ele consiga visualizar todos os produtos que foram cadastrados e em qual estabelecimento ele está vinculado. Gere o javascript (utilizando axios) para realizar as requisições de cadastro do produto.

// RESPOSTA:

// Para realizar a requisição de cadastro de produto, você pode utilizar o seguinte código JavaScript com o Axios:

// // Substitua o valor da constante API_BASE_URL pela URL da sua API
// const API_BASE_URL = 'https://suaapi.com';

// // Função para cadastrar um novo produto
// async function cadastrarProduto(nome, descricao, marca, preco, categoria, imagem, estabelecimentoId) {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/produtos`, {
//       nome,
//       descricao,
//       marca,
//       preco,
//       categoria,
//       imagem,
//       estabelecimentoId,
//     });

//     console.log('Produto cadastrado com sucesso:', response.data);

//     return response.data;
//   } catch (error) {
//     console.error('Erro ao cadastrar produto:', error);

//     throw error;
//   }
// }

// // Exemplo de uso da função cadastrarProduto
// cadastrarProduto('Produto 1', 'Descrição do Produto 1', 'Marca A', 10.5, 'Categoria A', 'http://exemplo.com/imagem.png', 1);


// Para visualizar todos os produtos cadastrados e em qual estabelecimento eles estão vinculados, você pode utilizar o seguinte código JavaScript com o Axios:

// // Substitua o valor da constante API_BASE_URL pela URL da sua API
// const API_BASE_URL = 'https://suaapi.com';

// // Função para obter todos os produtos e seus estabelecimentos vinculados
// async function obterProdutos() {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/produtos`);

//     console.log('Produtos obtidos com sucesso:', response.data);

//     return response.data;
//   } catch (error) {
//     console.error('Erro ao obter produtos:', error);

//     throw error;
//   }
// }

// // Exemplo de uso da função obterProdutos
// obterProdutos();

// Lembre-se de substituir o valor da constante API_BASE_URL pela URL da sua API. Além disso, é importante garantir que o endpoint da API para cadastro de produtos esteja correto (/produtos neste exemplo) e que a estrutura da resposta da API para a consulta de produtos esteja de acordo com o que o seu frontend espera receber.




function exibirCard(idProduto, idEstabelecimento) {
    axios.get(`/produto/${idProduto}/estabelecimento/${idEstabelecimento}`)
        .then(response => {
            // Atualiza o HTML do card com os dados do produto
            document.getElementById("nome").innerText = response.data.nome;
            document.getElementById("descricao").innerText = response.data.descricao;
            document.getElementById("preco").innerText = response.data.valor;
            document.getElementById("categoria").innerText = response.data.valor;
            document.getElementById("marca").innerText = response.data.valor;
            document.getElementById("imagem").innerText = response.data.valor;
            document.getElementById("estabelecimento").innerText = response.data.valor;
        })
        .catch(error => {
            console.error(error);
        });
    //   Nesse exemplo, a função exibirCard utiliza o método get do axios para fazer uma requisição HTTP GET para o servidor. O servidor retorna os dados do produto em formato JSON, que são acessados por meio da propriedade data do objeto response. Em seguida, os dados do produto são usados para atualizar o HTML do card com o nome, descrição e valor do produto. Se ocorrer algum erro na solicitação, uma mensagem de erro será exibida no console.
}


