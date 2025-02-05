import UsuarioRepository from '../repository/UsuarioRepository.js';
import bcrypt, { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

class UsuarioController{
    async index(req, res) {
        try {
            const usuarios = await UsuarioRepository.getAll();
            res.status(200).json(usuarios);
        } catch (erro) {
            console.error("Erro ao buscar usuários:", erro);
            res.status(500).json({ mensagem: "Erro ao buscar usuários" });
        }
    }
    //rota privada 
    async show(req, res) {
        const id = req.params.id;
        try {
            const usuario = await UsuarioRepository.getById(id);
            if (!usuario) {
                res.status(404).json({ mensagem: "Usuário não encontrado" });
            } else {
                res.status(200).json(usuario);
            }
        } catch (erro) {
            console.error("Erro ao buscar usuário por ID:", erro);
            res.status(500).json({ mensagem: "Erro ao buscar usuário" });
        }
    }
    //midware
    checkToken(req, res, next) {
        const authHeader = req.headers['authorization'] //aqui selecionamos o local onde fica o token no header
        const token = authHeader && authHeader.split(' ')[1];//necessário separar pois ele vem assim "Bearer &fjnsdjf" sendo que o token é a segunda parte
        if(!token){
            res.json({message: "Acesso negado!"})
        }else{
            try { 
                jwt.verify(token, process.env.JWT_TOKEN );
                next()
            } catch (error) {
                console.log(error.message)
                res.status(400).json({message:'Token inválido'})
            }
    }
}

    async showLogin(req, res) {
        const { email, senha } = req.body;
        try {
            const usuario = await UsuarioRepository.getByEmail(email);
            const senhacomparada = await bcrypt.compare(senha, usuario.senha);
            if (!usuario || usuario.length == 0 ) {
                res.status(404).json({ mensagem: "Usuário não encontrado" });
            }else if(senhacomparada == true){
            //Apos as comparações o token entra em cena!
            const secret = process.env.JWT_TOKEN
            const token = jwt.sign(
                {
                id: usuario.id
                },
                secret,
            )
                res.json({message: "Autenticação realizada com sucesso!", token,});
    
            }else{
                res.status(400).json({mensagem: "senha incorreta"});
            }
        } catch (erro) {
            console.error("Erro ao realizar login:", erro);
            res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
    }

    //cadastro
    async store(req, res) {
        const dados = req.body;
        console.log("dados enviados para cadastro: "+ dados.senha);
        try {
            if (!dados.nome || !dados.email || !dados.senha) {
                return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
            }
            dados.senha = await bcrypt.hash(dados.senha, 10);
            console.log(dados.senha);
            const resultado = await UsuarioRepository.create(dados);
            res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", id: resultado.insertId });
        } catch (erro) {
            console.error("Erro ao cadastrar usuário:", erro);
            res.status(400).json({ mensagem: "Erro ao cadastrar usuário" });
        }
    }


    async update(req, res) {
        const id = req.params.id;
        const dados = req.body;
        try {
            const resultado = await UsuarioRepository.update(id, dados);
            if (resultado.affectedRows === 0) {
                res.status(404).json({ mensagem: "Usuário não encontrado" });
            } else {
                res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });
            }
        } catch (erro) {
            console.error("Erro ao atualizar usuário:", erro);
            res.status(500).json({ mensagem: "Erro ao atualizar usuário" });
        }
    }
    //ver como esta qual é a mensagem que é exibida quando não é encontrado nenhum usuario.
    async delete(req, res) {
        const id = req.params.id;
        try {
            const resultado = await UsuarioRepository.delete(id);
            if (resultado.affectedRows === 0) {
                res.status(404).json({ mensagem: "Usuário não encontrado", resultado: resultado});
            } else {
                res.status(200).json({ mensagem: "Usuário excluído com sucesso" });
            }
        } catch (erro) {
            console.error("Erro ao excluir usuário:", erro);
            res.status(500).json({ mensagem: "Erro ao excluir usuário" });
        }
    }

}
//padrão Singleton
export default new UsuarioController();