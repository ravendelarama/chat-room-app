"use server"

import { auth } from "@/auth";
import db from "@/lib/db";
import { pusher } from "@/lib/pusher";
import z from "zod";

const schema = z.array(z.object({
    type: z.string(),
    source: z.string()
}))

export default async function addAttachment(roomId: string, attachments: {type: string, source:string}[]) {
    const session = await auth();
    
    const validate = schema.safeParse(attachments)

    const message = await db.message.create({
        data: {
            userId: session?.user?.id!,
            roomId,
            content: "",
        }
    });

    console.log(attachments);

    if (validate.success && attachments.length > 0) {
        const attached = await db.attachment.createMany({
            data: validate.data.map((item) => {
                return {
                    messageId: message.id,
                    type: item.type,
                    source: item.source
                }
            })
        })
    }
        const data = await db.message.findFirst({
            where: {
                id: message.id
            },
            include: {
                attachments: true,
                user: true
            }
        })

        await pusher.trigger(roomId, "message:create", data)

    return {
        success: "Added a message"
    }
}