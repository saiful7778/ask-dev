"use client";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useState } from "react";
import { Separator } from "../shadcn/ui/separator";
import toast from "react-hot-toast";
import errorResponse from "@/utils/client-utils/errorResponse";
import profileUpdate from "@/server-actions/profileUpdate";

const ProfileForm: React.FC<{
  userId?: string | null | undefined;
  userName?: string | null | undefined;
  profileName?: string | null | undefined;
}> = ({ userName, userId, profileName }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileDetailsType>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: {
      id: userId || "",
      profileName: profileName || "",
      userName: userName || "",
    },
  });

  const handleSubmit = async (e: ProfileDetailsType) => {
    try {
      setIsLoading(true);
      await profileUpdate(e);
      toast.success("Profile updated successfully");
    } catch (err) {
      const response = errorResponse(err);
      toast.error(response);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full max-w-2xl space-y-4"
      >
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem className="grid grid-cols-3 gap-2 space-y-0">
              <FormLabel className="text-md mt-2">Username</FormLabel>
              <div className="col-span-2 space-y-1">
                <FormControl>
                  <Input
                    placeholder="username"
                    type="text"
                    disabled
                    readOnly
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can&apos;t update username
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="profileName"
          render={({ field }) => (
            <FormItem className="grid grid-cols-3 gap-2 space-y-0">
              <FormLabel className="text-md mt-2">Profile name</FormLabel>
              <div className="col-span-2 space-y-1">
                <FormControl>
                  <Input
                    placeholder="name"
                    type="text"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full max-w-40" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
