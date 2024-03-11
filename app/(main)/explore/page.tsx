import { auth } from "@/auth";
import PublicRoomList from "@/components/room/room-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";

async function ExplorePage() {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="p-10">
      <ScrollArea>
        <PublicRoomList />
      </ScrollArea>
    </div>
  );
}

export default ExplorePage;
