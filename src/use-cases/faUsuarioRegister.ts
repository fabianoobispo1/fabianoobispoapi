import { FaUsuarioRepository } from '@/repositories/faUsuario-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { FaUsuario } from '@prisma/client';

interface RegisterFaUsuarioRequest {
  nome: string
  email: string
  password: string
  data_nascimento: string | Date

}

interface RegisterFaUsuarioResponse {
    faUsuario: FaUsuario
}


export class FaUsuarioRegister {
    constructor(private usersRepository: FaUsuarioRepository) {}
    async execute({ nome, email, password, data_nascimento}: RegisterFaUsuarioRequest): Promise<RegisterFaUsuarioResponse> {
        const password_hash = await hash(password, 6);


        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }
    
        const faUsuario = await this.usersRepository.create({
            nome,
            email,
            password_hash,
            data_nascimento
        });

        return {
            faUsuario,
        };
    }
}