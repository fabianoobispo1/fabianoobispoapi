import { expect,  describe, it, beforeEach } from 'vitest';
import { TodoCreateUseCase } from './todoCreate';


import { InMemoryTodosRepository } from '@/repositories/in-memory/in-memory-todos-repository';




let todoRepository: InMemoryTodosRepository;
let sut: TodoCreateUseCase;

describe('Todo use case', () => {
    beforeEach(()=>{
        todoRepository = new InMemoryTodosRepository;
        sut = new TodoCreateUseCase(todoRepository);
    });

    it('Deve ser capaz de registrar um Todo', async () => {
        

        const { todo } = await sut.execute({
            text: 'Nova tarefa',
        });
        expect(todo.id).toEqual(expect.any(String));
 
    });

});


