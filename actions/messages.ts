"use server"

import db from "@/lib/db"

export default async function getMessages(roomId: string) {
    return await db.message.findMany({
        where: {
            roomId
        },
        include: {
            user: true
        }
    });
}