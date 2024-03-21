function obterIdEstabelecimento() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function preencherCamposEstabelecimento(estabelecimento) {
    document.getElementById('nome').value = estabelecimento.nome;
    document.getElementById('telefone').value = estabelecimento.telefone;
    document.getElementById('horarioAtendimento').value = estabelecimento.horarioAtendimento;
    document.getElementById('cep').value = estabelecimento.cep;
    document.getElementById('numero').value = estabelecimento.numero;
    document.getElementById('cidade').value = estabelecimento.cidade;
    document.getElementById('logradouro').value = estabelecimento.logradouro;
    document.getElementById('bairro').value = estabelecimento.bairro;
    document.getElementById('estado').value = estabelecimento.estado;
    document.getElementById('cnpj').value = estabelecimento.cnpj;
}

// Função para obter o valor do cookie do Id do Usuário
function valorCookie(idUsuario) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(idUsuario + '=')) {
            return cookie.substring(idUsuario.length + 1);
        }
    }
    return null;
}

function carregarEstabelecimento(idEstabelecimento) {
    const token = valorCookie('token'); // Obtém o ID do usuário dos cookies

    axios.get('http://localhost:8080/estabelecimento/' + idEstabelecimento, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(function (response) {
            // Dados obtidos com sucesso
            var estabelecimento = response.data;
            preencherCamposEstabelecimento(estabelecimento);
        })
        .catch(function (error) {
            // Ocorreu um erro ao obter os dados da API
            console.log(error);
        });
}

// Obtém o ID do estabelecimento da URL e carrega os dados do estabelecimento correspondente
const idEstabelecimento = obterIdEstabelecimento();
carregarEstabelecimento(idEstabelecimento);

function salvarAlteracoes(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém o ID do estabelecimento
    const idEstabelecimento = obterIdEstabelecimento();

    // Obtém os valores dos campos
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const horarioAtendimento = document.getElementById('horarioAtendimento').value;
    const cep = document.getElementById('cep').value;
    const numero = document.getElementById('numero').value;
    const cidade = document.getElementById('cidade').value;
    const logradouro = document.getElementById('logradouro').value;
    const bairro = document.getElementById('bairro').value;
    const estado = document.getElementById('estado').value;
    const cnpj = document.getElementById('cnpj').value;
    // Obtenha os valores dos outros campos aqui...

    // Crie um objeto com os dados do estabelecimento
    const estabelecimento = {
        nome: nome,
        telefone: telefone,
        horarioAtendimento: horarioAtendimento,
        cep: cep,
        numero: numero,
        cidade: cidade,
        logradouro: logradouro,
        bairro: bairro,
        estado: estado,
        cnpj: cnpj,
        // Adicione os outros campos ao objeto aqui...
    };

    estabelecimento['_method'] = 'PUT';

    // Faça uma requisição PUT para salvar as alterações
    axios.put(`http://localhost:8080/estabelecimento/${idEstabelecimento}`, estabelecimento)
        .then(function (response) {
            // Alterações salvas com sucesso
            console.log(response.data);
            // Faça algo após salvar as alterações, como redirecionar para outra página
            const url = `./estabelecimentos.html?id=${idEstabelecimento}&nome=${nome}&telefone=${telefone}&horarioAtendimento=${horarioAtendimento}&cep=${cep}&numero=${numero}&cidade=${cidade}&logradouro=${logradouro}&bairro=${bairro}&estado=${estado}&cnpj=${cnpj}`;
            // Navegue para a página anterior com os dados atualizados
            window.location.href = url;
        })
        .catch(function (error) {
            // Ocorreu um erro ao salvar as alterações
            console.log(error);
            // Lide com o erro de acordo com seus requisitos
        });
}

// Adicione o evento de envio do formulário à função salvarAlteracoes
document.getElementById('form-estabelecimento').addEventListener('submit', salvarAlteracoes);

function editarRegistro(idEstabelecimento) {
    window.location.href = './editarEstabelecimento.html?id=' + idEstabelecimento;
}