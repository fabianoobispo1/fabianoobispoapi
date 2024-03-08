import { FastifyRequest, FastifyReply } from 'fastify';
//import { getErrorResponse } from "@/lib/helpers";
import {  z } from 'zod';
import {
    RegisterUserInput,
    RegisterUserSchema,
  } from "@/lib/validations/user.schema";
import { hash } from "bcryptjs";
import { prisma } from '@/lib/prisma';

export async function faRegister(request: FastifyRequest, reply: FastifyReply) {
    try {
     
    const RegisterUserSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Full name is required"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .min(1, "Email is required")
      .email("Email is invalid"),
    photo: z.string().optional(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: z
      .string({
        required_error: "Confirm your password",
      })
      .min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });


    const data = RegisterUserSchema.parse(request.body);





    const hashedPassword = await hash(data.password, 12);

    const user = await prisma.faUsuario.create({
        data: {
          nome: data.name,
          email: data.email,
          password_hash: hashedPassword,
          data_nascimento: '2000-01-01T00:00:00.000Z'
        },
      });

      return reply.status(201).send({
        status: "success",
        data: { user: { ...user, password: undefined } },
      }).headers({"Content-Type": "application/json" });
      
    
    } catch (err: any) {
            /*        
            tratar erros
            if (err instanceof ZodError) {
            return getErrorResponse(400, "failed validations", error);
          }
      
          if (error.code === "P2002") {
            return getErrorResponse(409, "user with that email already exists");
          }
      
          return getErrorResponse(500, error.message);
        */
  
            return reply.status(500).send({
                mesagem: "tratar esse erro"
            })
    }

}