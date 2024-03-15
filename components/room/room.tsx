import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";
import ChannelOptions from "./room-options";
import { PiUsersThreeFill } from "react-icons/pi";
import { Badge } from "../ui/badge";
import joinRoom from "@/actions/join-room";
import { Room } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

function Room({ item }: { item: Room }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div
      key={item.id}
      className="py-4 px-4 md:px-5 w-full relative bg-secondary rounded-md sm:w-[18rem] h-full"
    >
      <div className="flex justify-start flex-col items-start gap-1 w-full">
        <div className="w-full md:w-[16rem]">
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
          <div className="flex gap-2 justify-between items-center w-full md:pt-3">
            <h1 className="text-lg font-bold">{item.name!}</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button>View</Button>
              </DialogTrigger>
              <DialogContent>
                <div className="md:w-[29rem]">
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
                    <h1 className="font-bold text-lg tracking-wide">
                      {item.name}
                    </h1>
                    <ChannelOptions roomId={item.id} isPrivate={item.private} />
                  </div>
                  <div className="flex justify-start item-center gap-2">
                    <p className="text-accent-foreground flex items-center gap-1 font-bold text-sm">
                      <PiUsersThreeFill className="h-5 w-5" />
                      {item.memberIDs.length}
                    </p>
                    <Badge
                      className="text-xs"
                      variant={item.private ? "default" : "outline"}
                    >
                      {item.private ? "Private" : "Public"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-left text-xs font-semibold text-wrap break-words md:w-[29rem]">
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
          <div className="flex gap-2 md:flex-col">
            <p className="text-accent-foreground font-bold text-xs flex">
              <PiUsersThreeFill className="h-4 w-4" />
              &nbsp;{item.memberIDs.length}
            </p>
            <div className="flex justify-between items-center">
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
}

export default Room;
