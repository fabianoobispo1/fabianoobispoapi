import { PrismaTodosRepository } from '@/repositories/prisma/prisma-todos-repository';
import { TodoIsCheckUseCase } from '../todos/todoIsCheck';

export function makeCheckTodoUseCase() {
    const todosRepository = new PrismaTodosRepository();
    const useCase = new TodoIsCheckUseCase(todosRepository);

    return useCase;
}