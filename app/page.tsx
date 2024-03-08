import LogoutButton from "@/components/auth/logout-button";
import RoomForm from "@/components/room/room-form";
import RoomList from "@/components/room/room-list";
import db from "@/lib/db";

export default async function Home() {
  return (
    <div className="h-full w-full flex flex-col justify-start items-center gap-10 py-10">
      <RoomForm />
      <LogoutButton />
      <RoomList />
    </div>
  );
}
