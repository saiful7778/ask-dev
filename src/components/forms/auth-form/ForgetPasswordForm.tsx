"use client";
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
import {
  forgetPasswordSchema,
  type forgetPasswordType,
} from "@/lib/schemas/authSchema";
import errorResponse from "@/utils/client-utils/errorResponse";
import { ApiResponseType, UserType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ForgetPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<forgetPasswordType>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (e: forgetPasswordType) => {
    try {
      setIsLoading(true);
      await axiosPublic.post<ApiResponseType<UserType>>(
        "/api/account/auth/forget_password",
        e,
      );

      toast.success("Reset email was sent to your mail.");
      form.reset();
    } catch (err) {
      const response = errorResponse<
        { field: keyof forgetPasswordType; message: string }[]
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
        <Button
          type="submit"
          className="w-full"
          aria-disabled={isLoading ? "false" : "true"}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Send request"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgetPasswordForm;
