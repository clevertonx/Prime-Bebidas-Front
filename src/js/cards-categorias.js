function buscarProdutosPorCategoria(categoria) {
    const cardsContainer = document.getElementById("cards-container");
    axios.get(`http://localhost:8080/produto/categoria?categoria=${categoria}`)
        .then(response => {
            const produtos = response.data;

            cardsContainer.innerHTML = ""; // Limpa o conteúdo existente

            produtos.forEach(produto => {
                const card = `
                    <div class="card-grande">
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <h4>${produto.nome}</h4>
                        <p class="preco">$${produto.preco}</p>
                        <p class="descricao">${produto.descricao}</p>
                    </div>
                `;
                cardsContainer.insertAdjacentHTML("beforeend", card);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar produtos:", error);
        });
}