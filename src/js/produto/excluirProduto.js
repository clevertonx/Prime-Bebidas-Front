document.addEventListener('DOMContentLoaded', function () {
    // ...

    // Adiciona o evento de clique aos botões de exclusão
    const botoesExcluir = document.getElementsByClassName('excluir');
    for (let i = 0; i < botoesExcluir.length; i++) {
        botoesExcluir[i].addEventListener('click', function () {
            const idProduto = parseInt(this.getAttribute('data-id'));
            excluirProduto(idProduto);
        });
    }
});

function excluirProduto(id) {
    const token = valorCookie('token');
    axios.delete(`http://localhost:8080/produto/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => {
            if (response.status === 200) {
                console.log("Produto excluído com sucesso");
            } else {
                console.log("Falha ao excluir o produto");
            }
        })
        .catch((error) => {
            console.log("Erro ao excluir o produto:", error);
        });
    location.reload();
}