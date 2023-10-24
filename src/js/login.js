let loginAttempts = 0;
let waitingTime = 0;
function updateWaitingTime() {
    const tempoDeEsperaElement = document.getElementById('tempo-de-espera');
    const minutes = Math.floor(waitingTime / 60000);
    const seconds = Math.floor((waitingTime % 60000) / 1000);

    if (waitingTime > 0) {
        tempoDeEsperaElement.textContent = `Aguarde ${minutes} minutos e ${seconds} segundos`;
    } else {
        tempoDeEsperaElement.textContent = '';
    }
}

function startTimer() {
    timer = setInterval(() => {
        waitingTime -= 1000;
        updateWaitingTime();
        if (waitingTime <= 0) {
            clearInterval(timer);
            localStorage.removeItem('waitingTime');
            updateWaitingTime();
        }
    }, 1000);
}

function showModalError(message) {
    const modal = document.getElementById('loginModal');
    const modalMessage = document.getElementById('modalMessage');
    modal.style.display = 'block';
    modalMessage.innerHTML = message;
}

document.getElementById('closeModalAttempt').addEventListener('click', function () {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email_login');
    const senhaInput = document.getElementById('senha_login');
    const botaoSubmit = document.getElementById('botao-login');

    waitingTime = parseInt(localStorage.getItem('waitingTime')) || 0;

    if (waitingTime > 0) {
        updateWaitingTime();
        startTimer();
    }

    botaoSubmit.addEventListener('click', function (event) {
        event.preventDefault();
        if (loginAttempts < 3) {
            const email = emailInput.value;
            const senha = senhaInput.value;

            axios.post('http://localhost:8080/usuario/login', { email, senha }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data);
                    document.cookie = 'idUsuario=' + response.data;
                    window.location.href = 'logado.html';
                })
                .catch(error => {
                    console.error(error);
                    loginAttempts++;
                    if (loginAttempts === 3) {

                        waitingTime = 3 * 60 * 1000;
                        localStorage.setItem('waitingTime', waitingTime);
                        updateWaitingTime();
                        startTimer();
                    }
                    showModalError("Usuário ou senha inválidos. Tentativas restantes: " + (3 - loginAttempts));
                });
        } else {
            showModalError("Você excedeu o limite de tentativas. Aguarde 3 minutos para tentar novamente.");
        }
    });
});

document.getElementById("logout").addEventListener('click', () => {
    loginAttempts = 0;
    localStorage.removeItem('waitingTime');
    document.cookie = 'idUsuario=';
    updateWaitingTime();
});