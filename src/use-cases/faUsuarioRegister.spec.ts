import { expect,  describe, it } from 'vitest';
import { FaUsuarioRegister } from './faUsuarioRegister';

import { compare } from 'bcryptjs';
import { InMemoryFaUsuariosRepository } from '@/repositories/in-memory/in-memory-faUsuarios-repository';
import { UserAlreadyExistsError } from './erros/user-already-exists-error';



describe('Registro usuario FA', () => {

    it('E possivel realizar o registro de usuario', async () => {
        const faUsuarioRepository = new InMemoryFaUsuariosRepository;
        const faUsuarioRegister = new FaUsuarioRegister(faUsuarioRepository);

        const { faUsuario } = await faUsuarioRegister.execute({
            nome: 'Usuario teste',
            email: 'email@teste.com.br',
            password: '123456',
            data_nascimento: '1990-04-24T00:00:00Z'

        });
        expect(faUsuario.id).toEqual(expect.any(String));
 
    });



    it('E possivel criar a hash durnate o registro', async () => {
        const faUsuarioRepository = new InMemoryFaUsuariosRepository;
        const faUsuarioRegister = new FaUsuarioRegister(faUsuarioRepository);

        const { faUsuario } = await faUsuarioRegister.execute({
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
        const faUsuarioRepository = new InMemoryFaUsuariosRepository;
        const faUsuarioRegister = new FaUsuarioRegister(faUsuarioRepository);

        const email = 'email@teste.com.br';
        
        await faUsuarioRegister.execute({
            nome: 'Usuario teste',
            email,
            password: '123456',
            data_nascimento: '1990-04-24T00:00:00Z'
        });


        await expect(() =>
            faUsuarioRegister.execute({
                nome: 'Usuario teste',
                email,
                password: '123456',
                data_nascimento: '1990-04-24T00:00:00Z'
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });   
});


