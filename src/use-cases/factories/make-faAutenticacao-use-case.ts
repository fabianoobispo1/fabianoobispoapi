import { PrismaFausuarioRepository } from '@/repositories/prisma/prisma-faUsuario-repository';
import { FaAutenticacaoUseCase } from '../faAutenticacao';

export function makeFaAutenticacaoUseCase() {
    const faUsuarioRepository = new PrismaFausuarioRepository();
    const useCase = new FaAutenticacaoUseCase(faUsuarioRepository);

    return useCase;
}