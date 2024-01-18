import { FaUsuarioRepository } from '@/repositories/faUsuario-repository';
import { FaUsuario, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryFaUsuariosRepository implements FaUsuarioRepository {
    public items: FaUsuario[] = [];

    async findByEmail(email: string) {
        const faUsuario = this.items.find((item) => item.email === email);

        if (!faUsuario) {
            return null;
        }

        return faUsuario;
    }

 

    async create(data: Prisma.FaUsuarioCreateInput) {
        const faUsuario = {            
            id: randomUUID(),
            nome: data.nome,
            email: data.email,                    
            password_hash: data.password_hash,           
            data_nascimento: new Date(data.data_nascimento), 
            administrador:false,
            created_at: new Date()

        };

        this.items.push(faUsuario);

        return faUsuario;
    }
}