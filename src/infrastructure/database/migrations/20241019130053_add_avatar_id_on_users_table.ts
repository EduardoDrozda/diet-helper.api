import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('users', (table) => {
    table.uuid('avatar_id').references('id').inTable('files').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('users', (table) => {
    table.dropForeign('avatar_id');
    table.dropColumn('avatar_id');
  });
}
