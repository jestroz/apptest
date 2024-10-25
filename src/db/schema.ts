import {
	pgTable,
	serial,
	varchar,
	timestamp,
} from 'drizzle-orm/pg-core';

// Example posts table
export const posts = pgTable('posts', {
	id: serial('id').primaryKey().notNull(),
	content: varchar('content', { length: 256 }).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});