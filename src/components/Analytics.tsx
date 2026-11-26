"use client";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
function subscribe(update: () => void) {
  window.addEventListener("nord-consent", update);
  window.addEventListener("storage", update);
  return () => {
    window.removeEventListener("nord-consent", update);
    window.removeEventListener("storage", update);
  };
}
export default function Analytics({ id }: { id: string }) {
  const path = usePathname();
  const choice = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem("nord-analytics") || "pending",
    () => "pending",
  );
  function choose(value: "yes" | "no" | "pending") {
    localStorage.setItem("nord-analytics", value);
    window.dispatchEvent(new Event("nord-consent"));
    if (value === "no" && choice === "yes") location.reload();
  }
  useEffect(() => {
    if (choice !== "yes") return;
    const w = window as Window & { dataLayer?: unknown[] };
    w.dataLayer ??= [];
    function send(...args: unknown[]) {
      // gtag consumes the native arguments object queued before its script loads.
      if (args.length) {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments);
      }
    }
    const url = location.origin + path;
    if (!document.getElementById("nord-ga")) {
      send("consent", "default", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_personalization: "denied",
        ad_user_data: "denied",
      });
      send("js", new Date());
      send("config", id, {
        send_page_view: false,
        allow_google_signals: false,
        page_location: url,
        page_referrer: "",
      });
      const script = document.createElement("script");
      script.id = "nord-ga";
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
      document.head.appendChild(script);
    }
    const event = (name: string) =>
      send("event", name, { page_location: url, page_referrer: "" });
    event("page_view");
    if (path.startsWith("/servicios/")) event("service_view");
    if (path.startsWith("/proyectos/")) event("project_view");
    const click = (e: MouseEvent) => {
      const a = e.target instanceof Element ? e.target.closest("a") : null;
      if (!a) return;
      const link = new URL(a.href);
      if (link.hostname === "wa.me") event("whatsapp_click");
      else if (link.pathname === "/contacto" || link.protocol === "mailto:")
        event("contact_click");
      else if (a.closest(".filters")) event("portfolio_filter");
    };
    const success = () => event("quote_submit_success");
    document.addEventListener("click", click);
    window.addEventListener("nord-quote-success", success);
    return () => {
      document.removeEventListener("click", click);
      window.removeEventListener("nord-quote-success", success);
    };
  }, [choice, path, id]);
  return (
    <aside className="wrap analytics" aria-label="Preferencias de analítica">
      {choice === "pending" ? (
        <>
          <p>
            ¿Permites medir las visitas y los clics con Google Analytics para
            mejorar el sitio?
          </p>
          <button onClick={() => choose("yes")}>Permitir</button>
          <button onClick={() => choose("no")}>Rechazar</button>
        </>
      ) : (
        <button
          onClick={() => (choice === "yes" ? choose("no") : choose("pending"))}
        >
          {choice === "yes"
            ? "Desactivar analítica"
            : "Preferencias de analítica"}
        </button>
      )}
    </aside>
  );
}
