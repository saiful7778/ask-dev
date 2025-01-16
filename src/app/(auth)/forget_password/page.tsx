import registerImage from "@/assets/images/register-banner-image.jpg";
import ForgetPasswordForm from "@/components/forms/auth-form/ForgetPasswordForm";
import SiteLogo from "@/components/SiteLogo";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Forget password - ASK DEV",
  description: "This is ask-dev forget password page",
};

const ForgetPassword: React.FC = () => {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="relative flex min-h-[70vh] w-full max-w-2xl items-center justify-center overflow-hidden rounded-md border p-8">
        <Image
          className="absolute inset-0 -z-[1] h-full w-full object-cover brightness-[0.5]"
          src={registerImage}
          alt="banner image"
        />
        <div className="flex w-full max-w-sm flex-col gap-2 rounded-md border bg-secondary p-4">
          <SiteLogo />
          <h1 className="mt-3 text-2xl font-bold">Forget password</h1>
          <p className="mb-3 text-sm">Send request to reset your password</p>
          <ForgetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
