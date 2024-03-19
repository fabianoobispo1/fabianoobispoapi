import { FastifyRequest, FastifyReply } from 'fastify';

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

import { prisma } from '@/lib/prisma';

export async function faListar(request: FastifyRequest, reply: FastifyReply) {

    
    try {
        let totalPagamentos = 0;
        let totalRecebimentos = 0;
        const resutPrisma = await prisma.faTransacao.findMany({     
            
        });

        resutPrisma.forEach((result) => {
            if(result.tipo == 'P'){
                totalPagamentos = totalPagamentos + result.valor;
            }
            if(result.tipo == 'R'){
                totalRecebimentos = totalRecebimentos + result.valor;
            }
            
        });

      
        return reply.status(200).send({
            totalPagamentos,
            totalRecebimentos,
            transacoes :resutPrisma});
    } catch (err) {
        if (err instanceof UserAlreadyExistsError){
            return reply.status(409).send({mesage: err.message});
        }

        throw err;
    }

}