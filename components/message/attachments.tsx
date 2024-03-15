"use client";

import { cn } from "@/lib/utils";
import AudioAttachment from "./audio-attachment";
import ImageAttachment from "./image-attachment";
import VideoPlayer from "./video-attachment";
import { Attachment } from "@prisma/client";
import { useSession } from "next-auth/react";

function Attachments({
  userId,
  deletedAt,
  attachments,
}: {
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
          if (item.type.startsWith("audio")) {
            return (
              <AudioAttachment
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
