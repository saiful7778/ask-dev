"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Button } from "@/components/shadcn/ui/button";
import Spinner from "@/components/Spinner";
import { useForm } from "react-hook-form";
import {
  profileDetailsSchema,
  type ProfileDetailsType,
} from "@/lib/schemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../shadcn/ui/input";
import AvatarUpload from "../AvatarUpload";
import { useState } from "react";

const ProfileForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ProfileDetailsType>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: {
      avatar: null,
      profileName: "",
      userName: "",
    },
  });

  const handleSubmit = async (e: ProfileDetailsType) => {
    console.log(e);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar Image</FormLabel>
              <AvatarUpload
                field={field}
                setError={(message) => {
                  form.setError("avatar", {
                    message,
                  });
                }}
                disabled={isLoading}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="username"
                  type="text"
                  disabled
                  readOnly
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profileName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Name </FormLabel>
              <FormControl>
                <Input
                  placeholder="Name"
                  type="text"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
