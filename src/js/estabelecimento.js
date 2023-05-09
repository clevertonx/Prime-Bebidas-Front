function obterCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}

const userId = obterCookie("userId");


// Função para criar um estabelecimento
async function criarEstabelecimento(userId, estabelecimentoData) {
    try {
        // Realizar uma requisição POST para o backend
        const response = await axios.post("http://localhost:8080/estabelecimento", {
            usuario: userId,
            ...estabelecimentoData
        });

        // Verificar a resposta do servidor
        if (response.status === 200) {
            console.log("Estabelecimento criado com sucesso!");
            // Realizar outras ações, se necessário
        }
    } catch (error) {
        console.error("Erro ao criar estabelecimento:", error);
    }
}


// Obter o formulário
const formEstabelecimento = document.getElementById("form-estabelecimento");

// Lidar com o envio do formulário
formEstabelecimento.addEventListener("submit", function (event) {
    event.preventDefault(); // Impedir o envio padrão do formulário

    // Obter os valores dos campos do formulário
    const nomeEstabelecimento = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const horarioAtendimento = document.getElementById("horarioAtendimento").value;
    const numero = document.getElementById("numero").value;
    const cidade = document.getElementById("cidade").value;
    const logradouro = document.getElementById("logradouro").value;
    const estado = document.getElementById("estado").value;
    const cnpj = document.getElementById("cnpj").value;

    // Criar objeto com os dados do estabelecimento
    const estabelecimentoData = {
        nome: nomeEstabelecimento,
        telefone: telefone,
        horarioAtendimento: horarioAtendimento,
        numero: numero,
        cidade: cidade,
        logradouro: logradouro,
        estado: estado,
        cnpj: cnpj,
        usuario: idUsuario
    };

    // Chamar a função para criar o estabelecimento
    criarEstabelecimento(userId, estabelecimentoData);
});