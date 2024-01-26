import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeFaAutenticacaoUseCase } from '@/use-cases/factories/make-faAutenticacao-use-case';

export async function faAutenticacao(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {        
        const authenticateUseCase =makeFaAutenticacaoUseCase();

        const { faUsuario } = await authenticateUseCase.execute({
            email,
            password,
        });
           
        const token = await reply.faSign(
            {},
            {
                sign: {
                    sub: faUsuario.id,
                },
            },
        );
      
        return reply.status(200).send({
            token,
        });
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message });
        }

        throw err;
    }


}