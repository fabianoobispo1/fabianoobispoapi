import { FastifyRequest, FastifyReply } from 'fastify';
import {  z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

import { prisma } from '@/lib/prisma';

export async function faListarPeriodo(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        dataInicial: z.string().datetime(),   
        dataFinal: z.string().datetime(),   
    });

    const { dataInicial,dataFinal  } = registerBodySchema.parse(request.body);
    try {
        let totalPagamentos = 0;
        let totalRecebimentos = 0;
        const resutPrisma = await prisma.faTransacao.findMany({  
            where:{
             vencimento: { lte: dataInicial, gte: dataFinal},         
            }   
            
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