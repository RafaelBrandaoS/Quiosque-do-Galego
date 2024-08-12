document.addEventListener("DOMContentLoaded", eventos)

function eventos() {
    const btnDadosPessoais = document.getElementById('btn-dados-pessoais')
    btnDadosPessoais.addEventListener('click', (event) => {
        const container = event.target.parentElement
        const nome = container.querySelector('#nome').value
        const telefone = container.querySelector('#telefone').value
        if (nome != '' && telefone != '') {
            container.querySelector('.erro').style.display = 'none'
            const sessaoEndereco = document.getElementById('endereco')
            sessaoEndereco.style.display = 'flex'
        }
        else {
            container.querySelector('.erro').style.display = 'block'
        }
    })
}

function validarCEP(input) {
    const cep = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const cepFormatado = cep.replace(/(\d{9})/, '$1'); // Formata o CEP
    const btnValidarCep = document.querySelector('.verificar-cep')

    input.value = cepFormatado;
    if (cep.length === 8) {
        document.querySelector('.erro1').style.display = 'none'
        btnValidarCep.addEventListener("click", enviarCep)
    } else {
        btnValidarCep.removeEventListener("click", enviarCep)
        document.querySelector('.erro1').style.display = 'block'

    }
}

async function enviarCep() {
    const cep = document.querySelector('#cep').value
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const dados = await response.json();
        if (dados.erro) {
            let dadosEntrega = document.getElementsByClassName('endereco-dados')[0]
            dadosEntrega.innerHTML = ''
            document.querySelector('.erro2').style.display = 'block'
        } else if (dados.bairro != 'Guará II') {
            let dadosEntrega = document.getElementsByClassName('endereco-dados')[0]
            dadosEntrega.innerHTML = ''
            document.querySelector('.erro3').style.display = 'block'
        } else {
            document.querySelector('.erro2').style.display = 'none'
            document.querySelector('.erro3').style.display = 'none'
            mostrarDadosEntega(dados);
        }
    } catch (error) {
        document.querySelector('.erro2').style.display = 'block'
    }
}

function mostrarDadosEntega(dados) {
    let dadosEntrega = document.getElementsByClassName('endereco-dados')[0]
    dadosEntrega.innerHTML = `
    <div>
        <p>ENDEREÇO:  <span class="ende-dados">${dados.logradouro}</span></p>
        <p>CEP: <span class="cep-dados">${dados.cep}</span></p>
        <p>BAIRRO: <span class="bairro">${dados.bairro}</span></p>
        <p><span class="cidade">${dados.localidade}</span> - <span class="estado">${dados.uf}</span></p>
    </div>
    <label class="label" for="numero"><input type="number" name="numero" id="numero" placeholder="número"></label>
    <p class="aviso">deixe vazio se não ouver número</p>
    <button id="btn-continuar-endereco">Continuar</button>
    `
    const continuarEndereco = document.querySelector('#btn-continuar-endereco')
    continuarEndereco.addEventListener("click", () => {
        console.log('clicouu!!')
        const sessaoPagamento = document.getElementById('pagamento')
        sessaoPagamento.style.display = 'block'
    })

    const mPagamento = document.getElementsByClassName('m-pagamento')
    for (var i = 0; i < mPagamento.length; i++) {
        mPagamento[i].addEventListener("change", function () {
            if (this.checked) {
                for (var i = 0; i < mPagamento.length; i++) {
                    if (mPagamento[i] !== this) {
                        mPagamento[i].checked = false;
                    }
                };
            }
            if (this.parentElement.innerText == 'Dinheiro: ') {
                document.getElementsByClassName('troco')[0].style.display = 'block'
            } else {
                document.getElementsByClassName('troco')[0].style.display = 'none'
            }
        })
    }

    const btnPagamento = document.getElementsByClassName('btn-pagamento')[0]
    btnPagamento.addEventListener("click", function () {
        let marcado = false
        for (var i = 0; i < mPagamento.length; i++) {
            if (mPagamento[i].checked) {
                marcado = true
            }
        }
        if (marcado === true) {
            document.getElementsByClassName('erro4')[0].style.display = 'none'
            document.getElementById('finalizar').style.display = 'block'
            obterCliente()
        } else {
            document.getElementsByClassName('erro4')[0].style.display = 'block'
            document.getElementById('finalizar').style.display = 'none'
        }
    })
}

function obterCliente() {
    const btnPedir = document.getElementsByClassName('pedir')[0]
    btnPedir.addEventListener("click", () => {
        console.log('pediu!!')
        const nome = document.getElementById('nome').value
        const tel = document.getElementById('telefone').value
        const endereco = document.getElementsByClassName('ende-dados')[0].innerText
        const casa = document.getElementById('numero').value
        const pagamentos = document.getElementsByClassName('m-pagamento')
        let pagamento = ''
        let troco = ''
        for (var i = 0; i < pagamentos.length; i++) {
            if (pagamentos[i].checked) {
                pagamento = pagamentos[i].id
                if (pagamento == 'dinheiro') {
                    troco = document.getElementById('troco').value
                } else {
                    troco = ''
                }
            }
        }
        if (nome != '' && tel != '' && endereco != '' && casa != '' && pagamento != '') {
            const dadosCliente = {'nome': nome, 'tel': tel, 'endereco': endereco, 'casa': casa, 'pagamento': pagamento, 'troco': troco}
            alert('pedido enviado com sucesso')
            enviarCliente(dadosCliente)
        } else {
            alert('preencha todos os campos')
        }
    })
}

function enviarCliente(cliente) {
    fetch("/obterCliente", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    })
    .then(result => {
        console.log('Sucesso:', result);
        window.location.href = "/";
    })
    .catch(error => console.error('Error:', error))
}