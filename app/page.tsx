import { auth } from "@/auth";
import LogoutButton from "@/components/auth/logout-button";
import RoomForm from "@/components/room/room-form";
import RoomList from "@/components/room/room-list";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="h-full w-full flex flex-col justify-start items-center gap-10 py-10">
      <RoomForm />
      <LogoutButton />
      <RoomList />
    </div>
  );
}
