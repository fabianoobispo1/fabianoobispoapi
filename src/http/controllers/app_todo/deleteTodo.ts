import { FastifyReply, FastifyRequest } from 'fastify';

import { z } from 'zod';

import {  makeCheckTodoUseCase } from '@/use-cases/factories/make-todos-delete-use-case';

export async function deleteTodo(request: FastifyRequest, reply: FastifyReply) {
    const idBodySchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = idBodySchema.parse(request.body);


    const checkTodoUseCase = makeCheckTodoUseCase();

   
    const { mensagem} = await checkTodoUseCase.execute({id});

    if(mensagem){
       
        return reply.status(200).send({mensagem});
    }


    return reply.status(200).send({mensagem});
}


