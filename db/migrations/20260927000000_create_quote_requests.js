// Quote requests submitted through /quote. Line items snapshot the product as it
// was priced at the time, so later catalogue edits don't rewrite old enquiries.

/** @param {import("knex").Knex} knex */
export async function up(knex) {
  await knex.schema.createTable("quote_requests", (t) => {
    t.increments("id");
    t.timestamp("created_at", { useTz: true }).notNullable().defaultTo(knex.fn.now());
    t.enu("status", ["new", "contacted", "quoted", "won", "lost"]).notNullable().defaultTo("new");
    t.enu("tier", ["core", "pro", "build"]).notNullable();
    // Build tier only.
    t.string("setup_slug", 60);
    t.string("area", 40);
    t.string("budget", 40);
    t.string("city", 80).notNullable();
    t.string("pincode", 6);
    t.string("timeline", 40).notNullable();
    t.string("name", 100).notNullable();
    t.string("phone", 20).notNullable();
    t.string("email", 200);
    t.text("notes");

    t.index(["status", "created_at"]);
  });

  await knex.schema.createTable("quote_request_items", (t) => {
    t.increments("id");
    t.integer("quote_request_id").notNullable().references("id").inTable("quote_requests").onDelete("CASCADE").index();
    t.string("product_slug", 80).notNullable();
    t.string("product_code", 20).notNullable();
    t.string("product_name", 120).notNullable();
    // Whole rupees.
    t.integer("unit_price").notNullable();
  });
}

/** @param {import("knex").Knex} knex */
export async function down(knex) {
  await knex.schema.dropTable("quote_request_items");
  await knex.schema.dropTable("quote_requests");
}
