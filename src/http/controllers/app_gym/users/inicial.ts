import { FastifyReply, FastifyRequest } from 'fastify';

export async function inicial(request: FastifyRequest, reply: FastifyReply) {

    return reply.status(201).send({mesage: 'Servidor ok'});
}

