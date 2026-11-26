# Informe de verificación

> Documento histórico de la implementación anterior. Consulta el [traspaso vigente](HANDOFF.md), la [guía de portafolio](PORTFOLIO_GUIDE.md) y las [mediciones de fase 1](PHASE_1_QA.md).
25 de noviembre de 2026. Compilación local de producción en Windows, Node 24.22.3, Next.js 16.4.6 y pnpm 11.25.0. El sitio se mantiene en vista previa.

## Funcionalidad y calidad
| Comprobación | Resultado |
|---|---|
| pnpm lint | ESLint sin errores ni advertencias |
| pnpm typecheck | Generación de tipos de rutas y TypeScript estricto correctos |
| pnpm test | 14 pruebas aprobadas |
| pnpm build | Compilación, prerender y generación de 17 páginas completados |
| pnpm test:e2e | 12 pruebas aprobadas en Chromium, Firefox y WebKit |
| pnpm audit --prod | El registro no informó vulnerabilidades conocidas en las dependencias de producción |
| Skill local | quick_validate.py aprobó nord-brand-identity |

Los recorridos prueban navegación, cabeceras, SEO de preview, enlaces internos, respuestas HTTP, menú móvil con Escape y foco, formulario contextual, carga de fuentes locales, movimiento reducido, acordeón, exclusión de borradores y página 404. En las pruebas unitarias se publican casos temporales fuera del contenido de la web para verificar el orden, los filtros, el enlace al servicio y al caso siguiente. Los proveedores del formulario se simularon en memoria, incluyendo verificación rechazada, cupo agotado y fallo de correo.

## Diseño y accesibilidad
Se revisaron capturas de [escritorio a 1440 px](qa/inicio-1440.png) y [móvil a 390 px](qa/inicio-390.png). La prueba de portada cubre 320, 375, 390, 430, 740, 741, 768, 960, 1024, 1280, 1440, 1919 y 1920 px. Las doce páginas de navegación también se verificaron a 320 px. El H1 en Monument ocupa tres líneas en todos los anchos probados. En móvil, la escultura deja al menos 16 px antes del divisor inferior. Se comprobó la decodificación de la imagen principal en la vista previa final.
Axe no detectó infracciones en las reglas ejecutadas para inicio, contacto, branding y portafolio, en los tres motores. Falta la evaluación con personas usuarias de tecnologías de asistencia y dispositivos físicos iOS/Android.

## Rendimiento
Lighthouse 12.6.1, Chrome headless 157, perfil móvil de 412 × 823, DPR 1.75, CPU simulada 4×, RTT 150 ms, 1638.4 kbps. Tres ejecuciones por URL con el navegador reiniciado y sin servicios de analítica o contacto activos. La tabla muestra las medianas. Los informes completos quedan en `.lighthouseci/report/` tras `pnpm lighthouse`.

| Ruta | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS | Transferencia | JavaScript |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Inicio | 97 | 100 | 100 | 66 | 2.44 s | 0.053 | 269 kB | 153 kB |
| Branding | 99 | 100 | 100 | 66 | 2.03 s | 0.038 | 252 kB | 153 kB |
| Contacto | 99 | 100 | 100 | 66 | 2.03 s | 0 | 246 kB | 159 kB |

La portada escultórica pasó de 2.51 s a 2.44 s de LCP, con 97/100 de rendimiento en ambas mediciones. Se priorizó la escultura y la fuente del titular, se retiró la precarga del logo y se redujo el peso de las fuentes web al repertorio latino. Los archivos tipográficos originales se conservan en font/.

La única comprobación SEO penalizada fue la indexabilidad. El entorno local usa noindex y robots de preview según el encargo. La indexabilidad y el sitemap de producción deberán verificarse con el dominio autorizado. LCP y CLS son mediciones de laboratorio. INP y los percentiles de usuarios reales requieren tráfico posterior al lanzamiento.

## Integraciones pendientes
La entrega de mensajes al buzón, Turnstile con hostname registrado, el límite persistente real, los canales comerciales y la medición GA4 requieren valores del propietario. Se debe repetir la medición de contacto con el widget activo. La configuración y la validación externa están descritas en DEPLOYMENT_GUIDE.md y PENDING_ITEMS.md. Falta medir una página de caso con imágenes y videos de un proyecto aprobado.
