"use client";

import useRooms from "@/hooks/use-rooms";
import Room from "./room";
import { ScrollArea } from "../ui/scroll-area";

function PublicRoomList() {
  const { rooms, status, fetchStatus, error } = useRooms();

  return (
    <div className="h-full py-20 lg:py-4 px-2 md:pl-0 items-center md:justify-center w-full flex flex-col overflow-y-auto gap-y-2 md:gap-2 md:flex-row md:flex-wrap">
      {rooms?.map((item) => {
        return <Room key={item.id} item={item} />;
      })}
    </div>
  );
}

export default PublicRoomList;
