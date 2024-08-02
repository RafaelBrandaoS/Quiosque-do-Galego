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
        })
        .catch(error => console.error('Erro ao carregar a seção:', error));
}