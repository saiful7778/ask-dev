"use client";
import { Button } from "@/components/shadcn/ui/button";
import Spinner from "@/components/Spinner";
import { axiosPublic } from "@/lib/config/axios.config";
import errorResponse from "@/utils/client-utils/errorResponse";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const VerifyButton: React.FC<{ token: string }> = ({ token }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleTokenVerify = async () => {
    try {
      setIsLoading(true);
      await axiosPublic.post("/api/account/auth/verify", { token });
      toast.success("Email verified successfully");
      router.push("/login");
    } catch (err) {
      const response = errorResponse(err);
      toast.error(response);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      className="w-full"
      onClick={handleTokenVerify}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : "Verify"}
    </Button>
  );
};

export default VerifyButton;
