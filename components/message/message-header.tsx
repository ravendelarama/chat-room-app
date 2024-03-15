import { cn } from "@/lib/utils";
import ChatUserAvatar from "./chat-user-avatar";
import { useSession } from "next-auth/react";
import { Attachment } from "@prisma/client";

type Message = {
  id: string;
  content: string;
  userId: string;
  roomId: string;
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

function MessageHeader({
  data,
  idx,
  message,
}: {
  data: Message[];
  idx: number;
  message: Message;
}) {
  const { data: session } = useSession();
  return (
    <>
      {message.userId !== data[idx - 1]?.userId! && (
        <div
          className={cn(
            "flex gap-5 items-center",
            message.userId === session?.user?.id &&
              "justify-start flex-row-reverse"
          )}
        >
          {message.userId !== session?.user?.id && (
            <ChatUserAvatar item={message} />
          )}
          <div>
            <p className="font-bold text-sm">
              {message.userId !== session?.user?.id ? message.user.name : "You"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default MessageHeader;
