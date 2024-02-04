import { TodosRepository } from '@/repositories/todos-repository';

import { Todos } from '@prisma/client';

interface ListTodoUseCaseRequest {
    page: number
}

interface ListTodosUseCaseResponse {
    todos: Todos[]
}


export class TodoListUseCase {
    constructor(private todosRepository: TodosRepository) {} 

    async execute({
        page,
    }: ListTodoUseCaseRequest): Promise<ListTodosUseCaseResponse> {
        const todos = await this.todosRepository.list(
            
            page,
        );

        return {
            todos,
        };
    }

}


