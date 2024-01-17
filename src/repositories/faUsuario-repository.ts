import { Prisma, FaUsuario } from '@prisma/client';

export interface FaUsuarioRepository {
  findByEmail(email: string): Promise<FaUsuario | null>
  create(data: Prisma.FaUsuarioCreateInput): Promise<FaUsuario>
}