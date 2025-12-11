import { _supabase } from "./supabase.js"

export async function getData(id) {
    if (id) {
        const { data, error } = await _supabase
            .from('numero')
            .select(`*`)
            .eq('id', id)

        return {data}
    } else {
        const { data, error } = await _supabase
            .from('numero')
            .select(`*`)

        return {data}
    }
}