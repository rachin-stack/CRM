import { getProperties } from "@/lib/supabase/queries";

export default async function PropertiesPage() {
  const properties = await getProperties();
  return <section className="p-4"><h1 className="mb-3 text-xl font-semibold">Properties</h1><div className="space-y-2">{properties.map((p) => <div key={p.id} className="rounded bg-white p-3 shadow">{p.title} · ₹{p.price}</div>)}</div></section>;
}
