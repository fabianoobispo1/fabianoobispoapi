import { FastifyInstance } from 'fastify';

import { verifyGymJwt } from '@/http/middlewares/verifyGym-jwt';
import { search } from './search';
import { nearby } from './nearby';
import { create } from './create';

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyGymJwt);

    app.get('/gyms/search', search);
    app.get('/gyms/nearby', nearby);

    app.post('/gyms', create);
}