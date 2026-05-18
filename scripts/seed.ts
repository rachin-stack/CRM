import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function run() {
  const orgId = "00000000-0000-0000-0000-000000000001";
  await supabase.from("organizations").upsert({ id: orgId, name: "EstateFlow Demo Realty" });
  for (let i = 1; i <= 20; i++) {
    await supabase.from("leads").insert({ organization_id: orgId, full_name: `Sample Lead ${i}`, phone: `+919900000${String(i).padStart(3, "0")}`, source: "Manual", status: "New", temperature: i % 3 === 0 ? "Hot" : "Warm" });
  }
  for (let i = 1; i <= 10; i++) {
    await supabase.from("properties").insert({ organization_id: orgId, title: `Property ${i}`, location: "Gurgaon", property_type: "Apartment", price: 5000000 + i * 1000000, availability_status: "Available" });
  }
  console.log("Seed completed");
}
run();
