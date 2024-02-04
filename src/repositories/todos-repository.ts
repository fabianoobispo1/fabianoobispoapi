import { Prisma, Todos } from '@prisma/client';

export interface TodosRepository {
  findById(id: string): Promise<Todos | null>
  list( page: number): Promise<Todos[]>
  create(data: Prisma.TodosCreateInput): Promise<Todos>
  findByText(query: string, page: number): Promise<Todos[]>
}