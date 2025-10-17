const request = require('supertest');
const app = require('../app');
const db = require('../configs/database');

// Define a chave secreta para os testes para evitar dependência de .env
process.env.JWT_SECRET = 'test_secret_for_users_test';

describe('Endpoints de Usuários', () => {
    
    // Limpa a tabela de usuários antes de cada teste para garantir a independência
    beforeEach(async () => {
        await db.execute('DELETE FROM usuarios');
    });

    // Fecha a conexão com o banco depois de todos os testes
    afterAll(async () => {
        await db.execute('DELETE FROM usuarios'); // Limpeza final
        await db.end();
    });

    it('deve criar um novo usuário com sucesso', async () => {
        const response = await request(app)
            .post('/usuarios')
            .send({
                usuario: 'testuser_create',
                senha: 'password123'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.usuario).toBe('testuser_create');
    });

    it('deve listar os usuários quando autenticado', async () => {
        // 1. Criar um usuário para o teste
        await request(app)
            .post('/usuarios')
            .send({
                usuario: 'testuser_list',
                senha: 'password123'
            });

        // 2. Fazer login para obter o token
        const loginResponse = await request(app)
            .post('/login')
            .send({
                usuario: 'testuser_list',
                senha: 'password123'
            });
        expect(loginResponse.statusCode).toBe(200);
        const token = loginResponse.body.token;
        expect(token).toBeDefined();

        // 3. Fazer a requisição autenticada para listar usuários
        const response = await request(app)
            .get('/usuarios')
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).not.toHaveProperty('senha');
        expect(response.body[0].usuario).toBe('testuser_list');
    });

    it('não deve listar usuários sem um token de autenticação', async () => {
        const response = await request(app).get('/usuarios');
        expect(response.statusCode).toBe(403);
    });

    it('não deve listar usuários com um token inválido', async () => {
        const response = await request(app)
            .get('/usuarios')
            .set('Authorization', 'Bearer invalidtoken');
        expect(response.statusCode).toBe(401);
    });
}); 