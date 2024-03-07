import { Prisma, FaTransacao } from '@prisma/client';

export interface FaTransacaoRepository {
  findById(id: string): Promise<FaTransacao | null>
 /*  findByEmail(email: string): Promise<FaUsuario | null>*/
  create(data: Prisma.FaTransacaoUncheckedCreateInput): Promise<FaTransacao> 
  findByDate( date: Date): Promise<FaTransacao[]| null>
}