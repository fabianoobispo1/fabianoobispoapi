import '@fastify/jwt';
import '@fastify';

declare module '@fastify/jwt' {
  export interface FastifyJWT {
  
    user: {
      sub: string
      administrador?:boolean
      sign: {
        sub: string
      }
    },
  
  }

}

declare module 'fastify' {
  interface FastifyInstance extends 
  FastifyJwtNamespace<{
    jwtSign: 'gymSign',
    jwtVerify: 'gymVerify',
  }> { }
}

