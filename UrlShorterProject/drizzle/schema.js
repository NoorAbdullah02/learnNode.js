
import { pgTable, timestamp, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

const userSchema = pgTable('users', {
    id: uuid().primaryKey().default(sql`gen_random_uuid()`),
    firstName: varchar('first_name', { length: 30 }).notNull(),
    lastName: varchar('last_name', { length: 15 }),
    email: varchar({ length: 30 }).notNull().unique(),
    password: text().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});



const userUrl = pgTable('user_urls', {
    id: uuid().primaryKey().default(sql`gen_random_uuid()`),
    url: text().notNull(),
    shorturl: text().unique(),
    code: text(),
    userId: uuid('user_id').notNull().references(() => userSchema.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export { userSchema, userUrl }

