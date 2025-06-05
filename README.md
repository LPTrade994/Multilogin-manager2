# Multilogin Manager

This project provides a small Streamlit application backed by Supabase
(PostgreSQL) to manage gift cards and orders for multiple Amazon
accounts. It replaces the old Excel workflow and allows multiple users
to work simultaneously.

## Quick start

Using `venv` and `pip`:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Supabase setup

Install the [Supabase CLI](https://supabase.com/docs/guides/cli). Create a new
project in the **EU-Central** region. Generate the `.env` file from
`.env.example` and fill in:

- `SUPABASE_URL`
- `SUPABASE_KEY`
- `SUPABASE_DB_URL`

Create the tables using Alembic migrations:

```bash
make migrate
```

Optionally seed initial data with:

```bash
make seed
```

Run the app locally:

```bash
make run
```

Useful links: [Streamlit docs](https://docs.streamlit.io) and
[Supabase docs](https://supabase.com/docs).
