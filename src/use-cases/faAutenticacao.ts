import { FaUsuarioRepository } from '@/repositories/faUsuario-repository';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { FaUsuario } from '@prisma/client';
import { compare } from 'bcryptjs';

interface FaAutenticacaoUseCaseRequest {
  email: string
  password: string

}

interface FaAutenticacaoUseCaseResponse {
    faUsuario: FaUsuario
}

export class FaAutenticacaoUseCase {
    constructor(private faUsuarioRepository: FaUsuarioRepository) {}

    async execute({email, password}: FaAutenticacaoUseCaseRequest):Promise<FaAutenticacaoUseCaseResponse> {
        const faUsuario = await this.faUsuarioRepository.findByEmail(email);

        if (!faUsuario) {
            throw new InvalidCredentialsError();
        }

        const doestPasswordMatches = await compare(password, faUsuario.password_hash);

        if (!doestPasswordMatches) {
            throw new InvalidCredentialsError();
        }
    
        return {
            faUsuario,
        };
        
    }
}