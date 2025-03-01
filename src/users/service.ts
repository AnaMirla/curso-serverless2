import { SupabaseClient } from "@supabase/supabase-js"


export type User = {
    name: string
    email: string
}

export const getUsers = async (supabase: SupabaseClient): Promise<User[]> => {
    const {data} = await supabase.from('users').select('*')
    return data as User[]
}

export const addUser = async (supabase: SupabaseClient, user: User): Promise<User[]> => {
    const {data} = await supabase.from('users').insert(user).select('*')
    return data as unknown as User[]
}