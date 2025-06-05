# Multilogin Manager 2

This project implements the backend for the Amazon Multilogin Management app using Express and Prisma.

## Structure

- `backend/` – Express API server with account and transaction routes.
- `frontend/` – Placeholder static page (to be replaced with a React app).
- `prisma/` – Prisma schema and migrations.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example environment file and start the services:
   ```bash
   cp .env.example .env
   docker compose up -d
   ```
3. Create the database schema and generate the Prisma client:
   ```bash
   npm run migrate
   ```
  Optional seed data:
   ```bash
   npm run seed
   ```
4. The API will be available on `http://localhost:3000`.

### Environment variables

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/multilogin?schema=public
PORT=3000
```
