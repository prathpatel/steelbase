// Shared by the Knex CLI (`npm run db:*`) and the app's connection in db/index.ts.
/** @type {import("knex").Knex.Config} */
const config = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  pool: { min: 0, max: 10 },
  migrations: {
    directory: "./db/migrations",
    stub: "./db/migration.stub",
  },
};

export default config;
