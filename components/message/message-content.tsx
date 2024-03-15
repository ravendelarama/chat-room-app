import { cn } from "@/lib/utils";
import { Attachment } from "@prisma/client";
import { useSession } from "next-auth/react";
import Attachments from "./attachments";
import MessageOptions from "./message-options";

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

  return (
    <div
      className={cn(
        "flex gap-2",
        item.userId !== session?.user.id && "flex-row-reverse"
      )}
    >
      <MessageOptions
        roomId={item.roomId}
        messageId={item.id}
        userId={item.userId}
        deletedAt={item.deletedAt}
      />
      <div
        className={cn(
          "md:pl-16 flex flex-col gap-y-2",
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
                  "text-xs md:text-sm font-bold md:font-semibold text-wrap break-words",
                  item.content.length > 24 &&
                    !item?.deletedAt &&
                    "w-[16rem] md:w-[20rem]",
                  item?.deletedAt && "italic font-normal"
                )}
              >
                {!item?.deletedAt ? item.content : "Message deleted"}
              </p>
            </div>
          )}

          {/* Rendering multiple attachments */}
          <Attachments
            userId={item.userId}
            deletedAt={item.deletedAt}
            attachments={item.attachments}
          />
        </div>
      </div>
    </div>
  );
}

export default MessageContent;
