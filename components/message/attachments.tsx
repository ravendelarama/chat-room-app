"use client";

import { cn } from "@/lib/utils";
import AudioAttachment from "./audio-attachment";
import ImageAttachment from "./image-attachment";
import VideoPlayer from "./video-attachment";
import { Attachment } from "@prisma/client";
import { useSession } from "next-auth/react";

function Attachments({
  roomId,
  messageId,
  userId,
  deletedAt,
  attachments,
}: {
  roomId: string;
  messageId: string;
  userId: string;
  deletedAt: Date;
  attachments: Attachment[];
}) {
  const { data: session } = useSession();

  return (
    <div
      className={cn(
        "flex flex-col items-end gap-y-4",
        userId != session?.user?.id && "items-start"
      )}
    >
      {!deletedAt &&
        attachments.map((item) => {
          if (item.type.startsWith("image")) {
            return (
              <ImageAttachment
                roomId={roomId}
                messageId={messageId}
                item={item}
                key={item.id}
              />
            );
          }
          if (item.type.startsWith("video")) {
            return (
              <VideoPlayer
                key={item.id}
                data={{
                  roomId,
                  messageId,
                  url: item.source,
                }}
              />
            );
          }
          if (item.type.startsWith("audio")) {
            return (
              <AudioAttachment
                roomId={roomId}
                messageId={messageId}
                key={item.id}
                source={item.source}
                type={item.type}
              />
            );
          }
        })}
    </div>
  );
}

export default Attachments;
