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

// RECUPERAR A SENHA

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('recuperarSenha');
    const botaoRecuperarSenha = document.getElementById('botao-recuperar-senha');
    const emailRecuperacaoInput = document.getElementById('email');

    botaoRecuperarSenha.addEventListener('click', function (event) {
        event.preventDefault();
        const email = emailRecuperacaoInput.value;

        axios.post('http://localhost:8080/register/password-reset-request', { email }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log("Solicitação de recuperação de senha enviada com sucesso!");
            alert("Em breve você receberá um e-mail com um link para resetar a sua senha");
            modal.style.display = 'none'; 
        })
        .catch(error => {
            console.error(error);
            alert("Houve um erro ao processar sua solicitação. Tente novamente mais tarde.");
        });
    });
});

// EDITAR PERFIL - Ainda não implementado
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario-editar-perfil');
    const botaoEditar = document.getElementById('botao-editar-usuario');
    
    botaoEditar.addEventListener('click', function (event) {
        event.preventDefault();
        
        const emailInput = document.getElementById('email-recuperacao');
        const atualPasswordUsuario = document.getElementById('atual-password-usuario');
        const novaPasswordUsuario = document.getElementById('nova-password-usuario');
        const confirmarPasswordUsuario = document.getElementById('confirm-password-usuario');

        const email = emailInput.value;
        const senhaAtual = atualPasswordUsuario.value;
        const senhaNova = novaPasswordUsuario.value;
        const confirmarSenha = confirmarPasswordUsuario.value;

        if (senhaNova !== confirmarSenha) {
            alert("Os campos de senha e confirmar senha não correspondem.");
            return;
        }

        axios.post('http://localhost:8080/register/change-password', {
            email: email,
            oldPassword: senhaAtual,
            newPassword: senhaNova
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log("Solicitação de recuperação de senha enviada com sucesso!");
            alert("Senha alterada com sucesso");
            window.location.href = 'logado.html';
        })
        .catch(error => {
            console.error(error);
            alert("Houve um erro ao processar sua solicitação. Tente novamente mais tarde.");
        });
    });
});

document.getElementById("logout").addEventListener('click', () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'idUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'idEstabelecimento=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'idProduto=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
});