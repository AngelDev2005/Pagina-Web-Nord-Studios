"use client";
import { useRef, useState } from "react";
type Widget = {
  render: (node: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Widget;
  }
}
export function useQuoteForm(enabled: boolean, siteKey: string) {
  const [busy, setBusy] = useState(false),
    [message, setMessage] = useState(""),
    [errors, setErrors] = useState<Record<string, string[]>>({});
  const [token, setToken] = useState(""),
    lock = useRef(false),
    box = useRef<HTMLDivElement>(null),
    widget = useRef<string | undefined>(undefined);
  function render() {
    if (box.current && window.turnstile && widget.current === undefined)
      widget.current = window.turnstile.render(box.current, {
        sitekey: siteKey,
        action: "quote",
        callback: setToken,
        "expired-callback": () => setToken(""),
        "error-callback": () => {
          setToken("");
          setMessage(
            "No se pudo completar la verificación. Recarga la página para reintentar.",
          );
        },
      });
  }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!enabled || lock.current || !token) return;
    lock.current = true;
    setBusy(true);
    setErrors({});
    setMessage("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    delete data["cf-turnstile-response"];
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          consent: data.consent === "on",
          token,
        }),
      });
      const result = await res.json();
      setMessage(result.message);
      if (res.ok) {
        form.reset();
        window.dispatchEvent(new Event("nord-quote-success"));
      } else if (result.fields) {
        setErrors(result.fields);
        const field = form.elements.namedItem(Object.keys(result.fields)[0]);
        if (field instanceof HTMLElement) field.focus();
      }
    } catch {
      setMessage(
        "No pudimos conectar. Tus campos siguen aquí para reintentar.",
      );
    } finally {
      if (widget.current !== undefined) window.turnstile?.reset(widget.current);
      setToken("");
      setBusy(false);
      lock.current = false;
    }
  }
  return { busy, message, errors, token, box, render, submit, setMessage };
}
