import axios from 'axios';
import { criarCookie } from './autenticacao';

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
        // criarCookie(response.data.id)
        window.location.href = 'logado.html';
      })
      .catch(error => {
        console.error(error);
      });
    });
  });


// Login

document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.getElementById('email_login');
  const senhaInput = document.getElementById('senha_login');
  const botaoSubmit = document.getElementById('botao-logar');

  botaoSubmit.addEventListener('click', function (event) {
    event.preventDefault();

    const email = emailInput.value;
    const senha = senhaInput.value;

    axios.post('http://localhost:8080/login', {email, senha }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
        criarCookie(response.data.id)
        window.location.href = 'logado.html';
      })
      .catch(error => {
        console.error(error);
      });
    });
  });
  
  
  // // Editar Perfil:
  // // Obtenha o ID do usuário do armazenamento local ou do URL
  // const id = localStorage.getItem('idUsuario') || window.location.href.split('/').pop();
  
  // // Faça uma solicitação HTTP GET para buscar as informações do usuário
  // axios.put(`http://localhost:8080/usuario/${id}`)
  // .then(response => {
  //   // Armazene as informações do usuário em variáveis
  //   const email = response.data.email;
  //   const password = response.data.password;
    
  //   // Preencha os campos de e-mail e senha com as informações do usuário
  //   document.getElementById('email').value = email;
  //   document.getElementById('password').value = password;
  //   window.location.href = 'logado.html';
  // })
  // .catch(error => {
  //   console.error(error);
  // });
