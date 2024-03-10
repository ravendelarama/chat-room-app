"use server"

import db from "@/lib/db"

export default async function getPublicRooms() {
    return await db.room.findMany({
        where: {
            private: false
        },
        // take: 20,
        // skip: 20 * pageParam
    });
}