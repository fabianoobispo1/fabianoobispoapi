import { PrismaTodosRepository } from '@/repositories/prisma/prisma-todos-repository';
import { TodoCreateUseCase } from '../todos/todoCreate';

export function makeRegisterTodoUseCase() {
    const todosRepository = new PrismaTodosRepository();
    const useCase = new TodoCreateUseCase(todosRepository);

    return useCase;
}