import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoAddCircleOutline } from "react-icons/io5";
import RoomForm from "./room-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function RoomCreateModal() {
  return (
    <>
      <Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DialogTrigger>
                <IoAddCircleOutline className="h-9 w-9" />
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create new channel</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent className="w-fit">
          <DialogHeader>
            <DialogTitle>Create a new channel</DialogTitle>
            <DialogDescription>
              <RoomForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RoomCreateModal;
