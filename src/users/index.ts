import { Hono } from "hono";
import { zUserValidator } from "./validator";
import { getSupabase, supabaseMiddleware } from "../middleware/supabase";
import { Bindings } from "../bindings";
import { jwt } from "hono/jwt";
import { authMiddleware } from "../middleware/auth";


export const posts = new Hono<{Bindings: Bindings}>().basePath('/posts')

posts.use('*', supabaseMiddleware, authMiddleware)

//Ruta para consultar los usuarios en supabase
posts.get('/', async (c) => {
    const supabase = getSupabase(c)
    const {data, error} = await supabase.from('users').select('*')
    return c.json({ data, error})
})

//Ruta para registrar un usuario en supabase
posts.post('/', zUserValidator, async (c) => {
    const body = await c.req.parseBody()
    const supabase = getSupabase(c)
    const {data, error} = await supabase.from('users').insert(body).select()
    return c.json({ data, error })
})

export {posts as appUser}