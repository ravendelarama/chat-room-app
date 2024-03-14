"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { deleteRoom } from "@/actions/room";
import { IoSettingsOutline } from "react-icons/io5";

function ChannelOptions({
  roomId,
  isPrivate,
}: {
  roomId: string;
  isPrivate: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IoSettingsOutline className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Channel Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">Report</DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant={null}
            size={"sm"}
            className="text-destructive text-left p-0 h-fit"
            onClick={async () => {
              await deleteRoom(roomId);
            }}
          >
            Delete Channel
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ChannelOptions;
