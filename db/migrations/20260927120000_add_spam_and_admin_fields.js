// ip_hash: keyed hash of the submitter's IP, used only to rate-limit the quote form.
// admin_notes / updated_at: follow-up tracking from /admin.

/** @param {import("knex").Knex} knex */
export async function up(knex) {
  await knex.schema.alterTable("quote_requests", (t) => {
    t.string("ip_hash", 64);
    t.text("admin_notes");
    t.timestamp("updated_at", { useTz: true }).notNullable().defaultTo(knex.fn.now());

    t.index(["ip_hash", "created_at"]);
    t.index(["phone", "created_at"]);
  });
}

/** @param {import("knex").Knex} knex */
export async function down(knex) {
  await knex.schema.alterTable("quote_requests", (t) => {
    t.dropIndex(["phone", "created_at"]);
    t.dropIndex(["ip_hash", "created_at"]);
    t.dropColumns("ip_hash", "admin_notes", "updated_at");
  });
}
