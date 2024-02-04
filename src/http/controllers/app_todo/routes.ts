import { FastifyInstance } from 'fastify';
import {registrarTodo} from './registrarTodo';
import { listarTodo } from './listarTodo';
import { checkTodo } from './checkTodo';
import { deleteTodo } from './deleteTodo';


export async function appTodoRoutes(app: FastifyInstance) {
    app.post('/todoadicionar', registrarTodo);
    app.get('/todolistar', listarTodo);
    app.post('/todocheck', checkTodo );
    app.delete('/tododelete', deleteTodo);
}