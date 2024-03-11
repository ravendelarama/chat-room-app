import { Attachment } from "@prisma/client";

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

function MessageContent({ item }: Prop) {
  return (
    <div className="bg-secondary rounded-lg py-2 px-4 w-fit">
      <p className="text-sm font-semibold text-gray-500 m-w-24">
        {item.content}
      </p>
    </div>
  );
}

export default MessageContent;
