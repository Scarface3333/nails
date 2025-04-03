// /migrations/202304020000_create_tables.js
import db from '../config/knex.js';

const createTables = async () => {
  try {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.text('password').notNullable();
      table.string('phone');
      table.timestamp('created_at').defaultTo(db.fn.now());
    });

    await db.schema.createTable('masters', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('specialty');
      table.integer('experience');
      table.string('phone');
      table.timestamp('created_at').defaultTo(db.fn.now());
    });

    await db.schema.createTable('orders', (table) => {
      table.increments('id').primary();
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('master_id').references('masters.id').onDelete('SET NULL');
      table.string('status').defaultTo('pending');
      table.text('description');
      table.timestamp('created_at').defaultTo(db.fn.now());
    });

    await db.schema.createTable('admins', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.text('password').notNullable();
      table.string('role').defaultTo('admin');
      table.timestamp('created_at').defaultTo(db.fn.now());
    });

    console.log('Tables created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    db.destroy(); // Закрываем соединение после миграции
  }
};

createTables();
