"use client";
import PasswordField from "@/components/shadcn/PasswordField";
import { Button } from "@/components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import Spinner from "@/components/Spinner";
import { axiosPublic } from "@/lib/config/axios.config";
import {
  resetPasswordSchema,
  type resetPasswordType,
} from "@/lib/schemas/authSchema";
import errorResponse from "@/utils/client-utils/errorResponse";
import { ApiResponseType, UserType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ResetPasswordForm: React.FC<{ token: string }> = ({ token }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<resetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (e: resetPasswordType) => {
    try {
      setIsLoading(true);
      if (!token) {
        return toast.error("Token is required");
      }
      await axiosPublic.post<ApiResponseType<UserType>>(
        "/api/reset_password",
        e,
      );

      toast.success("Password updated successfully");
      form.reset();
      router.push("/login");
    } catch (err) {
      const response = errorResponse<
        { field: keyof resetPasswordType; message: string }[]
      >(err, (error) => {
        error?.forEach((fieldError) => {
          form.setError(fieldError?.field, {
            message: fieldError?.message,
            type: "validate",
          });
        });
      });

      toast.error(response);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordField
                  placeholder="New Password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordField
                  placeholder="Confirm Password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          aria-disabled={isLoading ? "false" : "true"}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Reset password"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
