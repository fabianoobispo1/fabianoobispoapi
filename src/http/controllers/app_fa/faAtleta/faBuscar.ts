import { FastifyRequest, FastifyReply } from 'fastify';
import {  z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

import { prisma } from '@/lib/prisma';

export async function faBuscarAtleta(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({ 
        nome: z.string(),
    })

    const { nome } = registerBodySchema.parse(request.body);



 
    try {
           //verifica se o atleta ja tem cadastro como usuario 
    const faUsuario = await prisma.faUsuario.findMany({
        where:{
            nome
        },
        include: {
            atleta:true
        }
    })
     
    if (!faUsuario) {
        return reply.status(409).send({mesage: 'usuario nao encotrado'});
    }
    
        return reply.status(200).send({
            faUsuario});
    } catch (err) {
        if (err instanceof UserAlreadyExistsError){
            return reply.status(409).send({mesage: err.message});
        }

        throw err;
    }

}