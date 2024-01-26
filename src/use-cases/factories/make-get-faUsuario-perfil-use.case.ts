import { PrismaFausuarioRepository } from '@/repositories/prisma/prisma-faUsuario-repository';
import { GetFaUsuarioPerfilUseCase } from '../get-faUsuario-perfil';

export function makeGetFaUsiarioPerfilUseCase() {
    const faUsuarioRepository = new PrismaFausuarioRepository();
    const useCase = new GetFaUsuarioPerfilUseCase(faUsuarioRepository);

    return useCase;
}
