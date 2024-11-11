import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Context, MiddlewareHandler } from "hono";

export const idCxtSupabase = 'supabase-ctx'

export const supabaseMiddleware: MiddlewareHandler = async (c, next) => {

    try {
        if (!c.env.SUPABASE_URL){
            throw new Error('Missing SUPABASE_URL environment variable')
        }
        if (!c.env.SUPABASE_KEY){
            throw new Error('Missing SUPABASE_KEY environment variable')
        }
        if (getSupabase(c)) return next()
        const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_KEY)
        c.set(idCxtSupabase, supabase)
        await next()
    } catch (error: any) {
        return c.text(error?.message)
    }
}

export const getSupabase = (c: Context): SupabaseClient => c.get(idCxtSupabase)