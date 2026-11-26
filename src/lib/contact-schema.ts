import { z } from "zod";
import { services } from "../config/es";
export const contactSchema = z
  .object({
    name: z.string().trim().min(2, "Escribe tu nombre.").max(100),
    company: z.string().trim().max(140).default(""),
    email: z.email("Revisa tu correo electrónico.").max(254),
    phone: z
      .string()
      .trim()
      .max(30)
      .regex(/^[+\d\s()-]*$/, "Revisa el número de WhatsApp.")
      .default(""),
    service: z.enum(services.map((s) => s.slug) as [string, ...string[]]),
    budget: z.string().trim().max(90).default(""),
    description: z
      .string()
      .trim()
      .min(10, "Cuéntanos un poco más, al menos 10 caracteres.")
      .max(3000),
    consent: z.literal(true),
    token: z.string().min(1).max(2048),
  })
  .strict();
