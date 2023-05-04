// MinhaCritica/src/js/usuarioAutentificacao.js 

export function criarCookie(idUsuario) {
    document.cookie = "idUsuario=" + idUsuario;
}

//Apaga cookie quando o usuario desloga, setando a data de expiração para uma data passada
export function resetarCookie() {
    document.cookie = "idUsuario=;";
}

export function usuarioLogado() {
    // Obtém todos os cookies do documento
    var cookies = document.cookie;

    let idUsuario;
    cookies.split('; ').forEach(function (cookie) {
        let [nome, valor] = cookie.split('=');
        if (nome=="idUsuario"){
            idUsuario = valor;
        }
    })

    return idUsuario;
}

export async function obterUsuarioLogado(){
    return await obterUsuario(usuarioLogado());
}






// // Login
// document.addEventListener('DOMContentLoaded', function () {
//   const form = document.querySelector('form');
//   const emailInput = document.getElementById('email_cad');
//   const senhaInput = document.getElementById('senha_cad');
//   const botaoSubmit = document.getElementById('botao-cad');

//   botaoSubmit.addEventListener('click', function (event) {
//     event.preventDefault();

//     const email = emailInput.value;
//     const senha = senhaInput.value;

//     axios.post('http://localhost:8080/usuario', { email, senha }, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(response => {
//         console.log(response.data);
//         const idUsuario = response.data.id;
//         document.cookie = 'idUsuario=' + idUsuario;
//         window.location.href = 'logado.html';
//         alert('Cadastro realizado com sucesso!');
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   });
// });


document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const emailInput = document.getElementById('email_cad');
  const senhaInput = document.getElementById('senha_cad');
  const botaoSubmit = document.getElementById('botao-cad');


  botaoSubmit.addEventListener('click', function (event) {
    event.preventDefault();

    const email = emailInput.value;
    const senha = senhaInput.value;

    axios.post(`http://localhost:8080/usuario?email=${email}&senha=${senha}`)
      .then(response => {
        const usuario = response.data;
        if (usuario != null) {
          console.log(usuario);
          document.cookie = `idUsuario=${usuario.id}`;
          window.location.href = 'logado.html';
        } else {
          console.error('Usuário ou senha inválidos.');
          // tratar o erro, como exibir uma mensagem de erro para o usuário
        }
      })
      .catch(error => {
        console.error(error);
        // tratar o erro, como exibir uma mensagem de erro para o usuário
      });
  });
});













document.getElementById("logout").addEventListener(() => {
  document.cookie = 'idUsuario=';
})

  // Logout