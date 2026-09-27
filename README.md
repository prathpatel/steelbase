# SteelBase

Gym equipment, direct from the manufacturer. The site sells in three tiers:

| Tier | Price band | What it is | Route |
| --- | --- | --- | --- |
| 01 · Core | ₹25k – ₹50k | Home & starter equipment | `/equipment?tier=core` |
| 02 · Pro | ₹1L – ₹2L | Commercial-grade machines | `/equipment?tier=pro` |
| 03 · Build | Custom quote | Complete gym setups (home, corporate, commercial, society, hotel, studio) | `/setups` |

Where to edit:

- `lib/catalog.ts` — tiers, products (prices, specs), setup types and typical budgets. All prices are indicative placeholders.
- `lib/site.ts` — brand name, city, contact emails and WhatsApp number. Empty contact fields are hidden everywhere, so fill them in only once they're real. The WhatsApp number is where customers (and forwarded leads) are sent.
- `content/journal/*.md` — journal articles (front matter + Markdown).
- `components/drawings.tsx` — blueprint line drawings used as product art.
- `app/globals.css` — the whole design system (tokens at the top).

The quote form (`/quote`) saves each request to Postgres with a reference (`SB-00001`, …). When an email or WhatsApp number is configured, the confirmation also offers the enquiry for sending there; without either, the customer is told you'll call them back. Requests are reviewed, forwarded to the manufacturer (with the reference, so referrals can be traced) and tracked at `/admin`.

The form is protected against spam by a hidden honeypot field, a minimum fill time, and database-backed rate limits (3 per 10 minutes and 10 per day per connection, 3 per day per phone number). Connections are identified by a keyed hash of the IP address; the address itself isn't stored.

It's a standard [Next.js](https://nextjs.org) App Router project with Postgres accessed through [Knex](https://knexjs.org).

## Develop

Requires Node.js `>=22.13.0`.

```sh
npm install
cp .env.example .env.local   # set DATABASE_URL, ADMIN_PASSWORD, SITE_URL
npm run db:migrate
npm run dev                  # http://localhost:3000
npm run lint
```

## Database

Postgres, with schema changes as JavaScript migrations in `db/migrations/` (config in `knexfile.js`). The `db:*` scripts read `DATABASE_URL` from `.env.local`.

| Command | What it does |
| --- | --- |
| `npm run db:make -- add_x` | Create `db/migrations/<timestamp>_add_x.js` with empty `up`/`down` |
| `npm run db:migrate` | Apply all pending migrations |
| `npm run db:rollback` | Undo the last batch of migrations |
| `npm run db:status` | List applied and pending migrations |

Tables:

- `quote_requests`: one row per submitted quote, with `status` (`new` → `contacted` → `quoted` → `won`/`lost`) for follow-up.
- `quote_request_items`: products on a Core/Pro request, with code, name and price copied at submission time.

Never edit a migration that has already run in production; add a new one instead. App code gets the connection from `getDb()` in `db/index.ts`.

## Admin

`/admin` lists enquiries with status filters and search (name, phone, city or `SB-` reference). Each enquiry page shows the full request, lets you set its status and internal notes, and has a ready-made message to forward to the manufacturer. It's protected by a single password, `ADMIN_PASSWORD` (at least 12 characters); admin is switched off when it isn't set. Sessions last 7 days, changing the password signs everyone out, and 5 wrong attempts lock a connection out for 15 minutes.

## Environment

| Variable | Needed for |
| --- | --- |
| `DATABASE_URL` | Saving quote requests and the admin (runtime) |
| `ADMIN_PASSWORD` | Signing in to `/admin`; also keys the IP hash (runtime) |
| `SITE_URL` | Sitemap, `robots.txt` and link previews, e.g. `https://steelbase.in`. Read at **build** time; on Vercel it defaults to the production domain |

## Build and host

Every host needs the environment variables above and a Postgres database (Neon, Supabase, Render, Railway or your own server), with migrations applied before the new code serves traffic. Behind your own reverse proxy, forward the client IP (nginx: `proxy_set_header X-Forwarded-For $remote_addr;`) so rate limiting sees real visitors.

Most pages are prerendered; `/equipment` and `/quote` render per request because they read query parameters, so the site needs a Node server (not a pure static host).

**Any Node host / VPS**

```sh
npm ci
npm run db:migrate            # reads .env.local, or export DATABASE_URL
npm run build
npm start                     # PORT=3000 by default; set PORT to change it
```

Put it behind a reverse proxy (nginx, Caddy) for HTTPS, and keep it running with systemd or pm2.

**Docker**

```sh
docker build --build-arg SITE_URL=https://steelbase.in -t steelbase .
docker run -p 3000:3000 -e DATABASE_URL=postgres://… -e ADMIN_PASSWORD=… steelbase
```

On start the container applies pending migrations, then runs `.next/standalone/server.js` as a non-root user on port 3000.

**Vercel / Netlify / Render / Railway**

Import the repo and set `DATABASE_URL` and `ADMIN_PASSWORD` (plus `SITE_URL` once you have a custom domain) in the project's environment variables; the default build (`npm run build`) works as is. Run `npm run db:migrate` against the production database (locally with `DATABASE_URL` pointed at it, or as a release/pre-deploy command) whenever a deploy includes new migrations.
