import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('meats', (table) => {
    table
      .uuid('id', { primaryKey: true, useBinaryUuid: true })
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('name').notNullable();
    table.string('description').notNullable();
    table.timestamp('eaten_at').notNullable();
    table.enum('type', ['INCOME', 'OUTCOME']).notNullable();
    table.uuid('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('users');

    table.timestamps(true, true, false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('meats');
}
