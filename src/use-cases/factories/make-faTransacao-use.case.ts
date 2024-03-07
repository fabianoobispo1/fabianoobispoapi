import { PrismaTransacaoRepository } from '@/repositories/prisma/prisma-faTransaccao-repository';
import { PrismaFausuarioRepository } from '@/repositories/prisma/prisma-faUsuario-repository';
import { FaTransacaoRegister } from '../faTransacaoRegisteer';


export function makeFaTransacao() {
    const TransacaoRepository = new PrismaTransacaoRepository();
    const FaUsuarioRegister = new PrismaFausuarioRepository();

    const useCase = new FaTransacaoRegister(TransacaoRepository, FaUsuarioRegister);

    return useCase;
}
