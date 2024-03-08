import { FastifyRequest, FastifyReply } from 'fastify';
import {   z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

import { makeListFaTransacao } from '@/use-cases/factories/make-faTransacao-listar-use-case';
import dayjs from 'dayjs';
import { prisma } from '@/lib/prisma';

export async function faListar(request: FastifyRequest, reply: FastifyReply) {

    
    try {
     
        const resutPrisma = await prisma.faTransacao.findMany({
            
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