"use client";

import getRoom from "@/actions/room";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { IoIosArrowDown } from "react-icons/io";
import TextToClipboard from "./text-to-clipboard";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function MemberList({ roomId }: { roomId: string }) {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["room", roomId],
    queryFn: async () => {
      const res = await getRoom(roomId);

      return res!;
    },
  });

  return (
    <div
      className={cn(
        "h-full w-full flex-col justify-start p-5 items-center hidden lg:flex",
        data?.private && "hidden"
      )}
    >
      <Card className="w-full p-0 border shadow-none">
        <CardHeader>
          <CardTitle className="text-sm">Channel Members</CardTitle>
          <CardDescription className="text-xs">
            <span className="font-semibold">{data?.name}</span> channel has{" "}
            <span className="font-semibold">
              {data?.members.length! || "0"}
            </span>{" "}
            members
          </CardDescription>
          <TextToClipboard
            text={`https://chat-room-app.vercel.app/chat/${roomId}`}
            showInput
          />
        </CardHeader>

        <CardContent>
          <div className="flex flex-col w-full gap-4">
            {data?.members.map((item) => (
              <div className="flex items-center gap-2" key={item.id}>
                <Avatar>
                  <AvatarImage src={item.image!} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="rounded-md p-1 w-full flex flex-col  items-start">
                  <h1 className="text-xs text-primary font-semibold">
                    {item.name}
                  </h1>
                  <p className="text-xs text-primary">{item.email}</p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <BsThreeDotsVertical className="h-5 w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="border-none outline-none"
                      asChild
                    >
                      <Button
                        variant={null}
                        className="w-full h-full flex justify-start outline-none"
                        onClick={() => {
                          router.push(`/${item.id}`);
                        }}
                      >
                        Profile
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="w-full">
          {data?.memberIDs?.length! > 4 && (
            <Dialog>
              <DialogTrigger className="w-full h-full flex justify-center items-center">
                <IoIosArrowDown className="h-5 w-5" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Channel Members</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default MemberList;
