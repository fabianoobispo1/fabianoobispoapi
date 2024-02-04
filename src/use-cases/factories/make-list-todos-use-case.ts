import { PrismaTodosRepository } from '@/repositories/prisma/prisma-todos-repository';
import { TodoListUseCase } from '../todos/todoList';

export function makeListTodoUseCase() {
    const todosRepository = new PrismaTodosRepository();
    const useCase = new TodoListUseCase(todosRepository);

    return useCase;
}