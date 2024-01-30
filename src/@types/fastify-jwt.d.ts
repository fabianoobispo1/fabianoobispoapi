import '@fastify/jwt';


declare module '@fastify/jwt' {
  export interface FastifyJWT {
  
    user: {
      sub: string
      administrador?:boolean
      sign: {
        sub: string
      }
    },
  
  }

}

declare module 'fastify' {
 
  interface FastifyRequest {
     faVerify<Decoded extends fastifyJwt.VerifyPayloadType>(options?: fastifyJwt.FastifyJwtVerifyOptions): Promise<Decoded>
     gymVerify<Decoded extends fastifyJwt.VerifyPayloadType>(options?: fastifyJwt.FastifyJwtVerifyOptions): Promise<Decoded>
    


/*     jwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(options?: fastifyJwt.FastifyJwtVerifyOptions): Promise<Decoded>
    jwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(callback: VerifierCallback): void
    jwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(options: fastifyJwt.FastifyJwtVerifyOptions, callback: VerifierCallback): void
    jwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(options?: Partial<fastifyJwt.VerifyOptions>): Promise<Decoded>
    jwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(options: Partial<fastifyJwt.VerifyOptions>, callback: VerifierCallback): void
    jwtDecode<Decoded extends fastifyJwt.DecodePayloadType>(options?: fastifyJwt.FastifyJwtDecodeOptions): Promise<Decoded>
    jwtDecode<Decoded extends fastifyJwt.DecodePayloadType>(callback: fastifyJwt.DecodeCallback<Decoded>): void
    jwtDecode<Decoded extends fastifyJwt.DecodePayloadType>(options: fastifyJwt.FastifyJwtDecodeOptions, callback: fastifyJwt.DecodeCallback<Decoded>): void
    user: fastifyJwt.UserType */

  }

  interface FastifyReply {
    gymSign(payload: fastifyJwt.SignPayloadType, options?: fastifyJwt.FastifyJwtSignOptions): Promise<string>
    faSign(payload: fastifyJwt.SignPayloadType, options?: fastifyJwt.FastifyJwtSignOptions): Promise<string>

    /* jwtSign(payload: fastifyJwt.SignPayloadType, options?: fastifyJwt.FastifyJwtSignOptions): Promise<string>
    jwtSign(payload: fastifyJwt.SignPayloadType, callback: SignerCallback): void
    jwtSign(payload: fastifyJwt.SignPayloadType, options: fastifyJwt.FastifyJwtSignOptions, callback: SignerCallback): void
    jwtSign(payload: fastifyJwt.SignPayloadType, options?: Partial<fastifyJwt.SignOptions>): Promise<string>
    jwtSign(payload: fastifyJwt.SignPayloadType, options: Partial<fastifyJwt.SignOptions>, callback: SignerCallback): void */
  }
}
