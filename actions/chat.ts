"use server"

import { auth } from "@/auth";
import db from "@/lib/db";
import { pusher } from "@/lib/pusher";
import { Media } from "@prisma/client";
import z from "zod";

const schema = z.array(z.object({
    type: z.string(),
    source: z.string()
})).nullable()

export default async function addMessage(roomId: string, content: string, attachments: {type: string, source:string}[]) {
    const session = await auth();
    console.log(`User ID: ${session?.user?.id}`);
    console.log(`Room ID: ${roomId}`)

    console.log(attachments[0].type);

    const validate = schema.safeParse(attachments);

    const message = await db.message.create({
        data: {
            userId: session?.user.id!,
            content,
            roomId
        },
        include: {
            user: true,
            attachments: true
        },
    });


    if (validate.success && validate?.data?.length! > 0) {
        
        const attach = validate?.data?.map((item) => {
            return {
                type: item.type as Media,
                source: item.source,
                messageId: message.id
            }
        });

        const withAttachment = await db.message.findFirst({
            where: {
                id: message.id
            },
            include: {
                user: true,
                attachments: true
            }
        })

        await pusher.trigger(roomId, "message:create", withAttachment);
    }
    
    


    await pusher.trigger(roomId, "message:create", message);


    return {
        success: "Added a message"
    }
}