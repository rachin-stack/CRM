import { NextResponse } from "next/server";
import { bridgeLeadCall } from "@/lib/services/callService";

export async function POST(req: Request) {
  const payload = await req.json();
  const result = await bridgeLeadCall({ ...payload, dryRun: process.env.NODE_ENV !== "production" });
  return NextResponse.json(result);
}
