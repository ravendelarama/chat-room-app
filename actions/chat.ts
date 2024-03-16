"use server"

import { auth } from "@/auth";
import { utapi } from "@/server/uploadthing";
import db from "@/lib/db";
import { pusher } from "@/lib/pusher";
import z from "zod";

const schema = z.array(z.object({
    type: z.string(),
    source: z.string()
})).nullable()

export default async function addMessage(roomId: string, content: string) {
    const session = await auth();

    const message = await db.message.create({
        data: {
            userId: session?.user?.id!,
            roomId,
            content,
        },
        include: {
            attachments: true,
            user: true,
            likes: true,
            poll: true
        }
    });

    await pusher.trigger(roomId, "message:create", message)

    return {
        success: "Added a message"
    }
}

export async function deleteMessage(roomId: string, messageId: string) {
    const deleted = await db.message.update({
        where: {
            id: messageId
        },
        data: {
            deletedAt: new Date(),
        },
        include: {
            attachments: true,
            user: true,
            likes: true,
            poll: true
        }
    });

    const attachments = deleted.attachments.map((item) => {
        return item.source
    });

    await utapi.deleteFiles(attachments);

    await pusher.trigger(roomId, "message:remove", deleted);

    return {
        message: "Message deleted!"
    }
}

export async function toggleLike(roomId: string, messageId: string) {
    const session = await auth();

    const isLiked = await db.message.findFirst({
        where: {
            id: messageId,
            likes: {
                some: {
                    userId: session?.user?.id
                }
            }
        },
        include: {
            likes: {
                select: {
                    userId: true
                }
            }
        }
    });

    if (!isLiked) {
        const message = await db.message.update({
            where: {
                id: messageId
            },
            data: {
                likes: {
                    create: {
                        userId: session?.user?.id!,
                    }
                }
            },
            include: {
                user: true,
                attachments: true,
                likes: true,
                poll: true
            }
        });
    
        console.log(`Likes: ${message.likes.length}`)
    
        await pusher.trigger(roomId, "message:like", message)
    
        return {
            message: "Message liked!",
            count: message.likes.length
        }
    }

    const message = await db.message.update({
        where: {
            id: messageId
        },
        data: {
            likes: {
                deleteMany: {
                    userId: session?.user?.id!
                }
            }
        },
        include: {
            user: true,
            attachments: true,
            likes: true,
            poll: true
        }
    });



    await pusher.trigger(roomId, "message:like", message);

    return {
        message: "Unliked",
        count: message.likes.length
    }
}