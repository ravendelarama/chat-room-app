import getRoom from "@/actions/room";
import { auth } from "@/auth";
import BackButton from "@/components/back-button";
import Chat from "@/components/chat/chat";
import MemberList from "@/components/chat/member-list";
import MessageForm from "@/components/message/message-form";
import MessageList from "@/components/message/message-list";
import { Badge } from "@/components/ui/badge";
import db from "@/lib/db";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

interface Prop {
  params: {
    roomId: string;
  };
}

async function ChatRoomPage({ params: { roomId } }: Prop) {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["room", roomId],
    queryFn: async () => {
      const data = await getRoom(roomId);

      return data;
    },
  });

  return (
    <div className="h-full flex items-center w-full">
      <div className="hidden lg:block w-full"></div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Chat roomId={roomId} />
      </HydrationBoundary>

      <MemberList roomId={roomId} />
    </div>
  );
}

export default ChatRoomPage;
