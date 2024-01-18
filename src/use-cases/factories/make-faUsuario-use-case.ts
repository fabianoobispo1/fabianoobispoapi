import { PrismaFausuarioRepository } from '@/repositories/prisma/prisma-faUsuario-repository';
import { FaUsuarioRegister } from '../faUsuarioRegister';

export function makefaUsuarioRegister() {
    const faUsuarioRepository = new PrismaFausuarioRepository();
    const faUsuarioRegister = new FaUsuarioRegister(faUsuarioRepository);

    return faUsuarioRegister;
}