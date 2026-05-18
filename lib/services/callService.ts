export async function bridgeLeadCall(args: { leadId: string; leadName: string; leadPhone: string; source: string; agentId: string; dryRun?: boolean }) {
  if (args.dryRun || process.env.CALL_DRY_RUN === "true") {
    return { status: "simulated", callSid: `SIM-${Date.now()}` };
  }
  return { status: "queued", callSid: `TODO-TWILIO-${Date.now()}` };
}
