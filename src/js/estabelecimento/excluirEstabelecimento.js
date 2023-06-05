document.addEventListener('DOMContentLoaded', function () {
    // ...

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
    axios.delete(`http://localhost:8080/estabelecimento/${id}`)
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