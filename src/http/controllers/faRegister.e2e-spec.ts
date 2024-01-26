import request from 'supertest';
import { app } from '@/app';
import 'dotenv/config';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Register (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('Deveria poder se cadastrar', async () => {      
        const response = await request(app.server).post('/fausuario').send({
            nome: 'John Doe',
            email: 'johndoea@example.com',
            password: '123456',
            data_nascimento: '1990-04-24T00:00:00Z'
        });

        expect(response.statusCode).toEqual(201);
    });

});