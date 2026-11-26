# Nord Studios — Technical Requirements
**Versión:** 1.1 · 25/11/2026 · Especificación de ingeniería para Codex

## Actualización de identidad V2
Implementar exclusivamente los tokens V2 de `DESIGN_SYSTEM.md`. Los haces de luz y el grano serán recursos estáticos optimizados o CSS ligero, sin WebGL ni video obligatorio. Probar contraste sobre el degradado y reduced-motion. No usar JPG cuadrados como logos de navegación: solicitar SVG transparentes originales.

## 1. Principios y stack
Sitio multipágina editorial, SEO-first, mobile-first, seguro y mantenible. Contenido estático por defecto; interacción cliente solo donde aporte. No implementar autenticación ni base de datos inicial. Elegir versiones estables, soportadas y compatibles al iniciar; fijar lockfile y documentar decisiones. No usar dependencias duplicadas o innecesarias.

| Capa | Tecnología | Decisión |
|---|---|---|
| Framework | Next.js App Router + React | Prerender y Server Components por defecto |
| Lenguaje | TypeScript strict | Tipos de contenido y contratos |
| Estilos | Tailwind CSS + tokens CSS | Sistema visual centralizado, sin UI kit pesado |
| Motion | CSS, Motion opcional | GSAP solo si se justifica, no instalar por defecto |
| Contenido | MDX local confiable o TS tipado | Casos, servicios, blog; no MDX de usuarios |
| Validación | Zod | Servidor como autoridad; cliente para UX |
| API | Route Handler POST /api/contact | Envío de cotización, sin API de lectura innecesaria |
| Correo | Resend o proveedor aprobado | Servidor, dominio autenticado |
| Antibot | Cloudflare Turnstile | Validación server-side obligatoria |
| Rate limit | Almacén compartido/servicio de plataforma | Persistente entre instancias; no memoria local en serverless |
| Hosting | Vercel plan comercial u otro compatible | Confirmar coste, plan, CDN y runtime; no Hobby para negocio |
| Versionado/CI | Git, GitHub, CI | PR, build, pruebas, escaneo y revisión |
| QA | Playwright, Vitest, axe | E2E, unitarias y accesibilidad |
| Analítica | Search Console + GA4 o alternativa aprobada | Eventos mínimos, privacidad por diseño |

No añadir CMS, Redis propio, Three.js, chat, pagos, cuentas o tracking invasivo salvo decisión justificada. El almacenamiento compartido de rate limit puede ser gestionado sin base de datos de contenido. Cloudflare Turnstile puede usarse aunque el hosting no sea Cloudflare. Si se elige Cloudflare como hosting, validar compatibilidad real de Next.js y adaptador/runtime antes de comprometerlo.

## 2. Arquitectura y repositorio
Visitante → HTTPS/CDN → Next.js (páginas estáticas y componentes) → POST /api/contact → validación + rate limit + Turnstile → proveedor correo → buzón Nord Studios. Separar datos, presentación y lógica server-only. No exponer secretos en bundle. El contenido se actualiza mediante commits y despliegues hasta adoptar CMS.

```text
nord-studios/
  AGENTS.md
  README.md
  .env.example
  .gitignore
  docs/                 # los cuatro documentos
  references/           # imágenes y links, no publicar activos sin permiso
  public/brand/         # logos oficiales, favicon
  public/projects/      # recursos autorizados y optimizados
  content/projects/     # MDX o datos tipados
  content/blog/
  src/app/
    layout.tsx
    page.tsx
    servicios/[slug]/page.tsx
    proyectos/[slug]/page.tsx
    blog/[slug]/page.tsx
    contacto/page.tsx
    api/contact/route.ts
    sitemap.ts
    robots.ts
    not-found.tsx
  src/components/       # layout, ui, sections
  src/features/         # contact, portfolio
  src/lib/              # seo, content, security, mail
  src/config/           # marca y datos de negocio no secretos
  src/styles/           # tokens
  tests/                # unit, e2e
```

Añadir rutas índice y legales descritas en Project Brief. Para rutas de contenido, generar parámetros estáticos solo publicados, validar slugs, devolver 404 si no existe. Evitar dependencias cíclicas; funciones pequeñas y componentes reutilizables. Preferir CSS y HTML nativos; no usar `use client` en layout entero. Documentar comandos, variables y despliegue en README.

