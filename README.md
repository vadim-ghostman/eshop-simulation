# eshop simulation

## Start all services

```bash
docker compose up -d --build
```

to reload db, run with `-V`

### Ports (host is `localhost`)

- `8000` - backend (`/docs` for docs)
- `5173` - frontend
- `5432` - PostgreSQL database
- `8080` - adminer view

### Database credentials

user `postgres`, pass `example`
