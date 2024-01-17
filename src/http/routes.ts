import { FastifyInstance } from 'fastify';
import { register } from './controllers/register';
import { faRegister } from './controllers/faRegister';

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register);

    app.post('/fausuario', faRegister);
}