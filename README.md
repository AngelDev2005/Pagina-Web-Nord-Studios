# Nord Studios

Base técnica local del sitio de Nord Studios para Trujillo y Perú. La siguiente fase corresponde a Gemini. Empieza por [el traspaso visual](docs/HANDOFF.md), [la arquitectura](docs/ARCHITECTURE.md) y [las tareas pendientes](docs/TASKS.md).

## Desarrollo local

Usa Node 24 LTS y pnpm 11.25.0. Desde la raíz:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Abre `http://localhost:3000`. La configuración por defecto permite recorrer el sitio sin credenciales. `.env.example` enumera las variables que se pueden suministrar desde `.env.local`. Para ejecutar la compilación optimizada usa `pnpm build` y `pnpm start`.

## Contenido y verificación

El catálogo de servicios está en `src/config/es.ts`. Incorpora trabajos siguiendo [la guía del portafolio MDX](docs/PORTFOLIO_GUIDE.md). El historial visual anterior se conserva en `docs/implementacion-anterior.zip`. Los cuatro documentos de origen están en `leer/` y se enlazan desde `docs/`.

```sh
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium firefox webkit
pnpm test:e2e
```

Playwright inicia la aplicación de producción en el puerto 3078. El comando opcional `pnpm lighthouse` utiliza el 3079. Consulta [los resultados de esta fase](docs/PHASE_1_QA.md) y [los procedimientos técnicos](docs/ENGINEERING.md).
