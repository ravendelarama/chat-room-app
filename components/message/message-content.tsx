import { cn } from "@/lib/utils";
import { Attachment, MessageLike, Poll } from "@prisma/client";
import { useSession } from "next-auth/react";
import Attachments from "./attachments";
import MessageOptions from "./message-options";
import { Button } from "../ui/button";
import { FcLike } from "react-icons/fc";
import { toggleLike } from "@/actions/chat";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type Message = {
  id: string;
  content: string;
  userId: string;
  roomId: string;
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
};

interface Prop {
  item: Message;
  setShowTimeStamp: () => void;
}

function MessageContent({ item, setShowTimeStamp }: Prop) {
  const { data: session } = useSession();
  return (
    <div
      className={cn(
        "flex gap-2",
        item.userId !== session?.user.id && "flex-row-reverse"
      )}
    >
      <div className="flex flex-col pt-3">
        <MessageOptions
          roomId={item.roomId}
          messageId={item.id}
          userId={item.userId}
          deletedAt={item.deletedAt}
        />
      </div>
      <div
        className={cn(
          "md:pl-16 flex flex-col gap-y-2",
          item.userId === session?.user?.id &&
            "md:pl-0 flex-row-reverse justify-start"
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-y-1",
            item.userId === session?.user?.id && "items-end"
          )}
        >
          {(item.content.length > 0 ||
            (item.attachments &&
              item.content.length == 0 &&
              item.deletedAt)) && (
            <Button
              className={cn(
                "bg-secondary rounded-2xl rounded-tl py-2 px-4 w-fit outline-none flex justify-start",
                session?.user.id === item.userId && "rounded-tr rounded-tl-2xl"
              )}
              variant={null}
              onMouseEnter={setShowTimeStamp}
              onMouseLeave={setShowTimeStamp}
              onDoubleClick={async () => {
                await toggleLike(item.roomId, item.id);
              }}
              disabled={!!item.deletedAt}
            >
              <p
                className={cn(
                  "text-xs md:text-sm font-bold md:font-semibold text-wrap break-words w-full text-start",
                  item.content.length > 24 &&
                    !item?.deletedAt &&
                    "w-[16rem] md:w-[20rem]",
                  item?.deletedAt && "italic font-normal"
                )}
              >
                {!item?.deletedAt ? item.content : "Message deleted"}
              </p>
            </Button>
          )}

          {/* Rendering multiple attachments */}
          <Attachments
            roomId={item.roomId}
            messageId={item.id}
            userId={item.userId}
            deletedAt={item.deletedAt}
            attachments={item.attachments}
          />
          {!item.deletedAt && item.likes.length > 0 ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={null}
                  size={"icon"}
                  className={cn(
                    "outline-none w-full p-0 flex justify-end",
                    session?.user.id == item.userId && " justify-start"
                  )}
                >
                  <FcLike className="h-4 w-4" />
                  &nbsp;
                  <span className="text-2xs font-bold">
                    {item.likes.length}
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Likes: {item.likes.length}</DialogTitle>
                </DialogHeader>
                <div>
                  {item.likes.map((item) => {
                    return <div>{item.userId}</div>;
                  })}
                </div>
              </DialogContent>
            </Dialog>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MessageContent;
