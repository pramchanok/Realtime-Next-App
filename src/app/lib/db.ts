import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  keepAliveInitialDelay: 10000, // 0 by default. 10 วินาที
  enableKeepAlive: true, // false by default.
});

const dbSingleton = () => {
  return drizzle({ client: connection });
};
declare const globalThis: {
  dbGlobal: ReturnType<typeof dbSingleton>;
} & typeof global;
const db = globalThis.dbGlobal ?? dbSingleton();
export default db;
if (process.env.MODE_ENV !== "prod") globalThis.dbGlobal = db;
