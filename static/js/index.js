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
    for (var i = 0; i < amostra.length; i++) {
        amostra[i].remove()
    }
    const container = document.querySelector('body')
    let detalhes = document.createElement('div')
    if (produto.classList.contains('pratos')) {
        detalhes.innerHTML = `
        <div class="dados-detalhes">
            <div>
                <img src="${p_imagem}" alt="${p_nome}">
            </div>
            <div class="dados-produto-detalhes">
                <h2 class="nome-detalhes">${p_nome}</h2>
                <p>R$ <samp>${p_preco}</samp></p>
                <h3>Escolha 4 acompanhamentos.</h3>
                <p>extra será cobrado R$ 5.00 a mais</p>
            </div>
            <div class="acompanhamentos">
                <label class="acc" for="arroz"><input type="checkbox" name="arroz" id="arroz"> Arroz</label>
                <label class="acc" for="batata"><input type="checkbox" name="batata" id="batata"> Batata Frita</label>
                <label class="acc" for="farofa"><input type="checkbox" name="farofa" id="farofa"> Farofa da Casa</label>
                <label class="acc" for="caldo"><input type="checkbox" name="caldo" id="caldo"> Feijão de Caldo</label>
                <label class="acc" for="tropeiro"><input type="checkbox" name="tropeiro" id="tropeiro"> Feijão Tropeiro</label>
                <label class="acc" for="mandioca"><input type="checkbox" name="mandioca" id="mandioca"> Mandioca Cozida</label>
                <label class="acc" for="ovo"><input type="checkbox" name="ovo" id="ovo"> Ovo Frito</label>
                <label class="acc" for="salada"><input type="checkbox" name="salada" id="salada"> Salada Alface e Tomate</label>
                <label class="obs" for="obs">Observação: <input type="text" name="obs" id="obs"></label>
            </div>
            <div class="butoes-detalhes">
                <button class="add-carrinho cancelar">Cancelar</button>
                <button class="add-carrinho">Adicionar ao Carrinho</button>
            </div>
        </div>
        `
    } 
    else if (produto.classList.contains('jantinha')) {
        detalhes.innerHTML = `
        <div class="dados-detalhes">
            <div>
                <img src="${p_imagem}" alt="${p_nome}">
            </div>
            <div class="dados-produto-detalhes">
                <h2 class="nome-detalhes">${p_nome}</h2>
                <p>R$ <samp>${p_preco}</samp></p>
                <h3>Escolha os acompanhamentos.</h3>
            </div>
            <div class="acompanhamentos">
                <label class="acc" for="arroz"><input type="checkbox" name="arroz" id="arroz"> Arroz</label>
                <label class="acc" for="tropeiro"><input type="checkbox" name="tropeiro" id="tropeiro"> Feijão Tropeiro</label>
                <label class="acc" for="mandioca"><input type="checkbox" name="mandioca" id="mandioca"> Mandioca Cozida</label>
                <label class="acc" for="vinagrete"><input type="checkbox" name="vinagrete" id="vinagrete"> Vinagrete</label>
                <label class="obs" for="obs">Observação: <input type="text" name="obs" id="obs"></label>
            </div>
            <div class="butoes-detalhes">
                <button class="add-carrinho cancelar">Cancelar</button>
                <button class="add-carrinho">Adicionar ao Carrinho</button>
            </div>
        </div>
        `
    } 
    else {
        detalhes.innerHTML = `
        <div class="dados-detalhes">
            <div>
                <img src="${p_imagem}" alt="${p_nome}">
            </div>
            <div class="dados-produto-detalhes">
                <h2 class="nome-detalhes">${p_nome}</h2>
                <p>R$ <samp>${p_preco}</samp></p>
            </div>
            <div class="acompanhamentos">
                <label class="obs" for="obs">Observação: <input type="text" name="obs" id="obs"></label>
            </div>
            <div class="butoes-detalhes">
                <button class="add-carrinho cancelar">Cancelar</button>
                <button class="add-carrinho">Adicionar ao Carrinho</button>
            </div>
        </div>
        `
    }
    detalhes.classList.add('detalhes')

    const fexar = detalhes.getElementsByClassName('cancelar')[0]
    fexar.addEventListener("click", () => {
        detalhes.remove()
    })

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
    // const opcoes = detalhes.querySelectorAll('.acc > input')
    // for (var i = 0; i < opcoes.length; i++) {
    //     opcoes[i].addEventListener("change", () => {
    //         if (opcoes[i].checked) {
    //             console.log('marcado')
    //             label[i].classList.add('marcado')
    //         }
    //     })
    // }

    container.append(detalhes)
}

function carregarSessao(sessao) {
    const container = document.getElementsByClassName('produtos')[0]
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
        .catch(error => console.error('Erro ao carregar a seção:', error));
}