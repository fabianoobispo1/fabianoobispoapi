import { FastifyRequest, FastifyReply } from 'fastify';
import {  z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

import { prisma } from '@/lib/prisma';

export async function faRegister(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        titulo: z.string(),
        tipo: z.string().max(1),
        valor: z.number(),
        vencimento: z.string().datetime(),        
        faUsuario_id: z.string().min(6),
    });

   
    const { titulo, tipo, valor, vencimento, faUsuario_id } = registerBodySchema.parse(request.body);

    try {

        const resutPrisma = await prisma.faTransacao.create({
            data:{
                titulo, tipo, valor, vencimento, faUsuario_id 
            }
        });
        return reply.status(201).send(resutPrisma);
     
        /*    const faTransicaoRegister = makeFaTransacao();
    
        await faTransicaoRegister.execute({
            titulo,
            tipo,
            valor,
            vencimento,
            faUsuario_id
        }); */
    } catch (err) {
        if (err instanceof UserAlreadyExistsError){
            return reply.status(409).send({mesage: err.message});
        }

        throw err;
    }
    return reply.status(201).send();


}