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
    <div className="flex justify-center items-center">
      <Dialog>
        <DialogTrigger>
          <IoAddCircleOutline className="h-7 w-7 lg:h-9 lg:w-9 text-gray-800" />
        </DialogTrigger>
        <DialogContent className="w-fit">
          <DialogHeader>
            <DialogTitle>Create a new channel</DialogTitle>
          </DialogHeader>

          <RoomForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RoomCreateModal;
