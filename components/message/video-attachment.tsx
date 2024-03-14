import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function VideoPlayer({
  data,
}: {
  data: {
    url: string;
  };
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <video
          className="aspect-video rounded-md w-[18rem]"
          src={`https://utfs.io/f/${data?.url}`}
        ></video>
      </DialogTrigger>
      <DialogContent className="relative max-w-full bg-transparent shadow-none border-hidden h-96 w-full flex justify-center items-center">
        <div className="bg-black/80 h-full w-full absolute z-20 text-white">
          Play
        </div>
        <video
          controls
          autoPlay
          className="aspect-video"
          src={`https://utfs.io/f/${data?.url}`}
        ></video>
      </DialogContent>
    </Dialog>
  );
}

export default VideoPlayer;
