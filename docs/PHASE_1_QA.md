# Evidencia de la fase 1

25/11/2026. Windows local, Node 26.13.1, pnpm 11.25.0 y Next.js 16.4.6. CI está configurado para Node 24 LTS. Se ejecutaron los scripts del manifiesto con npm sobre el árbol instalado por pnpm. La integración continua remota queda por ejecutar.

| Comprobación | Resultado observado |
| --- | --- |
| Instalación | Motion 14.14.0 instalado. Revalidación offline con lockfile congelado correcta. Lucide React 0.577.0 disponible. |
| Prettier y ESLint | Formato correcto en src y tests. Lint final con salida 0. |
| TypeScript | Tipos de rutas generados y compilador estricto con salida 0. |
| Vitest | 15/15. Publicación, filtros, navegación entre casos, JSON histórico, MDX convertido en HTML y API con proveedores simulados. |
| Build | Compilado, tipado y prerender completados. Next informó 17/17 entradas en la etapa de generación. |
| Playwright | 12/12 en 9,1 s. Cuatro pruebas por motor en Chromium, Firefox y WebKit contra next start en loopback. |
| Accesibilidad | Axe sin infracciones para las reglas seleccionadas en inicio, contacto, branding y proyectos. Comprobados salto al main con teclado, cabeceras, reflow a 320 px y 404. |
| Auditoría | pnpm audit --prod informó cero vulnerabilidades conocidas en el registro consultado. |

Durante la primera ejecución, axe señaló el tamaño de los enlaces y WebKit no enfocó el enlace de salto al tabular. La base ahora incluye dimensiones mínimas de activación y orden de tabulación explícito en ese enlace. La suite final comprobó ambas correcciones.

## Medición del artefacto local

En el HTML prerenderizado del inicio, 8 scripts externos referenciados por etiquetas script sumaron **176 371 bytes gzip**. El HTML ocupó **2 459 bytes gzip**. Se comprimió cada archivo del build con zlib de Node. Esta medición excluye precarga de otras rutas, medios y tráfico de red posterior. El presupuesto inicial orientativo de JS es 200 kB. Repetir las mediciones con la composición visual de Gemini y terceros autorizados.

## Alcance pendiente

El catálogo real está vacío. Los casos de prueba se crearon en un directorio temporal. El envío al buzón y el reto en un dominio registrado requieren datos del propietario. Los originales de marca, las referencias y la versión visual anterior se conservaron. Los resultados previos de Lighthouse se identifican como históricos en TEST_REPORT.md. Quedan pendientes Lighthouse con los activos definitivos, dispositivos físicos, lector de pantalla, revisión de licencias y métricas de campo. ESLint 9.39.5 emitió un aviso de fin de soporte durante la instalación. Algunos plugins del conjunto de Next declaran compatibilidad hasta ESLint 9. La actualización conjunta está registrada en TASKS.md.
