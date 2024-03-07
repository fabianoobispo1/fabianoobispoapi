import { FastifyRequest, FastifyReply } from 'fastify';
import {  date, z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

import { makeListFaTransacao } from '@/use-cases/factories/make-faTransacao-listar-use-case';

export async function faListar(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({        
        mes: z.string().datetime(),        
     
    });

    const { mes } = registerBodySchema.parse(request.body);
    const periodo  = new Date(mes)
    try {
     
        const faTransicaoRegister = makeListFaTransacao();
    
        await faTransicaoRegister.execute({
            periodo
        });
    } catch (err) {
        if (err instanceof UserAlreadyExistsError){
            return reply.status(409).send({mesage: err.message});
        }

        throw err;
    }
    return reply.status(201).send();


}