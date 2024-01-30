import { FastifyInstance } from 'fastify';

import { faRegister } from './faRegister';
import { faAutenticacao } from './faAutenticacao';
import { faPerfil } from './faPerfil';

import { verifyFaJwt } from '@/http/middlewares/verifyFa-jwt';
import { faRefresh } from './faRefresh';

export async function faUsuarioRoutes(app: FastifyInstance) {    
    app.post('/fausuario', faRegister);
    app.post('/fasesao', faAutenticacao);

    app.patch('/token/farefresh', faRefresh);
    /** Authenticated */

    app.get('/faperfil',{ onRequest: [verifyFaJwt]}, faPerfil);
}