import { prisma } from '@/lib/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function apagar(request: FastifyRequest, reply: FastifyReply) {
    const apagar = await prisma.faUsuario.deleteMany();    
    return reply.status(200).send({
        faUsuario: {
            apagar
        },
    });
}
