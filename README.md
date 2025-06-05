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
2. Configure the database connection in `.env`:
   ```
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/multilogin"
   ```
3. Run Prisma migrations and generate the client:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The server runs on port `3001` by default.
