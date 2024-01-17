import { FastifyRequest, FastifyReply } from 'fastify';
import {  z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/erros/user-already-exists-error';
import { PrismaFausuarioRepository } from '@/repositories/prisma/prisma-faUsuario-repository';
import { FaUsuarioRegister } from '@/use-cases/faUsuarioRegister';

export async function faRegister(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        nome: z.string(),
        data_nascimento: z.string().datetime(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { nome, email, password, data_nascimento } = registerBodySchema.parse(request.body);

    try {
        const faUsuarioRepository = new PrismaFausuarioRepository();
        const faUsuarioRegister = new FaUsuarioRegister(faUsuarioRepository);
    
        await faUsuarioRegister.execute({
            nome,
            email,
            password,
            data_nascimento
        });
    } catch (err) {
        if (err instanceof UserAlreadyExistsError){
            return reply.status(409).send({mesage: err.message});
        }

        throw err;
    }
    return reply.status(201).send();


}