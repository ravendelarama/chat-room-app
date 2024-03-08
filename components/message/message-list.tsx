"use client";

import getMessages from "@/actions/messages";
import useMessage from "@/hooks/use-message";
import { pusherClient } from "@/lib/pusher";
import { useQuery } from "@tanstack/react-query";
import { Romanesco } from "next/font/google";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface Prop {
  messages:
    | {
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
        };
      }[]
    | undefined;
  roomId: string;
}

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
  };
};

function MessageList({ messages, roomId }: Prop) {
  const { data } = useMessage(messages!, roomId);

  return (
    <ScrollArea className="w-96 flex flex-col justify-end items-start">
      {data?.map((item, idx) => {
        if (idx == data.length - 1 && data.length > 1) {
          return null;
        }
        return (
          <div className="px-10 py-2" key={item.id}>
            {item.user.name}: {item.content}
          </div>
        );
      })}
    </ScrollArea>
  );
}

export default MessageList;
