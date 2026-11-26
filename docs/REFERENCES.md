# Referencias de diseño e implementación

Revisión del 25 de noviembre de 2026. El encargo, los cuatro documentos de `leer/` y los originales de `identidad_visual/` fijan la identidad y la oferta del estudio. Las referencias externas orientan decisiones concretas.

## Estudios de diseño

| Referencia | Observación | Aplicación a Nord Studios |
| --- | --- | --- |
| [Du Design](https://dudesign.pe/) | El inicio enlaza cada disciplina, clasifica los trabajos e invita a conversar desde la navegación. | Dar a cada servicio una URL propia y llevar al visitante de la descripción a la cotización. |
| [BTTR Projects](https://bttrprojects.com/) | El estudio resume su posicionamiento en pocas líneas, presenta casos por nombre y especialidad y explica su proceso. | Reservar espacio a las imágenes originales, acompañar cada caso con su disciplina y explicar qué aporta el estudio en cada etapa. |

Se consultó el contenido accesible de ambas portadas. Las decisiones sobre color, logotipo y composición deben contrastarse con los originales locales. Los clientes, estadísticas, testimonios y trabajos de las referencias pertenecen a sus respectivos estudios.

## Skills públicas consultadas

- **Frontend Design, de Anthropic.** Abrir con la pieza más reconocible del mundo visual de la marca, jerarquizar el texto mediante escala y peso, y revisar la primera composición con el encargo a la vista. En Nord Studios el recurso distintivo es el isotipo original. [Skill oficial](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)
- **Web Design Guidelines, de Vercel.** Revisar navegación por teclado, foco visible, objetivos táctiles, etiquetas de formulario y movimiento reducido. Dar dimensiones a las imágenes y priorizar únicamente el recurso crítico del primer pantallazo. [Skill oficial](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md) · [Criterios de revisión](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md)

## Decisiones de publicación y experiencia de contacto

- Incluir en el sitemap las URL canónicas absolutas que se desea mostrar en resultados. Los listados vacíos pueden responder con `noindex` y quedar fuera del sitemap. Para que Google lea esa instrucción debe poder rastrear la página. Un proyecto en borrador debe quedar inaccesible por URL pública. [Google Search Central sobre sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) · [Instrucción noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- Explicar en texto cómo corregir un campo inválido, vincular el mensaje con ese campo y anunciar el resultado del envío a quienes utilizan tecnologías de asistencia. [W3C WAI sobre notificaciones de formularios](https://www.w3.org/WAI/tutorials/forms/notifications/)
- Si se activa Turnstile, validar el token mediante Siteverify en servidor antes de enviar la consulta al proveedor de correo. Los tokens caducan a los cinco minutos y son de un solo uso. [Documentación de Cloudflare](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- Antes de habilitar la captación de datos, completar el aviso con el responsable y su domicilio, finalidad, campos obligatorios y facultativos, consecuencias de responder u omitirlos, destinatarios, banco de datos, transferencias aplicables, conservación y canal de ejercicio de derechos. Confirmar estos hechos con el titular del estudio. [Artículo 18 de la Ley 29733](https://www.smv.gob.pe/ConsultasP8/temp/Ley_29733_LPDP.pdf) · [Reglamento publicado por la ANPD](https://www.gob.pe/institucion/anpd/normas-legales/6554453-n-016-2024-jus) · [Guía del Ministerio de Justicia](https://www.gob.pe/institucion/minjus/informes-publicaciones/353793-guia-practica-para-la-observancia-del-deber-de-informar)

Las palabras clave sugeridas en el documento de estrategia siguen siendo hipótesis. La demanda local y las consultas que generan solicitudes podrán contrastarse con datos del propietario y con Search Console después del lanzamiento.
