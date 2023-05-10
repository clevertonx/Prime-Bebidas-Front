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
        console.log(response.data);
        document.cookie = 'idUsuario=' + response.data.id;
        window.location.href = 'login.html#paralogin';
      })
      .catch(error => {
        console.error(error);
      });
  });
});

document.getElementById("logout").addEventListener(() => {
  document.cookie = 'idUsuario=';
})