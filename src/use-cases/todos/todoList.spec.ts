import { InMemoryTodosRepository } from '@/repositories/in-memory/in-memory-todos-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { TodoListUseCase } from './todoList';

let todoRepository: InMemoryTodosRepository;
let sut: TodoListUseCase;

describe('Listar Todos Use Case', () => {
    beforeEach(async () => {
        todoRepository = new InMemoryTodosRepository();
        sut = new TodoListUseCase(todoRepository);
    });


    it('deve ser capaz de buscar lista de todos paginado', async () => {
        for (let i = 1; i <= 22; i++) {
            await todoRepository.create({
                text: `Texto teste numero-${i}`
    
            });
        }

        const { todos } = await sut.execute({       
            page: 2,
        });

        expect(todos).toHaveLength(2);
        expect(todos).toEqual([
            expect.objectContaining({  text: 'Texto teste numero-21' }),
            expect.objectContaining({  text: 'Texto teste numero-22' }),
        ]);
    });
});