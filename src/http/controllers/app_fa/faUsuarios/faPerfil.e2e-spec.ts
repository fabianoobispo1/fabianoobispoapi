import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('Deve ser capaz de obter o perfil do usuário', async () => {
        await request(app.server).post('/fausuario').send({
            nome: 'John Doe',
            email: 'johndoee@example.com',
            password: '123456',
            data_nascimento: '1990-04-24T00:00:00Z'
        });

        const authResponse = await request(app.server).post('/fasesao').send({
            email: 'johndoee@example.com',
            password: '123456',
        });

        const { token } = authResponse.body;
  
        const profileResponse = await request(app.server)
            .get('/faperfil')
            .set('Authorization', `Bearer ${token}`)
            .send();

        
        expect(profileResponse.statusCode).toEqual(200);
        expect(profileResponse.body.faUsuario).toEqual(
            expect.objectContaining({
                email: 'johndoee@example.com',
            }),
        );
    });
});