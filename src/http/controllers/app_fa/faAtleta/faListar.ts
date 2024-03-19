import { FastifyRequest, FastifyReply } from 'fastify';

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

import { prisma } from '@/lib/prisma';

export async function faListarAtleta(request: FastifyRequest, reply: FastifyReply) {

    
    try {
        const listAtletas = await prisma.faAtleta.findMany({     
            
        });      
        return reply.status(200).send({
            listAtletas});
    } catch (err) {
        if (err instanceof UserAlreadyExistsError){
            return reply.status(409).send({mesage: err.message});
        }

        throw err;
    }

}