import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';

import { ZodError } from 'zod';
import { env } from '@/env';
import fastifyJwt from '@fastify/jwt';

import { appGymRoutes } from './http/controllers/app_gym/routes';
import { appFaRoutes } from './http/controllers/app_fa/routes';



import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import ejs from 'ejs';
import path from 'node:path';


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


// Configuração para servir arquivos estáticos
app.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/public/', // Prefixo opcional para servir arquivos estáticos
  });
  
  // Configuração do diretório de views e mecanismo de visualização
  app.register(fastifyView, {
    engine: {
      ejs,
    },
    templates: path.join(__dirname, '../views'),
  });
  
  // Rota para a raiz da aplicação
  app.get('/', async (request, reply) => {
    reply.view('index.ejs'); // Removido 'pages/' do caminho do modelo
  });
  

  
app.register(fastifyCookie);

app.register(appGymRoutes);
app.register(appFaRoutes);

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