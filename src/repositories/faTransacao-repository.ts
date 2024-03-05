import { Prisma, FaTransacao } from '@prisma/client';

export interface FaTransacaoRepository {
/*   findById(id: string): Promise<FaUsuario | null>
  findByEmail(email: string): Promise<FaUsuario | null>*/
  create(data: Prisma.FaTransacaoUncheckedCreateInput): Promise<FaTransacao> 
}