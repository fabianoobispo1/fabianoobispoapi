import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeListTodoUseCase } from '@/use-cases/factories/make-list-todos-use-case';

export async function listarTodo(request: FastifyRequest, reply: FastifyReply) {
    const searchGymsQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    const { page } = searchGymsQuerySchema.parse(request.query);

    const searchGymsUseCase = makeListTodoUseCase();

    const { todos } = await searchGymsUseCase.execute({
    
        page,
    });

    return reply.status(200).send({
        todos,
    });
}