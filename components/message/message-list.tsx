"use client";

import getMessages from "@/actions/messages";
import useMessage from "@/hooks/use-message";
import { pusherClient } from "@/lib/pusher";
import { useQuery } from "@tanstack/react-query";
import { Romanesco } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });

  return (
    <ScrollArea className="h-full w-100 flex flex-col justify-end items-center">
      {data?.map((item, idx) => {
        return (
          <div
            className="flex justify-start items-center gap-4 px-10 py-2"
            key={item.id}
          >
            <Button
              variant={null}
              className="w-0"
              onClick={() => {
                router.push(`/${item.userId}`);
              }}
            >
              <Avatar>
                <AvatarImage src={item.user.image!} />
                <AvatarFallback>GC</AvatarFallback>
              </Avatar>
            </Button>

            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center w-full">
                <p className="font-bold text-sm text-slate-800 ">
                  {item.user.name}
                </p>
                <p className="font-bold text-xs text-gray-500">
                  {item.updatedAt.getHours()}:{item.updatedAt.getMinutes()}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-500">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={scrollRef}></div>
    </ScrollArea>
  );
}

export default MessageList;
