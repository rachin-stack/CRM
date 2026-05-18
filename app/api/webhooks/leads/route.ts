import { NextResponse } from "next/server";
import { leadWebhookSchema } from "@/lib/validators/lead";
import { supabase } from "@/lib/supabase/client";
import { assignLeadRoundRobin } from "@/lib/services/leadAssignmentService";
import { bridgeLeadCall } from "@/lib/services/callService";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = leadWebhookSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const organizationId = process.env.DEFAULT_ORGANIZATION_ID ?? "00000000-0000-0000-0000-000000000001";
  const assignedAgent = await assignLeadRoundRobin(organizationId);

  const { data: lead, error } = await supabase.from("leads").insert({
    organization_id: organizationId,
    full_name: parsed.data.fullName,
    phone: parsed.data.phone,
    email: parsed.data.email || null,
    source: parsed.data.source,
    interested_property_type: parsed.data.propertyType,
    budget_min: parsed.data.budgetMin,
    budget_max: parsed.data.budgetMax,
    preferred_location: parsed.data.preferredLocation,
    notes: parsed.data.notes,
    assigned_agent_id: assignedAgent
  }).select("id,full_name,phone,source,assigned_agent_id").single();

  if (error || !lead) return NextResponse.json({ error: error?.message ?? "Lead creation failed" }, { status: 500 });

  if (lead.assigned_agent_id) {
    await bridgeLeadCall({ leadId: lead.id, leadName: lead.full_name, leadPhone: lead.phone, source: lead.source, agentId: lead.assigned_agent_id, dryRun: true });
  }

  return NextResponse.json({ ok: true, leadId: lead.id, assignedAgent });
}
