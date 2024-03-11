import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Attachment } from "@prisma/client";
import Image from "next/image";

interface Prop {
  item: Attachment;
}

function ImageAttachment({ item }: Prop) {
  return (
    <Dialog>
      <DialogTrigger>
        <Image
          src={`https://utfs.io/f/${item.source!}`}
          alt={item.source}
          width={300}
          height={150}
          className="object-cover rounded-md"
        />
      </DialogTrigger>
      <DialogContent className="max-w-full bg-transparent shadow-none border-hidden h-96 w-full">
        <Image
          src={`https://utfs.io/f/${item.source!}`}
          alt={item.source}
          fill
          className="object-contain rounded-md"
        />
      </DialogContent>
    </Dialog>
  );
}

export default ImageAttachment;
