# Nord Studios — Design System web
**Versión:** 1.1 · 25/11/2026 · Actualización según identidad V2 proporcionada por el propietario

## 1. Dirección artística
Bold Minimalism con dirección cinematográfica: editorial, audaz, contundente, contemporáneo y premium. Negro profundo, naranja vibrante y blanco cálido, haces de luz naranja diagonales, grano fino y contraste dramático. Tipografía protagonista, retículas, grandes áreas de aire, diagonales derivadas del isotipo N y contraste. El diseño debe sentirse propio de un estudio creativo, no de una plantilla SaaS. Priorizar proyectos, no decoración. Referencias: https://dudesign.pe/ (estructura comercial), https://bttrprojects.com/ (portafolio y personalidad) y tres imágenes proporcionadas por el propietario: tipografía cinética verde, tarjetas de contenido dinámico, editorial Nexus. No copiar marcas, ilustraciones ni composiciones completas; adaptar principios. No usar recursos ajenos sin licencia.

## 2. Fuente de verdad: identidad V2 (25/11/2026)
Las 11 referencias entregadas por el propietario en `references/brand/` prevalecen sobre las versiones históricas 1.0 y Premium 3.0 en color, firma gráfica y dirección artística. No aplicar las paletas azul noche, terracota, arena o vino de los manuales anteriores. La nueva firma es el isotipo N geométrico naranja con wordmark NORD STUDIOS ancho, pesado y en dos líneas, acompañado del descriptor CREATIVE AGENCY en las versiones suministradas. El banner usa «Creative Direction for Modern Brands» y BRANDING / DESIGN / STRATEGY como lenguaje de marca; conservar el tono, sin convertir toda la web al inglés.

Los JPG de fondo plano son evidencia cromática: los píxeles dominantes del logo claro (V2-12), isotipo naranja (V2-03) y versión naranja (V2-11/02) arrojan los valores siguientes. Son valores de trabajo muestreados en JPG, no códigos certificados de un archivo vectorial. Confirmar con originales antes de cerrar producción. En la versión sobre negro se observa también blanco casi neutro #F5F5F3 en el wordmark; respetar el color propio del archivo original. No redibujar ni recolorear los logos.

## 3. Tokens de identidad y uso
| Token | HEX de trabajo | Función |
|---|---|---|
| --brand-ink | #0D0D0D | Negro principal, hero, footer, texto sobre claro |
| --brand-accent | #F26A2E | Naranja protagonista, CTAs, acentos, bloques expresivos |
| --brand-paper | #F4EFE9 | Blanco cálido, fondos editoriales y texto sobre negro |
| --brand-white | #F5F5F3 | Blanco casi neutro observado en la firma sobre negro |
| --surface-dark | #191919 | Superficie oscura secundaria propuesta |
| --text-muted-dark | #B7B7B7 | Texto secundario sobre negro, token funcional propuesto |
| --text-muted-light | #575757 | Texto secundario sobre papel, token funcional propuesto |
| --color-error | #9B1C1C | Error sobre fondo claro; adaptar en oscuro |
| --color-success | #166534 | Éxito sobre fondo claro; adaptar en oscuro |
| --focus-ring | #F26A2E / #0D0D0D / #F4EFE9 | Elegir según contraste del fondo y control |

Dirección de color: home predominantemente oscuro, con secciones claras de portafolio o lectura para dar ritmo y un cierre naranja o negro. El naranja debe ser reconocible, no un detalle tímido; reservar bloques sólidos para momentos de énfasis. Botón naranja con texto negro; no usar blanco cálido sobre naranja para texto normal. No usar naranja como texto pequeño sobre papel. Contraste WCAG AA: ≥4.5:1 texto normal, ≥3:1 texto grande y controles relevantes. Verificar todos los estados y las zonas de degradado.

### Recurso distintivo: luz y textura
Reproducir el lenguaje del banner: fondo negro, haces diagonales curvos o difusos en naranja intenso, transiciones cálidas hacia crema en extremos, grano fotográfico muy fino y amplias zonas negras de descanso. La luz parece física y cinematográfica, no un degradado multicolor genérico. Usar en hero y/o CTA final; no detrás de cada texto ni de cada proyecto. Mantener el área de lectura oscura y estable. Preferir CSS radial-gradient combinado con un recurso de grano estático pequeño o un fondo WebP/AVIF optimizado; evitar filtros de blur animados a pantalla completa, vídeo obligatorio, WebGL y partículas. Si se anima, movimiento muy lento y opcional mediante transform/opacity, desactivado con prefers-reduced-motion. Los mockups 3D son recursos de dirección artística, no pruebas de oficinas, clientes ni métricas reales. Nunca publicar como hechos los 30.5K seguidores, 128 proyectos o 5 servicios que aparecen en el mockup del reloj.

