# Traspaso a Gemini

## Primer recorrido

1. Lee `GEMINI.md`, las cuatro fuentes en `leer/` y la matriz de responsabilidades. Usa `identidad_visual/` para cotejar variantes y proporciones. `referencias/` reúne las imágenes externas de inspiración y `font/` los archivos tipográficos suministrados. Confirma las licencias antes de distribuirlos.
2. Con Node 24 LTS y pnpm 11.25.0, ejecuta `pnpm install --frozen-lockfile` y `pnpm dev`. Abre `http://localhost:3000`. La configuración vacía permite navegar sin proveedores. Puedes copiar `.env.example` a `.env.local` para ensayos locales.
3. Empieza en `src/components/Home.tsx` y `Header.tsx`. El layout proporciona idioma, salto al contenido, navegación y main. Coordina con Codex las nuevas props que requiera la portada. El servidor ofrece servicios y testimonios en `src/config/es.ts`, artículos y proyectos publicados en `src/lib/content.ts`.
4. Desarrolla el caso en `ProjectDetail.tsx`. La ruta suministra `p`, `related`, `next` y el cuerpo MDX compilado en `children`. Mantén ese punto de inserción y las dimensiones de las imágenes. Para explorar el flujo con material autorizado, sigue la guía del portafolio. En el repositorio inicial hay cero casos publicados.
5. Presenta al propietario inicio y caso en escritorio y móvil. Registra las decisiones antes de extender la implementación.

## Contratos que sostienen la interfaz

- `PortfolioIndex` recibe `cats`, `selected`, `hasProjects` e `items`. Conserva Todos y los enlaces por categoría. Expresa selección con `aria-current`. Mantén estados distintos para colección vacía y resultados publicados.
- La llamada a contacto desde un servicio conserva `?servicio=`. `QuoteForm` recibe `enabled`, `service` y `siteKey`. El hook se encarga del envío, los estados y el reto. Conserva los atributos `name`, el consentimiento, los errores asociados, la región de estado, el foco y los datos después de un fallo. Los canales aparecen solo cuando el propietario los configura.
- Para motion en una isla cliente, importa `useReducedMotion` o `motion` desde `motion/react`. Respeta la preferencia de movimiento reducido y la lectura inicial del titular sin JS. Importa cada icono por nombre desde `lucide-react`. Un botón de solo icono necesita nombre accesible. [Motion para React](https://motion.dev/docs/react-installation)
- Tailwind escanea `src/`. La base conserva estilos nativos, foco y reducción de movimiento. Los tokens definitivos, fuentes y composición se integran con la propuesta de Gemini. Los estilos y capturas históricos están fuera del recorrido activo.
- Mantén un H1 por página, HTML semántico en el servidor, alternativas textuales y enlaces reales. Las rutas controlan canonical, noindex y datos estructurados. Los filtros, listados vacíos, borradores y slugs inexistentes tienen pruebas o reglas específicas en la arquitectura.
- Revisa a 320 px, con zoom al 200 %, teclado y movimiento reducido. Tras aprobar la propuesta, mide la compilación optimizada según `leer/TECHNICAL_REQUIREMENTS.md`. La evidencia previa de Lighthouse pertenece al diseño archivado.

## Verificación antes de devolver a Codex

Ejecuta `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` y `pnpm test:e2e`. Para una máquina nueva instala previamente los navegadores con `pnpm exec playwright install chromium firefox webkit`. Anota rutas y tamaños probados, errores reproducibles y cambios de contrato en `docs/TASKS.md`.
