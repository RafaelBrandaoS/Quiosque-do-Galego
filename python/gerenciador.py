from python.conexao import criar_conexao, fexar_conexão

def sessaoDisponivel(nomeSessao):
    con = criar_conexao()
    cursor = con.cursor()
    sql = f"update sessoes set s_status = 'disponivel' where s_nome = '{nomeSessao}';"
    cursor.execute(sql)
    con.commit()
    cursor.close()
    fexar_conexão(con)


def sessaoIndisponivel(nomeSessao):
    con = criar_conexao()
    cursor = con.cursor()
    sql = f"update sessoes set s_status = 'indisponivel' where s_nome = '{nomeSessao}';"
    cursor.execute(sql)
    con.commit()
    cursor.close()
    fexar_conexão(con)


def pDisponivel(idProduto):
    con = criar_conexao()
    cursor = con.cursor()
    sql = f"update produtos set p_status = 'disponivel' where p_id = '{idProduto}';"
    cursor.execute(sql)
    con.commit()
    cursor.close()
    fexar_conexão(con)


def pIndisponivel(idProduto):
    con = criar_conexao()
    cursor = con.cursor()
    sql = f"update produtos set p_status = 'indisponivel' where p_id = '{idProduto}';"
    cursor.execute(sql)
    con.commit()
    cursor.close()
    fexar_conexão(con)


def pedidoAceito(id_pedido):
    con = criar_conexao()
    cursor = con.cursor()
    sql = f"update clientes set status = 'aceito' where id = '{id_pedido}';"
    cursor.execute(sql)
    con.commit()
    cursor.close()
    fexar_conexão(con)


def pedidoRecusado(id_pedido):
    con = criar_conexao()
    cursor = con.cursor()
    sql = f"update clientes set status = 'recusado' where id = '{id_pedido}';"
    cursor.execute(sql)
    con.commit()
    cursor.close()
    fexar_conexão(con)
