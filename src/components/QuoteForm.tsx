"use client";
import { useQuoteForm } from "@/features/contact/useQuoteForm";
import Script from "next/script";
import Link from "next/link";
import { services } from "@/config/es";
export default function QuoteForm({
  enabled,
  siteKey,
  service,
}: {
  enabled: boolean;
  siteKey: string;
  service: string;
}) {
  const { busy, message, errors, token, box, render, submit, setMessage } =
    useQuoteForm(enabled, siteKey);
  const fields = [
    ["name", "Nombre", "text", "name", 100],
    ["company", "Empresa o marca (opcional)", "text", "organization", 140],
    ["email", "Correo electrónico", "email", "email", 254],
    ["phone", "WhatsApp (opcional)", "tel", "tel", 30],
  ] as const;
  return (
    <form className="form" onSubmit={submit}>
      {!enabled && (
        <p className="notice">
          La recepción de cotizaciones por formulario aún no está habilitada.
        </p>
      )}
      <div className="fields">
        {fields.map(([key, label, type, auto, max]) => (
          <label key={key}>
            {label}
            <input
              name={key}
              type={type}
              autoComplete={auto}
              maxLength={max}
              required={key === "name" || key === "email"}
              minLength={key === "name" ? 2 : undefined}
              aria-invalid={!!errors[key]}
              aria-describedby={errors[key] ? key + "-error" : undefined}
            />
            {errors[key] && (
              <small className="field-error" id={key + "-error"}>
                {errors[key][0]}
              </small>
            )}
          </label>
        ))}
      </div>
      <label>
        Servicio requerido
        <select defaultValue={service} name="service" required>
          <option value="" disabled>
            Selecciona un servicio
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Presupuesto estimado (opcional)
        <input name="budget" maxLength={90} placeholder="Monto y moneda" />
      </label>
      <label>
        Cuéntanos sobre tu proyecto
        <textarea
          name="description"
          minLength={10}
          maxLength={3000}
          required
          aria-describedby="description-help"
        />
        <small id="description-help">
          Entre 10 y 3000 caracteres. Puedes incluir objetivo, formatos y fecha
          deseada.
        </small>
      </label>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          He leído y acepto el{" "}
          <Link href="/privacidad" target="_blank">
            aviso de privacidad
          </Link>
          .
        </span>
      </label>
      {enabled && (
        <>
          <div ref={box} />
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onReady={render}
            onError={() =>
              setMessage(
                "La verificación no cargó. Recarga la página para reintentar.",
              )
            }
          />
        </>
      )}
      <button className="button" disabled={!enabled || busy || !token}>
        {busy ? "Enviando…" : "Enviar solicitud"}
      </button>
      <p role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
