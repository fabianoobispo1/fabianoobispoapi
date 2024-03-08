import { FastifyInstance } from 'fastify';

import { faRegister } from './faRegister';
import { faListar } from './faListar';

import { verifyFaJwt } from '@/http/middlewares/verifyFa-jwt';


export async function faTransicoesRoutes(app: FastifyInstance) {    
    /** Authenticated */

    app.post('/fatransacaoregister',{ onRequest: [verifyFaJwt]}, faRegister);
    app.get('/fatransacaolistar',{ onRequest: [verifyFaJwt]}, faListar);
}