import { InMemoryTodosRepository } from '@/repositories/in-memory/in-memory-todos-repository';

import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import { TodoIsCheckUseCase } from './todoIsCheck';

let todosRepository: InMemoryTodosRepository;
let sut: TodoIsCheckUseCase;

describe('Todo check Use Case', () => {
    beforeEach(async () => {
        todosRepository = new InMemoryTodosRepository();
        sut = new TodoIsCheckUseCase(todosRepository);

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('Deve ser possivel alterar o todo para feito', async () => {
        const createTodo = await todosRepository.create({
            text: 'o que deve ser feito'
        });

        const { todo } = await sut.execute({
            id: createTodo.id,
            isCompleted: true
        });

        

        expect(todo.isCompleted).toEqual(true);
       
    });



});