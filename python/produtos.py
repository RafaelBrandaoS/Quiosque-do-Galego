from python.conexao import criar_conexao, fexar_conexão


def sessoes():
    con = criar_conexao()
    cursor = con.cursor()
    sql = "select * from sessoes order by s_nome;"
    cursor.execute(sql)
    sessoes = cursor.fetchall()
    cursor.close()
    fexar_conexão(con)
    return sessoes


def lstProdutos():
    con = criar_conexao()
    cursor = con.cursor()
    sql = "select * from produtos;"
    cursor.execute(sql)
    listaProdutos = cursor.fetchall()
    cursor.close()
    fexar_conexão(con)
    return listaProdutos


def pratosFds():
    con = criar_conexao()
    cursor = con.cursor()
    sql = "select * from produtos where sessao_id = '1' order by p_nome"
    cursor.execute(sql)
    produtos = cursor.fetchall()
    cursor.close()
    fexar_conexão(con)
    return produtos


def pratosSem():
    con = criar_conexao()
    cursor = con.cursor()
    sql = "select * from produtos where sessao_id = '2' order by p_nome"
    cursor.execute(sql)
    produtos = cursor.fetchall()
    cursor.close()
    fexar_conexão(con)
    return produtos


def petiscos():
    con = criar_conexao()
    cursor = con.cursor()
    sql = "select * from produtos where sessao_id = '3'"
    cursor.execute(sql)
    produtos = cursor.fetchall()
    cursor.close()
    fexar_conexão(con)
    return produtos

def sobremesas():
    con = criar_conexao()
    cursor = con.cursor()
    sql = "select * from produtos where sessao_id = '4'"
    cursor.execute(sql)
    produtos = cursor.fetchall()
    cursor.close()
    fexar_conexão(con)
    return produtos


def espetinhos():
    con = criar_conexao()
    cursor = con.cursor()
    sql = "select * from produtos where sessao_id = '5' order by p_nome"
    cursor.execute(sql)
    produtos = cursor.fetchall()
    cursor.close()
    fexar_conexão(con)
    return produtos


def jantinhas():
    con = criar_conexao()
    cursor = con.cursor()
    sql = "select * from produtos where sessao_id = '6'"
    cursor.execute(sql)
    produtos = cursor.fetchall()
    cursor.close()
    fexar_conexão(con)
    return produtos


def espetinhosGourmet():
    con = criar_conexao()
    cursor = con.cursor()
    sql = "select * from produtos where sessao_id = '7'"
    cursor.execute(sql)
    produtos = cursor.fetchall()
    cursor.close()
    fexar_conexão(con)
    return produtos


def paoDelicia():
    con = criar_conexao()
    cursor = con.cursor()
    sql = "select * from produtos where sessao_id = '8'"
    cursor.execute(sql)
    produtos = cursor.fetchall()
    cursor.close()
    fexar_conexão(con)
    return produtos


def caldos():
    con = criar_conexao()
    cursor = con.cursor()
    sql = "select * from produtos where sessao_id = '9' order by p_nome"
    cursor.execute(sql)
    produtos = cursor.fetchall()
    cursor.close()
    fexar_conexão(con)
    return produtos


def diversas():
    con = criar_conexao()
    cursor = con.cursor()
    sql = "select * from produtos where sessao_id = '10' order by p_nome"
    cursor.execute(sql)
    produtos = cursor.fetchall()
    cursor.close()
    fexar_conexão(con)
    return produtos


def cervejasLong():
    con = criar_conexao()
    cursor = con.cursor()
    sql = "select * from produtos where sessao_id = '11' order by p_nome"
    cursor.execute(sql)
    produtos = cursor.fetchall()
    cursor.close()
    fexar_conexão(con)
    return produtos
