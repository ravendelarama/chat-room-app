import { toggleLike } from "@/actions/chat";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function VideoPlayer({
  data,
}: {
  data: {
    roomId: string;
    messageId: string;
    url: string;
  };
}) {
  return (
    <Dialog>
      <DialogTrigger
        onDoubleClick={async () => {
          await toggleLike(data.roomId, data.messageId);
        }}
      >
        <video
          className="aspect-video rounded-md w-[18rem]"
          src={`https://utfs.io/f/${data?.url}`}
        ></video>
      </DialogTrigger>
      <DialogContent className=" bg-transparent shadow-none border-hidden">
        <video
          controls
          className="aspect-video"
          src={`https://utfs.io/f/${data?.url}`}
        ></video>
      </DialogContent>
    </Dialog>
  );
}

export default VideoPlayer;
