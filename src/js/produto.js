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
}



