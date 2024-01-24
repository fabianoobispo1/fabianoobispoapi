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

    async findById(id: string): Promise<{ id: string; nome: string; email: string; password_hash: string;  data_nascimento: Date ; administrador:boolean; created_at: Date; } | null> {
        throw new Error('Method not implemented.');
    }
    
}