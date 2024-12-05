import { user } from "@/db/schema";
import db from "../lib/db";
import { Typography } from "@mui/material";
import { desc } from "drizzle-orm";
export default async function UserPage() {
    const users = await db.select().from(user).orderBy(desc(user.id));
    const countUser = await db.$count(user);
    return (
        <main>
            <Typography variant="h3">จำนวนผู้ใช้ {countUser} คน</Typography>
            {
                users.map((user) => (
                    <div key={user.id}>
                        <p>{user.fullname} {user.email}</p>
                    </div>
                ))
            }
        </main>
    );
}