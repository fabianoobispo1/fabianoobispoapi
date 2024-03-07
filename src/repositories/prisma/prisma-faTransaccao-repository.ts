import { prisma } from '@/lib/prisma';
import { FaTransacaoRepository } from '../faTransacao-repository';
import dayjs from 'dayjs';
import { Prisma } from '@prisma/client';



export class PrismaTransacaoRepository implements FaTransacaoRepository{
    async create(data: Prisma.FaTransacaoUncheckedCreateInput) {
        const FaTransacao = await prisma.faTransacao.create({
            data,
        });

        return FaTransacao;
    }
    async findById(id: string){
        const FaTransacao = await prisma.faTransacao.findUnique({
            where: {
                id,
            },
        });
    
        return FaTransacao;
    }
    async findByDate( date: Date) {
        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');

        const FaTransacao= await prisma.faTransacao.findMany({
            where: {         
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate(),
                },
            },
        });

        return   FaTransacao;
    }


}
