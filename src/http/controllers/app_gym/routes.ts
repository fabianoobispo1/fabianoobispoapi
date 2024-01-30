import { FastifyInstance } from 'fastify';
import { checkInsRoutes } from './check-ins/routes';
import { usersRoutes } from './users/routes';
import { gymsRoutes } from './gyms/routes';


export async function appGymRoutes(app: FastifyInstance) {
    app.register(checkInsRoutes);
    app.register(usersRoutes);
    app.register(gymsRoutes);
}