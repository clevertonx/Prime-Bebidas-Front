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
            const tokenJWT = response.data.tokenJWT;

            // Extrai o ID do usuário do payload
            const payloadBase64 = tokenJWT.split('.')[1];
            const payloadString = atob(payloadBase64);
            const payloadJSON = JSON.parse(payloadString);
            const idUsuario = payloadJSON.id;

            document.cookie = `token=${tokenJWT}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`;

            if (idUsuario) {
                document.cookie = `idUsuario=${idUsuario}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`;
            } else {
                console.log("Resposta inválida do servidor após o cadastro do usuário");
            }

            window.location.href = 'logado.html';
        })
        .catch(error => {
            console.error(error);
            alert("Usuário ou senha inválidos.")
        });
    });
});

document.getElementById("logout").addEventListener('click', () => {
    document.cookie = 'idUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
});