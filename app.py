from flask import Flask, render_template, url_for, request, session, jsonify, redirect, flash
from python import produtos, pedidos, gerenciador
import os
from dotenv import load_dotenv

load_dotenv()
USUARIO = os.getenv('LOG_USUARIO')
SENHA = os.getenv('LOG_SENHA')

app = Flask(__name__)
app.secret_key = os.urandom(24) 

@app.route('/')
def home():
    " página principal "
    session['logado'] = False
    sess = produtos.sessoes()
    pFds = produtos.pratosFds()
    pSem = produtos.pratosSem()
    bebidas = produtos.diversas()
    return render_template('index.html', sessoes=sess, pratosfds=pFds, pratossem=pSem, bebidas=bebidas)
print

@app.route('/admin/')
def login():
    return render_template('adminLogin.html')

@app.route('/admin/validar', methods=['POST'])
def validar():
    usuario = request.form.get('usuario')
    senha = request.form.get('senha')
    
    if usuario == USUARIO and senha == SENHA:
        session['logado'] = True
        return redirect('/admin/pedidos')
    else:
        session['logado'] = False
        flash('ERRO! usuario ou senha inválida')
        return redirect('/admin/')

@app.route('/admin/pedidos')
def admin():
    if session['logado'] == True:
        lst_clientes = pedidos.obterClientes()
        lst_prdidos = pedidos.obterPedidos()
        return render_template('adminPedidos.html', lst_clientes=lst_clientes, lst_prdidos=lst_prdidos)
    else:
        return redirect('/admin/')

@app.route('/admin/rSessoes')
def rSessoes():
    if session['logado'] == True:
        sess = produtos.sessoes()
        return render_template('adminSessoes.html', sessoes=sess)
    else:
        return redirect('/admin/')

@app.route('/admin/rProdutos')
def rProdutos():
    if session['logado'] == True:
        sess = produtos.sessoes()
        produt = produtos.lstProdutos()
        return render_template('adminProdutos.html', sessoes=sess, produtos=produt)
    else:
        return redirect('/admin/')

@app.route('/admin/aceitar', methods=['POST'])
def aceitar():
    id_pedido = request.get_json()
    gerenciador.pedidoAceito(id_pedido)
    return jsonify({'status': 'ok', 'dados': id_pedido}), 200

@app.route('/admin/recusar', methods=['POST'])
def recusar():
    id_pedido = request.get_json()
    gerenciador.pedidoRecusado(id_pedido)
    return jsonify({'status': 'ok', 'dados': id_pedido}), 200


@app.route('/disponivel', methods=['POST'])
def disponivel():
    nomeSessao = request.get_json()
    
    gerenciador.sessaoDisponivel(nomeSessao)
    
    return jsonify({'status': 'ok', 'dados': nomeSessao}), 200


@app.route('/indisponivel', methods=['POST'])
def indisponivel():
    nomeSessao = request.get_json()
    
    gerenciador.sessaoIndisponivel(nomeSessao)
    
    return jsonify({'status': 'ok', 'dados': nomeSessao}), 200


@app.route('/produtoDisponivel', methods=['POST'])
def produtoDisponivel():
    idProduto = request.get_json()
    
    gerenciador.pDisponivel(idProduto)
    
    return jsonify({'status': 'ok', 'dados': idProduto}), 200


@app.route('/produtoIndisponivel', methods=['POST'])
def produtoIndisponivel():
    idProduto = request.get_json()
    
    gerenciador.pIndisponivel(idProduto)
    
    return jsonify({'status': 'ok', 'dados': idProduto}), 200

@app.route('/admin/finalizarPedido', methods=['POST'])
def finalisarPedido():
    id_cliente = request.get_json()
    pedidos.finalizarPedido(id_cliente)
    return jsonify({'status': 'ok', 'dados': id_cliente}), 200

@app.route('/carrinho')
def carrinho():
    " carrinho "
    itens = session.get('carrinho', [])
    return render_template('carrinho.html', itens=itens)

@app.route('/adicionarCarrinho', methods=['POST'])
def adicionarCarrinho():
    dados = request.get_json()
    carrinho = session.get('carrinho', [])
    if dados not in carrinho:
        carrinho.append(dados)
    session['carrinho'] = carrinho
    return jsonify({'status': 'ok', 'dados': dados}), 200

@app.route('/removerProdutoCarrinho', methods=['POST'])
def removerProdutoCarrinho():
    dados = request.get_json()
    carrinho = session.get('carrinho', [])
    atual = []
    for item in carrinho:
        if item['nome'] != dados['nome']:
            atual.append(item)
    session['carrinho'] = atual
    return jsonify({'status': 'ok', 'dados': dados}), 200

@app.route('/finalizar')
def finalizar():
    return render_template('finalizar.html')

@app.route('/obterPedido', methods=['POST'])
def obterPedido():
    session['pedido'] = ''
    pedido = request.get_json()
    session['pedido'] = pedido
    return jsonify({'status': 'ok', 'dados': pedido}), 200

@app.route('/obterTotal', methods=['POST'])
def obterTotal():
    session['total'] = ''
    total = request.get_json()
    session['total'] = total
    return jsonify({'status': 'ok', 'dados': total}), 200

@app.route('/obterCliente', methods=['POST'])
def obterCliente():
    session['cliente'] = ''
    cliente = request.get_json()
    session['cliente'] = cliente
    return redirect(url_for('enviarPedido'))

@app.route('/enviarPedido')
def enviarPedido():
    cliente = session.get('cliente')
    pedido = session.get('pedido')
    total = session.get('total')
    pedidos.enviarPedido(cliente, pedido, total)
    session.clear()
    return jsonify({'status': 'ok', 'cliente': cliente}), 200

@app.route('/pratosFds')
def pratosFds():
    pFds = produtos.pratosFds()
    return render_template('peFSemana.html', produtos=pFds)


@app.route('/pratosSem')
def pratosSem():
    pSem = produtos.pratosSem()
    return render_template('peSemana.html', produtos=pSem)


@app.route('/petiscos')
def petiscos():
    pet = produtos.petiscos()
    return render_template('petiscos.html', produtos=pet)


@app.route('/sobremesas')
def sobremesas():
    sob = produtos.sobremesas()
    return render_template('sobremesa.html', produtos=sob)


@app.route('/espetinhos')
def espetinhos():
    esp = produtos.espetinhos()
    return render_template('espetinhos.html', produtos=esp)


@app.route('/jantinhas')
def jantinhas():
    jan = produtos.jantinhas()
    return render_template('jantinhas.html', produtos=jan)


@app.route('/espetinhosGourmet')
def espetinhosGourmet():
    gour = produtos.espetinhosGourmet()
    return render_template('espetinhosGourmet.html', produtos=gour)


@app.route('/paoDelicia')
def paoDelicia():
    pao = produtos.paoDelicia()
    return render_template('paoDelicia.html', produtos=pao)


@app.route('/caldo')
def caldo():
    cal = produtos.caldos()
    return render_template('caldo.html', produtos=cal)


@app.route('/bebidasDiversas')
def bebidasDiversas():
    beb = produtos.diversas()
    return render_template('bebidasDiversas.html', produtos=beb)


@app.route('/cervejasLong')
def cervejasLong():
    cer = produtos.cervejasLong()
    return render_template('cervejasLong.html', produtos=cer)


@app.route('/porcoes')
def porcoes():
    por = produtos.porcoes()
    return render_template('porcoes.html', produtos=por)

if __name__ == '__main__':
    app.run(debug=True)
