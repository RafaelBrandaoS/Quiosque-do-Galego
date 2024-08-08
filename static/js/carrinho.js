document.addEventListener("DOMContentLoaded", eventos)

function eventos() {
    const btnRemover = document.getElementsByClassName('remover')
    for (var i = 0; i < btnRemover.length; i++) {
        btnRemover[i].addEventListener("click", obterDadosRemove)
    }

    const mais = document.getElementsByClassName('mais')
    for (var i = 0; i < mais.length; i++) {
        mais[i].addEventListener("click", (event) => {
            const qtd = event.target.parentElement.getElementsByClassName('qtd')[0]
            let quant = +qtd.innerText + 1
            qtd.innerText = quant
            atualizaTotal()
        })
    }

    const menos = document.getElementsByClassName('menos')
    for (var i = 0; i < menos.length; i++) {
        menos[i].addEventListener("click", (event) => {
            const qtd = event.target.parentElement.getElementsByClassName('qtd')[0]
            if (+qtd.innerText > 1) {
                let quant = +qtd.innerText - 1
                qtd.innerText = quant
                atualizaTotal()
            }
        })
    }

    atualizaTotal()

    const btn_finalizar = document.getElementsByClassName('btn-finalizar')[0]
    btn_finalizar.addEventListener("click", finalizarPedido)
}

function finalizarPedido() {
    const container = document.getElementsByClassName('carrinho-produtos')[0]
    let confirmar = document.createElement('div')
    confirmar.innerHTML = `
    <h3>Quer finalizar o pedido?</h3>
    <div>
        <button class="nao">Não</button>
        <button class="sim">Sim</button>
    </div>
    `
    confirmar.classList.add('confirmar-finalizar')
    container.append(confirmar)
    const nao = document.getElementsByClassName('nao')[0]
    nao.addEventListener("click", () => {
        confirmar.remove()
    })
    const sim = document.getElementsByClassName('sim')[0]
    sim.addEventListener("click", obterDadosProdutoPedido)
}

function obterDadosProdutoPedido() {
    const container = document.getElementsByClassName('carrinho-produtos')[0]
    const total = document.getElementsByClassName('total')[0].innerText
    let pedido = []
    const produtos = container.getElementsByClassName('produto-n-carrinho')
    for (var i = 0; i < produtos.length; i++) {
        const nome = produtos[i].getElementsByClassName('nome-produto-carrinho')[0].innerText
        const preco = produtos[i].getElementsByClassName('dados-preco')[0].innerText
        const qtd = produtos[i].getElementsByClassName('qtd')[0].innerText
        const acom = produtos[i].getElementsByClassName('dados-acom')[0].innerText
        const obs = produtos[i].getElementsByClassName('dados-obs')[0].innerText
        let produto = {'nome': nome, 'prco': preco, 'qtd': qtd, 'acom': acom, 'obs': obs}
        pedido.push(produto)
    }
    pedido.push({'total': total})
    enviarDadosPedido(pedido)
}

function enviarDadosPedido(pedido) {
    fetch("/obterPedido", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    })
    .catch(error => console.error('Error:', error))
    window.location.href = "/finalizar";
}

function atualizaTotal() {
    let total = 0
    const produtos = document.getElementsByClassName('produto-n-carrinho')
    for (var i = 0; i < produtos.length; i++) {
        const preco = produtos[i].querySelector('.p-preco > span').innerText
        const quantidade = produtos[i].getElementsByClassName('qtd')[0].innerText

        total += +preco * +quantidade
    }

    total = total.toFixed(2)

    document.getElementsByClassName('total')[0].innerText = total
}

function obterDadosRemove(event) {
    const container = event.target.parentElement.parentElement
    const nome = container.getElementsByClassName('nome-produto-carrinho')[0].innerText
    const acom = container.getElementsByClassName('dados-acom')[0].innerText
    const obs = container.getElementsByClassName('dados-obs')[0].innerText
    dados = {'nome': nome, 'acom': acom, 'obs': obs}
    enviarDadosRemover(dados)
    container.remove()
    atualizaTotal()
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
