import MercadoriaRepository from '../repository/MercadoriaRepository.js';

class MercadoriaController {

    async index(req, res) {
        try {
            const resultado = await MercadoriaRepository.findAll();
            if (resultado.length === 0) {
                return res.status(404).json({ mensagem: "Nenhuma mercadoria encontrada" });
            }
            res.status(200).json(resultado);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ mensagem: "Erro ao listar mercadorias" });
        }
    }

    async show(req, res) {
        const id = req.params.id;
        try {
            const resultado = await MercadoriaRepository.findById(id);
            if (resultado.length === 0) {
                return res.status(404).json({ mensagem: 'Mercadoria não encontrada' });
            }
            res.status(200).json(resultado);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ mensagem: "Erro ao buscar mercadoria" });
        }
    }

    async showforname(req, res) {
        const nome = req.params.nome;
        try {
            const resultado = await MercadoriaRepository.findbyname(nome);
            if (!resultado) {
                return res.status(404).json({ mensagem: 'Mercadoria não encontrada' });
            }
            res.status(200).json(resultado);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ mensagem: "Erro ao buscar mercadoria por nome" });
        }
    }

    async showforgroup(req, res) {
        const grupo = req.params.grupo;
        try {
            const resultado = await MercadoriaRepository.findByGroup(grupo);
            if (!resultado) {
                return res.status(404).json({ mensagem: 'Grupo de mercadorias não encontrado' });
            }
            res.status(200).json(resultado);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ mensagem: "Erro ao buscar mercadoria por grupo" });
        }
    }

    async store(req, res) {
        const dados = req.body;
        try {
            if (!dados.nome || !dados.grupo || !dados.quantidade || !dados.valor) {
                return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
            }

            const resultado = await MercadoriaRepository.create(dados);
            console.log(resultado.id);
            res.status(201).json({
                mensagem: 'Mercadoria cadastrada com sucesso',
                mercadoria: resultado
            });
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ mensagem: "Erro ao cadastrar mercadoria" });
        }
    }

    async update(req, res) {
        try {
            const alteracoes = req.body;
            const id = req.params.id;
            const resultado = await MercadoriaRepository.update(alteracoes, id);
            const validacao = await MercadoriaRepository.findbyname(req.body.nome);
            if (resultado.length === 0 || validacao.nome == undefined) {
                return res.status(404).json({ mensagem: 'Mercadoria não encontrada' });
            }else{
                res.status(200).json({ mensagem: 'Mercadoria atualizada com sucesso' });
            }
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ mensagem: "Erro ao atualizar a mercadoria" });
        }
    }

    async delete(req, res) {
        try {
            const nome = req.params.nome;
            const resultado = await MercadoriaRepository.delete(nome);

            if (!resultado) {
                return res.status(404).json({ mensagem: 'Mercadoria não encontrada' });
            }

            res.status(200).json({ mensagem: 'Mercadoria excluída com sucesso' });
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ mensagem: "Erro ao deletar a mercadoria" });
        }
    }
}

// Padrão Singleton
export default new MercadoriaController();
