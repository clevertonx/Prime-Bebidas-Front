// ADICIONAR ESTA PROPRIEDADE NO CSS:  object-fit: cover; 
// SUBSTITUIR O .CARD-IMAGENS IMG PARA A CLASSE DA IMAGEM DO CARD.
// CHAMAR O JS NAS PÁGINAS HTML OU EXTRAIR OS PRINCIPAIS JS PARA UM ARQUIVO 'BASE'  

window.addEventListener('load', function () {
    var cards = document.querySelectorAll('.card-imagens img');
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
