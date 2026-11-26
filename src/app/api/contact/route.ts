import { contactReady, rateAllowed, limitedJson } from "@/lib/contact-server";
import { contactSchema } from "@/lib/contact-schema";
import { services } from "@/config/es";
const reply = (
  status: number,
  message: string,
  fields?: Record<string, string[] | undefined>,
) =>
  Response.json(
    { message, fields },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...(status === 429 ? { "Retry-After": "600" } : {}),
      },
    },
  );
export async function POST(req: Request) {
  if (!contactReady())
    return reply(503, "La recepción por formulario aún no está disponible.");
  if (req.headers.get("origin") !== new URL(process.env.SITE_URL!).origin)
    return reply(403, "Origen no permitido.");
  if (
    req.headers.get("content-type")?.split(";")[0].trim() !== "application/json"
  )
    return reply(415, "Formato no admitido.");
  if (Number(req.headers.get("content-length")) > 16384)
    return reply(413, "La solicitud es demasiado grande.");
  try {
    if (!(await rateAllowed(req)))
      return reply(
        429,
        "Has alcanzado el límite de intentos. Inténtalo en diez minutos.",
      );
    let data;
    try {
      data = await limitedJson(req);
    } catch (e) {
      return reply(
        e instanceof RangeError ? 413 : 400,
        "Revisa el tamaño y formato de la solicitud.",
      );
    }
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success)
      return reply(
        422,
        "Revisa los campos indicados.",
        parsed.error.flatten().fieldErrors,
      );
    const v = parsed.data;
    const checked = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: v.token,
        }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!checked.ok) throw Error("turnstile");
    const validation = await checked.json();
    if (
      !validation.success ||
      validation.action !== "quote" ||
      validation.hostname !== new URL(process.env.SITE_URL!).hostname
    )
      return reply(422, "Completa de nuevo la verificación de seguridad.");
    const title = services.find((s) => s.slug === v.service)!.name;
    const mail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.RESEND_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: [process.env.CONTACT_TO],
        reply_to: v.email,
        subject: "Cotización · " + title,
        text: [
          v.name,
          v.company,
          v.email,
          v.phone,
          title,
          v.budget,
          v.description,
          "Aviso de privacidad aceptado.",
        ]
          .filter(Boolean)
          .join("\n\n"),
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!mail.ok || !(await mail.json()).id) throw Error("delivery");
    return reply(
      200,
      "Recibimos tu solicitud. Te contactaremos al correo que indicaste.",
    );
  } catch {
    return reply(
      503,
      "No pudimos confirmar el envío. Conservamos tus datos en este formulario para que puedas reintentar.",
    );
  }
}
