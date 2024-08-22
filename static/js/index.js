document.addEventListener("DOMContentLoaded", eventos)

function eventos() {
    const navLink = document.getElementsByClassName('nav-link')
    for (var i = 0; i < navLink.length; i++) {
        navLink[i].addEventListener("click", (event) => {
            event.preventDefault()
            const butao = event.target
            const sessao = butao.getAttribute('data-section')
            carregarSessao(sessao)
        })
    }

    clickProduto()

}

function clickProduto() {
    const produtos = document.getElementsByClassName('produto')
    for (var i = 0; i < produtos.length; i++) {
        produtos[i].addEventListener("click", mostrarDetalhes)
    }
}

function mostrarDetalhes(event) {
    const produto = event.currentTarget
    const p_imagem = produto.querySelector('.produto > img').src
    const p_nome = produto.getElementsByClassName('nome-produto')[0].innerText
    const p_preco = produto.querySelector('.p-preco > span').innerText
    const amostra = document.getElementsByClassName('detalhes')
    document.body.style.overflowY = 'hidden'
    for (var i = 0; i < amostra.length; i++) {
        amostra[i].remove()
    }
    const container = document.querySelector('body')
    let detalhes = document.createElement('div')
    if (produto.classList.contains('feijoada')){
        detalhes.innerHTML = `
        <div class="dados-detalhes">
            <div>
                <img src="${p_imagem}" alt="${p_nome}">
            </div>
            <div class="dados-produto-detalhes">
                <p>Marmitex</p>
                <h2 class="nome-detalhes">${p_nome}</h2>
                <p class="p-preco">R$ <samp class="preco-produto" >${p_preco}</samp></p>
            </div>
            <div class="acompanhamentos">
                <label class="acc" for="arroz"><input class="acc-feijoada" type="checkbox" name="arroz" id="arroz"> Arroz</label>
                <label class="acc" for="couve"><input class="acc-feijoada" type="checkbox" name="couve" id="couve"> Couve Refogado</label>
                <label class="acc" for="farofa"><input class="acc-feijoada" type="checkbox" name="farofa" id="farofa"> Farofa da Casa</label>
                <label class="acc" for="torresmo"><input class="acc-feijoada" type="checkbox" name="torresmo" id="torresmo"> Torresmo</label>
                <label class="obs" for="obs">Observação: <input  type="text" name="obs" id="obs" autocomplete="off"></label>
            </div>
            <div class="butoes-detalhes">
                <button class="add-carrinho cancelar">Cancelar</button>
                <button class="add-carrinho adicionar">Adicionar ao Carrinho</button>
            </div>
        </div>
        `
    } else if (produto.classList.contains('pratos')) {
        detalhes.innerHTML = `
        <div class="dados-detalhes">
            <div>
                <img src="${p_imagem}" alt="${p_nome}">
            </div>
            <div class="dados-produto-detalhes">
                <p>Marmitex</p>
                <h2 class="nome-detalhes">${p_nome}</h2>
                <p class="p-preco">R$ <samp class="preco-produto" >${p_preco}</samp></p>
                <h3>Escolha 4 acompanhamentos.</h3>
                <p>extra será cobrado R$ 5.00 a mais</p>
            </div>
            <div class="acompanhamentos">
                <label class="acc" for="arroz"><input class="acc-pratos" type="checkbox" name="arroz" id="arroz"> Arroz</label>
                <label class="acc" for="batata"><input class="acc-pratos" type="checkbox" name="batata" id="batata"> Batata Frita</label>
                <label class="acc" for="farofa"><input class="acc-pratos" type="checkbox" name="farofa" id="farofa"> Farofa da Casa</label>
                <label class="acc" for="caldo"><input class="acc-pratos" type="checkbox" name="caldo" id="caldo"> Feijão de Caldo</label>
                <label class="acc" for="tropeiro"><input class="acc-pratos" type="checkbox" name="tropeiro" id="tropeiro"> Feijão Tropeiro</label>
                <label class="acc" for="mandioca"><input class="acc-pratos" type="checkbox" name="mandioca" id="mandioca"> Mandioca Cozida</label>
                <label class="acc" for="ovo"><input class="acc-pratos" type="checkbox" name="ovo" id="ovo"> Ovo Frito</label>
                <label class="acc" for="salada"><input class="acc-pratos" type="checkbox" name="salada" id="salada"> Salada Alface e Tomate</label>
                <label class="obs" for="obs">Observação: <input  type="text" name="obs" id="obs" autocomplete="off"></label>
            </div>
            <div class="butoes-detalhes">
                <button class="add-carrinho cancelar">Cancelar</button>
                <button class="add-carrinho adicionar">Adicionar ao Carrinho</button>
            </div>
        </div>
        `
    } else if (produto.classList.contains('jantinha')) {
        detalhes.innerHTML = `
        <div class="dados-detalhes">
            <div>
                <img src="${p_imagem}" alt="${p_nome}">
            </div>
            <div class="dados-produto-detalhes">
                <h2 class="nome-detalhes">${p_nome}</h2>
                <p class="p-preco">R$ <samp class="preco-produto" >${p_preco}</samp></p>
                <h3>Escolha os acompanhamentos.</h3>
            </div>
            <div class="acompanhamentos">
                <label class="acc" for="arroz"><input class="acc-jantinha" type="checkbox" name="arroz" id="arroz"> Arroz</label>
                <label class="acc" for="tropeiro"><input class="acc-jantinha" type="checkbox" name="tropeiro" id="tropeiro"> Feijão Tropeiro</label>
                <label class="acc" for="mandioca"><input class="acc-jantinha" type="checkbox" name="mandioca" id="mandioca"> Mandioca Cozida</label>
                <label class="acc" for="vinagrete"><input class="acc-jantinha" type="checkbox" name="vinagrete" id="vinagrete"> Vinagrete</label>
                <label class="obs" for="obs">Observação: <input  type="text" name="obs" id="obs" autocomplete="off"></label>
            </div>
            <div class="butoes-detalhes">
                <button class="add-carrinho cancelar">Cancelar</button>
                <button class="add-carrinho adicionar">Adicionar ao Carrinho</button>
            </div>
        </div>
        `
    }  else if (produto.classList.contains('hamburguer')) {
        detalhes.innerHTML = `
        <div class="dados-detalhes">
            <div>
                <img src="${p_imagem}" alt="${p_nome}">
            </div>
            <div class="dados-produto-detalhes">
                <h2 class="nome-detalhes">${p_nome}</h2>
                <p class="p-preco">R$ <samp class="preco-produto" >${p_preco}</samp></p>
                <h3>Combo mais R$12.50:</h3>
                <p>Refri Lata e Batata Frita</p>
                <label class="acc" for="combo"><input class="combo" type="checkbox" name="combo" id="combo"> Combo</label>
            </div>
            <div class="acompanhamentos">
                <h3 class="tt-molhos">Escolha 1 Molho:</h3>
                <p class="tt-molhos">extra será cobrado R$ 3.90 a mais</p>
                <label class="acc" for="barbecue"><input class="molhos" type="checkbox" name="barbecue" id="barbecue"> Barmecue</label>
                <label class="acc" for="catchup"><input class="molhos" type="checkbox" name="catchup" id="catchup"> Catchup</label>
                <label class="acc" for="alho"><input class="molhos" type="checkbox" name="alho" id="alho"> Molho de Alho</label>
                <label class="acc" for="maionese"><input class="molhos" type="checkbox" name="maionese" id="maionese"> Maionese Grill</label>
                <label class="acc" for="mostarda"><input class="molhos" type="checkbox" name="mostarda" id="mostarda"> Mostarda com Melaço</label>
                <label class="obs" for="obs">Observação: <input  type="text" name="obs" id="obs" autocomplete="off"></label>
            </div>
            <div class="butoes-detalhes">
                <button class="add-carrinho cancelar">Cancelar</button>
                <button class="add-carrinho adicionar">Adicionar ao Carrinho</button>
            </div>
        </div>
        `
    } else {
        detalhes.innerHTML = `
        <div class="dados-detalhes">
            <div>
                <img src="${p_imagem}" alt="${p_nome}">
            </div>
            <div class="dados-produto-detalhes">
                <h2 class="nome-detalhes">${p_nome}</h2>
                <p class="p-preco">R$ <samp class="preco-produto" >${p_preco}</samp></p>
            </div>
            <div class="acompanhamentos">
                <label class="obs" for="obs">Observação: <input  type="text" name="obs" id="obs" autocomplete="off"></label>
            </div>
            <div class="butoes-detalhes">
                <button class="add-carrinho cancelar">Cancelar</button>
                <button class="add-carrinho adicionar">Adicionar ao Carrinho</button>
            </div>
        </div>
        `
    }
    detalhes.classList.add('detalhes')
    container.append(detalhes)

    const fexar = detalhes.getElementsByClassName('cancelar')[0]
    fexar.addEventListener("click", () => {
        detalhes.remove()
        document.body.style.overflowY = 'scroll'
    })
    const addCarrinhoBtn = detalhes.getElementsByClassName('adicionar')[0]
    addCarrinhoBtn.addEventListener("click", obterDadosProduto)

    const pratosAcc =  detalhes.querySelectorAll('.acc-pratos')
    quant = 0
    for (var i = 0; i < pratosAcc.length; i++) {
        pratosAcc[i].addEventListener('change', function () {
            if (this.checked) {
                quant += 1
            } else {
                quant -= 1
            }
            if (quant > 4) {
                let valor = +p_preco + ((quant - 4) * 5)
                valor = valor.toFixed(2)
                document.getElementsByClassName('preco-produto')[0].innerText = valor
            } else {
                document.getElementsByClassName('preco-produto')[0].innerText = p_preco
            }
        });
    }

    const hamburguerCombo = detalhes.querySelector('.combo')
    hamburguerCombo.addEventListener("change", function () {
        const precoProduto = document.getElementsByClassName('preco-produto')[0].innerText
        let valor = 12.50
        if (this.checked) {
            valor += +precoProduto
            valor = valor.toFixed(2)
            document.getElementsByClassName('preco-produto')[0].innerText = valor
        } else {
            valor = +precoProduto - +valor
            valor = valor.toFixed(2)
            document.getElementsByClassName('preco-produto')[0].innerText = valor
        }
    })

    const hamburguerMolhos = detalhes.querySelectorAll('.molhos')
    qtdMolho = 0
    for (var i = 0; i < hamburguerMolhos.length; i++) {
        hamburguerMolhos[i].addEventListener("change", function () {
            const precoProduto = document.getElementsByClassName('preco-produto')[0].innerText
            if (this.checked) {
                qtdMolho += 1
            } else {
                qtdMolho -= 1
            }
            if (qtdMolho > 1) {
                let valor = 0
                if (hamburguerCombo.checked) {
                    valor = (+p_preco + ((qtdMolho - 1) * 3.90)) + 12.50
                    valor = valor.toFixed(2)
                } else {
                    valor = (+p_preco + ((qtdMolho - 1) * 3.90))
                    valor = valor.toFixed(2)
                }
                document.getElementsByClassName('preco-produto')[0].innerText = valor
            } else {
                if (hamburguerCombo.checked) {
                    let t = +p_preco + 12.50
                    t = t.toFixed(2)
                    document.getElementsByClassName('preco-produto')[0].innerText = t
                } else {
                    let t = +p_preco
                    t = t.toFixed(2)
                    document.getElementsByClassName('preco-produto')[0].innerText = t
                }
            }
        })
    }

    const opcoes = detalhes.querySelectorAll('.acc > input')
    for (var i = 0; i < opcoes.length; i++) {
        opcoes[i].addEventListener('change', function () {
            if (this.checked) {
                this.parentElement.classList.add('marcado')
            } else {
                this.parentElement.classList.remove('marcado')
            }
        });
    }
}