## 3. Contrato de contacto
`POST /api/contact`, JSON, tamaño total máximo orientativo 16 KB. Rechazar tipos de contenido no admitidos. Campos: name (2–100), email (válido, ≤254), service (enum aprobado), message (20–2000), company (opcional ≤120), phone (opcional ≤30, validar de manera inclusiva), budget (enum opcional), timeline (opcional ≤100), privacyAcknowledged/consent según política, turnstileToken obligatorio. Normalizar espacios y longitudes, no eliminar caracteres legítimos. Sin adjuntos. Validar esquema en servidor, rechazar claves inesperadas si procede.

Flujo: comprobar método/content-type/tamaño y origen permitido; aplicar rate limit (inicial propuesto 5 intentos/10 min por clave IP fiable con límites globales, ajustar según abuso; no confiar en X-Forwarded-For arbitrario); validar campos; verificar Turnstile Siteverify y hostname/action esperados, token no reutilizado; componer correo desde dirección fija autenticada, reply-to validado, escape de HTML y sin cabeceras inyectables; enviar con timeout y manejo de errores; evitar duplicados mediante idempotencia del proveedor si disponible y bloqueo de doble clic. Si protección no está disponible, fallar de forma segura con opción WhatsApp. No reenviar tokens ni información sensible a logs. No afirmar entrega final del correo si proveedor solo confirma aceptación.

| Status | Significado |
|---|---|
| 200/202 | solicitud aceptada por proveedor, estado de éxito veraz |
| 400 | datos inválidos o reto rechazado, feedback seguro |
| 403 | origen no autorizado |
| 413/415 | tamaño o tipo no permitido |
| 429 | límite alcanzado, Retry-After cuando proceda |
| 502/503 | proveedor/servicio no disponible, reintento sin revelar detalles |

API devuelve códigos genéricos y mensajes legibles; detalles internos en logs redactados. No almacenar leads sin decisión de negocio y política aprobada. CORS no abierto; validar origin/host como defensa adicional, no sustituto de autenticación ni rate limit. Si se agregan sesiones/cookies de autenticación, implementar protección CSRF específica.

## 4. Seguridad y privacidad
| Control | Requisito comprobable |
|---|---|
| TLS | HTTPS y redirect, certificados correctos; HSTS después de verificar dominio y subdominios antes de incluirlos |
| CSP | Política restrictiva ajustada a scripts/estilos reales; frame-ancestors 'none' salvo necesidad, object-src 'none', base-uri 'self', form-action restringido; definir allowlist exacta de Turnstile/analítica. Probar Report-Only antes de aplicar |
| Cabeceras | X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy restringida; X-Frame-Options DENY si compatible y útil como respaldo |
| XSS | Escape React y HTML de correo, no `dangerouslySetInnerHTML` para datos no confiables; serializar JSON-LD de forma segura; no ejecutar MDX remoto |
| Secretos | `.env.local` ignorado; vault/env del hosting; `.env.example` sin valores; `NEXT_PUBLIC_` solo datos públicos intencionales |
| Dependencias | Lockfile, auditoría npm, actualizaciones soportadas, escaneo de secretos, CI; revisar vulnerabilidades aplicables antes de liberar |
| Abuso | Rate limit compartido y Turnstile verificado en servidor; protección de API, WAF según riesgo; test de rechazo |
| Operación | MFA en GitHub, hosting, registrador y correo, permisos mínimos, rotación y revocación de claves, respaldos y rollback probado |
| Privacidad | Recoger mínimos, avisar finalidad, proveedores, conservación y ejercicio de derechos; consentimientos según corresponda; no enviar PII a analítica; logs redactados |

CSP no debe romper renderizado estático de Next.js: investigar estrategia de hashes/allowlist para scripts de build o nonce en rutas dinámicas si es necesario, documentar tradeoff y no adoptar `unsafe-inline`/`unsafe-eval` de forma general sin revisión. Validar cabeceras en producción real, no solo config. Evitar `includeSubDomains`/preload HSTS hasta confirmar control completo. Separar configuración dev/staging/production. No usar robots.txt como barrera de seguridad.

