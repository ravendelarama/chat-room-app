"use client";

import useRooms from "@/hooks/use-rooms";
import Link from "next/link";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { Room } from "@prisma/client";

function RoomList() {
  const { rooms, status, fetchStatus, error } = useRooms();
  return (
    <div className="flex flex-col justify-center items-center">
      {rooms?.map((item) => {
        return (
          <Button
            key={item.id}
            variant={"link"}
            className="no-underline py-2 px-4"
            // disabled={fetchStatus == "fetching" || status == "pending"}
            asChild
          >
            <Link href={`/chat/${item.id}`} className="text-lg font-semibold">
              {item.name}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}

export default RoomList;
