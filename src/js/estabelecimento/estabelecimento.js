const botaoSubmit = document.getElementById('botao-estabelecimento');

function aplicarMascarasValidacoes() {
    // Máscara e validação para o campo de nome
    $('#nome').inputmask({ regex: "[A-Za-zÀ-ÿ ]{1,30}" });

    // Máscara para o campo de telefone
    $('#telefone').inputmask('(99) 99999-9999');

    // Máscara para o campo de horário de atendimento
    $('#horarioAtendimento').inputmask('99:99 ás 99:99');

    // Máscara para o campo de CNPJ
    $('#cnpj').inputmask('99.999.999/9999-99');

    // Máscara e validação para o campo de estado
    $('#estado').inputmask({ regex: "[A-Za-z]{2}" });

    // Máscara e validação para o campo de cidade
    $('#cidade').inputmask({ regex: "[A-Za-zÀ-ÿ ]{1,15}" });

    // Máscara e validação para o campo de logradouro
    $('#logradouro').inputmask({ regex: "[A-Za-zÀ-ÿ0-9 ]{1,30}" });

    // Máscara e validação para o campo de número
    $('#numero').inputmask({ regex: "[0-9]{1,6}" });
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

// Função para cadastrar um estabelecimento, com vinculo do Usuário 
function cadastrarEstabelecimento() {
    const idUsuario = valorCookie('idUsuario'); // Obtém o ID do usuário dos cookies
    const token = valorCookie('token'); // Obtém o ID do usuário dos cookies

    // Dados do formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const horarioAtendimento = document.getElementById('horarioAtendimento').value;
    const numero = document.getElementById('numero').value;
    const cidade = document.getElementById('cidade').value;
    const logradouro = document.getElementById('logradouro').value;
    const estado = document.getElementById('estado').value;
    const cnpj = document.getElementById('cnpj').value;

    // Objeto do estabelecimento
    const estabelecimentoData = {
        nome,
        telefone,
        horarioAtendimento,
        numero,
        cidade,
        logradouro,
        estado,
        cnpj,
        idUsuario: idUsuario
    };
    // Faz a requisição POST para cadastrar o estabelecimento
    axios.post('http://localhost:8080/estabelecimento', estabelecimentoData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => {
            // Redireciona ou executa outras ações após o cadastro
            window.location.href = 'estabelecimentos.html';
            console.log(response.data);
            if (response.data && response.data.id) {
                document.cookie = 'idEstabelecimento=' + response.data.id;
                alert("O estabelecimento " + response.data.nome + " foi criado com sucesso");
            } else {
                console.log("Resposta inválida do servidor após o cadastro do estabelecimento");
            }
            // Gera Cookie para o Estabelecimento cadastrado
            document.cookie = 'idEstabelecimento=' + response.data.id;
        })
        .catch((error) => {
            // Erros da requisição (fazer)
            console.log(error);
        });
}
document.addEventListener('DOMContentLoaded', function () {
    botaoSubmit.addEventListener('click', (event) => {
        event.preventDefault(); 
        cadastrarEstabelecimento(); 
    });
});


// Função para obter os dados do Cadastro
function obterDadosDaAPI() {

    const idUsuario = valorCookie('idUsuario');
    const token = valorCookie('token');

    axios.get('http://localhost:8080/usuario/' + idUsuario + '/estabelecimento', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(function (response) {
            // Dados obtidos com sucesso
            var dados = response.data;
            popularTabela(dados);
        })
        .catch(function (error) {
            // Ocorreu um erro ao obter os dados da API
            console.log(error);
        });
}

// Função para preenchimento dinâmico da tabela
function popularTabela(dados) {
    const tabelaBody = document.getElementById('tabela-body');

    // Limpa o conteúdo atual da tabela
    tabelaBody.innerHTML = '';

    // Percorre os dados e cria as linhas da tabela
    for (var i = 0; i < dados.length; i++) {
        var linha = document.createElement('tr');
        linha.innerHTML = '<td>' + dados[i].id + '</td>' +
            '<td>' + dados[i].nome + '</td>' +
            '<td>' + dados[i].logradouro + '</td>' +
            '<td>' + dados[i].telefone + '</td>' +
            '<td>' + dados[i].cnpj + '</td>' +
            '<td><button class="editar" onclick="editarRegistro(' + dados[i].id + ')">Editar</button></td>' +
            '<td><button class="excluir" onclick="excluirRegistro(' + dados[i].id + ')">Excluir</button></td>';

        tabelaBody.appendChild(linha);
    }
}

window.onload = function () {
    obterDadosDaAPI();
    aplicarMascarasValidacoes();
};

document.getElementById("logout").addEventListener('click', () => {
    document.cookie = 'idUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'idEstabelecimento=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'idProduto=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
});

function editarRegistro(idEstabelecimento) {
    window.location.href = './editarEstabelecimento.html?id=' + idEstabelecimento;
}