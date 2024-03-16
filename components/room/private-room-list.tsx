"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useJoinedChannels from "@/hooks/use-joined-channels";
import { ScrollArea } from "../ui/scroll-area";
import Room from "./room";

function PrivateRoomList() {
  const { joinedRooms } = useJoinedChannels();

  return (
    <div className="px-2 w-full flex shrink-0 grow-0 justify-center md:justify-start gap-2 pt-20 md:pt-5 pb-5 flex-wrap overflow-auto h-full">
      {joinedRooms?.map((item) => {
        return <Room key={item.id} item={item} />;
      })}
    </div>
  );
}

export default PrivateRoomList;