## 4. Logotipo
- Firma NORD STUDIOS original en header y footer. Isotipo N original para favicon, avatar y elementos reducidos. Conservar proporción, geometría, posición y colores de variantes autorizadas.
- Usar V2-12 como referencia de firma naranja/negra sobre crema; V2-04 como naranja/blanca sobre negro; V2-11 como firma crema sobre naranja. V2-02 y V2-03 muestran variantes del isotipo. Usar los maestros equivalentes transparentes, sin efectos ni reconstrucción tipográfica. No sustituir por texto “nord.” ni usar assets de Nord Systems.
- Regla web provisional: área libre ≥25% de altura del isotipo; firma horizontal a partir de 180–220 px según legibilidad real del descriptor; isotipo ≥28 px. Validar con el maestro V2 y no recortar el descriptor por cuenta propia. En móvil, usar isotipo aprobado con nombre accesible si la firma no cabe.
- Maestros vectoriales transparentes previstos (no suministrados; los JPG de referencia sí se incluyen): `/public/brand/logo-primary.svg`, `logo-inverse.svg`, `mark.svg`, `favicon.ico`. El desarrollador no debe inventarlos; solicitarlos al propietario.

## 5. Tipografía y escala
Satoshi Variable local (400, 500, 700; 800/900 solo si disponibles y licenciados), Inter/system sans de fallback: propuesta basada en la preferencia previa, no identificación de la tipografía por imagen. Los titulares de las referencias V2 son sans serif extra bold, anchos, compactos y de fuerte presencia. Confirmar la fuente display exacta y su licencia; no sustituir el wordmark por texto ni deformar letras para simularlo. Si existe una fuente display oficial distinta de Satoshi, reservarla para titulares y mantener Satoshi en textos funcionales. Usar `next/font/local` con WOFF2 licenciado y font-display swap. No compartir archivos de fuente sin licencia. No añadir otras familias decorativas sin aprobación. La escala web amplía el manual de 48–64 px para titulares editoriales de escritorio.

| Rol | Mobile | Desktop | Peso | Line-height |
|---|---|---|---|---|
| Display/H1 | 40–56 px | 72–112 px | 700–900 | 1.0–1.1 |
| H2 | 32–40 px | 48–72 px | 700 | 1.05–1.2 |
| H3 | 24–28 px | 28–36 px | 700 | 1.2 |
| Lead | 18–20 px | 20–24 px | 400–500 | 1.5 |
| Body | 16–18 px | 16–20 px | 400 | 1.5–1.6 |
| Meta/label | 12–14 px | 12–14 px | 500–700 | 1.4 |
| CTA | 16 px | 16 px | 700 | 1.3 |

Usar clamp() en títulos, no forzar saltos de línea que rompan móvil; ancho de texto corrido ideal 45–75 caracteres; evitar mayúsculas en párrafos largos. Tracking de display ligeramente cerrado, labels con tracking positivo moderado. H1 semántico único por plantilla como convención.

## 6. Retícula, espaciado y layout
| Pantalla | Columnas | Margen lateral | Gutter |
|---|---:|---|---|
| 320–639 px | 4 | 16–24 px | 16 px |
| 640–1023 px | 8 | 32–48 px | 24 px |
| ≥1024 px | 12 | 6–8% o clamp(48px,6vw,96px) | 24–32 px |

Contenedor máximo orientativo 1440 px; imágenes full-bleed puntuales. Módulo 8 px: 8/16/24/32/40/48/64/80/96/120. Separaciones de sección 64–96 móvil, 96–144 escritorio. Radios 0–8 px para estructura editorial; botones 4–8 px o píldora únicamente si el diseño lo justifica. Líneas finas de separación y numeración 01/02 como recurso. Una idea visual dominante por sección; evitar repetir cuadrículas de tarjetas idénticas.

