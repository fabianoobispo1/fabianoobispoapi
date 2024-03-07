import { PrismaTransacaoRepository } from '@/repositories/prisma/prisma-faTransaccao-repository';

import { FaTransacaoPeriodo } from '../faTransacaolist';


export function makeListFaTransacao() {
    const TransacaoRepository = new PrismaTransacaoRepository();
    
    const useCase = new FaTransacaoPeriodo(TransacaoRepository);

    return useCase;
}
