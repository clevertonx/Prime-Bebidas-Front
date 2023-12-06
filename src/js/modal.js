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
    document.getElementById('modal-loading').style.display = 'block';

    let email = document.getElementById('email').value;
    console.log('E-mail digitado:', email);

    axios.post('http://localhost:8080/register/password-reset-request', { email }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            document.getElementById('modal-loading').style.display = 'none';

            document.getElementById('recuperarSenha').style.display = 'none';

            console.log("Requisição de recuperação de senha enviada com sucesso!");
            alert("Um e-mail foi enviado com instruções para redefinir sua senha.");
        })
        .catch(error => {
            document.getElementById('modal-loading').style.display = 'none';

            console.error(error);
            alert("Houve um erro ao processar sua solicitação. Verifique seu e-mail e tente novamente.");
        });
});
