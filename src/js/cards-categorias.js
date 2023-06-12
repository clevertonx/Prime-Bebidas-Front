function buscarProdutosPorCategoria(categoria) {
    const cardsContainer = document.getElementById("cards-container");
    axios.get(`http://localhost:8080/produto/categoria?categoria=${categoria}`)
        .then(response => {
            const produtos = response.data;

            cardsContainer.innerHTML = ""; // Limpa o conteúdo existente

            produtos.slice(0, 4).forEach(produto => { // Limita até 4 produtos
                const card = `
            <div class="card-grande">
              <img src="${produto.imagem}" alt="${produto.nome}">
              <h4>${produto.nome}</h4>
              <p class="preco">R$${produto.preco}</p>
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


window.addEventListener('load', function () {
    var cards = document.querySelectorAll('.card-grande img');
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var image = card.querySelector('img');
        image.addEventListener('load', function () {
            var aspectRatio = this.naturalWidth / this.naturalHeight;
            if (aspectRatio > 1) {
                this.style.height = 'auto';
                this.style.width = '100%';
            } else {
                this.style.width = 'auto';
                this.style.height = '100%';
            }
        });
    }
});

function converterStringParaImagem(string) {
    const imagem = new Image();
    imagem.src = string;
    return imagem;
}

window.addEventListener("DOMContentLoaded", function () {
    buscarProdutosPorCategoria('Fermentada');
});