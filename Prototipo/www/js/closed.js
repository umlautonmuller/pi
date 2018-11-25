var items = document.querySelectorAll("button.call-instances")
var main = document.querySelector('main')

async function createDropdows() {
    let items = document.querySelectorAll("button.call-instances")
    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener("click", ev => {
            if (ev.target.nextElementSibling.classList == "info open") {
                ev.target.nextElementSibling.classList.remove("open")
            } else {
                for (let j = 0; j < items.length; j++) {
                    if (items[j].nextElementSibling.classList == "info open") {
                        items[j].nextElementSibling.classList.remove("open")
                        j = items.length
                    }
                }
                var info = ev.target.nextElementSibling
                info.classList.add("open")
            }
        })
    }
}

async function loadCalls() {
    var request = await fetch('http://200.135.34.110/joaorodrigues/fernando/PHP/chamado/buscar.php?estado=0')

    var calls = await request.json()

    if (calls.result) {
        calls.body.forEach(element => {
            let container = document.createElement('div')
            let button = document.createElement('button')
            let content = document.createElement('div')
            let text = document.createElement('p')

            container.appendChild(button)
            container.appendChild(content)
            content.appendChild(text)
            main.appendChild(container)

            container.classList = 'call-container'
            button.classList = 'call-instances'
            content.classList = 'info'

            text.innerText = element.descricao
            button.innerText = element.nome
        })
        createDropdows()
    }
}

loadCalls()