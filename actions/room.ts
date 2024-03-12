"use server"

import db from "@/lib/db"

export default async function getRoom(roomId: string) {
    return await db.room.findFirst({
        where: {
            id: roomId,
        },
        include: {
            messages: {
                include: {
                    attachments: true,
                    user: true,
                },
            },
        },
    });
}