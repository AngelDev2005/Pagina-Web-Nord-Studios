import { createHmac } from "node:crypto";
import { privacyReady } from "@/config/legal";
export function contactReady() {
  return (
    privacyReady &&
    process.env.CONTACT_ENABLED === "true" &&
    [
      "SITE_URL",
      "TURNSTILE_SITE_KEY",
      "TURNSTILE_SECRET_KEY",
      "RESEND_API_KEY",
      "CONTACT_FROM",
      "CONTACT_TO",
      "UPSTASH_REDIS_REST_URL",
      "UPSTASH_REDIS_REST_TOKEN",
      "RATE_LIMIT_SALT",
    ].every((key) => Boolean(process.env[key]))
  );
}
export async function rateAllowed(request: Request) {
  // Vercel overwrites x-vercel-forwarded-for. Other hosts share a conservative bucket until adapted.
  const ip =
    process.env.VERCEL === "1"
      ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() ||
        "shared"
      : "shared";
  const bucket = createHmac("sha256", process.env.RATE_LIMIT_SALT!)
    .update(ip)
    .digest("hex");
  const res = await fetch(process.env.UPSTASH_REDIS_REST_URL!, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.UPSTASH_REDIS_REST_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      "EVAL",
      "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],600) end; return n",
      1,
      "nord:contact:" + bucket,
    ]),
    cache: "no-store",
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw Error("limit");
  const { result } = await res.json();
  if (typeof result !== "number") throw Error("limit");
  return result <= 5;
}
export async function limitedJson(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw Error("json");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 16384) {
      await reader.cancel();
      throw RangeError("size");
    }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
