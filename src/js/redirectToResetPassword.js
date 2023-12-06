const token = new URLSearchParams(window.location.search).get('token');
document.getElementById('tokenInput').value = token;