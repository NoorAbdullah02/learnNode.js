
const { pgTable, integer, varchar } = require('drizzle-orm/pg-core')

const userSchema = pgTable('users', {
    id: integer().primaryKey(),
    name: varchar(30).notNull(),
    email: varchar(255).notNull().unique(),
});

module.exports = {
    userSchema
}