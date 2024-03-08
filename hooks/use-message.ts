"use client";

import getMessages from "@/actions/messages";
import { pusherClient } from "@/lib/pusher";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Message = {
    id: string;
    content: string;
    userId: string;
    roomId: string;
    user: {
        id: string;
        name: string;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
        online: boolean;
    }
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
        
        return () => {
            pusherClient.unsubscribe(roomId);
        }
    }, []);
    
    return {
        data: messages
    }
}

export default useMessage;