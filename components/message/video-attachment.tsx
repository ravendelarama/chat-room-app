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
      <DialogContent className="relative bg-transparent shadow-none border-hidden h-full">
        <video controls autoPlay src={`https://utfs.io/f/${data?.url}`}></video>
      </DialogContent>
    </Dialog>
  );
}

export default VideoPlayer;
