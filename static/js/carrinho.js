document.addEventListener("DOMContentLoaded", eventos)

function eventos() {
    const btnRemover = document.getElementsByClassName('remover')
    for (var i = 0; i < btnRemover.length; i++) {
        btnRemover[i].addEventListener("click", obterDadosRemove)
    }
}

function obterDadosRemove(event) {
    const container = event.target.parentElement.parentElement.parentElement
    const nome = container.getElementsByClassName('dados-nome')[0].innerText
    const acom = container.getElementsByClassName('dados-acom')[0].innerText
    const obs = container.getElementsByClassName('dados-obs')[0].innerText
    dados = {'nome': nome, 'acom': acom, 'obs': obs}
    console.log(dados)
    enviarDadosRemover(dados)
    container.remove()
}

function enviarDadosRemover(dados) {
    console.log(dados)
    fetch('/removerProdutoCarrinho', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.text())
    .catch(error => console.error('Error:', error))
}
