import { FastifyRequest, FastifyReply } from 'fastify';
import {  z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

import { prisma } from '@/lib/prisma';

export async function faApagar(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        id: z.string(),
  

    });

    const { id } = registerBodySchema.parse(request.body);

    //verifica se o usuario logado e administrador 
    //const usuarioLogado = request.user.sub;
    /* const isAdmin = await prisma.faUsuario.findUnique({
        where:{
            id: usuarioLogado,
            administrador: true
        }
    }); 
    if(!isAdmin){
        return reply.status(403).send({mesage: 'usuario nao e um admin'});
    }
 */

    try {

        const resutPrisma = await prisma.faTransacao.delete({
            where:{
                id
            }
        });
        return reply.status(201).send(resutPrisma);
     
     
    } catch (err) {
        if (err instanceof UserAlreadyExistsError){
            return reply.status(403).send({mesage: err.message});
        }

        throw err;
    }
    return reply.status(201).send();


}