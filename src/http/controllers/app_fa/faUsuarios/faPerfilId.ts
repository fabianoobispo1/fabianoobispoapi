import { prisma } from '@/lib/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function faPerfilId(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        id: z.string(),
   
    });

    const { id } = registerBodySchema.parse(request.body);

    const  faUsuario  = await prisma.faUsuario.findUnique({
        where:{
            id
        }
    });

    if (!faUsuario) {
        return reply.status(400).send({ message: "Usuário não encontrado." });
    }
    
    return reply.status(200).send({
        faUsuario: {
            ...faUsuario,
            password_hash: undefined,
        },
    });
}
