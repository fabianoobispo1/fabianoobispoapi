import 'dotenv/config';
import { z }  from 'zod';

//esse arquivo e uma melhor maneira de utilizar as variaveis de ambiente 
//logo a abixo e possivel padronizar as variaveis do arquivo .env e caso precise deixr um valor default 
const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    JWT_SECRET_GYM: z.string(),
    JWT_SECRET_FA: z.string(),
    PORT: z.coerce.number().default(3333)
});

//nesse ponto faz a verificacao de fato
const _env = envSchema.safeParse(process.env);

//e caso falhe vai dar uma menssagem e para a aplicacao com o throw new Error
if( _env.success === false) {
    console.log('❌ invalid environment variables.', _env.error.format());

    throw new Error('invalid environment variables.');
}

//e casso de tudo certo ele exporta para ser usado em outros lugares 
export const env = _env.data;