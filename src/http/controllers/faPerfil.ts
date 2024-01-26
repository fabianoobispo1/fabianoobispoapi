import { makeGetFaUsiarioPerfilUseCase } from '@/use-cases/factories/make-get-faUsuario-perfil-use.case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function faPerfil(request: FastifyRequest, reply: FastifyReply) {

    const getFaUsuarioPerfil = makeGetFaUsiarioPerfilUseCase();

    const { faUsuario } = await getFaUsuarioPerfil.execute({
        userId: request.user.sub
    });
    
    return reply.status(200).send({
        faUsuario: {
            ...faUsuario,
            password_hash: undefined,
        },
    });
}
