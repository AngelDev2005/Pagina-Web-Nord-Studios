# Arquitectura de la fase 1

## Ejecución y límites

Next 16.4.6 App Router, React 19.3.1, TypeScript 5.9.3 en modo estricto, Tailwind 4.3.5 con PostCSS. El lockfile fija las versiones transitivas. Las páginas se renderizan en el servidor. Servicios, inicio y páginas informativas admiten prerender. Contacto y el índice de proyectos procesan parámetros de consulta por petición. El contenido y el endpoint requieren el runtime de Node. Un export estático completo perdería el endpoint.

| Capa | Responsabilidad | Consumidores |
| --- | --- | --- |
| `content/projects`, `content/blog` | Archivos editoriales locales revisados | Lector de servidor |
| `src/config` | Catálogo, navegación en español, canales, disponibilidad legal | Rutas y controles |
| `src/lib/content.ts` | Frontmatter y esquemas Zod, unicidad, publicación y orden | Rutas, sitemap, modelos |
| `src/features/portfolio/catalog.ts` | Categorías disponibles, selección, caso siguiente y relacionados | Adaptadores de proyectos |
| `src/app` | HTTP, parámetros, metadata, 404 y composición de vistas | Next App Router |
| `src/components` | HTML y controles con props | Adaptadores |
| `src/features/contact/useQuoteForm.ts` | Token, bloqueo de doble envío, errores y reintento | Formulario cliente |
| `src/lib/contact-server.ts`, `api/contact/route.ts` | Límites, verificación del reto y entrega al proveedor | POST del mismo origen |

## Rutas y datos

| URL | Contrato |
| --- | --- |
| `/`, `/nosotros` | Nombre y ubicación de la configuración del estudio. El acceso contextual al portafolio depende de casos publicados. |
| `/servicios`, `/servicios/[slug]` | Cuatro slugs del catálogo. El CTA pasa `?servicio=<slug>` al contacto. |
| `/proyectos?categoria=<slug>` | Categoría disponible o Todos. URL canónica del listado. |
| `/proyectos/[slug]` | Caso publicado, portada, galería, videos locales, narrativa MDX y enlaces contextuales. |
| `/blog`, `/blog/[slug]` | Artículos locales con fecha y autor. Navegación condicional. |
| `/contacto`, `/privacidad`, `/terminos` | Formulario sujeto a disponibilidad del servidor, aviso aprobado y rutas legales. |
| `/robots.txt`, `/sitemap.xml` | Preview bloqueada por defecto. El sitemap se alimenta solo de rutas canónicas publicadas cuando se habilita la indexación. |

Los slugs desconocidos de detalle devuelven 404. Los modelos parten de `projects()` y `articles()`, que validan antes de filtrar. Las plantillas quedan en borrador. Un slug repetido dentro de la misma colección interrumpe la lectura, incluso entre formatos. Las dimensiones y el texto alternativo acompañan a cada imagen. Solo se compila MDX local de autores con acceso de escritura al repositorio.

## Contrato de cotización

`POST /api/contact` recibe JSON de hasta 16 KiB. Campos obligatorios: `name`, `email`, `service`, `description`, `consent: true`, `token`. Opcionales: `company`, `phone`, `budget`. `contactSchema` define límites y valida también en servidor. El cliente envía el token con la clave del contrato. El servicio verifica origen, límite compartido, hostname y acción del reto antes de llamar al correo.

Respuesta JSON con `message` y, para validación de campos, `fields`. Estados: 200 aceptado por el proveedor, 400 JSON inválido, 403 origen, 413 tamaño, 415 tipo, 422 validación o reto, 429 límite, 503 deshabilitado o proveedor indisponible. La entrega efectiva al buzón requiere una comprobación separada. No se guardan leads en el sitio.

## Configuración y seguridad

`.env.example` enumera las variables. La activación del formulario exige las credenciales, interruptores y datos legales de `contactReady()` y `privacyReady`. Solo se pasan al cliente disponibilidad, clave pública del reto y servicio seleccionado. Mantén las importaciones de sistema de archivos, secretos y proveedores en módulos de servidor. GA4 es opcional y su carga requiere consentimiento. `next.config.mjs` aplica las cabeceras y empaqueta el contenido para ejecución. La CSP actual permite scripts inline de hidratación. Revisar esta concesión antes del despliegue.
