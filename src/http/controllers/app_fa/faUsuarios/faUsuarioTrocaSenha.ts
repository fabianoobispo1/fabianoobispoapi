import { FastifyRequest, FastifyReply } from 'fastify';
import {  z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { compare, hash } from 'bcryptjs';

import { prisma } from '@/lib/prisma';

export async function faUsuarioTrocaSenha(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        passwordAntigo: z.string().min(6),
        passwordNovo: z.string().min(6),      
    });
    const { passwordAntigo, passwordNovo } = registerBodySchema.parse(request.body);

    const usuarioLogado = request.user.sub;

    //verifica se o passwordAntigo e valido
    const faUsuario = await prisma.faUsuario.findUnique({
        where:{
            id:usuarioLogado
        }
    });

    if (faUsuario){
        const doestPasswordMatches = await compare(passwordAntigo, faUsuario.password_hash);

        if (!doestPasswordMatches) {
            return reply.status(403).send({mesage: 'Senha antiga invalida.'});
        }
    
    }

    const password_hash = await hash(passwordNovo, 6);

    try {

        const resutPrisma = await prisma.faUsuario.update({
            data:{
                password_hash
            },
            where:{
                id :usuarioLogado
            }
        });
        return reply.status(201).send(resutPrisma);
     
     
    } catch (err) {
        if (err instanceof UserAlreadyExistsError){
            return reply.status(403).send({mesage: err.message});
        }

        throw err;
    }


}