
import request from "supertest";
import app from "./App.js";
 
//find all users
describe('testing rotas "users"', () => {
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
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNzM3OTMyNjIyfQ.9dR32yziEdi5YAeKw6P_ZR2_QX5KoLxRu7OG0eyaaEc"; // substitua por um token válido
        const res = await request(app)
            .get('/usuarios/2')
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.status).toBe(200); // Espera um status 200 se encontrado
        expect(res.body).toHaveProperty('nome');
        expect(res.body).toHaveProperty('email');
    });
    
    it("should return 404 if user not found", async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNzM3OTMyNjIyfQ.9dR32yziEdi5YAeKw6P_ZR2_QX5KoLxRu7OG0eyaaEc"; // substitua por um token válido
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
        const res = await request(app).delete('/usuarios/8'); 
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('mensagem', 'Usuário excluído com sucesso');
    });
    
    it("should return 404 if user not found", async () => {
        const res = await request(app).delete('/usuarios/9999'); // Usando um ID que não existe
    
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('mensagem', 'Usuário não encontrado');
    });
})


