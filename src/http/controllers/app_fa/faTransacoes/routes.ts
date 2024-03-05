import { FastifyInstance } from 'fastify';

import { faRegister } from './faRegister';


import { verifyFaJwt } from '@/http/middlewares/verifyFa-jwt';


export async function faTransicoesRoutes(app: FastifyInstance) {    
    /** Authenticated */

    app.post('/fatransacaoregister',{ onRequest: [verifyFaJwt]}, faRegister);
}