"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Room } from "@prisma/client";
import { Button } from "../ui/button";
import joinRoom from "@/actions/join-room";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

function RoomJoinModal({ room }: { room: Room }) {
  return (
    <div className="w-full flex justify-center items-center">
      <Card className="w-100">
        <CardHeader>
          <CardTitle>Invitation</CardTitle>
          <CardDescription>
            {" "}
            You are invited to join into our{" "}
            <span className="font-bold">{room?.name!}</span> channel!
          </CardDescription>
          <CardContent className="w-full">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={`https://utfs.io/f/${room?.image!}`}
                alt={room?.name!}
                fill
                className="object-cover rounded-md"
              />
            </AspectRatio>
          </CardContent>
        </CardHeader>
        <CardFooter>
          <Button
            className="w-full"
            onClick={async (e) => {
              e.preventDefault();
              await joinRoom(room?.id!);
            }}
          >
            Join our channel!
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RoomJoinModal;
