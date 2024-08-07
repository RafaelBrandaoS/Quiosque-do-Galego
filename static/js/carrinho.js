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
    const container = event.target.parentElement.parentElement.parentElement
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
