"use server"

import db from "@/lib/db"

export default async function getRooms() {
    return await db.room.findMany();
}