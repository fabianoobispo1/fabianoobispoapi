import { FaTransacaoRepository } from '@/repositories/faTransacao-repository';
import { FaUsuarioRepository } from '@/repositories/faUsuario-repository';
import { FaTransacao } from '@prisma/client';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface RegisterFaTransicaoRequest {
    titulo: string
    valor:number
    tipo: string
    faUsuario_id: string
    vencimento: string | Date

}

interface RegisterFaTransacaoResponse {
    faTransacao: FaTransacao
}


export class FaTransacaoRegister {
    constructor(
        private transacaoRepository: FaTransacaoRepository,    
        private faUsuarioRepository: FaUsuarioRepository
    ) {}

    async execute({titulo, valor, tipo, faUsuario_id, vencimento}: RegisterFaTransicaoRequest): Promise<RegisterFaTransacaoResponse> {
        const faUsuario = await this.faUsuarioRepository.findById(faUsuario_id);
  
        if (!faUsuario) {
            throw new ResourceNotFoundError();
        }
        
        const faTransacao = await this.transacaoRepository.create({
            titulo,
            valor, 
            tipo, 
            faUsuario_id: faUsuario.id, 
            vencimento
        });

        return {
            faTransacao,
        };
    }
}