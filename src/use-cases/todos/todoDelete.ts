import { TodosRepository } from '@/repositories/todos-repository';


interface deleteTodoUseCaseRequest {
    id: string
}

interface DeleteTodosUseCaseResponse {
    mensagem: string
}


export class TodoDeleteUseCase {
    constructor(private todosRepository: TodosRepository) {} 

    async execute({
        id,
    }: deleteTodoUseCaseRequest): Promise<DeleteTodosUseCaseResponse> {
        try {
            await this.todosRepository.delete(
            
                id,
            );
            return {
                mensagem: 'Todo removido',
            };
            
        } catch (error) {
            
            return {
                mensagem: 'Todo nao encontrado',
            };
            
        }
   
    }

}


