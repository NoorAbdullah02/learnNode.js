import { z } from 'zod';


export const RegisterPostRequestBodySchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(3).max(20)
})

export const LoginValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(20)
})