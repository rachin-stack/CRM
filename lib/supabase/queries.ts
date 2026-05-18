import { supabase } from "./client";

export async function getLeads() {
  const { data } = await supabase.from("leads").select("id,full_name,phone,status").limit(50);
  return data ?? [];
}

export async function getProperties() {
  const { data } = await supabase.from("properties").select("id,title,price").limit(50);
  return data ?? [];
}
