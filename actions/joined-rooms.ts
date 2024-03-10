"use server";

import { auth } from "@/auth";
import db from "@/lib/db";

async function getJoinedRooms() {
    const session = await auth();

    return await db.room.findMany({
        where: {
            memberIDs: {
                has: session?.user?.id!
            }
        }
    })
}

export default getJoinedRooms;