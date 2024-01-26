import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyGymJwt(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.gymVerify();
    } catch (err) {
        return reply.status(401).send({ message: 'Unauthorized.' });
    }
}