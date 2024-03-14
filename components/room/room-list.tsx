"use client";

import useRooms from "@/hooks/use-rooms";
import Link from "next/link";
import { Button } from "../ui/button";
import { Room } from "@prisma/client";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { useRouter } from "next/navigation";
import { PiUsersThreeFill } from "react-icons/pi";
import { useSession } from "next-auth/react";
import joinRoom from "@/actions/join-room";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "../ui/badge";

function PublicRoomList() {
  const { rooms, status, fetchStatus, error } = useRooms();
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="py-4 px-2 lg:pl-6 w-full flex flex-col gap-2 lg:flex-row">
      {rooms?.map((item) => {
        return (
          <div
            key={item.id}
            className="py-4 px-5 w-full relative bg-slate-100 hover:bg-slate-300 rounded-md sm:w-[18rem] h-full"
          >
            <div className="flex justify-start flex-row gap-5 lg:flex-col lg:items-start lg:gap-1 w-full">
              <div className="w-[10rem] lg:w-[16rem]">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={`https://utfs.io/f/${item.image!}`}
                    alt={item.name!}
                    fill
                    className="object-cover rounded-md"
                  />
                </AspectRatio>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-2 justify-between items-center w-full lg:pt-3">
                  <h1 className="text-lg font-bold">{item.name!}</h1>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>View</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <div className="w-[29rem]">
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src={`https://utfs.io/f/${item.image!}`}
                            alt={item.name!}
                            fill
                            className="object-cover rounded-md"
                          />
                        </AspectRatio>
                      </div>
                      <DialogHeader>
                        <DialogTitle>{item.name}</DialogTitle>
                        <div className="flex justify-start item-center gap-2">
                          <p className="flex items-center gap-1 font-bold text-sm">
                            <PiUsersThreeFill className="h-5 w-5 text-gray-500" />
                            {item.memberIDs.length}
                          </p>
                          <Badge variant={item.private ? "default" : "outline"}>
                            {item.private ? "Private" : "Public"}
                          </Badge>
                        </div>
                        <p className="text-gray-800 text-sm font-semibold text-wrap break-words w-[29rem]">
                          {item.description}
                        </p>
                      </DialogHeader>

                      <DialogFooter>
                        <Button
                          className="outline-none w-full"
                          size={"sm"}
                          onClick={async () => {
                            if (!item.memberIDs.includes(session?.user?.id!)) {
                              const res = await joinRoom(item.id);
                            } else {
                              router.push(`/chat/${item.id}`);
                            }
                          }}
                        >
                          {!item.memberIDs.includes(session?.user?.id!)
                            ? "Join Room"
                            : "Connect"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex gap-2 lg:flex-col">
                  <p className="text-gray-500 font-bold text-xs flex">
                    <PiUsersThreeFill className="h-4 w-4" />
                    &nbsp;{item.memberIDs.length}
                  </p>
                  <div className="flex justify-between item-center">
                    <p
                      className={cn(
                        "truncate text-left text-xs text-semibold text-gray-500 w-52",
                        item?.description?.length! < 1 && "py-2"
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PublicRoomList;
