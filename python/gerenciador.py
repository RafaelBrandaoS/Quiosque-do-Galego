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