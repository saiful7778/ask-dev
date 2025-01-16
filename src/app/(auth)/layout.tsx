import authOptions from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/staticData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AuthLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const session = await getServerSession(authOptions);
  if (!!session) {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }
  return <div className="min-h-screen [&_>_*]:min-h-screen">{children}</div>;
};

export default AuthLayout;
