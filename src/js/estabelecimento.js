const form = document.querySelector('#form-estabelecimento')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(form)

    axios.post('http://localhost:8080/estabelecimento', {
        nome: formData.get('nome'),
        telefone: formData.get('telefone'),
        horarioAtendimento: formData.get('horarioAtendimento'),
        numero: formData.get('numero'),
        cidade: formData.get('cidade'),
        logradouro: formData.get('logradouro'),
        estado: formData.get('estado'),
        cnpj: formData.get('cnpj'),
        usuario: {
            email: 'email_do_usuario',
            senha: 'senha_do_usuario'
        }
    }).then(response => {
        console.log('Estabelecimento cadastrado com sucesso:', response.data)
        alert('Estabelecimento cadastrado com sucesso!')
    }).catch(error => {
        console.error('Erro ao cadastrar estabelecimento:', error)
        alert('Erro ao cadastrar estabelecimento!')
    })
})
