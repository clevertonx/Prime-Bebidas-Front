// Importe o Axios
import axios from 'axios';

// Obtenha o ID do usuário do armazenamento local ou do URL
const userId = localStorage.getItem('userId') || window.location.href.split('/').pop();

// Faça uma solicitação HTTP GET para buscar as informações do usuário
axios.get(`http://localhost:8080/usuario/${userId}`)
  .then(response => {
    // Armazene as informações do usuário em variáveis
    const email = response.data.email;
    const password = response.data.password;

    // Preencha os campos de e-mail e senha com as informações do usuário
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
  })
  .catch(error => {
    console.error(error);
  });
