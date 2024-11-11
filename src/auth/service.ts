import { SupabaseClient } from "@supabase/supabase-js"

export type User = {
    name: string
    email: string
    password: string
}

export const registerUser = async (supabase: SupabaseClient, user: User): Promise<User[]> => {
    const {data} = await supabase.from('users').insert(user).select('*')
    return data as unknown as User[]
}

export const findUser = async (supabase: SupabaseClient, email: string): Promise<User | null> => {
    const {data} = await supabase.from('users').select().eq('email', email).maybeSingle()
    return data as User | null
}