Privacidad: revisar Ley 29733 de Perú y reglamento vigente, obligaciones de consentimiento, tratamiento, proveedores, transferencias y registro de banco de datos si aplica; el documento legal debe reflejar prácticas reales y ser aprobado por responsable, no texto genérico inventado. Analítica no esencial y herramientas de sesión sujetas a revisión de privacidad; no instalar grabación de sesiones por defecto. Configurar SPF, DKIM y DMARC según proveedor y dominio; verificar correo de remitente y destino antes de activar formulario real.

Variables propuestas (nombres orientativos): `SITE_URL`, `CONTACT_EMAIL`, `MAIL_FROM`, `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, credenciales del servicio de rate limit, ID público de analytics si aprobado. Validar variables de producción, no registrar valores. WhatsApp y enlaces públicos en config, no asumir números sin aprobación.

## 5. Rendimiento y experiencia
Objetivos de campo en percentil 75, móvil y escritorio cuando haya volumen suficiente: LCP ≤2.5 s; INP ≤200 ms; CLS ≤0.1. Objetivo de laboratorio: Lighthouse Performance ≥95, Accessibility/Best Practices/SEO 100 como aspiración (sin sacrificar accesibilidad o falsear pruebas); umbral de salida acordado Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥95, además de controles manuales sin fallos graves. Cualquier excepción se documenta y aprueba, no se oculta. Lighthouse no mide INP real ni certifica WCAG.

| Presupuesto inicial propuesto | Límite |
|---|---|
| Transferencia home en carga inicial | ≤1 MB comprimido, videos diferidos excluidos |
| JS inicial de ruta | ≤200 KB comprimido, incluyendo terceros iniciales |
| Recurso hero | ≤300 KB orientativo, optimizar por viewport |
| Miniaturas | 80–200 KB orientativo |
| Fuentes | ≤150 KB comprimidos |

Medir home, servicio, caso y contacto con build de producción, perfil móvil Lighthouse reproducible, tres ejecuciones por URL y mediana, documentar dispositivo, versión, red/CPU, caché fría, terceros activos y fecha. Controlar en CI con budgets y Lighthouse cuando proceda. No desactivar funciones reales para aumentar puntuación. Para campo, usar CrUX/Search Console o RUM aprobado una vez disponibles datos.

Implementación: next/image con sizes y dimensiones, AVIF/WebP donde proceda, solo preload del recurso LCP si corresponde a versión usada, lazy loading bajo el pliegue; poster de video, preload none/metadata y carga bajo demanda, evitar autoplay; fuentes WOFF2 locales licenciadas y fallback estable; CDN y caché para assets versionados, HTML estático cuando sea posible; evitar layout shift en imágenes, fuentes y widgets; importación dinámica de componentes pesados, no scripts de terceros innecesarios; animar transform/opacity; reducir motion y no bloquear navegación; evitar animación de entrada que retrase LCP. Optimizar imágenes de casos sin perjudicar calidad visual. Usar analizador de bundle para investigar excesos.

## 6. Accesibilidad y compatibilidad
Objetivo WCAG 2.2 AA: landmarks, headings, skip link, labels, mensajes accesibles, foco visible, teclado, contraste, reflow 320 px, zoom 200%, reduced motion, subtítulos cuando proceda, alt correcto. Menú móvil con focus management, Escape y regreso al botón; si es modal, bloquear foco dentro. Probar Chromium, Firefox y WebKit, y dispositivos reales disponibles (Android/iOS). No depender del hover ni de cursor personalizado. Formularios conservan datos tras error recuperable sin almacenar PII en localStorage. Navegación principal funciona incluso si JS falla; indicar alternativa de contacto si envío no funciona.

## 7. Pruebas y criterios de aceptación
| ID | Prueba | Aceptación |
|---|---|---|
| A01 | build, typecheck, lint | Salida sin errores; warnings relevantes resueltos/documentados |
| A02 | Rutas y links | Todas las rutas aprobadas cargan, sin links rotos ni errores consola relevantes, 404 real |
| A03 | Responsive | 320–1920 px sin overflow accidental, navegación móvil completa |
| A04 | Marca | Logos y tokens coinciden con archivos aprobados; revisión visual desktop/mobile |
| A05 | Contacto válido | Envío de prueba a buzón aprobado y estado correcto; no usar datos de clientes |
| A06 | Contacto adverso | Invalidación server-side, token ausente/inválido/repetido, 429, origen no permitido, tamaño excesivo, proveedor caído; no filtrar secretos |
| A07 | Portafolio | Filtros accesibles, casos válidos, posters y videos funcionales |
| A08 | SEO | Criterios de SEO_STRATEGY completos; sitemap, canonical, status, metadata y HTML rastreable |
| A09 | Rendimiento | Informe Lighthouse y budgets en rutas representativas; CWV de campo pendiente hasta datos |
| A10 | Accesibilidad | axe sin violaciones graves/críticas sin resolver, revisión manual de teclado/contraste/reflow |
| A11 | Seguridad | Cabeceras efectivas, HTTPS, auditoría sin vulnerabilidades altas/críticas aplicables sin tratamiento aprobado, escaneo de secretos |
| A12 | Analytics | Eventos probados sin PII y según consentimiento; clic WhatsApp separado de lead |
| A13 | Privacidad | Avisos y configuración aprobados, no rastreo innecesario, sin datos ficticios |
| A14 | Despliegue | Dominio real, redirecciones, monitorización, backup/rollback y prueba de formulario productivo |

Vitest: esquemas, sanitización/escape, funciones SEO, slugs, helpers de contacto; mocks de email y Turnstile. Playwright: navegación, filtros, FAQ, menú teclado, formularios con proveedor de prueba, errores, móvil, metadata y 404. Usar claves de prueba Turnstile solo en entorno de pruebas. Auditoría de seguridad y pruebas de abuso únicamente en entorno propio/autorizado. Evidencias: logs no sensibles, reportes, capturas, comandos y resultados. No declarar 100% seguro ni accesibilidad completa por una sola herramienta.

## 8. CI/CD, lanzamiento y mantenimiento
1. Configurar repo, Node LTS compatible, package manager elegido, lockfile y `.env.example`; PR con install reproducible, lint, typecheck, unit, build y E2E; branch principal protegida.
2. Deploy preview protegido/noindex, pruebas y aprobación visual. No usar claves de producción en PR no confiables.
3. Producción con plan comercial, DNS, TLS, dominio canónico, variables privadas, correo autenticado, Turnstile y rate limit. Configurar analytics aprobado, Search Console y sitemap.
4. Smoke tests de rutas, contacto, WhatsApp, privacidad, cabeceras, metadata y métricas; verificar email recibido. Documentar versión y rollback al despliegue anterior.
5. Mantenimiento mensual: dependencias y alertas, disponibilidad, logs redactados, backups, métricas y enlaces. Correcciones urgentes de vulnerabilidades aplicables. Revisar contenidos periódicamente.

## 9. Instrucciones para Codex y skills
Crear AGENTS.md con reglas: leer los cuatro documentos, identificar conflictos y detener publicación ante recursos/credenciales no confirmados; no inventar activos, resultados o datos; mantener alcance; documentar cambios, ejecutar pruebas y reportar fallos reales. Crear skills propias solo si son útiles, sin asumir que existen en un catálogo. Prioridad: `frontend-design`, `brand-guidelines`, `seo-specialist`, `nextjs-best-practices`, `web-performance`, `web-security`, `accessibility`, `testing-qa`. Complementarias: `motion-design`, `conversion-optimization`, `copywriting`, `deployment-devops`. Cada SKILL.md debe tener propósito, cuándo usarla, pasos, checklist y fuentes oficiales; revisar terceros antes de instalar. Confirmar rutas y formato según documentación de Codex vigente.

Fases con aprobación: 1) plan y activos, 2) sitemap/SEO, 3) wireframes y tokens, 4) scaffolding, 5) páginas y contenido, 6) formulario y seguridad, 7) auditorías, 8) despliegue. Al terminar cada fase, entregar cambios, pruebas y decisiones pendientes. No programar hasta aprobación de la planificación si se usa como brief inicial.

## 10. Referencias
- Next.js producción: https://nextjs.org/docs/app/guides/production-checklist
- Next.js App Router: https://nextjs.org/docs/app
- Google Web Vitals: https://web.dev/articles/vitals
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- OWASP HTTP Security Headers: https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
- Turnstile Siteverify: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- Vercel planes: https://vercel.com/docs/plans/hobby
- Playwright: https://playwright.dev/docs/intro
- Documentación Codex: https://developers.openai.com/codex/
