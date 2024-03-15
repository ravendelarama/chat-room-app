"use client";

import useMessage from "@/hooks/use-message";
import { useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Attachment } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import MessageContent from "./message-content";
import MessageHeader from "./message-header";

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

function MessageList({ messages, roomId }: Prop) {
  const { data } = useMessage(messages!, roomId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });

  return (
    <ScrollArea className="h-full md:w-[40rem] pb-[5rem] flex flex-col md:justify-start w-full items-center">
      {data?.map((item, idx) => {
        return (
          <div
            className="px-5 md:px-10 py-2 flex flex-col gap-2 md:gap-0 w-full"
            key={item.id}
          >
            {/* Chat Header */}
            <MessageHeader data={data} message={item} idx={idx} />

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
