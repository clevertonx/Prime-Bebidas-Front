function getCookieValue(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

const idUsuario = getCookieValue("idUsuario");




document.addEventListener('DOMContentLoaded', function () {

    const novoEstabelecimento = {
        nomeInput : document.getElementById('nome'),
        telefoneInput : document.getElementById('telefone'),        horarioAtendimentoInput : document.getElementById('horarioAtendimento'),
        numeroInput : document.getElementById('numero'),
        cidadeInput : document.getElementById('cidade'),
        logradouroInput : document.getElementById('logradouro'),
        estadoInput : document.getElementById('estado'),
        cnpjInput : document.getElementById('cnpj'),
        botaoCadastro : document.getElementById('botao-estabelecimento')
    };

    axios.post('http://localhost:8080/estabelecimento', novoEstabelecimento, {
        params: {
            id_usuario: idUsuario
        }
    })
        .then(response => {
            console.log('Estabelecimento criado com sucesso!');
            window.location.href = 'estabelecimentos.html';
        })
        .catch(error => {
            console.error('Erro ao criar estabelecimento:', error);
        });
});


    // Chamar a função para criar o estabelecimento
    criarEstabelecimento(userId, estabelecimentoData);
});