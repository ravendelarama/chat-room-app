"use client";

import getMessages from "@/actions/messages";
import useMessage from "@/hooks/use-message";
import { pusherClient } from "@/lib/pusher";
import { useQuery } from "@tanstack/react-query";
import { Romanesco } from "next/font/google";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Prop {
  messages:
    | {
        id: string;
        content: string;
        roomId: string;
        userId: string;
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
  };
};

function MessageList({ messages, roomId }: Prop) {
  const { data } = useMessage(messages!, roomId);

  return (
    <ScrollArea className="w-96 flex flex-col justify-end items-start">
      {data?.map((item, idx) => {
        return (
          <div
            className="flex justify-start items-center gap-4 px-10 py-2"
            key={item.id}
          >
            <Avatar>
              <AvatarImage src={item.user.image!} />
              <AvatarFallback>GC</AvatarFallback>
            </Avatar>

            <div className="">
              <p className="font-semibold text-sm text-slate-800">
                <span className="font-bold">{item.user.name}</span>:{" "}
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </ScrollArea>
  );
}

export default MessageList;
