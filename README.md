# eshop simulation

## ⚙️ Stack

[React](https://react.dev/) & [TailwindCSS](https://tailwindcss.com/) & [Ky](https://github.com/sindresorhus/ky)🦄 for frontend

[Node.js](https://nodejs.org/en) & [Express](https://expressjs.com/) & [Swagger](https://swagger.io/) for backend

[PostgreSQL](https://www.postgresql.org/) & [Adminer](https://www.adminer.org/) for database

## 🚀 Start all services (Docker)

```bash
docker compose up -d --build
```

> [!NOTE]
> to regenerate database, run with `-V`

### Ports (host is `localhost`)

- `8000` - backend (`/docs` for docs)
- `5173` - frontend
- `5432` - PostgreSQL database
- `8080` - Adminer view

> [!IMPORTANT]
> db credentials: user `postgres`, pass `example`
