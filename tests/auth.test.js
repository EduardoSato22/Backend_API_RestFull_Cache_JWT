const request = require('supertest');
const app = require('../app');
const db = require('../configs/database');

// Fecha a conexão com o banco depois de todos os testes deste arquivo
afterAll(async () => {
    await db.end();
});

describe('Autenticação de Rotas', () => {
    it('deve retornar erro 403 para acesso a /clientes sem token', async () => {
        const response = await request(app).get('/clientes');
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe('Token não fornecido.');
    });

    it('deve retornar erro 401 para acesso a /clientes com token inválido', async () => {
        const response = await request(app)
            .get('/clientes')
            .set('Authorization', 'Bearer tokeninvalido123');
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Token inválido.');
    });
}); 