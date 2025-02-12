"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import { SidebarTrigger } from "@/components/shadcn/ui/sidebar";
import { type BreadcrumbListType, breadcrumbList } from "@/lib/staticData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const findBreadcrumbPath = (
  node: BreadcrumbListType,
  targetPath: string,
  currentPath: BreadcrumbListType[] = [],
): BreadcrumbListType[] | null => {
  if (node.path === targetPath) return [...currentPath, node];

  if (node.children) {
    for (const child of node.children) {
      const result = findBreadcrumbPath(child, targetPath, [
        ...currentPath,
        node,
      ]);
      if (result) return result;
    }
  }

  return null;
};

const DashboardTopbar: React.FC = () => {
  const pathname = usePathname();

  const breadcrumbs = findBreadcrumbPath(breadcrumbList, pathname);

  return (
    <header className="flex h-12 w-full shrink-0 items-center gap-2 border-b bg-sidebar transition-[width,height] ease-linear">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs?.map((linkItem, idx) => {
              if (idx < breadcrumbs?.length - 1) {
                return (
                  <Fragment key={`breadcrumb-${idx}`}>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link className="capitalize" href={linkItem.path}>
                          {linkItem.pathName}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </Fragment>
                );
              } else {
                return (
                  <BreadcrumbItem key={`breadcrumb-${idx}`}>
                    <BreadcrumbPage className="capitalize">
                      {linkItem.pathName}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                );
              }
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default DashboardTopbar;
