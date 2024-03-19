import { FastifyInstance } from 'fastify';
import { faUsuarioRoutes } from './faUsuarios/routes';
import { faTransicoesRoutes } from './faTransacoes/routes';
import { faAtletaRoutes } from './faAtleta/routes';


export async function appFaRoutes(app: FastifyInstance) {
    app.register(faUsuarioRoutes);
    app.register(faTransicoesRoutes);
    app.register(faAtletaRoutes);
}