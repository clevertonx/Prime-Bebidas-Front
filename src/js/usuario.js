document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const emailInput = document.getElementById('email_cad');
  const senhaInput = document.getElementById('senha_cad');
  const botaoSubmit = document.getElementById('botao-cad');
  const strengthBar = document.getElementById('strength-bar');
  const strengthText = document.getElementById('strength-text');

  senhaInput.addEventListener('input', function () {
    const senha = senhaInput.value;

    const strength = calcularForcaSenha(senha);

    strengthBar.value = strength;
    
    strengthBar.classList.remove('Fraca', 'Média', 'Forte');

    const forcaSenha = interpretarForcaSenha(strength);
    strengthBar.classList.add(forcaSenha);

    strengthText.textContent = `Força da Senha: ${forcaSenha}`;
  });

  botaoSubmit.addEventListener('click', function (event) {
    event.preventDefault();

    const email = emailInput.value;
    const senha = senhaInput.value;

    if (validarSenha(senha)) {
      axios.post('http://localhost:8080/usuario/cadastro', { email, senha }, {
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
            console.log("Resposta inválida do servidor após o cadastro do usuário");
          }

          document.cookie = 'idUsuario=' + response.data.id;
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      alert("A senha deve ter de 6 a 8 caracteres, pelo menos uma letra maiúscula e um número.");
    }
  });

  function calcularForcaSenha(senha) {
    let strength = 0;

    if (senha.length >= 6 && senha.length <= 8) {
      strength += 33.33; 
    }
  
    if (/[A-Z]/.test(senha)) {
      strength += 33.33;
    }
  
    if (/\d/.test(senha)) {
      strength += 33.33; 
    }
  
    return strength;
  }

  function interpretarForcaSenha(strength) {
    if (strength < 50) {
      return 'Fraca';
    } else if (strength < 80) {
      return 'Média';
    } else {
      return 'Forte';
    }
  }

  function validarSenha(senha) {
    return (senha.length >= 6 && senha.length <= 8 && /[A-Z]/.test(senha) && /\d/.test(senha));
  }
});
