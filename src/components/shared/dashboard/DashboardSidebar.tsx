"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/shadcn/ui/sidebar";
import SiteLogo from "@/components/SiteLogo";
import useIsMobile from "@/hooks/useMobile";
import {
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Sparkles,
  UserCog,
} from "lucide-react";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

interface DashboardSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User | undefined;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  user,
  ...props
}) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="p-4 group-data-[collapsible=icon]:!hidden group-data-[collapsible=icon]:!p-0">
        <SiteLogo />
      </div>
      <SidebarContent>
        <SidebarNavLinks />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={user!} />
      </SidebarFooter>
    </Sidebar>
  );
};

const SidebarNavLinks: React.FC = () => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={pathname === "/dashboard"}
            tooltip="Dashboard"
            asChild
          >
            <Link href="/dashboard">
              <LayoutDashboard />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <Collapsible className="group/collapsible" asChild>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Post">
                <FileText />
                <span>Post</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem key="Add post">
                  <SidebarMenuSubButton asChild>
                    <Link href="/dashboard/posts">
                      <span>All posts</span>
                    </Link>
                  </SidebarMenuSubButton>
                  <SidebarMenuSubButton asChild>
                    <Link href="/dashboard/posts/add-post">
                      <span>Add post</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={pathname === "/dashboard/profile"}
            tooltip="Profile setting"
            asChild
          >
            <Link href="/dashboard/profile">
              <UserCog />
              <span>Profile setting</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};

const SidebarUser: React.FC<{ user: User }> = ({ user }) => {
  const isMobile = useIsMobile();

  const handleLogout = () => {
    toast.promise(
      async () => {
        await signOut();
      },
      {
        loading: "Loading...",
        success: "Logged out",
        error: "Error to log out",
      },
    );
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={user.image!} alt={user.name!} />
                <AvatarFallback />
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
          >
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
                <Link href="/dashboard/profile">
                  <UserCog />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                <span>Billing</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default DashboardSidebar;
