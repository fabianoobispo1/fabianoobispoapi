import { prisma } from '@/lib/prisma';
import { FaTransacaoRepository } from '../faTransacao-repository';

import { Prisma } from '@prisma/client';



export class PrismaTransacaoRepository implements FaTransacaoRepository{
    async create(data: Prisma.FaTransacaoUncheckedCreateInput) {
        const FaTransacao = await prisma.faTransacao.create({
            data,
        });

        return FaTransacao;
    }
}