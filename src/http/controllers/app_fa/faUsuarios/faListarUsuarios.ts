import { FastifyRequest, FastifyReply } from 'fastify';

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';


import { prisma } from '@/lib/prisma';

export async function faListarUsuarios(request: FastifyRequest, reply: FastifyReply) {

    
    try {
     
        const resutPrisma = await prisma.faUsuario.findMany({
            
        });
        return reply.status(201).send(resutPrisma);
    } catch (err) {
        if (err instanceof UserAlreadyExistsError){
            return reply.status(409).send({mesage: err.message});
        }

        throw err;
    }
    return reply.status(201).send();


}