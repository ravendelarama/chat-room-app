import addAttachment from "@/actions/attachment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadButton } from "@/utils/uploadthing";
import { MdPermMedia } from "react-icons/md";
import { toast } from "sonner";

function AttachmentUploaderModal({ roomId }: { roomId: string }) {
  return (
    <Dialog>
      <DialogTrigger>
        <MdPermMedia className="h-7 w-7" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload your files here?</DialogTitle>
        </DialogHeader>
        <UploadButton
          endpoint="messageAttachment"
          onClientUploadComplete={async (res) => {
            // Do something with the response
            console.log("Files: ", res);
            await addAttachment(
              roomId,
              res.map((item) => {
                const src = item.url.split("/");
                return {
                  type: item.type,
                  source: src[src.length - 1],
                };
              })
            );

            toast("Files Uploaded Successfully!");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AttachmentUploaderModal;
