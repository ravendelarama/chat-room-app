"use server"

import db from "@/lib/db"
import { utapi } from "@/server/uploadthing";
import { deleteMessage } from "./chat";

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

export async function deleteRoom(roomId: string) {

    const room = await db.room.update({
        where: {
            id: roomId
        },
        data: {
            members: {
                set: []
            },
        },
        include: {
            messages: {
                include: {
                    attachments: true
                }
            }
        }
    });

    
    const deletedMessages = room.messages.map((item) => {
        return item.attachments;
    })

    if (deleteMessage.length > 0) {
    
        const deletedAttachments = deletedMessages.map((item) => {
            const source = item.map((item) => {
                return item.source
            });
    
            return source
        });
    
        const source = deletedAttachments.flat(2);
    
        await utapi.deleteFiles(source)
    }
    
    const data = await db.room.delete({
        where: {
            id: roomId
        }
    });

    await utapi.deleteFiles([data?.image!]);

    return {
        message: `Channel deleted successfully!`
    }
}