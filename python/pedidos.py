from python.conexao import criar_conexao, fexar_conexão

def enviarPedido(cliente, pedido, total):
    con = criar_conexao()
    cursor = con.cursor()
    
    
    " dados do cliente "
    nome_cliente = str(cliente['nome'])
    tel_cliente = str(cliente['tel'])
    endereco_cliente = str(cliente['endereco'])
    casa_cliente = int(cliente['casa'])
    pagamento = str(cliente['pagamento'])
    if cliente['troco'] == '':
        troco = 00.00
    else:
        troco = float(cliente['troco'])
    tot =  float(total['total'])
    
    print(nome_cliente, tel_cliente, endereco_cliente, casa_cliente, pagamento, troco, tot)
    sql1 = "INSERT INTO clientes (cliente, tel, endereco, casa, pagamento, troco, total) VALUES (%s, %s, %s, %s, %s, %s, %s);"
    valores1 = (nome_cliente, tel_cliente, endereco_cliente, casa_cliente, pagamento, troco, tot)
    cursor.execute(sql1, valores1)
    con.commit()
    
    sql2 = "SELECT id FROM clientes WHERE cliente = %s AND tel = %s;"
    valores2 = (nome_cliente, tel_cliente)
    cursor.execute(sql2, valores2)
    id_cliente = cursor.fetchall()
    print(id_cliente[0])

    " dados pedido "
    for produto in pedido:
        print(produto)
        cliente_id = id_cliente[0][0]
        nome_produto = str(produto['nome'])
        acom = str(produto['acom']).replace("[", "").replace("]", "")
        obs = str(produto['obs'])
        preco = float(produto['preco'])
        qtd = int(produto['qtd'])
        
        sql3 = "INSERT INTO pedidos (cliente_id, nome_produto, acompanhamentos, obs, preco, quantidade) VALUES (%s, %s, %s, %s, %s, %s);"
        valores3 = (cliente_id, nome_produto, acom, obs, preco, qtd)
        cursor.execute(sql3, valores3)
        con.commit()
    
    cursor.close()
    fexar_conexão(con)


def obterClientes():
    con = criar_conexao()
    cursor = con.cursor()
    
    sql1 = "select * from clientes order by id desc;"
    cursor.execute(sql1)
    clientes = cursor.fetchall()
    
    cursor.close()
    fexar_conexão(con)
    
    return clientes


def obterPedidos():
    con = criar_conexao()
    cursor = con.cursor()

    sql2 = "select * from pedidos;"
    cursor.execute(sql2)
    pedidos = cursor.fetchall()
    
    cursor.close()
    fexar_conexão(con)
    
    return pedidos

def finalizarPedido(id_cliente):
    con = criar_conexao()
    cursor = con.cursor()

    sql2 = f"delete from clientes where id = '{id_cliente}';"
    cursor.execute(sql2)
    con.commit()
    
    cursor.close()
    fexar_conexão(con)
