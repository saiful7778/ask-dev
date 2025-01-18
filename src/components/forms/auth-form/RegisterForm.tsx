"use client";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterSchemaType,
} from "@/lib/schemas/authSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import PasswordField from "@/components/shadcn/PasswordField";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import errorResponse from "@/utils/client-utils/errorResponse";
import OTPSendDialog from "@/components/auth/OTPSendDialog";
import { axiosPublic } from "@/lib/config/axios.config";
import type { ApiResponseType, UserType } from "@/types";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [openOTPSendDialog, setOpenOTPSendDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (e: RegisterSchemaType) => {
    try {
      setIsLoading(true);
      await axiosPublic.post<ApiResponseType<UserType>>(
        "/api/account/auth/register",
        e,
      );
      toast.success("Registration successful");
      setOpenOTPSendDialog(true);
      setEmail(e.email);
      form.reset();
    } catch (err) {
      const response = errorResponse<
        { field: keyof RegisterSchemaType; message: string }[]
      >(err, (error) => {
        console.log(error);
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Full name"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email address"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordField
                    placeholder="Password"
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
            {isLoading ? <Spinner /> : "Register"}
          </Button>
        </form>
      </Form>
      <OTPSendDialog
        openOTPSendDialog={openOTPSendDialog}
        setOpenOTPSendDialog={setOpenOTPSendDialog}
        email={email}
      />
    </>
  );
};

export default RegisterForm;
