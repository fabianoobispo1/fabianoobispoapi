import { TodosRepository } from '@/repositories/todos-repository';
import {  Prisma, Todos } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryTodosRepository implements TodosRepository {
    public items: Todos[] = [];


    async findById(id: string) {
        const todos = this.items.find((item) => item.id === id);

        if (!todos) {
            return null;
        }

        return todos;
    }

    async findByText(query: string, page: number) {
        return this.items
            .filter((item) => item.text.includes(query))
            .slice((page - 1) * 20, page * 20);
    }

    async create(data: Prisma.TodosCreateInput) {
        const todos = {
            id: randomUUID(),
            text: data.text,
            isCompleted: false,            
            created_at: new Date(),
            updatedAt: new Date(),
      
        };

        this.items.push(todos);

        return todos;
    }

    async list(page: number) {
        return this.items          
            .slice((page - 1) * 20, page * 20);
    }

    async save(todos: Todos) {
        const todoIndex = this.items.findIndex((item) => item.id === todos.id);
    
        if (todoIndex >= 0) {
            this.items[todoIndex] = todos;
        }
    
        return todos;
    }

    async delete(id: string) {
        const todoIndex = this.items.findIndex((item) => item.id === id);

        if (todoIndex >= 0) {
            this.items.splice(todoIndex,1);
            return 'Item Removido';
        }
      
        return  'Item Não encontrado';
    }


}