## 7. Componentes
| Componente | Reglas de diseño y estados |
|---|---|
| Header | Logo, enlaces breves, CTA; sticky opcional sin tapar contenido; fondo legible; menú móvil accesible |
| Botón primario | Alto ≥44 px, texto legible, icono flecha opcional, estados hover/focus/active/disabled/loading |
| Botón secundario | Contorno o enlace editorial; nunca competir con CTA principal |
| ProjectCard | Imagen 4:3 o 3:2, título, categoría, enlace; hover leve y accesible sin depender del hover |
| ServiceRow | Número, título, descripción, enlace; divisores; apilado móvil |
| FilterBar | Botones con estado seleccionado programático, wrap o scroll accesible |
| Accordion | Botón nativo, aria-expanded, panel identificado, navegación teclado |
| FormField | Label persistente, ayuda, error junto al campo; no depender del color |
| VideoPreview | Poster, duración si conocida, play, controles; sin autoplay con audio |
| Footer | Firma original, navegación, contacto, redes, privacidad |
| Feedback | Estados vacío, error, éxito y loading con texto y foco cuando proceda |

Componentes UI sin librería visual pesada; usar primitivos HTML y composición con Tailwind. Iconos Lucide discretos, preferir flechas y símbolos útiles; decorativos aria-hidden.

## 8. Composiciones de referencia
Home escritorio: cabecera negra con firma V2 → hero negro con haces de luz naranja, grano fino, titular crema extrabold y CTA naranja de texto negro → proyectos con grid editorial asimétrico sobre negro o papel (dos columnas, un caso ancho opcional) → servicios sobre papel con títulos negros y divisores → proceso en cinco pasos → presentación de estudio → FAQ → CTA final negro con luz naranja o bloque naranja con texto negro. Las imágenes de proyectos conservan sus propios colores; no aplicar filtros naranja a todo el portafolio. En móvil: titular en 2–4 líneas adaptables, CTA visible sin obligar a desplazamiento excesivo, proyectos una columna, sin recortes de texto.

Servicio: H1 y propuesta específica → galería de ejemplos → alcance/entregables → proceso → FAQ → casos relacionados → CTA. Caso: portada → contexto/rol → reto → solución → galerías amplias → créditos/resultados reales → caso siguiente. Contacto: formulario junto a texto breve y WhatsApp, una columna móvil. Blog: índice editorial, artículo con columna de lectura y enlaces útiles.

## 9. Imágenes y motion
Usar únicamente proyectos autorizados, capturas de pantalla de proceso, mockups reales/licenciados, detalles de piezas y recursos propios. No inventar clientes ni fotos de equipo; respetar preferencia de no mostrar rostro. Cada imagen tiene propósito y alt apropiado; decorativas alt vacío. Portadas con dimensiones explícitas, crop responsive sin ocultar detalles, evitar texto importante dentro de imágenes. Reels con poster y carga bajo demanda.

Motion: CSS primero; Motion solo cuando aporte. Hover 120–180 ms, transiciones 180–300 ms, reveal 300–500 ms; desplazamiento leve 8–24 px, sin scroll-jacking. No ocultar contenido si JS falla. Con prefers-reduced-motion desactivar parallax, marquee, animaciones de entrada y transiciones no esenciales; si hay movimiento continuo, permitir detenerlo. Sin cursor personalizado obligatorio ni splash de carga. Mantener navegación instantánea.

## 10. Accesibilidad y aprobación
WCAG 2.2 AA como objetivo: navegación teclado completa, skip-link, landmarks, foco visible no oculto, menú y diálogos accesibles, zoom 200%, reflow 320 px, tamaño táctil objetivo 44 px, estados no solo color, labels y mensajes anunciables. Comprobar manualmente además de axe/Lighthouse. Probar 320, 375, 390, 768, 1024, 1440 y 1920 px; no overflow horizontal accidental. Aprobar diseño desktop y móvil del home y de un caso antes de implementar las demás páginas.

## 11. Entregables de diseño
Tokens CSS/Tailwind centralizados, componentes con estados, wireframes/maquetas aprobadas, inventario de activos y variantes de logo, guía responsive y motion, checklist de contraste y pruebas. Fuente visual prioritaria: los 11 JPG V2 de `references/brand/`, entregados el 25/11/2026; referencias de sitios e imágenes en `references/web/`. Los manuales anteriores son históricos y solo sirven para principios compatibles, no para color, firma o tipografía display. Estándar: https://www.w3.org/TR/WCAG22/ . Los valores muestreados son provisionales hasta cotejarlos con los maestros; el lenguaje visual V2 sí es la referencia prioritaria solicitada.
