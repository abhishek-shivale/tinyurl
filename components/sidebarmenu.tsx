"use client";
import { useAuthorizedContext } from "@/hooks/use-authorise";
import { ChartNoAxesColumn, Crown, Home,  Settings } from "lucide-react";
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

export const UserContent = () => {
  const userInfo = useAuthorizedContext();

  if (!userInfo || !userInfo.info) {
    return <p className="text-sm text-gray-700">Loading user info...</p>;
  }

  const { role, _count } = userInfo.info;
  const shortUrlsCount = _count?.shortUrls ?? 0;

  return role === "FREE" ? (
    <FreeUserContent shortUrlsCount={shortUrlsCount} />
  ) : (
    <PremiumUserContent />
  );
};

const FreeUserContent = ({ shortUrlsCount }: { shortUrlsCount: number }) => {
  const maxLimit = 15; // Example limit for free users
  const progressPercentage = Math.min((shortUrlsCount / maxLimit) * 100, 100);

  return (
    <>
      <div className="flex justify-center mb-2">
        <Crown className="text-yellow-500" size={32} />
      </div>
      <p className="text-sm text-gray-700 mb-2">
        You&apos;ve used{" "}
        <span className="font-bold text-red-600">
          {shortUrlsCount}/{maxLimit}
        </span>{" "}
        links
      </p>
      <div className="w-full bg-gray-300 rounded-full h-2.5 mb-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mb-3">
        Upgrade to create more links and unlock premium features
      </p>
      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
        Go Pro
      </button>
    </>
  );
};

const PremiumUserContent = () => (
  <>
    <div className="flex justify-center mb-2">
      <Crown className="text-yellow-500" size={32} />
    </div>
    <p className="text-sm text-gray-700 mb-2">
      <span className="font-bold text-blue-600">Unlimited Links</span> at your
      disposal!
    </p>
    <p className="text-xs text-gray-500 mb-3">Enjoy all the premium benefits!</p>
    <button className="w-full bg-gray-500 text-white py-2 rounded-md cursor-not-allowed">
      Premium Activated
    </button>
  </>
);
