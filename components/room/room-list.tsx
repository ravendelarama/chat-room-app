"use client";

import useRooms from "@/hooks/use-rooms";
import Room from "./room";
import { ScrollArea } from "../ui/scroll-area";

function PublicRoomList() {
  const { rooms, status, fetchStatus, error } = useRooms();

  return (
    <div className="px-2 w-full flex shrink-0 grow-0 justify-center md:justify-start gap-2 pt-20 md:pt-5 flex-wrap overflow-auto h-full">
      {rooms?.map((item) => {
        return <Room key={item.id} item={item} />;
      })}
    </div>
  );
}

export default PublicRoomList;
