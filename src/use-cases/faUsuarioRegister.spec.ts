import { expect,  describe, it, beforeEach } from 'vitest';
import { FaUsuarioRegister } from './faUsuarioRegister';

import { compare } from 'bcryptjs';
import { InMemoryFaUsuariosRepository } from '@/repositories/in-memory/in-memory-faUsuarios-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let faUsuarioRepository: InMemoryFaUsuariosRepository;
let sut: FaUsuarioRegister;
describe('Registro usuario FA', () => {
    beforeEach(() => {
        faUsuarioRepository = new InMemoryFaUsuariosRepository;
        sut = new FaUsuarioRegister(faUsuarioRepository);
    });

    it('E possivel realizar o registro de usuario', async () => {
       

        const { faUsuario } = await sut.execute({
            nome: 'Usuario teste',
            email: 'email@teste.com.br',
            password: '123456',
            data_nascimento: '1990-04-24T00:00:00Z'

        });
        expect(faUsuario.id).toEqual(expect.any(String));
 
    });



    it('E possivel criar a hash durnate o registro', async () => {


        const { faUsuario } = await sut.execute({
            nome: 'Usuario teste',
            email: 'email@teste.com.br',
            password: '123456',
            data_nascimento: '1990-04-24T00:00:00Z'
        });

        const isPasswordCorrectHashed = await compare(
            '123456',
            faUsuario.password_hash
        );

        expect(isPasswordCorrectHashed).toBe(true);
     
    });

    it('Nao e possivel registar com o mesmo email duas vezes ', async () => {


        const email = 'email@teste.com.br';
        
        await sut.execute({
            nome: 'Usuario teste',
            email,
            password: '123456',
            data_nascimento: '1990-04-24T00:00:00Z'
        });


        await expect(() =>
            sut.execute({
                nome: 'Usuario teste',
                email,
                password: '123456',
                data_nascimento: '1990-04-24T00:00:00Z'
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });   
});


