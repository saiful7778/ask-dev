import { SidebarInset } from "@/components/shadcn/ui/sidebar";
import DashboardSidebar from "@/components/shared/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/shared/dashboard/DashboardTopbar";
import { SidebarContextProvider } from "@/contexts/SidebarContext";
import { getAuthSession } from "@/lib/auth";

const PrivateLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const session = await getAuthSession();
  return (
    <SidebarContextProvider>
      <DashboardSidebar user={session?.user} />
      <SidebarInset>
        <DashboardTopbar />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-2.5">
          {children}
        </main>
      </SidebarInset>
    </SidebarContextProvider>
  );
};

export default PrivateLayout;
