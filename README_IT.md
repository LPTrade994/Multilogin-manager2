# Gestore Multilogin

Questa applicazione sostituisce il foglio Excel per la gestione delle
Gift Card e degli ordini Amazon. È basata su Streamlit e Supabase
(PostgreSQL) e consente l'utilizzo contemporaneo di più utenti.

## Guida rapida

Con `venv` e `pip`:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Configurazione Supabase

Installa la [CLI di Supabase](https://supabase.com/docs/guides/cli). Crea un
nuovo progetto nella regione **EU-Central**. Copia `.env.example` in `.env` e
imposta:

- `SUPABASE_URL`
- `SUPABASE_KEY`
- `SUPABASE_DB_URL`

Esegui le migration con:

```bash
make migrate
```

Per inserire dati di esempio puoi eseguire:

```bash
make seed
```

Avvia l'applicazione localmente con:

```bash
make run
```

Documentazione utile: [Streamlit](https://docs.streamlit.io) e
[Supabase](https://supabase.com/docs).
