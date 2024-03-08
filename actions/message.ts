"use server"

import { auth } from "@/auth";
import db from "@/lib/db";
import { pusher } from "@/lib/pusher";


export default async function addMessage(roomId: string, content: string) {
    const session = await auth();
    console.log(`User ID: ${session?.user?.id}`);
    console.log(`Room ID: ${roomId}`)
    const message = await db.message.create({
        data: {
            userId: session?.user.id!,
            content,
            roomId
        },
        include: {
            user: true
        }
    });


    await pusher.trigger(roomId, "message:create", message);

    return {
        success: "Added a message"
    }
}