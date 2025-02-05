
import request from "supertest";
import app from "./App.js";
import { response } from "express";
let token;
//find all users
describe('testing rotas "users"', () => {
    //cria um novo user antes de cada teste porém é sempre o mesmo user
     beforeAll( async () => {
        //está sendo criado para testar o delete
        const data = {
            id: 999,
            nome: "usuariotest",
            email: "testeteste@gmail.com",
            senha: "testeteste"
        };
        //está sendo criado para testar o login;
        const data2 = {
            id: 100,
            nome: "usuariotest2",
            email: "testeteste2@gmail.com",
            senha: "testeteste2"
        };
        const dataforlogin = {
            id: 70,
            nome: "usuariologin",
            email: "testelogin@gmail.com",
            senha: "testelogin"
        };
        await request(app).post('/usuarios').send(data);
        await request(app).post('/usuarios').send(dataforlogin);
        await request(app).post('/usuarios').send(data2);
    })
    afterAll(async () =>{
        //excluir o 2 porque está sendo criado para um test
        await request(app).delete('/usuarios/2');
        //excluir o 100 porque esta sendo criado em um test
        await request(app).delete('/usuarios/100');

    })
        



    
    //login antes de tudo para o end-point de autententicação funcinoar
    beforeAll(async() =>{
        const loginData = {
            email: "testelogin@gmail.com",
            senha: "testelogin"
        };
        let response = await request(app).post('/login').send(loginData);
        token =  response.body.token;
        console.log("ver se tem token  "+token);
    })
    
    

    //busca uma lista de users
    it("should get all users", async () =>{
        const res = await request(app).get('/usuarios')
        expect(Array.isArray(res.body)).toBe(true);

        if(!res.body){
            return "array is emply"
        }
        let valorde0 = res.body[0];
        expect(valorde0).toHaveProperty('nome');
        expect(valorde0).toHaveProperty('email')
    })
    //busca por id 
    it("should get a user by ID", async () => {
        const res = await request(app).get('/usuarios/70').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200); // Espera um status 200 se encontrado
        expect(res.body).toHaveProperty('nome');
        expect(res.body).toHaveProperty('email');
    });
    
    it("should return 404 if user not found", async () => {
        const res = await request(app)
            .get('/usuarios/9999') // Usando um ID que não existe
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('mensagem', 'Usuário não encontrado');
    });

    //login
    it("should login a user successfully", async () => {
        const loginData = {
            email: "testelogin@gmail.com",
            senha: "testelogin"
        };
        
        const res = await request(app).post('/login').send(loginData);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Autenticação realizada com sucesso!');
        expect(res.body).toHaveProperty('token');
    });
    
    it("should return 400 if password is incorrect", async () => {
        const loginData = {
            email: "testeteste@gmail.com",
            senha: "senha_errada"
        };
    
        const res = await request(app).post('/login').send(loginData);
        
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('mensagem', 'senha incorreta');
    });
    
    it("should return 404 if user is not found", async () => {
        const loginData = {
            email: "usuario_inexistente@teste.com",
            senha: "testeeeeee"
        };
    
        const res = await request(app).post('/login').send(loginData);
    
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('mensagem', 'Usuário não encontrado');
    });

    //create users
    it("should create a new user", async () => {
        const newUser = {
            id: 2,
            nome: "Granger",
            email: "Granger@teste.com",
            senha: "Grangerteste"
        };
    
        const res = await request(app).post('/usuarios').send(newUser);
    
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('mensagem', 'Usuário cadastrado com sucesso');
        expect(res.body).toHaveProperty('id');
    });
    
    it("should return 400 if required fields are missing", async () => {
        const newUser = {
            nome: "Novo Usuário",
            email: "novo@teste.com"
        };
    
        const res = await request(app).post('/usuarios').send(newUser);
    
        expect(res.status).toBe(400);
        
        expect(res.body).toHaveProperty('mensagem', 'Todos os campos são obrigatórios');
    });
    //alteration
    it("should update a user successfully", async () => {
        const updatedData = {
            nome: "kazuzaaa",
            email: "kazuzabixoloko@outlook.com"
        };
    
        const res = await request(app)
            .put('/usuarios/1') // Supondo que o usuário com ID 1 exista
            .send(updatedData);
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('mensagem', 'Usuário atualizado com sucesso');
    });
    
    it("should return 404 if user not found", async () => {
        const updatedData = {
            nome: "Usuário Inexistente",
            email: "inexistente@teste.com"
        };
    
        const res = await request(app)
            .put('/usuarios/9999') // Usando um ID que não existe
            .send(updatedData);
    
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('mensagem', 'Usuário não encontrado');
    });
    

    //delete
    it("should delete a user successfully", async () => {
        const res = await request(app).delete('/usuarios/999'); 
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('mensagem', 'Usuário excluído com sucesso');
    });
    
    it("should return 404 if user not found", async () => {
        const res = await request(app).delete('/usuarios/9999'); // Usando um ID que não existe
    
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('mensagem', 'Usuário não encontrado');
    });
    /*
    beforeAll(async () =>{
        await request(app).delete('/usuarios/1')
    })
        */
    // Desafio: Testes das rotas de Mercadorias
});
describe('Testing rotas "mercadorias"', () => {

    // Teste: Listar todas as mercadorias
    it("should get all products", async () => {
        const res = await request(app).get('/mercadorias');
        expect(Array.isArray(res.body)).toBe(true);
        if (!res.body) return "Array is empty";
        let valorde0 = res.body[0];
        expect(valorde0).toHaveProperty('nome');
        expect(valorde0).toHaveProperty('grupo');
    });

    // Teste: Buscar mercadoria por ID
    it("should get a product by ID", async () => {
        const res = await request(app).get('/mercadorias/1');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('nome');
        expect(res.body).toHaveProperty('grupo');
    });

    // Teste: Buscar mercadoria por nome
    it("should get a product by name", async () => {
        const res = await request(app).get('/mercadorias/nome/Fone');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('nome');
    });

    // Teste: Buscar mercadoria por grupo
    it("should get a product by group", async () => {
        const res = await request(app).get('/mercadorias/grupo/A');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('grupo');
    });

    // Teste: Criar uma nova mercadoria

    it("should create a new product", async () => {
        const newProduct = {
            nome: "Produto Teste",
            grupo: "A",
            quantidade: 134,
            valor: 100
        };
        const res = await request(app).post('/mercadorias').send(newProduct);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('mensagem', 'Mercadoria cadastrada com sucesso');
    });

    // Teste: Atualizar uma mercadoria existente // não esta retornando corretamente
    it("should update a product successfully", async () => {
        const updatedData = {
            nome: "Abacaxiiiii",
            grupo: "A"
        };
        const res = await request(app).put('/mercadorias/6').send(updatedData);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('mensagem', 'Mercadoria atualizada com sucesso');
    });

    // Teste: Deletar uma mercadoria
    it("should delete a product successfully", async () => {
        const res = await request(app).delete('/mercadorias/Produto Teste');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('mensagem', 'Mercadoria excluída com sucesso');
    });

    // Teste: Retornar 404 se a mercadoria não for encontrada
    it("should return 404 if product not found", async () => {
        const res = await request(app).get('/mercadorias/9999');
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('mensagem', 'Mercadoria não encontrada');
    });

    // Teste: Verificar se a criação de mercadoria sem campos obrigatórios retorna erro
    it("should return 400 if required fields are missing", async () => {
        const newProduct = {
            nome: "Novo Produto"
        };
        const res = await request(app).post('/mercadorias').send(newProduct);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('mensagem', 'Todos os campos são obrigatórios');
    });

    // Teste: Verificar se a atualização de mercadoria com ID incorreto retorna erro
    it("should return 404 if product to update is not found", async () => {
        const updatedData = {
            nome: "Produto Inexistente",
            grupo: "Grupo F"
        };
        const res = await request(app).put('/mercadorias/999').send(updatedData);
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('mensagem', 'Mercadoria não encontrada');
    });
});
