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
import { Input } from "@/components/shadcn/ui/input";
import Spinner from "@/components/Spinner";
import { axiosPublic } from "@/lib/config/axios.config";
import { loginSchema, type loginSchemaType } from "@/lib/schemas/authSchema";
import errorResponse from "@/utils/client-utils/errorResponse";
import type { ApiResponseType, UserType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { DEFAULT_AUTH_REDIRECT } from "@/lib/routes";
import { useRouter } from "next/navigation";

const LoginForm: React.FC<{ callbackUrl: string | undefined }> = ({
  callbackUrl,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (e: loginSchemaType) => {
    try {
      setIsLoading(true);
      await axiosPublic.post<ApiResponseType<UserType>>(
        "/api/account/auth/login",
        e,
      );

      await signIn("credentials", {
        email: e.email,
        password: e.password,
      });

      toast.success("login successful");
      form.reset();
      router.push(callbackUrl || DEFAULT_AUTH_REDIRECT);
    } catch (err) {
      const response = errorResponse<
        { field: keyof loginSchemaType; message: string }[]
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
              <div className="flex items-center justify-between gap-2">
                <FormLabel>Password</FormLabel>
                <Link href="/forget_password" className="text-sm underline">
                  Forget password?
                </Link>
              </div>
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
          {isLoading ? <Spinner /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
