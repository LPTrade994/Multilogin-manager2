# Multilogin Manager 2

This project implements the backend for the Amazon Multilogin Management app using Express and Prisma.

## Structure

- `backend/` – Express API server with account and transaction routes.
- `frontend/` – React app (Vite) with dashboard and reports.
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
2. Ensure Docker or a Postgres server is running, then run:
   ```bash
   npm run dev
   ```
   This will deploy migrations automatically.

### Opzione B – Dev-lite (SQLite embedded)
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Start in lite mode (creates `dev.db` and runs migrations automatically):
   ```bash
   npm run dev:lite
   ```

The API will be available on `http://localhost:3000`.

### Frontend
1. Enter the `frontend` folder and install its dependencies:
   ```bash
   cd frontend && npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   This will serve the React UI on `http://localhost:5173`.

### Environment variables

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/multilogin?schema=public
# DATABASE_URL=file:./dev.db
PORT=3000
```
