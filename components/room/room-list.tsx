"use client";

import useRooms from "@/hooks/use-rooms";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Room from "./room";

function PublicRoomList() {
  const { rooms, status, fetchStatus, error } = useRooms();

  return (
    <div className="py-4 px-2 md:pl-6 w-full flex flex-col gap-2 md:flex-row">
      {rooms?.map((item) => {
        return <Room key={item.id} item={item} />;
      })}
    </div>
  );
}

export default PublicRoomList;
