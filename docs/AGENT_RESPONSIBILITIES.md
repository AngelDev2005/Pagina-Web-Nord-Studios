# Responsabilidades y cambios compartidos

| Responsable | Archivos | Entrega |
| --- | --- | --- |
| Codex | `src/lib/**`, `src/features/**`, `src/config/**`, `src/app/api/**`, metadata, sitemap, robots, esquemas, manifiesto, lockfile, configuración y CI | Modelos tipados, filtros, validación, integración, SEO, seguridad, presupuesto y pruebas |
| Gemini | `src/components/Home.tsx`, `Header.tsx`, `PortfolioIndex.tsx`, `ProjectDetail.tsx`, presentación de `Editorial.tsx`, marcado de `QuoteForm.tsx`, nuevos componentes visuales y `src/app/globals.css` | Vistas, responsive, interacción, estados y motion |
| Ambos | `src/app/**/page.tsx`, `layout.tsx`, páginas de error y componentes mixtos | Codex conserva parámetros, validación y metadatos. Gemini extrae o sustituye el JSX por sus vistas conservando las props y las salidas HTTP. |
| Codex con revisión de Gemini | `tests/e2e` | Pruebas por rol, nombre y comportamiento. Acordar cambios de texto accesible al revisar la UI. |
| Propietario | `content/**`, originales de marca, textos comerciales, licencias y configuración real | Aprobación editorial y permisos, dominio, proveedores y autorización de publicación |

Los cambios de URL, formato de frontmatter, API o estados se acuerdan en `docs/TASKS.md` antes de modificar sus consumidores. Mantener el hook de contacto y las decisiones de consentimiento bajo revisión técnica. Las credenciales nunca pasan a props visuales, archivos públicos ni commits.
