"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { IoChatbubbleOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import RoomCreateModal from "../room/room-create-modal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="w-fit flex flex-col justify-start gap-10 p-5 border-r border-r-gray-500">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              className="bg-transparent hover:bg-transparent w-fit p-0"
              asChild
            >
              <Link href={`/${session?.user?.id}`}>
                <Avatar className="hover:border-2 transition-all duration-75 ease-in hover:border-cyan-500">
                  <AvatarImage src={session?.user?.image!} />
                  <AvatarFallback className="text-gray-800">CN</AvatarFallback>
                </Avatar>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Profile</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              className="bg-transparent hover:bg-transparent w-fit p-0"
              asChild
            >
              <Link href="/explore">
                <MdOutlineExplore className="h-9 w-9 text-gray-800" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Explore</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              className="bg-transparent hover:bg-transparent w-fit p-0"
              asChild
            >
              <Link href="/">
                <IoChatbubbleOutline className="h-9 w-9 text-gray-800" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Chat rooms</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div>
        <RoomCreateModal />
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              className="bg-transparent hover:bg-transparent w-fit p-0"
              onClick={() => {
                signOut();
              }}
            >
              <FiLogOut className="h-9 w-9 text-gray-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sign out</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default Navbar;
