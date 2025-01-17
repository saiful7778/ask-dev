"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../shadcn/ui/dialog";
import { Button } from "../shadcn/ui/button";
import errorResponse from "@/utils/client-utils/errorResponse";
import toast from "react-hot-toast";
import { axiosPublic } from "@/lib/config/axios.config";
import { ApiResponseType } from "@/types";

const OTPSendDialog: React.FC<{
  openOTPSendDialog: boolean;
  setOpenOTPSendDialog: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}> = ({ openOTPSendDialog, setOpenOTPSendDialog, email }) => {
  const handleResendEmail = async () => {
    try {
      await axiosPublic.post<ApiResponseType<string>>(
        "/api/account/auth/send-token",
        {
          email,
        },
      );
      toast.success("Verification email sent successfully");
    } catch (err) {
      const response = errorResponse(err);
      toast.error(response);
    }
  };
  return (
    <Dialog open={openOTPSendDialog} onOpenChange={setOpenOTPSendDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-center">
            Check your mail inbox!
          </DialogTitle>
          <DialogDescription className="text-center">
            We’ve sent you an email with a link to reset your password to{" "}
            <b>{email}</b>
          </DialogDescription>
        </DialogHeader>
        <div className="my-2 text-center text-sm">
          Didn’t get an email?{" "}
          <button
            onClick={handleResendEmail}
            className="underline"
            type="button"
          >
            Resend email?
          </button>
        </div>
        <Button variant="secondary" className="w-full" type="button">
          Back to home
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default OTPSendDialog;
