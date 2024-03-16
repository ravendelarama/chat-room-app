"use client";

import useMessage from "@/hooks/use-message";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Attachment, MessageLike, Poll } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import MessageContent from "./message-content";
import MessageHeader from "./message-header";
import moment from "moment";

interface Prop {
  messages:
    | {
        id: string;
        content: string;
        roomId: string;
        userId: string;
        deletedAt: Date;
        createdAt: Date;
        updatedAt: Date;
        likes: MessageLike[];
        poll: Poll;
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
  const [showTimeStamp, setShowTimeStamp] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { data } = useMessage(messages!, roomId, scrollRef);
  const { data: session } = useSession();

  // @ts-ignore
  function dateTime(current) {
    const dt = moment(new Date(current.createdAt)).calendar(new Date(), {
      sameDay: "h:mm a",
      nextDay: "[Tomorrow]",
      nextWeek: "dddd",
      lastDay: "[Yesterday] h:mm a",
      lastWeek: "[Last] dddd",
      sameElse: "DD/MM/YYYY",
    });

    return dt;
  }

  return (
    <ScrollArea className="h-full md:border-x md:w-[40rem] pb-[5rem] flex flex-col md:justify-start w-full items-center">
      {data?.map((item, idx) => {
        return (
          <div
            className="px-5 md:px-10 py-2 flex flex-col gap-2 md:gap-0 w-full"
            key={item.id}
          >
            {/* Chat Header */}
            <MessageHeader data={data} message={item} idx={idx} />

            {
              // @ts-ignore
              !item.deletedAt ? (
                moment(new Date(item.createdAt)).subtract(
                  moment(new Date()).diff(item.createdAt, "days"),
                  "days"
                ) ? (
                  <p
                    className={cn(
                      "text-xs md:pl-16 pb-1 text-primary transition-all duration-75 ease-in opacity-100",
                      session?.user?.id == item.userId && "self-end",
                      !showTimeStamp && "opacity-0"
                    )}
                  >
                    {dateTime(item)}
                  </p>
                ) : null
              ) : null
            }

            {/* Chat Bubble */}
            <div
              className={cn(
                "flex justify-end items-center gap-4",
                item.userId !== session?.user?.id && "flex-row-reverse"
              )}
            >
              <MessageContent
                // @ts-ignore
                item={item}
                setShowTimeStamp={() => {
                  setShowTimeStamp(!showTimeStamp);
                }}
              />
            </div>
          </div>
        );
      })}
      <div ref={scrollRef}></div>
    </ScrollArea>
  );
}

export default MessageList;
