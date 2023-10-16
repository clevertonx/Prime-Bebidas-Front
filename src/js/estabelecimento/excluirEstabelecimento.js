document.addEventListener('DOMContentLoaded', function () {
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


    // Adiciona o evento de clique aos botões de exclusão
    const botoesExcluir = document.getElementsByClassName('excluir');
    for (let i = 0; i < botoesExcluir.length; i++) {
        botoesExcluir[i].addEventListener('click', function () {
            const idEstabelecimento = parseInt(this.getAttribute('data-id'));
            excluirRegistro(idEstabelecimento);
        });
    }
});

function excluirRegistro(id) {
    const token = valorCookie('token');
    axios.delete(`http://localhost:8080/estabelecimento/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => {
            if (response.status === 200) {
                console.log("Registro excluído com sucesso");
            } else {
                console.log("Falha ao excluir o registro");
            }
        })
        .catch((error) => {
            console.log("Erro ao excluir o registro:", error);
        });
    location.reload();
}