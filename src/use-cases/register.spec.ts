import { expect,  describe, it } from 'vitest';
import { RegisterUseCase } from './register';

import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './erros/user-already-exists-error';

describe('Register use case', () => {

    it('should be able to register', async () => {
        const userRepository = new InMemoryUsersRepository;
        const registerUseCase = new RegisterUseCase(userRepository);

        const { user } = await registerUseCase.execute({
            name: 'Usuario teste',
            email: 'email@teste.com.br',
            password: '123456'
        });
        expect(user.id).toEqual(expect.any(String));
 
    });



    it('should hash user password upon registration', async () => {
        const userRepository = new InMemoryUsersRepository;
        const registerUseCase = new RegisterUseCase(userRepository);

        const { user } = await registerUseCase.execute({
            name: 'Usuario teste',
            email: 'email@teste.com.br',
            password: '123456'
        });

        const isPasswordCorrectHashed = await compare(
            '123456',
            user.password_hash
        );

        expect(isPasswordCorrectHashed).toBe(true);
     
    });

    it('should not be able to register with same email twice', async () => {
        const userRepository = new InMemoryUsersRepository;
        const registerUseCase = new RegisterUseCase(userRepository);

        const email = 'email@teste.com.br';
        
        await registerUseCase.execute({
            name: 'Usuario teste',
            email,
            password: '123456'
        });


        await expect(() =>
            registerUseCase.execute({
                name: 'Usuario teste',
                email,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });   
});


