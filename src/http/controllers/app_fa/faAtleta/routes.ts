import { FastifyInstance } from 'fastify';


import { faListarAtleta } from './faListar';
import { FaRegistrarAtleta } from './faRegistrar';

import { verifyFaJwt } from '@/http/middlewares/verifyFa-jwt';



export async function faAtletaRoutes(app: FastifyInstance) {    
    /** Authenticated */
    app.post('/faatletaregister',{ onRequest: [verifyFaJwt]}, FaRegistrarAtleta);
    app.get('/faatletalistar',{ onRequest: [verifyFaJwt]}, faListarAtleta);

}