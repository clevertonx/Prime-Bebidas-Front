const form = document.getElementById('form-estabelecimento');
const nome = document.getElementById('nome');
const telefone = document.getElementById('telefone');
const horarioAtendimento = document.getElementById('horarioAtendimento');
const numero = document.getElementById('numero');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const logradouro = document.getElementById('logradouro');
const cnpj = document.getElementById('cnpj');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (validarCampos()) {
    cadastrarEstabelecimento();
  }
});

function validarCampos() {
  let valido = true;
  const erros = [];
  const telefoneRegex = /^\(\d{2}\)\s\d{4,5}\-\d{4}$/;
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

  if (nome.value.trim() === '') {
    erros.push('Nome é obrigatório');
    valido = false;
  }
  if (telefone.value.trim() === '') {
    erros.push('Telefone é obrigatório');
    valido = false;
  } else if (!telefoneRegex.test(telefone.value.trim())) {
    erros.push('Telefone inválido (formato esperado: (xx) xxxx-xxxx ou (xx) xxxxx-xxxx)');
    valido = false;
  }
  if (horarioAtendimento.value.trim() === '') {
    erros.push('Horário de atendimento é obrigatório');
    valido = false;
  }
  if (numero.value.trim() === '') {
    erros.push('Número é obrigatório');
    valido = false;
  }
  if (cidade.value.trim() === '') {
    erros.push('Cidade é obrigatória');
    valido = false;
  }
  if (estado.value.trim() === '') {
    erros.push('Estado é obrigatório');
    valido = false;
  }
  if (logradouro.value.trim() === '') {
    erros.push('Logradouro é obrigatório');
    valido = false;
  }
  if (cnpj.value.trim() === '') {
    erros.push('CNPJ é obrigatório');
    valido = false;
  } else if (!cnpjRegex.test(cnpj.value.trim())) {
    erros.push('CNPJ inválido (formato esperado: xx.xxx.xxx/xxxx-xx)');
    valido = false;
  }

  if (!valido) {
    alert(erros.join('\n'));
  }

  return valido;
}

function cadastrarEstabelecimento() {
  const url = 'http://localhost:8080/estabelecimento';
  const estabelecimento = {
    nome: nome.value.trim(),
    telefone: telefone.value.trim(),
    horarioAtendimento: horarioAtendimento.value.trim(),
    numero: numero.value.trim(),
    cidade: cidade.value.trim(),
    estado: estado.value.trim(),
    logradouro: logradouro.value.trim(),
    cnpj: cnpj.value.trim()
  };
  axios.post(url, estabelecimento)
    .then((response) => {
      alert('Estabelecimento cadastrado com sucesso!');
      form.reset();
    })
    .catch((error) => {
      alert('Erro ao cadastrar estabelecimento');
      console.error(error);
    });
}