import { FaTransacaoRepository } from '@/repositories/faTransacao-repository';
import { FaTransacao, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';

export class InMemoryFaTransacoesRepository implements FaTransacaoRepository {
    public items: FaTransacao[] = [];

         async findById(id: string) {
        const faTransacao = this.items.find((item) => item.id === id);

        if (!faTransacao) {
            return null;
        }

        return faTransacao;
    }

    async findByDate(date: Date){
        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');

        const faTransacaoOnSameDate = this.items.filter((faTransacao) => {
            const checkInDate = dayjs(faTransacao.created_at);
            const isOnSameDate =
            checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
    
            return faTransacao.id===faTransacao.id && isOnSameDate
        });

    
        if (!faTransacaoOnSameDate) {
            return null;
        }
    
        return faTransacaoOnSameDate;

    }

    async findByUserIdOnDate(userId: string, date: Date) {

    
        
    }


    


 /*     
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