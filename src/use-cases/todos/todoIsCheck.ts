import { TodosRepository } from '@/repositories/todos-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { Todos } from '@prisma/client';


interface RegisterUseCaseRequest {
  id: string
  isCompleted: boolean
}

interface TodosUseCaseResponse {
    todo?: Todos
    mensagem?: string
}


export class TodoIsCheckUseCase {
    constructor(private todosRepository: TodosRepository) {}
 
    async execute({ id, isCompleted }: RegisterUseCaseRequest): Promise<TodosUseCaseResponse> {

        const todo = await this.todosRepository.findById(id);

       
        if (!todo) {
            throw new ResourceNotFoundError();
        }
        if( todo?.isCompleted){
            const mensagem =  'Todo ja realizado';
            return {
                mensagem
            };
        }
     

        todo.isCompleted= isCompleted;
        todo.updatedAt = new Date();

        await this.todosRepository.save(todo);

        return {
            todo,
        };

    }
}