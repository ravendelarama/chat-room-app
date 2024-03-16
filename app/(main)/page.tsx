import { auth } from "@/auth";
import PrivateRoomList from "@/components/room/private-room-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="h-full w-full lg:p-10 lg:pl-24">
      <PrivateRoomList />
    </div>
  );
}