function carregarSessao(sessao) {
    const container = document.getElementsByClassName('produtos')[0]
    const loading = document.getElementsByClassName('loading')[0]
    loading.style.display = 'block'
    document.body.style.overflowY = 'hidden'
    fetch(`/${sessao}`)
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html
            
            const sessao = document.getElementsByClassName('conteiner-produtos')
            for (var i = 0; i < sessao.length; i++) {
                sessao[i].style.display = 'none'
            }
            document.getElementsByClassName('conteiner-produtos')[0].style.display = 'flex';
            clickProduto()
        })
        .finally(() => {
            loading.style.display = 'none'
            document.body.style.overflowY = 'scroll'
        })
        .catch(error => console.error('Erro ao carregar a seção:', error));
}

function obterDadosProduto(event) {
    console.log('clicou!!!!');
    const container = event.target.parentElement.parentElement
    const img = container.querySelector('img').src
    const nome = container.getElementsByClassName('nome-detalhes')[0].innerText
    const preco = container.getElementsByClassName('preco-produto')[0].innerText
    const acompanhamentos = container.querySelectorAll('.acc > input')
    let selecionados = []
    const obs = container.querySelector('#obs').value
    for (var i = 0; i < acompanhamentos.length; i++) {
        if (acompanhamentos[i].checked) {
            selecionados.push(acompanhamentos[i].parentElement.innerText)
        }
    }
    const dados = {'nome': nome, 'img': img, 'preco': preco, 'acompanhamentos': selecionados, 'obs': obs}
    enviarDadosProduto(dados, container)
}

function enviarDadosProduto(dados, container) {
    const loading = document.getElementsByClassName('loading')[0]
    loading.style.display = 'block'
    fetch('/adicionarCarrinho', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.text())
    .finally(() => {
        loading.style.display = 'none'
        document.body.style.overflowY = 'scroll'
        container.parentElement.remove()
    })
    .catch(error => console.error('Error:', error))
}