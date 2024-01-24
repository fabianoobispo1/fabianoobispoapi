import { expect,  describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryFaUsuariosRepository } from '@/repositories/in-memory/in-memory-faUsuarios-repository';

import { FaAutenticacaoUseCase } from './faAutenticacao';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

let faUsuarioRepository : InMemoryFaUsuariosRepository;
let sut: FaAutenticacaoUseCase;
describe('FaAutenticacao use case', () => {
    beforeEach(()   => {
        faUsuarioRepository = new InMemoryFaUsuariosRepository();
        sut = new FaAutenticacaoUseCase(faUsuarioRepository);
    });

    it('Deve ser capaz de autenticar', async () => {


        await faUsuarioRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
            data_nascimento: '1990-04-24T00:00:00Z'
        });


        const { faUsuario } = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(faUsuario.id).toEqual(expect.any(String));
 
    });

    
    it('Não deve ser possível autenticar com e-mail errado', async () => {
    
  
        await expect(() =>
            sut.execute({
                email: 'johndoe@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('Não deve ser possível autenticar com e-mail errado', async () => {
   

        await faUsuarioRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
            data_nascimento: '1990-04-24T00:00:00Z'
        });

        await expect(() =>
            sut.execute({
                email: 'johndoe@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    }); 
 
});


