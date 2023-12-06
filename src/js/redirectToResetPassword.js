document.addEventListener('DOMContentLoaded', function () {
    const senha = document.getElementById('nova-senha');
    const botaoRedefinirSenha = document.getElementById('redefinir-nova-senha');

    botaoRedefinirSenha.addEventListener('click', function (event) {
        event.preventDefault();
        const senhaNova = senha.value;

        const token = new URLSearchParams(window.location.search).get('token');
        document.getElementById('tokenInput').value = token;

        const payload = {
            senhaNova: senhaNova
        };


        axios.post(`http://localhost:8080/register/reset-password?token=${token}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log("Solicitação de redefinição de senha enviada com sucesso!");
                alert("Senha redefinida com sucesso");
                window.location.href = "./login.html";
                senha.style.display = 'none';
            })
            .catch(error => {
                console.error(error);
                alert("Houve um erro ao processar sua solicitação. Tente novamente mais tarde.");
            });
    });
});