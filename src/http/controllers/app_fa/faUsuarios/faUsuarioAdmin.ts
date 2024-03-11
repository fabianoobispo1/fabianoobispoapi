import { FastifyRequest, FastifyReply } from 'fastify';
import {  z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

import { prisma } from '@/lib/prisma';

export async function faUsuarioAdmin(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        faUsuario_id: z.string().min(6),
        faUsuarioAdmin: z.boolean(),      
    });
    const { faUsuario_id, faUsuarioAdmin } = registerBodySchema.parse(request.body);

    const usuarioIDALterador = request.user.sub;


    //verifica se o usuario alterador e administrador 
    const isAdmin = await prisma.faUsuario.findUnique({
        where:{
            id: usuarioIDALterador,
            administrador: true
        }
    });
    
    if(!isAdmin){
        return reply.status(403).send({mesage: 'usuario nao e um admin'});
    }

    try {

        const resutPrisma = await prisma.faUsuario.update({
            data:{
                administrador: faUsuarioAdmin
            },
            where:{
                id :faUsuario_id
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