import { auth } from "@/auth";
import BackButton from "@/components/back-button";
import MessageForm from "@/components/message/message-form";
import MessageList from "@/components/message/message-list";
import { Badge } from "@/components/ui/badge";
import db from "@/lib/db";
import { redirect } from "next/navigation";

interface Prop {
  params: {
    roomId: string;
  };
}

async function ChatRoomPage({ params: { roomId } }: Prop) {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  const room = await db.room.findFirst({
    where: {
      id: roomId,
    },
    include: {
      messages: {
        include: {
          user: true,
        },
      },
    },
  });

  return (
    <div className="h-full w-full flex flex-col justify-end gap-5 items-center p-10">
      <div className="flex justify-between items-center w-full gap-10">
        <BackButton />
        <h1 className="text-2xl font-bold">{room?.name}</h1>
        <Badge
          className="text-xs h-6"
          variant={room?.private ? "default" : "outline"}
        >
          {room?.private ? "Private" : "Public"}
        </Badge>
      </div>
      <MessageList messages={room?.messages} roomId={roomId} />
      <MessageForm roomId={roomId} />
    </div>
  );
}

export default ChatRoomPage;
