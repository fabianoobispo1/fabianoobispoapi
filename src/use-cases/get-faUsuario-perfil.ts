import { FaUsuarioRepository } from '@/repositories/faUsuario-repository';
import { FaUsuario } from '@prisma/client';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface GetFaUsuarioPerfilUseCaseRequest {
  userId: string
}

interface GetFaUsuarioPerfilUseCaseResponse {
  faUsuario: FaUsuario
}

export class GetFaUsuarioPerfilUseCase {
    constructor(private faUsuarioRepository: FaUsuarioRepository) {}

    async execute({
        userId,
    }: GetFaUsuarioPerfilUseCaseRequest): Promise<GetFaUsuarioPerfilUseCaseResponse> {
        const faUsuario = await this.faUsuarioRepository.findById(userId);

        if (!faUsuario) {
            throw new ResourceNotFoundError();
        }

        return {
            faUsuario,
        };
    }
}