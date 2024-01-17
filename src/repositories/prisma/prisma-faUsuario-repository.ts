import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

import { FaUsuarioRepository } from '../faUsuario-repository';



export class PrismaFausuarioRepository implements FaUsuarioRepository{
    async findByEmail(email: string) {
        const user = await prisma.faUsuario.findUnique({
            where: {
                email,
            },
        });

        return user;
    }
    async create(data: Prisma.FaUsuarioCreateInput) {
        const user = await prisma.faUsuario.create({
            data,
        });

        return user;
    }
}