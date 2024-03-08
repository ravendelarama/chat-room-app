import BackButton from "@/components/back-button";
import MessageForm from "@/components/message/message-form";
import MessageList from "@/components/message/message-list";
import db from "@/lib/db";

interface Prop {
  params: {
    roomId: string;
  };
}

async function ChatRoomPage({ params: { roomId } }: Prop) {
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
    <div className="h-full w-full flex flex-col justify-end gap-5 items-center py-10">
      <div className="flex justify-start gap-10">
        <h1 className="text-2xl font-bold">{room?.name}</h1>
        <BackButton />
      </div>
      <MessageList messages={room?.messages} roomId={roomId} />
      <MessageForm roomId={roomId} />
    </div>
  );
}

export default ChatRoomPage;
