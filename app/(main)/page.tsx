import { auth } from "@/auth";
import PrivateRoomList from "@/components/room/private-room-list";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="p-10">
      <PrivateRoomList />
    </div>
  );
}
