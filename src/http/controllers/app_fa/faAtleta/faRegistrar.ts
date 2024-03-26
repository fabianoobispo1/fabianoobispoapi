import { FastifyRequest, FastifyReply } from 'fastify';
import {  z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function FaRegistrarAtleta(request: FastifyRequest, reply: FastifyReply) {
    const Tipo = z.enum(['ATAQUE', 'DEFESA', 'ST']);

    const registerBodySchema = z.object({ 
        nome: z.string(),
        data_nascimento: z.string().datetime(),
        email: z.string().email(),
       
        data_inicio: z.string().datetime(),        
        tipo: Tipo,    
        posicao: z.string(),   
        numero: z.number(),
        altura: z.number(),
        pesso: z.number(),
    
    });

    const { nome,data_nascimento, email, data_inicio, tipo, posicao, numero, altura, pesso } = registerBodySchema.parse(request.body);

    //verifica se o usuario logado e administrador 
    //const usuarioLogado = request.user.sub;
    /* const isAdmin = await prisma.faUsuario.findUnique({
        where:{
            id: usuarioLogado,
            administrador: true
        }
    }); 
    if(!isAdmin){
        return reply.status(403).send({mesage: 'usuario nao e um admin'});
    }
 */
    //verifica se o atleta ja tem cadastro como usuario 
    let faUsuario = await prisma.faUsuario.findUnique({
        where:{
            email
        }
    })

    //caso nao seja realiza o cadastro do usuario com senha padrao 12345678
    if (!faUsuario) {
        const password_hash = await hash('12345678', 6);

        faUsuario = await prisma.faUsuario.create({
            data:{
                nome,
                email,
                password_hash,
                data_nascimento
            }    
        });
    }

    //realiza o cadstro do atleta com o id do usuario informado 
    try {

        const resutPrisma = await prisma.faAtleta.create({
            data:{
                data_inicio, tipo, posicao, numero, altura, pesso, faUsuarioId: faUsuario.id
            }
        });
        return reply.status(201).send(resutPrisma);
     
     
    } catch (err) {
        if (err instanceof UserAlreadyExistsError){
            return reply.status(403).send({mesage: err.message});
        }

        throw err;
    }
    return reply.status(201).send();


}