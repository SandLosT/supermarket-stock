import MercadoriaRepository from '../repository/MercadoriaRepository.js';
class MercadoriaController{

    async index(req, res) {        
        const resultado = await MercadoriaRepository.findAll();
        res.json(resultado);
    };

    async show(req, res) {
        const id = req.params.id;
        const resultado = await MercadoriaRepository.findById(id);
        res.json(resultado);
    };

    async showforname(req, res) {
        const nome = req.params.nome;
        const resultado = await MercadoriaRepository.findbyname(nome);
        res.json(resultado);
    };

    async showforgroup(req, res) {
        const grupo = req.params.grupo; // Captura o grupo enviado como parâmetro na URL
        const resultado = await MercadoriaRepository.findByGroup(grupo);
        res.json(resultado);
    };
    
    async store(req, res) {
        const dados = req.body;
        const resultado = MercadoriaRepository.create(dados);
        res.json(resultado)
    };

    async update(req, res) {
        try {
            const alteracoes = req.body;
            const id = req.params.id;
            const resultado = await MercadoriaRepository.update(alteracoes, id);
            res.status(200).json(resultado);
        } catch (erro) {
            console.error(erro);
            res.status(404).json({ message: "Erro ao atualizar a mercadoria." });
        }
    };
    
    async delete(req, res) {
        try {
            const nome = req.params.nome;
            const resultado = await MercadoriaRepository.delete(nome);
            res.status(200).json(resultado);
        } catch (erro) {
            console.error(erro);
            res.status(404).json({ message: "Erro ao deletar a mercadoria." });
        }
    }
}
//padrão Singleton
export default new MercadoriaController();