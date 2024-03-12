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
    <ScrollArea className="border-x h-full w-[40rem] flex flex-col justify-end items-start">
      {data?.map((item, idx) => {
        return (
          <div className="px-10 py-2 flex flex-col w-full" key={item.id}>
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
                <p className="font-bold text-sm text-slate-800">
                  {item.userId !== session?.user?.id ? item.user.name : "You"}
                </p>
              </div>
            )}

            {/* Chat Bubble */}
            <div
              className={cn(
                "pl-16 flex flex-col gap-y-2",
                item.userId === session?.user?.id &&
                  "pl-0 flex-row-reverse justify-start"
              )}
            >
              <div
                className={cn(
                  "flex flex-col gap-y-4",
                  item.userId === session?.user?.id && "items-end"
                )}
              >
                {item.content.length > 0 && (
                  <MessageContent item={item} key={item.id} />
                )}

                {/* Rendering multiple attachments */}
                <div>
                  {item.attachments.map((item) => {
                    if (item.type.startsWith("image")) {
                      return <ImageAttachment item={item} key={item.id} />;
                    }
                  })}
                </div>
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
