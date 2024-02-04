import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { TodosRepository } from '../todos-repository';



export class PrismaTodosRepository implements TodosRepository{
    
    async findById(id: string) {
        const todo = await prisma.todos.findUnique({
            where: {
                id,
            },
        });
    
        return todo;
    }
    
    async list( page: number) {
        const todos = await prisma.todos.findMany({
         
            take: 20,
            skip: (page - 1) * 20,
        });

        return todos;
    }

    async findByText(query: string, page: number) {
        const todos = await prisma.todos.findMany({
            where: {
                text: {
                    contains: query,
                },
            },
            take: 20,
            skip: (page - 1) * 20,
        });

        return todos;
    }



    async create(data: Prisma.TodosCreateInput) {
        const todo = await prisma.todos.create({
            data,
        });

        return todo;
    }
}