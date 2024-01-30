import { FastifyInstance } from 'fastify';

import { faRegister } from './faRegister';
import { faAutenticacao } from './faAutenticacao';
import { faPerfil } from './faPerfil';

import { verifyFaJwt } from '@/http/middlewares/verifyFa-jwt';

export async function faUsuarioRoutes(app: FastifyInstance) {    
    app.post('/fausuario', faRegister);
    app.post('/fasesao', faAutenticacao);

    /** Authenticated */

    app.get('/faperfil',{ onRequest: [verifyFaJwt]}, faPerfil);
}