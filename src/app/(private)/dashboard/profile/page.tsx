import ProfileForm from "@/components/forms/ProfileForm";
import { nextAuthOptions } from "@/lib/auth";
import db from "@/lib/db";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Profile settings - ASK-DEV",
  description: "This is ask-dev profile setting page.",
};

const ProfilePage: React.FC = async () => {
  const session = await getServerSession(nextAuthOptions);

  const userData = await db.user.findFirst({
    where: {
      id: session?.user?.id,
    },
  });

  return (
    <div>
      <ProfileForm
        userId={userData?.id}
        profileName={userData?.name}
        userName={userData?.username}
      />
    </div>
  );
};

export default ProfilePage;
