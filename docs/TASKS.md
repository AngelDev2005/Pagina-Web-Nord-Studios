# Tareas por responsable

| Estado | Responsable | Tarea | Criterio de cierre |
| --- | --- | --- | --- |
| Entregada | Codex | Base App Router, contenido MDX, compatibilidad JSON, dependencias de UI, documentación y QA | Evidencia de esta compilación en PHASE_1_QA.md |
| En revisión del propietario | Gemini | Propuesta visual del Home (Header, Hero V2, Marquee, Proyectos, Servicios, Propuesta de valor, Proceso, Nosotros, FAQ, CTA final y Footer) | El propietario aprueba escritorio y móvil antes de extender a caso y rutas internas |
| Siguiente (tras aprobación del Home) | Gemini | Propuesta visual del caso (`ProjectDetail.tsx`) | El propietario aprueba escritorio y móvil |
| Pendiente | Propietario | Casos, portadas, créditos, permisos y resultados verificables | Primer caso real revisado en local |
| Pendiente | Gemini | Vistas de servicios, listados, artículos, contacto, legales y estados | Recorridos y accesibilidad revisados con el diseño aprobado |
| Pendiente | Propietario | Dominio, canales públicos, licencias, textos comerciales y aviso de privacidad | Datos y permisos confirmados |
| Pendiente | Codex y Gemini | QA visual y de rendimiento con activos finales | Informe por ruta, teclado, zoom, lectores de pantalla, dispositivos, presupuestos y mediana Lighthouse |
| Pendiente | Codex | Revisar soporte de ESLint y pares de eslint-config-next | Actualizar conjuntamente cuando todos los plugins admitan la versión compatible |
| Antes de publicar | Codex y propietario | Revisar CSP inline, auditoría de dependencias, previews, variables y proveedores | Cabeceras, dominio y correo probados en entorno autorizado |
| Requiere autorización | Propietario | Hosting, medición y publicación | Aprobación expresa antes de activar cada servicio |

## Registro de fase 2 — Home (25/11/2026)

- **Cambio de contrato compatible:** `src/app/page.tsx` pasa `projects={published}` como prop opcional (`projects?: Project[]`) a `Home` en `src/components/Home.tsx`, manteniendo `name` y `hasProjects`.
- **Activos añadidos:** `public/brand/isotipo-grid.jpg` (copia directa de `identidad_visual/Mesa de trabajo 2.jpg`, sin modificar maestros) y carga mediante `next/font/local` de `font/monumentextended-ultrabold.woff2` y `font/Satoshi-Variable.woff2`.
- **Verificación visual realizada:** Capturas en producción local (`1440×900`, `390×844` y comprobación de `scrollWidth <= innerWidth` en `320×820`) para Hero, menú móvil, Proyectos, Servicios, Propuesta de valor, Proceso, Nosotros, FAQ (incluyendo toggle interactivo) y CTA/Footer. Se corrigió en iteración visual el `box-sizing: border-box` global, la supresión de subrayado por defecto en botones/enlaces de UI, el interlineado de `Monument Extended` para diacríticos (`Ñ`, tildes), `scroll-margin-top` ante header sticky y el observador de `MaskReveal` sobre el contenedor exterior.
- **Pruebas automatizadas ejecutadas:** `format:check`, `lint`, `typecheck`, `test` (Vitest) y `test:e2e` (Playwright en Chromium, Firefox, WebKit y auditoría WCAG 2.2 AA con `@axe-core/playwright`). Medición de Lighthouse sobre rutas optimizadas queda pendiente tras la aprobación visual del Home y caso.

Las [dependencias de negocio anteriores](PENDING_ITEMS.md) siguen disponibles para el seguimiento de producción.
