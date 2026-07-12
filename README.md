# Backend - Pedidos

Pequeña API de pedidos (Express + Sequelize).

## Requisitos

- Node.js >= 18
- npm
- Docker Desktop (opcional para la base de datos local)

## Variables de entorno

Cree un archivo `.env` (puede copiar `.env.example`) con al menos:

- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `JWT_SECRET`
- `API_KEY`  # clave para proteger rutas privadas
- `NODE_ENV` (opcional)
- `PORT` (opcional)

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
# con nodemon
npm run dev
# o directamente
node index.js
```

## Ejecutar con Docker Compose

```bash
docker-compose up -d
```

Luego configure `.env` para que coincida con Docker Compose:

```env
DB_HOST=localhost
DB_PORT=15432
DB_USER=obed
DB_PASSWORD=obed2025@
DB_NAME=pedidos
JWT_SECRET=<tu_secret>
API_KEY=<tu_api_key>
```

Ejecute migraciones:

```bash
npx sequelize-cli db:migrate
```

Cree un usuario de prueba:

```bash
node scripts/create_test_user.js
```

Verifique el login:

```bash
node scripts/test_login.js
```

## Endpoints útiles de comprobación

- Salud básica:

```bash
curl http://localhost:4001/test
```

- Ruta protegida por API key (`API_KEY` en header `api`):

```bash
curl -H "api: your-api-key" http://localhost:4001/nueva-ruta
```

- Login (`/auth/login`) — devuelve JWT:

```bash
curl -X POST http://localhost:4001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"secret123"}'
```

Respuesta de ejemplo:

```json
{
  "user": { /* datos del usuario sin password */ },
  "token": "<jwt-token>"
}
```

Para usar rutas protegidas por JWT incluya el header `Authorization: Bearer <token>`.

- Ejemplo con ruta JWT protegida (`POST /api/v1/categories`):

```bash
curl -X POST http://localhost:4001/api/v1/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt-token>" \
  -d '{"name":"Test Category","description":"Categoria de prueba"}'
```

## Notas de seguridad y siguientes pasos

- Las vulnerabilidades detectadas por `npm audit` se dejaron para una fase separada (posible actualización de dependencias con pruebas).
- Se añadió `API_KEY` y validación `joi` en `auth`.
- Recomendado: ejecutar migraciones, crear usuarios de prueba y añadir tests automatizados.
- Para ejecutar pruebas:

```bash
npm test
```

