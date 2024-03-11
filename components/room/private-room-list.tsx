"use client";

import useRooms from "@/hooks/use-rooms";
import Link from "next/link";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { Room } from "@prisma/client";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { useRouter } from "next/navigation";
import { PiUsersThreeFill } from "react-icons/pi";
import { useSession } from "next-auth/react";
import joinRoom from "@/actions/join-room";
import useJoinedChannels from "@/hooks/use-joined-channels";

function PrivateRoomList() {
  const { joinedRooms } = useJoinedChannels();
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="py-5 pl-6 flex justify-evenlly gap-2 flex-wrap items-center">
      {joinedRooms?.map((item) => {
        return (
          <div
            key={item.id}
            className="py-4 px-5 w-full relative bg-slate-100 hover:bg-slate-300 rounded-md sm:w-[18rem] h-full"
          >
            <div className="flex flex-col items-start gap-1 w-full">
              <div className="w-full">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={`https://utfs.io/f/${item.image!}`}
                    alt={item.name!}
                    fill
                    className="object-cover rounded-md"
                  />
                </AspectRatio>
              </div>
              <div className="flex justify-between items-center w-full pt-3">
                <h1 className="text-lg font-bold">{item.name!}</h1>

                <Button
                  className="z-30 ml-8"
                  size={"sm"}
                  onClick={async () => {
                    if (!item.memberIDs.includes(session?.user?.id!)) {
                      const res = await joinRoom(item.id);
                    } else {
                      router.push(`/chat/${item.id}`);
                    }
                  }}
                >
                  Connect
                </Button>
              </div>
              <p className="text-gray-500 font-bold text-xs flex">
                <PiUsersThreeFill className="h-4 w-4" />
                &nbsp;{item.memberIDs.length}
              </p>
              <div className="flex justify-between item-center">
                <p className="truncate text-left text-xs text-semibold text-gray-500 w-52">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PrivateRoomList;
