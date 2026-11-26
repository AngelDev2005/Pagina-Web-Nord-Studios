# Procedimientos de ingeniería

Se revisó el catálogo disponible y la skill local `nord-brand-identity`, cuyo ámbito es visual. Los siguientes procedimientos pertenecen al repositorio y son aplicables a las herramientas que usan ambos agentes.

| Especialidad | Cuándo | Procedimiento y evidencia de cierre |
| --- | --- | --- |
| Arquitectura Next.js | Alta de una ruta o interacción | Elegir segmento y propietario. Resolver datos en servidor. Añadir `generateStaticParams`, metadata y 404 en detalles. Aislar la interacción cliente. Verificar el tipo de render en `pnpm build`. |
| TypeScript | Cambio de modelo, props o API | Validar entradas externas en el límite con Zod. Inferir el tipo del esquema o del modelo. Actualizar escritor, lector y consumidores en el mismo cambio. Probar datos históricos y ejecutar `pnpm typecheck`. |
| SEO técnico | Cambios en ruta, slug o estado editorial | Comparar HTML inicial, título, robots, canonical, OG, sitemap y JSON-LD con el estado de publicación. Comprobar detalle inexistente y filtro. Repetir con el origen real al autorizar el lanzamiento. |
| Seguridad web | Cambios en formularios, proveedores o contenido | Revisar entrada, límite de bytes, origen, permisos y datos transferidos. Probar respuestas con proveedores simulados. Inspeccionar cabeceras en producción local. Revisar `pnpm audit --prod` y cabeceras en el entorno real antes del lanzamiento. |
| Rendimiento | Cambio en imagen principal, fuente, motion o terceros | Medir el build de producción con Lighthouse, tres pasadas por ruta y mediana. Registrar LCP, CLS, transferencia y JS comprimido. Contrastar presupuestos del brief y repetir con la configuración final autorizada. |
| Accesibilidad | Cambio de marcado o interacción | Recorrer con teclado, comprobar nombre accesible, foco, errores, reflow a 320 px, zoom y reducción de movimiento. Ejecutar axe y los tres motores de Playwright. Anotar las pruebas manuales que aún falten. |
| Testing y QA | Antes de integrar | Formato, lint, typecheck, Vitest, build y Playwright, en ese orden para los pasos que generan archivos de Next. Usar fixtures temporales y mocks. Registrar entorno, cuentas y limitaciones. |

Fuentes de consulta: [App Router](https://nextjs.org/docs/app), [TypeScript estricto](https://www.typescriptlang.org/tsconfig/strict.html), [Google Search Central](https://developers.google.com/search/docs), [OWASP](https://cheatsheetseries.owasp.org/), [Web Vitals](https://web.dev/articles/vitals), [WCAG 2.2](https://www.w3.org/TR/WCAG22/) y [Playwright](https://playwright.dev/docs/intro).
