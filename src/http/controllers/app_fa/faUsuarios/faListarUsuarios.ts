import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '@/lib/prisma';

export async function faListarUsuarios(request: FastifyRequest, reply: FastifyReply) {    
    try {     
        const resutPrisma = await prisma.faUsuario.findMany({
            include: {
                atleta:true
            }
            
        });
        return reply.status(201).send(resutPrisma);
    } catch (err) {
        return reply.status(400).send({ message: "Erro Interno"}); 
    }
}