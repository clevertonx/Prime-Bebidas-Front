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

                document.cookie = `token=${tokenJWT}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`;
                
                if (response.data && response.data.id && response.data.tokenJWT) {
                    document.cookie = 'idUsuario=' + response.data.id;
                    alert("entrei");
                } else {
                    console.log("Resposta inválida do servidor após o cadastro do usuário");
                }
                
                document.cookie = 'idUsuario=' + response.data.id;
                window.location.href = 'logado.html'; // Movido aqui, mas você pode optar por mantê-lo dentro do bloco if
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
