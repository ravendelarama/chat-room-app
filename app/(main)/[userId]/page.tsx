import { auth } from "@/auth";

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
    </div>
  );
}

export default ProfilePage;
