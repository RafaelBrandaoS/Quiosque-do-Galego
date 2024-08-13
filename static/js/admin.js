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

    const pDisponivel = document.getElementsByClassName('p-disponivel')
    for (var i = 0; i < pDisponivel.length; i++) {
        pDisponivel[i].addEventListener("click", produtoDisponivel)
    }

    const pIndisponivel = document.getElementsByClassName('p-indisponivel')
    for (var i = 0; i < pIndisponivel.length; i++) {
        pIndisponivel[i].addEventListener("click", produtoIndisponivel)
    }

    const editarProdutos = document.getElementsByClassName('editar-produtos')
    for (var i = 0; i < editarProdutos.length; i++) {
        editarProdutos[i].addEventListener("click", feditarProdutos)
    }

    const imprimir = document.getElementsByClassName('imprimir')
    for (var i = 0; i < imprimir.length; i++) {
        imprimir[i].addEventListener("click", fEnviarCozinha)
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

function produtoDisponivel(event) {
    const container = event.target.parentElement.parentElement
    const idProduto = container.getElementsByClassName('id-produto')[0].innerText
    
    fetch('/produtoDisponivel', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(idProduto)
    })
    .then(result => {
        console.log(result)
        container.classList.remove('recusado'),
        container.classList.add('aceito')
    })
    .catch(error => console.error('Error:',error))
}


function produtoIndisponivel(event) {
    const container = event.target.parentElement.parentElement
    const idProduto = container.getElementsByClassName('id-produto')[0].innerText

    fetch('/produtoIndisponivel', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(idProduto)
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
    const id_pedido = container.getElementsByClassName('id-cliente')[0].innerText
    fetch('/admin/aceitar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id_pedido)
    })
    .then(result => {
        console.log(result)
        container.classList.remove('recusado')
        container.classList.add('aceito')
        comunicarCliente(container)
    })
}

function fEnviarCozinha(event) {
    const container = event.target.parentElement.parentElement
    imprimirPedido(container)
}

function comunicarCliente(container) {
    const telefoneCliente = container.getElementsByClassName('tel-cliente')[0].innerText
    const nomeCliente = container.getElementsByClassName('nome-cliente')[0].innerText
    const mensagem = `Olá ${nomeCliente}, Estamos preparando o seu pedido e logo ele sairá para a entrega, obrigado pela preferência.`

    const msgCod = encodeURIComponent(mensagem)
    let zapJanela = window.open('', '', 'height=800, width=800');
    zapJanela.location.href = `https://wa.me/${telefoneCliente}/?text=${msgCod}`
}

function imprimirPedido(container) {
    const dadosCliente = container.getElementsByClassName('dados-cliente')[0]
    const dadosPedido = container.getElementsByClassName('pedido-cliente')[0]
    const dadosEntrega = container.getElementsByClassName('dados-entrega')[0]
    let novaLanela = window.open('', '', 'height=800, width=800');
    novaLanela.document.write('<html><head><title>Pedido</title>');
    novaLanela.document.write('<link rel="stylesheet" href="../static/estilos/admin.css">'); // Adicione se houver estilos CSS
    novaLanela.document.write('</head><body >');
    novaLanela.document.write(dadosCliente.innerHTML);
    novaLanela.document.write(dadosPedido.innerHTML);
    novaLanela.document.write(dadosEntrega.innerHTML);
    novaLanela.document.write('</body></html>');
    novaLanela.document.close();
    novaLanela.print();
}

function fRecusar(event) {
    const container = event.target.parentElement.parentElement
    const id_pedido = container.getElementsByClassName('id-cliente')[0].innerText
    console.log(id_pedido)
    fetch('/admin/recusar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id_pedido)
    })
    .then(result => {
        console.log(result)
        container.classList.remove('aceito')
        container.classList.add('recusado')
    })
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