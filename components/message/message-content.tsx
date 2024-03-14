import { deleteMessage } from "@/actions/chat";
import { pusherClient } from "@/lib/pusher";
import { cn } from "@/lib/utils";
import { Attachment } from "@prisma/client";
import { useState } from "react";
import { Button } from "../ui/button";
import { SlOptionsVertical } from "react-icons/sl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ImageAttachment from "./image-attachment";
import { useSession } from "next-auth/react";
import VideoPlayer from "./video-attachment";

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
  item: Message;
}

function MessageContent({ item }: Prop) {
  const { data: session } = useSession();
  const [deleted, setDeleted] = useState<Message | null>(null);

  return (
    <div
      className={cn(
        "flex gap-2",
        item.userId !== session?.user.id && "flex-row-reverse"
      )}
    >
      {!item.deletedAt && (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "pb-3 outline-none",
              session?.user?.id !== item.userId && "hidden"
            )}
          >
            <SlOptionsVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Edit</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Button
                variant={null}
                onClick={async () => {
                  await deleteMessage(item.roomId, item.id);
                }}
              >
                Delete message
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <div
        className={cn(
          "lg:pl-16 flex flex-col gap-y-2",
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
          {(item.content.length > 0 ||
            (item.attachments &&
              item.content.length == 0 &&
              item.deletedAt)) && (
            <div className="bg-secondary rounded-lg py-2 px-4 w-fit">
              <p
                className={cn(
                  "text-sm font-semibold text-gray-800 text-wrap break-words",
                  item.content.length > 24 &&
                    !item?.deletedAt &&
                    "w-[16rem] lg:w-[20rem]",
                  item?.deletedAt && "italic font-normal"
                )}
              >
                {!item?.deletedAt ? item.content : "Message deleted"}
              </p>
            </div>
          )}

          {/* Rendering multiple attachments */}
          <div
            className={cn(
              "flex flex-col items-end gap-y-4",
              item.userId != session?.user?.id && "items-start"
            )}
          >
            {!item.deletedAt &&
              item.attachments.map((item) => {
                if (item.type.startsWith("image")) {
                  return <ImageAttachment item={item} key={item.id} />;
                }
                if (item.type.startsWith("video")) {
                  return (
                    <VideoPlayer
                      key={item.id}
                      data={{
                        url: item.source,
                      }}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageContent;
