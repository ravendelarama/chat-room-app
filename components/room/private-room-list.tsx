"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useJoinedChannels from "@/hooks/use-joined-channels";
import { ScrollArea } from "../ui/scroll-area";
import Room from "./room";

function PrivateRoomList() {
  const { joinedRooms } = useJoinedChannels();
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="h-full py-20 lg:py-4 px-2 md:pl-0 items-center md:justify-center w-full flex flex-col overflow-y-auto gap-y-2 md:gap-2 md:flex-row md:flex-wrap">
      {joinedRooms?.map((item) => {
        return <Room key={item.id} item={item} />;
      })}
    </div>
  );
}

export default PrivateRoomList;
