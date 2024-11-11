import {z} from 'zod'
import { zValidator } from '@hono/zod-validator'

const schemaRegisterUser = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

export const schemaLoginUser = z.object({
    email: z.string().email(),
    password: z.string()
})

export const zRegisterValidator = zValidator('form', schemaRegisterUser)

export const zLoginValidator = zValidator('form', schemaLoginUser)