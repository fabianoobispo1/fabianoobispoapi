import { FastifyInstance } from 'fastify';
import { register } from './controllers/register';
import { faRegister } from './controllers/faRegister';
import { authenticate } from '@/http/controllers/authenticate';

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register);
    app.post('/sessions', authenticate);
    
    app.post('/fausuario', faRegister);
}