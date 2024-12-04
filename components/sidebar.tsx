import {
  Crown,
  LinkIcon
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from "@/components/ui/sidebar";

import { fontHeading } from "@/app/font";
import Sidebarmenu, { LimitUrl } from "./sidebarmenu";



export default function DashboardSidebar() {

  return (
    <>
      <Sidebar
        variant="sidebar"
        className="bg-gray-50 h-screen w-64 shadow-lg border-r border-gray-200 flex flex-col"
      >
        <SidebarContent className="py-6 flex-grow">
          <SidebarGroup>
            <SidebarGroupLabel className="mb-6">
              <span className="flex items-center justify-center text-xl font-bold text-gray-800 gap-2">
                <LinkIcon className="text-blue-600" size={24} />
                <span className={`${fontHeading} tracking-wider text-2xl	`}>TinyUrl</span>
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <Sidebarmenu />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-gray-200 bg-white">
          <div className="bg-blue-50 rounded-lg p-4 text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-center mb-2">
                <Crown className="text-yellow-500" size={32} />
              </div>

              <p className="text-sm text-gray-700 mb-2">
                You&apos;ve used{" "}
                <LimitUrl /> links
              </p>

              <p className="text-xs text-gray-500 mb-3">
                Upgrade to create more links and unlock premium features
              </p>

              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                Go Pro
              </button>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}