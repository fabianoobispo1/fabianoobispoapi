import { FaTransacaoRepository } from '@/repositories/faTransacao-repository';
import { FaTransacao, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';


export class InMemoryFaTransacoesRepository implements FaTransacaoRepository {
    public items: FaTransacao[] = [];

 /*    async findById(id: string) {
        const faUsuario = this.items.find((item) => item.id === id);

        if (!faUsuario) {
            return null;
        }

        return faUsuario;
    }
    
    async findByEmail(email: string) {
        const faUsuario = this.items.find((item) => item.email === email);

        if (!faUsuario) {
            return null;
        }

        return faUsuario;
    }
 */
 

    async create(data: Prisma.FaTransacaoUncheckedCreateInput) {
        const faTransacao = {            
            id: randomUUID(),
            titulo: data.titulo,
            valor: data.valor,
            tipo: data.tipo,
            vencimento: new Date(data.vencimento),                    
            faUsuario_id: data.faUsuario_id,
            updated_at: new Date(),
            created_at: new Date()
 
        };

        this.items.push(faTransacao);

        return faTransacao;
    }
}