import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlOptionsVertical } from "react-icons/sl";
import { deleteMessage } from "@/actions/chat";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function MessageOptions({
  roomId,
  messageId,
  userId,
  deletedAt,
}: {
  roomId: string;
  messageId: string;
  userId: string;
  deletedAt: Date;
}) {
  const { data: session } = useSession();
  return (
    <>
      {!deletedAt && (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "pb-3 outline-none",
              session?.user?.id !== userId && "hidden"
            )}
          >
            <SlOptionsVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Button
                variant={null}
                className="text-destructive"
                onClick={async () => {
                  await deleteMessage(roomId, messageId);
                }}
              >
                Delete message
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}

export default MessageOptions;
