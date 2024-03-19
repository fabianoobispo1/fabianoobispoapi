import { FastifyRequest, FastifyReply } from 'fastify';
import {  z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

import { prisma } from '@/lib/prisma';

export async function FaRegistrarAtleta(request: FastifyRequest, reply: FastifyReply) {
    const Tipo = z.enum(['ATAQUE', 'DEFESA', 'ST']);

    const registerBodySchema = z.object({    
        data_inicio: z.string().datetime(),        
        tipo: Tipo,    
        posicao: z.string(),   
        numero: z.number(),
        altura: z.number(),
        pesso: z.number(),
        faUsuarioId: z.string(),   
    });

    const { data_inicio, tipo, posicao, numero, altura, pesso, faUsuarioId } = registerBodySchema.parse(request.body);

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

        const resutPrisma = await prisma.faAtleta.create({
            data:{
                data_inicio, tipo, posicao, numero, altura, pesso, faUsuarioId
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