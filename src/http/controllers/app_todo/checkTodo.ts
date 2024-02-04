import { FastifyReply, FastifyRequest } from 'fastify';

import { z } from 'zod';

import {  makeCheckTodoUseCase } from '@/use-cases/factories/make-todos-ischeck-use-case';

export async function checkTodo(request: FastifyRequest, reply: FastifyReply) {
    const idBodySchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = idBodySchema.parse(request.body);


    const checkTodoUseCase = makeCheckTodoUseCase();

    const isCompleted= true;
    const {todo, mensagem} = await checkTodoUseCase.execute({id, isCompleted});

    if(mensagem){
       
        return reply.status(200).send({mensagem});
    }


    return reply.status(200).send({todo});
}


