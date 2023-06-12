// Obtém a referência do elemento que conterá os cards
const englobaCards = document.querySelector('.engloba-cards');

// Função para criar um card com base nos dados do produto
function criarCard(produto) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = produto.imagem;
    img.alt = produto.nome;
    card.appendChild(img);

    const titulo = document.createElement('h4');
    titulo.textContent = produto.nome;
    card.appendChild(titulo);

    const preco = document.createElement('p');
    preco.classList.add('preco');
    preco.textContent = `R$ ${produto.preco.toFixed(2)}`;
    card.appendChild(preco);

    const descricao = document.createElement('p');
    descricao.classList.add('descricao');
    descricao.textContent = produto.descricao;
    card.appendChild(descricao);

    return card;
}

// Função para buscar os produtos do endpoint e criar os cards
async function carregarProdutos() {
    try {
        const response = await axios.get('http://localhost:8080/produto');
        const produtos = response.data;

        const linha1 = document.createElement('div');
        linha1.classList.add('linha-1');

        const linha2 = document.createElement('div');
        linha2.classList.add('linha-2');

        produtos.slice(0, 8).forEach((produto, index) => {
            const card = criarCard(produto);

            if (index < 4) {
                linha1.appendChild(card);
            } else {
                linha2.appendChild(card);
            }
        });

        englobaCards.appendChild(linha1);
        englobaCards.appendChild(linha2);
    } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    }
}

// Chama a função para carregar os produtos
carregarProdutos();

// ADICIONAR ESTA PROPRIEDADE NO CSS:  object-fit: cover; 
window.addEventListener('load', function () {
    var cards = document.querySelectorAll('.card img');
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