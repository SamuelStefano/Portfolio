import { supabase, isSupabaseConfigured } from "@/lib/supabaseclient";

export async function getProjects() {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase não configurado');
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
