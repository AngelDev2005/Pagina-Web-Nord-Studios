# Seguridad operativa
- Validación Zod en ruta POST, JSON limitado a 16 KiB incluso sin Content-Length, origen exacto y errores sin secretos.
- Los campos se envían a Resend como texto plano. La consulta no se persiste en el navegador.
- Verificar Turnstile en servidor, hostname y acción quote. El control de frecuencia Redis es atómico y persistente. Si el limitador o el proveedor no responden, se comunica el fallo.
- CSP restringe frames, scripts, conexiones y recursos. Se permite script y estilo inline por la hidratación y render estático de Next. Evaluar CSP con hashes o nonce en un cambio específico si se introducen más orígenes o contenido no confiable. unsafe-eval solo en desarrollo.
- Cabeceras anti-framing, nosniff, política de referer, Permissions Policy y HSTS en producción. Verificar nuevamente en el CDN y el dominio final.
- Conservar secretos en el proveedor, fuera de Git. Separar claves de prueba y producción. Mantener permisos restringidos para modificar MDX. No colocar material privado en public.
- Ejecutar pnpm audit --prod y revisar dependencias de desarrollo antes de actualizar. La auditoría automatizada es puntual.

