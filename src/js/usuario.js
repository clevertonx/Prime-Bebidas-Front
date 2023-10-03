document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const emailInput = document.getElementById('email_cad');
  const senhaInput = document.getElementById('senha_cad');
  const botaoSubmit = document.getElementById('botao-cad');
  const strengthBar = document.getElementById('strength-bar');
  const strengthText = document.getElementById('strength-text');

  senhaInput.addEventListener('input', function () {
    const senha = senhaInput.value;

    // Calcular a força da senha com base nos critérios
    const strength = calcularForcaSenha(senha);

    // Atualizar a barra de progresso e o texto de força da senha
    strengthBar.value = strength;
    strengthText.textContent = `Força da Senha: ${interpretarForcaSenha(strength)}`;
  });

  botaoSubmit.addEventListener('click', function (event) {
    event.preventDefault();

    const email = emailInput.value;
    const senha = senhaInput.value;

    // Verificar se a senha atende aos critérios
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

  // Função para calcular a força da senha com base nos critérios
  function calcularForcaSenha(senha) {
    let strength = 0;

    // Critério 1: Verificar o comprimento da senha (6 a 8 caracteres)
    if (senha.length >= 6 && senha.length <= 8) {
      strength += 33.33; // 33.33% da força total
    }
  
    // Critério 2: Verificar se há pelo menos uma letra maiúscula
    if (/[A-Z]/.test(senha)) {
      strength += 33.33; // 33.33% da força total
    }
  
    // Critério 3: Verificar se há pelo menos um número
    if (/\d/.test(senha)) {
      strength += 33.34; // 33.34% da força total
    }
  
    return strength;
  }

  // Função para interpretar a força da senha
  function interpretarForcaSenha(strength) {
    if (strength < 50) {
      return 'Fraca';
    } else if (strength < 80) {
      return 'Média';
    } else {
      return 'Forte';
    }
  }

  // Função para validar a senha
  function validarSenha(senha) {
    // Verificar se a senha atende aos critérios
    return (senha.length >= 6 && senha.length <= 8 && /[A-Z]/.test(senha) && /\d/.test(senha));
  }
});
