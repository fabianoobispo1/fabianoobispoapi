import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyFaJwt(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.faVerify();
    } catch (err) {
        return reply.status(401).send({ message: 'Usuário nâo Autorizado.' });
    }
}