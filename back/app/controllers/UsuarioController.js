import conexao from '../database/conexao.js'
class UsuarioController{
    index(req, res) {
        const sql = "SELECT * FROM usuarios;";
        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                console.error("Erro ao buscar usuários:", erro);
                res.status(500).json({ mensagem: "Erro ao buscar usuários" });
            } else {
                res.status(200).json(resultado);
            }
        });
    };

    show(req, res) {
        const id = req.params.id;
        const sql = "SELECT * FROM usuarios WHERE id=?;";
        conexao.query(sql, [id], (erro, resultado) => {
            if (erro) {
                console.error("Erro ao buscar usuário por ID:", erro);
                res.status(500).json({ mensagem: "Erro ao buscar usuário" });
            } else if (resultado.length === 0) {
                res.status(404).json({ mensagem: "Usuário não encontrado" });
            } else {
                res.status(200).json(resultado[0]);
            }
        });
    };
    
    showLogin(req, res)  {
        const { email, senha } = req.body;
    
        console.log('Dados recebidos:', { email, senha });
    
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        conexao.query(sql, [email], (erro, resultado) => {
            if (erro) {
                console.error('Erro ao executar query:', erro);
                return res.status(500).json({ mensagem: 'Erro ao consultar o banco de dados.' });
            }
    
            if (resultado.length === 0) {
                console.log('Usuário não encontrado.');
                return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
            }
    
            const usuario = resultado[0];
            if (usuario.senha !== senha) {
                console.log('Senha incorreta.');
                return res.status(401).json({ mensagem: 'Senha incorreta.' });
            }
    
            console.log('Login bem-sucedido!');
            return res.status(200).json({
                mensagem: 'Login bem-sucedido',
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                },
            });
        });
    };
    

    store(req, res){
        const dados = req.body;
        const sql = "INSERT INTO usuarios SET ?";
        conexao.query(sql, dados, (erro, resultado) => {
            if (erro) {
                console.error("Erro ao cadastrar usuário:", erro);
                res.status(400).json({ mensagem: "Erro ao cadastrar usuário" });
            } else {
                res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", id: resultado.insertId });
            }
        });
    };

    update(req, res) {
        const id = req.params.id;
        const dados = req.body;
        const sql = "UPDATE usuarios SET ? WHERE id=?;";
        conexao.query(sql, [dados, id], (erro, resultado) => {
            if (erro) {
                console.error("Erro ao atualizar usuário:", erro);
                res.status(500).json({ mensagem: "Erro ao atualizar usuário" });
            } else if (resultado.affectedRows === 0) {
                res.status(404).json({ mensagem: "Usuário não encontrado" });
            } else {
                res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });
            }
        });
    };

    delete(req, res) {
        const id = req.params.id;
        const sql = "DELETE FROM usuarios WHERE id=?;";
        conexao.query(sql, [id], (erro, resultado) => {
            if (erro) {
                console.error("Erro ao excluir usuário:", erro);
                res.status(500).json({ mensagem: "Erro ao excluir usuário" });
            } else if (resultado.affectedRows === 0) {
                res.status(404).json({ mensagem: "Usuário não encontrado" });
            } else {
                res.status(200).json({ mensagem: "Usuário excluído com sucesso" });
            }
        });
    };

}
//padrão Singleton
export default new UsuarioController();