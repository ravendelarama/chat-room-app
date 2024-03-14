"use client";

import useMessage from "@/hooks/use-message";
import { useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Attachment } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import ImageAttachment from "./image-attachment";
import MessageContent from "./message-content";
import ChatUserAvatar from "./chat-user-avatar";

type Message = {
  id: string;
  content: string;
  userId: string;
  roomId: string;
  deletedAt: Date;
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
  attachments: Attachment[];
};

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
        attachments: Attachment[];
      }[]
    | undefined;
  roomId: string;
}

// Refactored

function MessageList({ messages, roomId }: Prop) {
  const { data } = useMessage(messages!, roomId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });

  return (
    <ScrollArea className="lg:w-[40rem] pb-[10rem] flex flex-col lg:justify-start w-full items-center border-x">
      {data?.map((item, idx) => {
        return (
          <div
            className="px-5 lg:px-10 py-2 flex flex-col gap-2 lg:gap-0 w-full"
            key={item.id}
          >
            {/* Chat Header */}
            {item.userId !== data[idx - 1]?.userId! && (
              <div
                className={cn(
                  "flex gap-5 items-center",
                  item.userId === session?.user?.id &&
                    "justify-start flex-row-reverse"
                )}
              >
                {item.userId !== session?.user?.id && (
                  <ChatUserAvatar item={item} />
                )}
                <div>
                  <p className="font-bold text-sm text-slate-800">
                    {item.userId !== session?.user?.id ? item.user.name : "You"}
                  </p>
                </div>
              </div>
            )}

            {/* Chat Bubble */}
            <div
              className={cn(
                "flex justify-end items-center gap-4",
                item.userId !== session?.user?.id && "flex-row-reverse"
              )}
            >
              {/* @ts-ignore */}
              <MessageContent item={item} />
            </div>
          </div>
        );
      })}
      <div ref={scrollRef}></div>
    </ScrollArea>
  );
}

export default MessageList;
