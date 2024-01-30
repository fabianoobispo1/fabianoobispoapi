import { FastifyInstance } from 'fastify';
import { faUsuarioRoutes } from './faUsuarios/routes';


export async function appFaRoutes(app: FastifyInstance) {
    app.register(faUsuarioRoutes);
}