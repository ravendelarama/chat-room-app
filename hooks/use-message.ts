"use client";

import getMessages from "@/actions/messages";
import { pusherClient } from "@/lib/pusher";
import { Attachment, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Message = {
    id: string;
    content: string;
    userId: string;
    roomId: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
        id: string;
        name: string;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    attachments: Attachment[]
};

function useMessage(initialData: Message[], roomId: string) {
    const { data } = useQuery({
        queryKey: ["chat", roomId],
        queryFn: async () => {
            const m = await getMessages(roomId);
            return m;
        },
        initialData
    })

    const [messages, setMessages] = useState<Message[]>(data);

    useEffect(() => {
        pusherClient.subscribe(roomId);
        // @ts-ignore
        pusherClient.bind("message:create", (message) => {
            setMessages((prev) => [...prev!, message]);
        });

        // @ts-ignore
        pusherClient.bind("message:remove", (message) => {
            
            setMessages((prev) => {
                const newMessages = prev.map((item) => {
                    if (item.id === message.id) {
                        // @ts-ignore
                        item.deletedAt = message.deletedAt
                    }
                    return item
                });
                return newMessages
            })
        })

        
        return () => {
            pusherClient.unsubscribe(roomId);
            pusherClient.unbind("message:create")
        }
    }, []);
    
    return {
        data: messages
    }
}

export default useMessage;