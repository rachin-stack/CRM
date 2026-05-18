export async function sendEmail(payload: { to: string; subject: string; html: string; dryRun?: boolean }) {
  if (payload.dryRun || process.env.EMAIL_DRY_RUN === "true") return { status: "simulated" };
  return { status: "queued" };
}
