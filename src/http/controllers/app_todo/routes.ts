import { FastifyInstance } from 'fastify';
import {registrarTodo} from './registrarTodo';
import { listarTodo } from './listarTodo';


export async function appTodoRoutes(app: FastifyInstance) {
    app.post('/todoadicionar', registrarTodo);
    app.get('/todolistar', listarTodo);

}