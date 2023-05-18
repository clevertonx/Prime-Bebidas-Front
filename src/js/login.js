document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email_login');
    const senhaInput = document.getElementById('senha_login');
    const botaoSubmit = document.getElementById('botao-login');

    botaoSubmit.addEventListener('click', function (event) {
        event.preventDefault();
        const email = emailInput.value;
        const senha = senhaInput.value;


        axios.post('http://localhost:8080/usuario/login', { email, senha }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
                document.cookie = 'idUsuario=' + response.data;
                window.location.href = 'logado.html';
            })
            .catch(error => {
                console.error(error);
                alert("Usuário ou senha inválidos.")
            });
    });
});

document.getElementById("logout").addEventListener.addEventListener('click', () => {
    document.cookie = 'idUsuario=';
});