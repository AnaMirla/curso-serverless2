import { Hono } from "hono";
import { sign } from "hono/jwt";
import { Bindings } from "../bindings";
import { getSupabase, supabaseMiddleware } from "../middleware/supabase";
import { findUser, registerUser, User } from "./service";
import { zLoginValidator, zRegisterValidator } from "./validator";
import { comparePasswords, hashPassword } from "../utils";

export const auth = new Hono<{Bindings: Bindings}>().basePath('/auth')

auth.use('*', supabaseMiddleware)

auth.post('/register', zRegisterValidator, async (c) => {
    const body = await c.req.parseBody<User>()
    const supabase = getSupabase(c)
    body.password = await hashPassword(body.password)
    const user = await registerUser(supabase, body)
    return c.json({user})
})

auth.post('/login', zLoginValidator, async (c) => {
    const body = await c.req.parseBody<Pick<User, 'email' | 'password'>>()
    const supabase = getSupabase(c)
    const user = await findUser(supabase, body.email)

    if (!user){
        return c.json({error: 'User Not Found'}, 404)
    }

    const checkPwd = comparePasswords(body.email, user?.password)

    if(!checkPwd){
        return c.json({error: 'Password Inconrrect'}, 400)
    }

    const token = await sign({email: user.email}, c.env.JWT_SECRET)

    return c.json({user, token})
})