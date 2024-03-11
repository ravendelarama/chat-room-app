import { auth } from "@/auth";
import RoomJoinModal from "@/components/room/room-join-modal";
import db from "@/lib/db";
import { redirect } from "next/navigation";

async function ChannelInvitePage({
  params: { roomId },
}: {
  params: { roomId: string };
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  const room = await db.room.findFirst({
    where: {
      id: roomId,
    },
  });

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      {/* @ts-ignore */}
      <RoomJoinModal room={data} />
    </div>
  );
}

export default ChannelInvitePage;
