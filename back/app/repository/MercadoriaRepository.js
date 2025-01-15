import conexao from "../database/conexao.js";
class MercadoriaRepository{
    create(){
        return new Promise((resolve, reject) =>{
            const sql = "SELECT * FROM mercadorias;";
            conexao.query(sql, (erro, resultado) =>{
             if(erro) return console.log("Mercadorias não encontradas!" + reject); 
             return resolve(resultado);
        })
        })
    }
    findById(id){
        return new Promise((reject, resolve) => {
            const sql = "SELECT * FROM mercadorias WHERE id=?";
            conexao.query(sql, id, (erro, resultado) =>{
                if(erro) return console.log("Mercadorias não encontradas!" + reject);;
                return resolve(resultado);
        })
        })
    }
}
export default new MercadoriaRepository();