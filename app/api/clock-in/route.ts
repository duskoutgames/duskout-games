import { NextResponse } from "next/server";
import { createClient } from "redis";

// Reuse the connection across warm serverless invocations instead of
// reconnecting on every single request.
let client: ReturnType<typeof createClient> | null = null;

async function getClient() {
  if (!client) {
    client = createClient({ url: process.env.REDIS_URL });
    client.on("error", (err) => console.error("Redis Client Error", err));
  }
  if (!client.isOpen) {
    await client.connect();
  }
  return client;
}

export async function POST() {
  try {
    const redis = await getClient();
    const count = await redis.incr("clock_in_count");
    return NextResponse.json({ count });
  } catch (err) {
    console.error("clock-in increment failed", err);
    return NextResponse.json(
      { error: "Could not clock in right now." },
      { status: 500 }
    );
  }
}