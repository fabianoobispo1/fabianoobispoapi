import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';

export async function faAutenticacao(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {        
        const faUsuario = await prisma.faUsuario.findUnique({
            where: {
                email
            }
        });

        if (!faUsuario) {
            return reply.status(400).send({ message: "Usuário não encontrado." });
        }

        const doestPasswordMatches = await compare(password, faUsuario.password_hash);

        if (!doestPasswordMatches) {
            return reply.status(400).send({ message: "Senha Invalida." });
        }
    
       
           
        const token = await reply.faSign(
            {},
            {
                sign: {
                    sub: faUsuario.id,
                },
            },
        );


        const refreshToken = await reply.faSign(
            {},
            {
                sign: {
                    sub: faUsuario.id,
                    expiresIn: '7d',
                },
            },
        );
      
        return reply
            .setCookie('refreshTokenFa', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            })
            .status(200)
            .send({
                token,
            });
    } catch (err) {    
        return reply.status(400).send({ message: "Erro Interno"}); 
    }


}