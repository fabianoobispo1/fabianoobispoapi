import { prisma } from '@/lib/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function faPerfil(request: FastifyRequest, reply: FastifyReply) {

    const faUsuario = await prisma.faUsuario.findUnique({
        where: {
            id:request.user.sub
        }
    });

    if (!faUsuario) {
        return reply.status(400).send({ message: "Usuario não encontrado." });
    }
    return reply.status(200).send({
        faUsuario: {
            ...faUsuario,
            password_hash: undefined,
        },
    }); 
}
