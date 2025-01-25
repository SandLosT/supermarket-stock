import conexao from "../database/conexao.js";

class UsuarioRepository{
    getAll() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM usuarios;";
            conexao.query(sql, (erro, resultado) => {
                if (erro) return reject(erro);
                resolve(resultado);
            });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT nome, email FROM usuarios WHERE id=?;";
            conexao.query(sql, [id], (erro, resultado) => {
                if (erro) return reject(erro);
                resolve(resultado[0]);
            });
        });
    }

    getByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM usuarios WHERE email = ?";
            conexao.query(sql, [email], (erro, resultado) => {
                if (erro) return reject(erro);
                return resolve(resultado[0]);
            });
        });
    }

    create(dados) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO usuarios SET ?;";
            conexao.query(sql, dados, (erro, resultado) => {
                if (erro) return reject(erro);
                resolve(resultado);
            });
        });
    }

    update(id, dados) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE usuarios SET ? WHERE id=?;";
            conexao.query(sql, [dados, id], (erro, resultado) => {
                if (erro) return reject(erro);
                resolve(resultado);
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM usuarios WHERE id=?;";
            conexao.query(sql, [id], (erro, resultado) => {
                if (erro) return reject(erro);
                resolve(resultado);
            });
        });
    }

}
export default new UsuarioRepository();