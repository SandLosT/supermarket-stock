
import request from "supertest";
import app from "./App.js";
let token;
//find all users
describe('testing rotas "users"', () => {
    //cria um novo user antes de cada teste porém é sempre o mesmo user
     beforeEach( async () => {
        const data = {
            id: 2,
            nome: "usuariotest",
            email: "testeteste@gmail.com",
            senha: "testeteste"
        };
        await request(app).post('/usuarios').send(data);
    })
    /*
    //login antes de tudo para o end-point de autententicação funcinoar
    beforeAll(async() =>{
        const loginData = {
            email: "testeteste@gmail.com",
            senha: "testeteste"
        };
        await request(app).post('/login').send(loginData);
        const valor = loginData.token;
    })
    */
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
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzM4Mjk3NDE2fQ.-ng9Nag4Rb5VoCVNNengDpogwYISb0mbT_QAC-hSF_w';
        const res = await request(app).get('/usuarios/2').set('Authorization', `Bearer ${token}`);
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
            email: "testeteste@gmail.com",
            senha: "testeteste"
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
            id: 1,
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
            nome: "Usuário Atualizado",
            email: "atualizado@teste.com"
        };
    
        const res = await request(app)
            .put('/usuarios/18') // Supondo que o usuário com ID 1 exista
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
        const res = await request(app).delete('/usuarios/2'); 
    
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
    // Cria um novo usuário e faz login antes dos testes
    beforeAll(async () => {
        const userData = {
            id: 2,
            nome: "usuariotest",
            email: "testeteste@gmail.com",
            senha: "testeteste"
        };
        await request(app).post('/usuarios').send(userData);

        const loginData = {
            email: "testeteste@gmail.com",
            senha: "testeteste"
        };
        const loginResponse = await request(app).post('/login').send(loginData);
        token = loginResponse.body.token;
    });

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
        const res = await request(app).get('/mercadorias/Melao');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('nome');
    });

    // Teste: Buscar mercadoria por grupo
    it("should get a product by group", async () => {
        const res = await request(app).get('/mercadorias/A');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('grupo');
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

    // Teste: Atualizar uma mercadoria existente
    it("should update a product successfully", async () => {
        const updatedData = {
            nome: "Melaciazona",
            grupo: "B"
        };
        const res = await request(app).put('/mercadorias/1').send(updatedData);
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
        const res = await request(app).put('/mercadorias/9999').send(updatedData);
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('mensagem', 'Mercadoria não encontrada');
    });
});
