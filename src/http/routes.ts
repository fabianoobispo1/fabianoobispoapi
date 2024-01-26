import { FastifyInstance } from 'fastify';
import { register } from './controllers/register';
import { faRegister } from './controllers/faRegister';
import { authenticate } from '@/http/controllers/authenticate';
import { profile } from '@/http/controllers/profile';
import { faAutenticacao } from './controllers/faAutenticacao';
import { faPerfil } from './controllers/faPerfil';
import { verifyGymJwt } from '@/http/middlewares/verifyGYM-jwt';
import { verifyFaJwt } from '@/http/middlewares/verifyFa-jwt';

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register);
    app.post('/sessions', authenticate);
    
    app.post('/fausuario', faRegister);
    app.post('/fasesao', faAutenticacao);

    /** Authenticated */
    app.get('/me',{ onRequest: [verifyGymJwt]}, profile);

    app.get('/faperfil',{ onRequest: [verifyFaJwt]}, faPerfil);
}