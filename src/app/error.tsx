"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="wrap section">
      <h1 className="contact-title">No pudimos cargar la página.</h1>
      <p>Intenta recargar esta sección.</p>
      <button type="button" className="button" onClick={reset}>
        Reintentar
      </button>
    </section>
  );
}
