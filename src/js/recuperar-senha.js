var urlParams = new URLSearchParams(window.location.search);
var token = urlParams.get('token');

document.getElementById('editar-password-usuario').value = token;