import { FastifyReply, FastifyRequest } from 'fastify';

export async function faRefresh(request: FastifyRequest, reply: FastifyReply) {
    await request.faVerify({ onlyCookie: true });

    const token = await reply.faSign(
        {},
        {
            sign: {
                sub: request.user.sub,
            },
        },
    );

    const refreshToken = await reply.faSign(
        {},
        {
            sign: {
                sub: request.user.sub,
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
}