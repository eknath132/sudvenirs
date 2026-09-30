# SUDvenirs · Catálogo

Aplicación Next.js para productos de impresión 3D. El panel `/admin` permite cargar foto, tiempo, peso, pérdida, precio minorista y publicar. Los catálogos `/mayorista` y `/minorista` muestran solamente el precio correspondiente. Arranca sin productos.

## Precio

Costo = horas × ARS 200 + gramos × costo por kilo / 1000 × (1 + pérdida / 100). Mayorista = costo × 3, redondeado al múltiplo de ARS 500 más cercano. Minorista sugerido = mayorista × 1,30, redondeado a ARS 500; se guarda solamente cuando el administrador lo elige. Al cambiar el filamento se actualizan costos y mayoristas, conservando precios minoristas editados.

## Configuración

1. Crear proyecto Next.js en Vercel con este repositorio.
2. Agregar Postgres mediante Neon desde Vercel Marketplace; conectar `DATABASE_URL`.
3. Crear un store público de Vercel Blob y conectar `BLOB_READ_WRITE_TOKEN`.
4. Cargar `ADMIN_EMAIL`, una contraseña fuerte en `ADMIN_PASSWORD` y un secreto aleatorio de al menos 32 caracteres en `SESSION_SECRET` como variables de entorno privadas.
5. Instalar dependencias con `npm ci`, ejecutar `npm run build` y desplegar. Las tablas se crean al primer acceso con DB configurada.

Las fotos cargadas se guardan en Blob; la URL se guarda en Postgres. El logo proviene del catálogo aportado por el usuario. El proyecto no incorpora los productos ni las fotos del catálogo previo.

## Despliegue desde GitHub

Con el repositorio conectado al proyecto `sudvenirs` en Vercel, los nuevos commits en `main` inician el despliegue de producción automáticamente. Verificar el estado en Deployments y configurar las variables de entorno antes de usar el administrador.
