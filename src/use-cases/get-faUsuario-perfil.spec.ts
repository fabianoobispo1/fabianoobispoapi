import { InMemoryFaUsuariosRepository } from '@/repositories/in-memory/in-memory-faUsuarios-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { GetFaUsuarioPerfilUseCase } from '@/use-cases/get-faUsuario-perfil';
import { hash } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

let fausuarioRepository: InMemoryFaUsuariosRepository;
let sut: GetFaUsuarioPerfilUseCase;

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        fausuarioRepository = new InMemoryFaUsuariosRepository();
        sut = new GetFaUsuarioPerfilUseCase(fausuarioRepository);
    });

    it('Deve ser capaz de obter o perfil do usuário', async () => {
        const createdUser = await fausuarioRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
            data_nascimento:'1990-04-24T00:00:00Z'
        });

        const { faUsuario } = await sut.execute({
            userId: createdUser.id,
        });

        expect(faUsuario.nome).toEqual('John Doe');
    });

    it('Não deve ser possível obter o perfil do usuário com o ID errado', async () => {
        await expect(() =>
            sut.execute({
                userId: 'non-existing-id',
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});