export async function sendFollowupMessage(payload: { channel: "sms" | "whatsapp"; to: string; body: string; dryRun?: boolean }) {
  if (payload.dryRun || process.env.MESSAGE_DRY_RUN === "true") return { status: "simulated" };
  return { status: "queued" };
}
