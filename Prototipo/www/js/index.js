var btLogin = document.querySelector('button.button')

const request = async function (ev) {
    var email = document.querySelector('input#email').value
    var senha = document.querySelector('input#password').value
    ev.preventDefault()
    var request = await fetch('http://200.135.34.110/joaorodrigues/fernando/PHP/listar.php?email=' + email + '&senha=' + senha)
    var response = await request.json()
    if (response.result) {
        window.sessionStorage.setItem('id_usuario', response.id)
        window.location.href = "main.html"
    } else {
        alert('Errou')
    }
}

btLogin.addEventListener('click', request)