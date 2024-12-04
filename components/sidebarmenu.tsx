"use client";
import { useAuthorizedContext } from "@/hooks/use-authorise";
import { ChartNoAxesColumn, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

function Sidebarmenu() {
  const pathname = usePathname();
  if (!pathname) return null;

  return (
    <SidebarMenu className="space-y-2">
      {items.map((item) => (
        <SidebarMenuItem
          key={item.title}
          className={`
          group transition-all duration-300 ease-in-out
          ${
            pathname === item.url
              ? "bg-blue-50 text-blue-600"
              : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
          }
          rounded-lg mx-3
        `}
        >
          <SidebarMenuButton asChild>
            <Link
              href={item.url}
              className="flex items-center gap-3 p-3 w-full"
            >
              <item.icon
                className={`
                ${
                  pathname === item.url
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-600"
                }
                transition-colors duration-300
              `}
                size={20}
              />
              <span className="font-medium">{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export default Sidebarmenu;

export const LimitUrl = () => {
  const limit = useAuthorizedContext();
  console.log(limit);
  if (!limit) return;
  return limit?.info?._count?.shortUrls ? (
    <span className="font-bold text-blue-600">
      {limit?.info?._count?.shortUrls as number}/15
    </span>
  ) : (
    ""
  );
};
