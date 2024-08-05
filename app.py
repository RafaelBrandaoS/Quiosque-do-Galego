from flask import Flask, render_template, redirect, url_for
from python import produtos

app = Flask(__name__)

@app.route('/')
def home():
    " página principal "
    sess = produtos.sessoes()
    pFds = produtos.pratosFds()
    pSem = produtos.pratosSem()
    return render_template('index.html', sessoes=sess, pratosfds=pFds, pratossem=pSem)

@app.route('/carrinho')
def carrinho():
    " carrinho "
    return render_template('carrinho.html')

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

if __name__ == '__main__':
    app.run(debug=True)
