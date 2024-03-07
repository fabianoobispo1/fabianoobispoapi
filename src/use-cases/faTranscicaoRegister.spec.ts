import { expect,  describe, it, beforeEach } from 'vitest';
import { FaTransacaoRegister } from './faTransacaoRegisteer';
import { InMemoryFaTransacoesRepository } from '@/repositories/in-memory/in-memory-faTransacoes-repository';

import { InMemoryFaUsuariosRepository } from '@/repositories/in-memory/in-memory-faUsuarios-repository';
import { MaxDistanceError } from './errors/max-distance-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let faTransacaoRepository: InMemoryFaTransacoesRepository;
let faUsuarioRepository: InMemoryFaUsuariosRepository;
let sut: FaTransacaoRegister;
describe('Registro transicao FA', () => {
    beforeEach(() => {
        faTransacaoRepository = new InMemoryFaTransacoesRepository;
        faUsuarioRepository = new InMemoryFaUsuariosRepository;
        sut = new FaTransacaoRegister(faTransacaoRepository, faUsuarioRepository);
    });

    it('E possivel realizar o registro de transacao', async () => {
        
        const { id } = await faUsuarioRepository.create({
            nome: 'Usuario teste',
            email: 'email@teste.com.br',
            password_hash: '123456',
            data_nascimento: '1990-04-24T00:00:00Z'

        });

        const { faTransacao } = await sut.execute({
            titulo: 'Conta Teste',
            tipo: 'S',
            valor: 12.4,
            vencimento: '2024-04-24T00:00:00Z',
            faUsuario_id:id

        });
        expect(faTransacao.id).toEqual(expect.any(String));
 
    });



    it('Nao e possivel realizar transicao com usuario que nao existe', async () => {


     
        await expect(() =>
        sut.execute({
            titulo: 'Conta Teste',
            tipo: 'S',
            valor: 12.4,
            vencimento: '2024-04-24T00:00:00Z',
            faUsuario_id:'id invalido'

        })).rejects.toBeInstanceOf(ResourceNotFoundError);


     
    });
/* 
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
    });  */  
});


