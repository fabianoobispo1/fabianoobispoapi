import { FastifyReply, FastifyRequest } from 'fastify';

import { z } from 'zod';

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import {  makeRegisterTodoUseCase } from '@/use-cases/factories/make-todos-use-case';

export async function registrarTodo(request: FastifyRequest, reply: FastifyReply) {


    const registerBodySchema = z.object({
        text: z.string(),
    });

    const { text } = registerBodySchema.parse(request.body);

    try {
        const registerTodoUseCase = makeRegisterTodoUseCase();
    
        const { todo } = await registerTodoUseCase.execute({
            text
        });
        return reply.status(201).send({
            todo,
        });
    } catch (err) {
        if (err instanceof UserAlreadyExistsError){
            return reply.status(409).send({mesage: err.message});
        }

        throw err;
    }
   
}


