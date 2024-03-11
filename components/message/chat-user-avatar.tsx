import { Attachment } from "@prisma/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

type Message = {
  id: string;
  content: string;
  userId: string;
  roomId: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  attachments: Attachment[];
};

interface Prop {
  item: Message;
}

function ChatUserAvatar({ item }: Prop) {
  const router = useRouter();
  return (
    <Button
      variant={null}
      className="w-0"
      onClick={() => {
        router.push(`/${item.userId}`);
      }}
    >
      <Avatar>
        <AvatarImage src={item.user.image!} />
        <AvatarFallback>GC</AvatarFallback>
      </Avatar>
    </Button>
  );
}

export default ChatUserAvatar;
