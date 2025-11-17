import conexao from "../database/conexao.js";
class MercadoriaRepository{
    create(dados){
        return new Promise((resolve, reject) =>{
            const sql = "INSERT INTO mercadorias SET ?";
            conexao.query(sql, dados, (erro, resultado) =>{
            if(erro) return reject(erro)
            return resolve(resultado);
        })
        })
    }
    findAll(){
        return new Promise((resolve, reject) =>{
            const sql = "SELECT * FROM mercadorias;";
            conexao.query(sql, (erro, resultado) =>{
             if(erro) return console.log("Mercadorias não encontradas!" + reject); 
             return resolve(resultado);
            })
        })
    }

    findById(id){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM mercadorias WHERE id=?";
            conexao.query(sql, id, (erro, resultado) =>{
                if(erro) return reject(erro);
                return resolve(resultado[0])
            })
        })
    }
    findbyname(nome){
        return new Promise((resolve, reject)=>{
            const sql = "SELECT * FROM mercadorias WHERE TRIM(LOWER(nome)) = TRIM(LOWER(?))";
            conexao.query(sql, [nome], (erro, resultado) => {
                if (erro) return reject(erro);
                return resolve(resultado[0]);
            });
        });
    }
    findByGroup(grupo){
            return new Promise((resolve, reject)=>{
                const sql = "SELECT * FROM mercadorias WHERE grupo = ?"; // Consulta SQL para filtrar pelo grupo
                conexao.query(sql, [grupo], (erro, resultado) => {
                if(erro) return reject(erro);
                return resolve(resultado)
                });
            })
        };
    
    update(alteracoes, id) {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE mercadorias SET ? WHERE id=?";
        conexao.query(sql, [alteracoes, id], (erro, resultado) => {
            if (erro) return reject(erro);
            return resolve(resultado);
                });
            });
        }

    delete(id) {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM mercadorias WHERE id=?";
        conexao.query(sql, [id], (erro, resultado) => {
            if (erro) return reject(erro);
            return resolve(resultado);
                });
            });
        }    
}

export default new MercadoriaRepository();