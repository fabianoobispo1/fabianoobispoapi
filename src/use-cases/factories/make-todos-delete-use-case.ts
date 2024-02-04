import { PrismaTodosRepository } from '@/repositories/prisma/prisma-todos-repository';
import { TodoDeleteUseCase } from '../todos/todoDelete';

export function makeCheckTodoUseCase() {
    const todosRepository = new PrismaTodosRepository();
    const useCase = new TodoDeleteUseCase(todosRepository);

    return useCase;
}