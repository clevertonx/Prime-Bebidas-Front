export function criarCookie(idUsuario) {
    document.cookie = "idUsuario=" + idUsuario;
}

export function resetarCookie() {
    document.cookie = "idUsuario=;";
}

export function usuarioLogado() {
    var cookies = document.cookie;

    let idUsuario;
    cookies.split(';').forEach(function (cookie) {
        let [nome, valor] = cookie.split('=');
        if (nome=="idUsuario"){
            idUsuario = valor;
        }
    })

    return idUsuario;
}

export async function obterUsuarioLogado(){
    return await obterUsuario(usuarioLogado());
}


document.getElementById("logout").addEventListener(() => {
  document.cookie = 'idUsuario=';
})
