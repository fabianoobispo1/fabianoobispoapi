import { FastifyInstance } from 'fastify';
import { register } from './register';

import { authenticate } from './authenticate';
import { profile } from './profile';

import { verifyGymJwt } from '@/http/middlewares/verifyGym-jwt';

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', register);
    app.post('/sessions', authenticate);
    
    /** Authenticated */
    app.get('/me',{ onRequest: [verifyGymJwt]}, profile);


}