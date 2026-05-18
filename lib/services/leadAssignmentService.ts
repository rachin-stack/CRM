import { supabase } from "@/lib/supabase/client";

export async function assignLeadRoundRobin(organizationId: string) {
  const { data: members } = await supabase.from("team_members").select("user_id").eq("organization_id", organizationId).eq("role", "sales_agent").order("created_at");
  if (!members?.length) return null;
  const idx = Math.floor(Date.now() / 1000) % members.length;
  return members[idx]?.user_id ?? null;
}
