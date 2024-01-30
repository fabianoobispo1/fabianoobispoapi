import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Atualizar Token (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('Deve ser capaz de atualizar um token', async () => {
        await request(app.server).post('/fausuario').send({
            nome: 'John Doe',
            email: 'johndoea@example.com',
            password: '123456',
            data_nascimento: '1990-04-24T00:00:00Z'
        });

        const authResponse = await request(app.server).post('/fasesao').send({
            email: 'johndoea@example.com',
            password: '123456',
        });

        const cookies = authResponse.get('Set-Cookie');

        const response = await request(app.server)
            .patch('/token/farefresh')
            .set('Cookie', cookies)
            .send();

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            token: expect.any(String),
        });
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshTokenFa='),
        ]);
    });
});