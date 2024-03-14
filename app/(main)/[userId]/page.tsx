import { auth } from "@/auth";
import { ModeToggle } from "@/components/theme/dark-mode";

interface Prop {
  params: {
    userId: string;
  };
}

async function ProfilePage({ params: { userId } }: Prop) {
  const session = await auth();

  return (
    <div>
      {session?.user.id == userId ? session?.user?.name : "Profile Page"}
      <ModeToggle />
    </div>
  );
}

export default ProfilePage;
