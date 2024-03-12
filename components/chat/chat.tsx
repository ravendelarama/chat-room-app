"use client";

import { useQuery } from "@tanstack/react-query";
import BackButton from "../back-button";
import MessageList from "../message/message-list";
import MessageForm from "../message/message-form";
import getRoom from "@/actions/room";
import { Badge } from "../ui/badge";

interface Prop {
  roomId: string;
}

function Chat({ roomId }: Prop) {
  const { data: room } = useQuery({
    queryKey: ["room", roomId],
    queryFn: async () => {
      const data = await getRoom(roomId);
      return data;
    },
  });
  return (
    <>
      <div className="flex justify-between items-center w-full ">
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
    </>
  );
}

export default Chat;
