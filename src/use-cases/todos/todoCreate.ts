import { TodosRepository } from '@/repositories/todos-repository';

import { Todos } from '@prisma/client';

interface RegisterUseCaseRequest {
  text: string

}

interface TodosUseCaseResponse {
    todo: Todos
}


export class TodoCreateUseCase {
    constructor(private todosRepository: TodosRepository) {}
 
    async execute({ text }: RegisterUseCaseRequest): Promise<TodosUseCaseResponse> {

        const todo = await this.todosRepository.create({
            text
        });

        return {
            todo,
        };
    }
}