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
        <DialogTrigger>
          <IoAddCircleOutline className="h-9 w-9" />
        </DialogTrigger>
        <DialogContent className="w-fit">
          <DialogHeader>
            <DialogTitle>Create a new channel</DialogTitle>
          </DialogHeader>

          <RoomForm />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RoomCreateModal;
