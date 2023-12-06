document.getElementById('tokenInput').value = token;
console.log(value);

document.addEventListener('DOMContentLoaded', function () {
    const senha = document.getElementById('nova-senha');
    const botaoRedefinirSenha = document.getElementById('redefinir-nova-senha');

    botaoRedefinirSenha.addEventListener('click', function (event) {
        event.preventDefault();
        const senhaNova = senha.value;

        const formData = new URLSearchParams();
        formData.append('token', token);
        formData.append('senhaNova', senhaNova);

        axios.post('http://localhost:8080/register/reset-password',
            formData
            , {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log("Solicitação de redefinição de senha enviada com sucesso!");
                alert("Em breve você receberá um e-mail com um link para resetar a sua senha");
                senha.style.display = 'none';
            })
            .catch(error => {
                console.error(error);
                alert("Houve um erro ao processar sua solicitação. Tente novamente mais tarde.");
            });
    });
});