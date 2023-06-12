document.addEventListener("DOMContentLoaded", function () {
    const categorias = document.getElementById("categorias");
    const cardsContainer = document.getElementById("cards-container");

    categorias.addEventListener("click", function (event) {
        event.preventDefault();
        const categoria = event.target.dataset.categoria;
        if (categoria) {
            buscarProdutosPorCategoria(categoria);
        }
    });

    function buscarProdutosPorCategoria(categoria) {
        fetch(`/produto/categoria?categoria=${categoria}`)
            .then(response => response.json())
            .then(produtos => {
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
});