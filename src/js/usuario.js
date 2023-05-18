// Cadastro
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const emailInput = document.getElementById('email_cad');
  const senhaInput = document.getElementById('senha_cad');
  const botaoSubmit = document.getElementById('botao-cad');

  botaoSubmit.addEventListener('click', function (event) {
    event.preventDefault();

    const email = emailInput.value;
    const senha = senhaInput.value;

    axios.post('http://localhost:8080/usuario', { email, senha }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        window.location.href = 'login.html#paralogin';
        console.log(response.data);
        if (response.data && response.data.id) {
          document.cookie = 'idUsuario=' + response.data.id;
          alert("O Usuário foi criado com sucesso");
        } else {
          // A resposta do servidor não contém a propriedade data.id
          console.log("Resposta inválida do servidor após o cadastro do estabelecimento");
        }

        document.cookie = 'idUsuario=' + response.data.id;
      })
      .catch(error => {
        console.error(error);
      });
  });
});

document.getElementById("logout").addEventListener(() => {
  document.cookie = 'idUsuario=';
})