document.getElementById('abrirModal').addEventListener('click', function () {
    document.getElementById('recuperarSenha').style.display = 'block';
});

document.querySelector('.fechar').addEventListener('click', function () {
    document.getElementById('recuperarSenha').style.display = 'none';
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        document.getElementById('recuperarSenha').style.display = 'none';
    }
});

document.getElementById('botao-recuperar-senha').addEventListener('click', function () {
    let email = document.getElementById('email').value;
    console.log('E-mail digitado:', email);
    // Validar o email antes de envia-lo e adicionar a lógica da requisição
});