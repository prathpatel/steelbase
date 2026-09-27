# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
# Baked into the sitemap and link previews at build time.
ARG SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_OUTPUT=standalone \
    SITE_URL=$SITE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# The standalone output only traces the parts of knex the app imports, so install
# knex + pg in full (versions from package.json) for the migration CLI.
FROM node:22-alpine AS migrator
WORKDIR /app
COPY package.json /tmp/pkg.json
RUN npm install --no-save --no-package-lock --omit=dev --no-audit --no-fund \
    $(node -p "const d=require('/tmp/pkg.json').dependencies;['knex','pg'].map(n=>n+'@'+d[n]).join(' ')")

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
COPY --from=migrator --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node knexfile.js ./
COPY --chown=node:node db/migrations ./db/migrations
USER node
EXPOSE 3000
# Apply pending migrations (needs DATABASE_URL), then start the server.
CMD ["sh", "-c", "node node_modules/knex/bin/cli.js migrate:latest && exec node server.js"]
