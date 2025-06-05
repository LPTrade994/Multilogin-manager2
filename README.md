# Multilogin Manager 2

This project implements the backend for the Amazon Multilogin Management app using Express and Prisma.

## Structure

- `backend/` – Express API server with account and transaction routes.
- `frontend/` – Placeholder static page (to be replaced with a React app).
- `prisma/` – Prisma schema and migrations.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

### Opzione A – Completa (Postgres)
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Ensure Docker or a Postgres server is running, then start the stack:
   ```bash
   docker compose up -d
   ```
3. Run the migrations:
   ```bash
   npm run migrate
   ```
4. Launch the server in development mode:
   ```bash
   npm run dev
   ```

### Opzione B – Dev-lite (SQLite embedded)
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Uncomment the SQLite lines in `.env` or rely on the script to set them.
3. Start in lite mode (creates `dev.db` and runs migrations automatically):
   ```bash
   npm run dev:lite
   ```

The API will be available on `http://localhost:3000`.

### Environment variables

```
DB_PROVIDER=postgresql
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/multilogin?schema=public
# DB_PROVIDER=sqlite
# DATABASE_URL=file:./dev.db
PORT=3000
```
