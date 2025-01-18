"use client";
import { Button } from "./shadcn/ui/button";
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { DEFAULT_AUTH_REDIRECT } from "@/lib/routes";

const SocialAuth: React.FC<{ callbackUrl?: string | undefined }> = ({
  callbackUrl,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSocialAuth = async (provider: "google" | "github") => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        redirect: true,
        callbackUrl: callbackUrl || DEFAULT_AUTH_REDIRECT,
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={() => handleSocialAuth("google")}
        variant="outline"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner size={16} />
        ) : (
          <>
            <AiFillGoogleCircle />
            <span>Login with Google</span>
          </>
        )}
      </Button>
      <Button
        onClick={() => handleSocialAuth("github")}
        variant="outline"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner size={16} />
        ) : (
          <>
            <AiFillGithub />
            <span>Login with GitHub</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default SocialAuth;
