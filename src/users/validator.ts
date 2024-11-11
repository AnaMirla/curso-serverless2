import {z} from 'zod'
import { zValidator } from '@hono/zod-validator'

const schemaUser = z.object({
    name: z.string(),
    email: z.string().email(),
})

export const zUserValidator = zValidator('form', schemaUser)