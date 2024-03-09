import { makeGetFaUsiarioPerfilUseCase } from '@/use-cases/factories/make-get-faUsuario-perfil-use.case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function faPerfilId(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        id: z.string(),
   
    });

    const { id } = registerBodySchema.parse(request.body);


    const getFaUsuarioPerfil = makeGetFaUsiarioPerfilUseCase();

    const { faUsuario } = await getFaUsuarioPerfil.execute({
        userId: id
    });
    
    return reply.status(200).send({
        faUsuario: {
            ...faUsuario,
            password_hash: undefined,
        },
    });
}
