import SiteLogo from "@/components/SiteLogo";
import { ServerComponentParameters } from "@/types";
import VerifyButton from "./VerifyButton";
import registerImage from "@/assets/images/register-banner-image.jpg";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Verify email - ASK DEV",
  description: "This is ask-dev email verification page",
};

const Verify: React.FC<
  ServerComponentParameters<null, { token: string }>
> = async ({ searchParams }) => {
  const { token } = await searchParams;

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="relative flex min-h-[70vh] w-full max-w-2xl items-center justify-center overflow-hidden rounded-md border p-8">
        <Image
          className="absolute inset-0 z-[0] h-full w-full object-cover brightness-[0.5]"
          src={registerImage}
          alt="banner image"
        />
        <div className="flex w-full max-w-sm flex-col gap-2 rounded-md border bg-secondary/50 p-4 text-center backdrop-blur-lg">
          <SiteLogo />
          <h1 className="mt-4 text-2xl font-bold">Verify email address</h1>
          <p className="text-sm">Click to verify your account</p>
          <VerifyButton token={token} disabled={token ? false : true} />
          {!token && (
            <p className="text-sm text-destructive">Token is required</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
