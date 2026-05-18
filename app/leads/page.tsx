import { getLeads } from "@/lib/supabase/queries";

export default async function LeadsPage() {
  const leads = await getLeads();
  return <section className="p-4"><h1 className="mb-3 text-xl font-semibold">Leads</h1><div className="space-y-2">{leads.map((lead) => <div key={lead.id} className="rounded bg-white p-3 shadow">{lead.full_name} · {lead.phone} · {lead.status}</div>)}</div></section>;
}
