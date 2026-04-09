export async function up(knex) {
  await knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("content").notNullable();
    table.integer("category_id").unsigned().references("id").inTable("categories").onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("published_at").nullable();
    table.timestamp("deleted_at").nullable();
  });
}

export async function down(knex) {
    await knex.schema.dropTableIfExists("posts")
}
