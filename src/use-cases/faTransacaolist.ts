import { FaTransacaoRepository } from '@/repositories/faTransacao-repository';
import { FaTransacao } from '@prisma/client';


interface PeriodoFaTransicaoRequest {
    periodo: string | Date

}

interface PeriodoFaTransacaoResponse {
    faTransacao: FaTransacao | null
}


export class FaTransacaoPeriodo {
    constructor(
        private transacaoRepository: FaTransacaoRepository
    ) {}

    async execute({periodo}: PeriodoFaTransicaoRequest): Promise<PeriodoFaTransacaoResponse> {
   

        
        const faTransacao = await this.transacaoRepository.findByDate(
            new Date(periodo) 
        );

        return {
            faTransacao,
        };
    }
}