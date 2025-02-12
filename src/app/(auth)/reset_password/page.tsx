import registerImage from "@/assets/images/register-banner-image.jpg";
import ResetPasswordForm from "@/components/forms/auth-form/ResetPasswordForm";
import SiteLogo from "@/components/SiteLogo";
import { ServerComponentParameters } from "@/types";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Reset password - ASK DEV",
  description: "This is ask-dev reset password page",
};

const ResetPassword: React.FC<
  ServerComponentParameters<null, { token: string }>
> = async ({ searchParams }) => {
  const { token } = await searchParams;
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="relative flex min-h-[70vh] w-full max-w-2xl items-center justify-center overflow-hidden rounded-md border p-8">
        <Image
          className="absolute inset-0 -z-[1] h-full w-full object-cover brightness-[0.5]"
          src={registerImage}
          alt="banner image"
          priority={true}
        />
        <div className="flex w-full max-w-sm flex-col gap-2 rounded-md border bg-secondary p-4">
          <SiteLogo />
          <h1 className="mt-4 text-2xl font-bold">Reset password</h1>
          <p className="text-sm">Set new password</p>
          {token ? (
            <ResetPasswordForm token={token} />
          ) : (
            <p className="my-2 text-center text-destructive">
              Token is required
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
