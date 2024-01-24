import { Prisma, FaUsuario } from '@prisma/client';

export interface FaUsuarioRepository {
  findById(id: string): Promise<FaUsuario | null>
  findByEmail(email: string): Promise<FaUsuario | null>
  create(data: Prisma.FaUsuarioCreateInput): Promise<FaUsuario>
}