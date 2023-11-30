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
      axios.post('http://localhost:8080/register', { email, senha }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          alert("Sucesso! Por favor, verifique seu e-mail para concluir seu cadastro!");
          window.location.href = 'login.html#paralogin';
          console.log(response.data);
          
        })
        .catch(error => {
          console.error(error);
          alert("Ih, deu ruim, entre em contato com os desenvolvedores!");
        });
    } else {
      document.getElementById('modal-message').textContent = "A senha deve ter de 6 a 8 caracteres, pelo menos uma letra maiúscula e um número.";
      document.getElementById('myModal').style.display = 'block';
      document.querySelector('.close').style.display = 'block';
    }
  });

  document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('myModal').style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target == document.getElementById('myModal')) {
      document.getElementById('myModal').style.display = 'none';
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
