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
import ChannelOptions from "./room-options";

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
            className="py-4 px-2 lg:px-5 w-full relative bg-secondary rounded-md sm:w-[18rem] h-full"
          >
            <div className="flex justify-start flex-col items-start gap-1 w-full">
              <div className="w-full lg:w-[16rem]">
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
                        <div className="flex justify-between items-center">
                          <h1>{item.name}</h1>
                          <ChannelOptions
                            roomId={item.id}
                            isPrivate={item.private}
                          />
                        </div>
                        <div className="flex justify-start item-center gap-2">
                          <p className="flex items-center gap-1 font-bold text-sm">
                            <PiUsersThreeFill className="h-5 w-5 text-gray-500" />
                            {item.memberIDs.length}
                          </p>
                          <Badge variant={item.private ? "default" : "outline"}>
                            {item.private ? "Private" : "Public"}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm font-semibold text-wrap break-words w-[29rem]">
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
                  <p className="text-accent-foreground font-bold text-xs flex">
                    <PiUsersThreeFill className="h-4 w-4" />
                    &nbsp;{item.memberIDs.length}
                  </p>
                  <div className="flex justify-between item-center">
                    <p
                      className={cn(
                        "truncate text-left text-xs text-semibold text-muted-foreground w-52",
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
