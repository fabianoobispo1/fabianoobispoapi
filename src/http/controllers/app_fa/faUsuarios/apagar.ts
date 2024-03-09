import { prisma } from '@/lib/prisma';
import { makeGetFaUsiarioPerfilUseCase } from '@/use-cases/factories/make-get-faUsuario-perfil-use.case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function apagar(request: FastifyRequest, reply: FastifyReply) {


    const apagar = await prisma.faUsuario.deleteMany();
 
    
    return reply.status(200).send({
        faUsuario: {
            apagar
        },
    });
}
