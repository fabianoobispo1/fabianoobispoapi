import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('FaAutenticacao (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('Deve ser capaz de autenticar', async () => {
        await request(app.server).post('/fausuario').send({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            data_nascimento: '1990-04-24T00:00:00Z'
        });

        const response = await request(app.server).post('/fasesao').send({
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            token: expect.any(String),
        });
    });
});