document.addEventListener("DOMContentLoaded", eventos)

function eventos() {
    const aceitar = document.getElementsByClassName('aceitar')
    for (var i = 0; i < aceitar.length; i++) {
        aceitar[i].addEventListener("click", fAceitar)
    }

    const recusar = document.getElementsByClassName('recusar')
    for (var i = 0; i < recusar.length; i++) {
        recusar[i].addEventListener("click", fRecusar)
    }

    const finalizar = document.getElementsByClassName('finalizar')
    for (var i = 0; i < finalizar.length; i++) {
        finalizar[i].addEventListener("click", ffinalizar)
    }
}

function fAceitar(event) {
    const container = event.target.parentElement.parentElement
    container.classList.remove('recusado')
    container.classList.add('aceito')
}

function fRecusar(event) {
    const container = event.target.parentElement.parentElement
    container.classList.remove('aceito')
    container.classList.add('recusado')
}

function ffinalizar(event) {
    const container = event.target.parentElement.parentElement
    const idCliente = container.getElementsByClassName('id-cliente')[0].innerText
    console.log(idCliente)
    if (container.classList.contains('aceito') || container.classList.contains('recusado')) {
        fetch('/admin/finalizarPedido', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(idCliente)
        })
        .then(result => {
            console.log('Sucesso:', result);
            container.remove()
        })
        .catch(error => console.error('Error:', error))
    } else {
        alert('aceite ou recuse o pedido para finalizalo!')
    }
}