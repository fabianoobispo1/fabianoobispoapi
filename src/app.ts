import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';

import { ZodError } from 'zod';
import { env } from '@/env';
import fastifyJwt from '@fastify/jwt';

import { appGymRoutes } from './http/controllers/app_gym/routes';
import { appFaRoutes } from './http/controllers/app_fa/routes';
import { appTodoRoutes } from './http/controllers/app_todo/routes';


export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET_GYM,
    cookie:{
        cookieName:'refreshTokenGym',
        signed:false        
    },
    namespace: 'gym',
    jwtVerify: 'gymVerify',
    jwtSign: 'gymSign',
    sign:{
        expiresIn:'10m'
    }
});

app.register(fastifyJwt, {
    secret: env.JWT_SECRET_FA,
    cookie:{
        cookieName:'refreshTokenFa',
        signed:false        
    },
    namespace: 'fa',
    jwtVerify: 'faVerify',
    jwtSign: 'faSign',
    sign:{
        expiresIn:'10m'
    }
});


app.get('/', async (request, reply) => {
    return reply.status(200).send({
        message: 'Fabiano REST API is running' 
    });
});


app.register(fastifyCookie);

app.register(appGymRoutes);
app.register(appFaRoutes);
app.register(appTodoRoutes);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() });
    }
    if (env.NODE_ENV !== 'production') {
        console.error(error);
    } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error.' });
});