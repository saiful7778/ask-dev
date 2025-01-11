"use client";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type registerSchemaType,
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
import { axiosPublic } from "@/lib/config/axios.config";
import type { ApiResponseType, UserType } from "@/types";
import { AxiosError } from "axios";

const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (e: registerSchemaType) => {
    try {
      setIsLoading(true);
      const { data } = await axiosPublic.post<ApiResponseType<UserType>>(
        "/api/register",
        e,
      );
      if (!data.success) {
        throw new Error(data?.message);
      }
      toast.success("Registration successful");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err?.response) {
          const status = err.response.status;
          const data = err.response.data;

          switch (status) {
            case 422:
              data?.error?.forEach(
                (fieldError: {
                  field: keyof registerSchemaType;
                  message: string;
                }) => {
                  form.setError(fieldError?.field, {
                    message: fieldError?.message,
                    type: "validate",
                  });
                },
              );
              return;
            default:
              toast.error(
                typeof data?.error === "string"
                  ? data?.error
                  : "Something went wrong",
              );
              return;
          }
        }
        if (err?.request) {
          toast.error("Network error");
          return;
        }
        toast.error("Something went wrong");
        return;
      }
      if (err instanceof Error) {
        toast.error(err.message || "Something went wrong");
        return;
      }
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
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
  );
};

export default RegisterForm;
