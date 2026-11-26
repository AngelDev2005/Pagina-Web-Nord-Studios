# Editar contenidos

> Documento histórico de la implementación anterior. Consulta el [traspaso vigente](HANDOFF.md), la [guía de portafolio](PORTFOLIO_GUIDE.md) y las [mediciones de fase 1](PHASE_1_QA.md).
Los servicios, beneficios, entregables, etapas, preguntas y testimonios residen en `src/config/es.ts`. Conserva los slugs existentes, usados por enlaces y solicitudes. Añade testimonios solo con autorización y texto verificable. La lista vacía oculta el bloque.
El encabezado, el cierre y las plantillas de página contienen el texto editorial de su ruta. Para una futura versión en inglés, añade un catálogo de idioma paralelo, traduce los textos de plantilla y crea el segmento de locale con sus canonicals y hreflang. Las URL españolas existentes son la versión inicial.
Los proyectos se administran según PORTFOLIO_GUIDE.md. Para artículos, copia `content/blog/template.mdx`, elige un slug único, fecha ISO y autor real. Añade descripción SEO, un servicio relacionado y el cuerpo MDX con encabezados desde H2. Publica con `status: published` y recompila. Solo el equipo autorizado debe editar MDX, que se ejecuta como código local durante el render.
La portada usa una escultura original en public/brand/pliegue.webp, un detalle editorial y una composición social. Conserva las láminas de identidad_visual como referencias de estilo.
Los enlaces a redes, WhatsApp y correo se habilitan desde .env.local según .env.example. Usa URL oficiales HTTPS, número internacional con prefijo de país y correo público confirmado. Los mensajes de WhatsApp incluyen el servicio de origen.
