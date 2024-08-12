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

    const disponivel = document.getElementsByClassName('disponivel')
    for (var i = 0; i < disponivel.length; i++) {
        disponivel[i].addEventListener("click", fdisponivel)
    }

    const indisponivel = document.getElementsByClassName('indisponivel')
    for (var i = 0; i < indisponivel.length; i++) {
        indisponivel[i].addEventListener("click", findisponivel)
    }

    const editarProdutos = document.getElementsByClassName('editar-produtos')
    for (var i = 0; i < editarProdutos.length; i++) {
        editarProdutos[i].addEventListener("click", feditarProdutos)
    }
}


function fdisponivel(event) {
    const container = event.target.parentElement.parentElement
    const sessao = container.getElementsByClassName('nome-sessao')[0].innerText

    fetch('/disponivel', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(sessao)
    })
    .then(result => {
        console.log(result)
        container.classList.remove('recusado'),
        container.classList.add('aceito')
    })
    .catch(error => console.error('Error:',error))
}

function findisponivel(event) {
    const container = event.target.parentElement.parentElement
    const sessao = container.getElementsByClassName('nome-sessao')[0].innerText
    
    fetch('/indisponivel', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(sessao)
    })
    .then(result => {
        console.log(result)
        container.classList.remove('aceito'),
        container.classList.add('recusado')
    })
    .catch(error => console.error('Error:',error))
}


function feditarProdutos(event) {
    const container = event.target.parentElement.parentElement
    const sessao = container.getElementsByClassName('nome-sessao')[0].innerText
    console.log(sessao)
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