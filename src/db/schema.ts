import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, varchar } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const user = mysqlTable("user", {
	id: int().autoincrement().notNull(),
	fullname: varchar({ length: 255 }).notNull(),
},
(table) => {
	return {
		userId: primaryKey({ columns: [table.id], name: "user_id"}),
	}
});
