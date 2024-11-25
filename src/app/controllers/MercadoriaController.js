import conexao from '../database/conexao.js'
class MercadoriaController{

    index(req, res) {
        const sql = "SELECT * FROM mercadorias;";
        conexao.query(sql, (erro, resultado) =>{
             if(erro){
                 console.log(erro);
                 res.status(404)
             } else{
                 res.status(200).json(resultado);
             }
        })
    };

    show(req, res) {
        const id = req.params.id;
        const sql = "SELECT * FROM mercadorias WHERE id=?";
        conexao.query(sql, id, (erro, resultado) =>{
             if(erro){
                 console.log(erro);
                 res.status(404)
             } else{
                 res.status(200).json(resultado);
             }
        })
    };

    showforname(req, res) {
        try {
            const nome = req.params.nome;
            console.log("Parâmetro recebido:", nome);
    
            const sql = "SELECT * FROM mercadorias WHERE TRIM(LOWER(nome)) = TRIM(LOWER(?))";
    
            conexao.query(sql, [nome], (erro, resultado) => {
                if (erro) {
                    console.error("Erro na consulta:", erro);
                    res.status(500).json({ mensagem: "Erro interno do servidor" });
                } else {
                    console.log("Resultado da consulta:", resultado);
                    if (resultado.length === 0) {
                        res.status(404).json({ mensagem: "Mercadoria não encontrada" });
                    } else {
                        res.status(200).json(resultado);
                    }
                }
            });
        } catch (erro) {
            console.error("Erro inesperado:", erro);
            res.status(500).json({ mensagem: "Erro inesperado no servidor" });
        }
    };

    showforgroup(req, res) {
        const grupo = req.params.grupo; // Captura o grupo enviado como parâmetro na URL
        console.log("Parâmetro recebido (grupo):", grupo); // Log para verificar o valor recebido
    
        const sql = "SELECT * FROM mercadorias WHERE grupo = ?"; // Consulta SQL para filtrar pelo grupo
    
        conexao.query(sql, [grupo], (erro, resultado) => {
            if (erro) {
                console.error("Erro na consulta:", erro);
                res.status(500).json({ mensagem: "Erro interno do servidor" }); // Erro interno no servidor
            } else if (resultado.length === 0) {
                console.log("Nenhuma mercadoria encontrada para o grupo:", grupo);
                res.status(404).json({ mensagem: "Nenhuma mercadoria encontrada para o grupo especificado" }); // Nenhum dado encontrado
            } else {
                console.log("Mercadorias encontradas:", resultado);
                res.status(200).json(resultado); // Retorna os dados encontrados
            }
        });
    };
    
    store(req, res) {
        const dados = req.body;
        const sql = "INSERT INTO mercadorias SET ?";
        conexao.query(sql, dados, (erro, resultado) =>{
             if(erro){
                 console.log(erro);
                 res.status(404)
             } else{
                 res.status(201).json(resultado);
             }
        })
    };

    update (req,res) {
        const alteracoes = req.body;
        const id = req.params.id;
        const sql = "UPDATE mercadorias SET ? WHERE id=?";
        conexao.query(sql,[alteracoes, id], (erro, resultado) =>{
             if(erro){
                 console.log(erro);
                 res.status(404)
             } else{
                 res.status(200).json(resultado);
             }
        })
    };

    delete(req, res) {
        const nome = req.params.nome;
        const sql = "DELETE FROM mercadorias WHERE nome=?";
        conexao.query(sql, nome, (erro, resultado) =>{
             if(erro){
                 console.log(erro);
                 res.status(404)
             } else{
                 res.status(200).json(resultado);
             }
        });
}}
//padrão Singleton
export default new MercadoriaController();