import { expect,  describe, it, beforeEach } from 'vitest';
import { RegisterUseCase } from './register';

import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';


let userRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register use case', () => {
    beforeEach(()=>{
        userRepository = new InMemoryUsersRepository;
        sut = new RegisterUseCase(userRepository);
    });

    it('should be able to register', async () => {
        

        const { user } = await sut.execute({
            name: 'Usuario teste',
            email: 'email@teste.com.br',
            password: '123456'
        });
        expect(user.id).toEqual(expect.any(String));
 
    });



    it('should hash user password upon registration', async () => {
        
        const { user } = await sut.execute({
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


        const email = 'email@teste.com.br';
        
        await sut.execute({
            name: 'Usuario teste',
            email,
            password: '123456'
        });


        await expect(() =>
            sut.execute({
                name: 'Usuario teste',
                email,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });   
});


