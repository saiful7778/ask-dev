"use client";
import type { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn/ui/avatar";
import { Button } from "./shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./shadcn/ui/dropdown-menu";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_PAGE } from "@/lib/routes";
import { LayoutDashboard, LogOut, Sparkles, UserCog } from "lucide-react";

const UserDropdown: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();

  const handleLogout = () => {
    toast.promise(
      async () => {
        await signOut();
        router.push(DEFAULT_LOGIN_PAGE);
      },
      {
        loading: "Loading...",
        success: "Logged out",
        error: "Error to log out",
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Avatar>
            <AvatarImage src={user.image!} alt={user.name!} />
            <AvatarFallback />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            <span>Upgrade to Pro</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <LayoutDashboard />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">
              <UserCog />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
