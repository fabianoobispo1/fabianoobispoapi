import { FastifyReply, FastifyRequest } from 'fastify';

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
    await request.gymVerify({ onlyCookie: true });

    const { role } = request.user;

    const token = await reply.gymSign(
        { role },
        {
            sign: {
                sub: request.user.sub,
            },
        },
    );

    const refreshToken = await reply.gymSign(
        { role },
        {
            sign: {
                sub: request.user.sub,
                expiresIn: '7d',
            },
        },
    );

    return reply
        .setCookie('refreshTokenGym', refreshToken, {
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