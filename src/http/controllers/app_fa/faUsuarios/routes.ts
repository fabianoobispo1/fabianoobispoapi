import { FastifyInstance } from 'fastify';

import { faRegister } from './faRegister';
import { faAutenticacao } from './faAutenticacao';
import { faPerfil } from './faPerfil';

import { verifyFaJwt } from '@/http/middlewares/verifyFa-jwt';
import { faRefresh } from './faRefresh';
import { faPerfilId } from './faPerfilId';
import { apagar } from './apagar';
import { faListarUsuarios } from './faListarUsuarios';
import { faUsuarioAdmin } from './faUsuarioAdmin';

export async function faUsuarioRoutes(app: FastifyInstance) {    
    app.post('/fausuario', faRegister);
    app.post('/fasesao', faAutenticacao);

    app.post('/faperfilid', faPerfilId);
    app.patch('/token/farefresh', faRefresh);
    app.get('/apagar', apagar);

    /** Authenticated */

    app.get('/faperfil',{ onRequest: [verifyFaJwt]}, faPerfil);
    
    app.get('/listarusuarios',{ onRequest: [verifyFaJwt]}, faListarUsuarios);

    app.post('/alterarusuarioadmin',{ onRequest: [verifyFaJwt]}, faUsuarioAdmin);



}