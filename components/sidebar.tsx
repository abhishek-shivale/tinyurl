import {  LinkIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import { fontHeading } from "@/app/font";
import Sidebarmenu, { UserContent } from "./sidebarmenu";

export default function DashboardSidebar() {
  return (
    <>
      <Sidebar
        variant="sidebar"
        className="bg-gray-50 h-screen w-64 shadow-lg border-r border-[rgb(238,228,226)] flex flex-col"
      >
        <SidebarContent className="py-6 flex-grow">
          <SidebarGroup>
            <SidebarGroupLabel className="mb-6">
              <span className="flex items-center justify-center text-xl font-bold text-gray-900 gap-2">
                <LinkIcon className="text-black" size={24} />
                <span className={`${fontHeading} tracking-wider text-2xl	`}>
                  TinyUrl
                </span>
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <Sidebarmenu />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4  bg-[rgb(238,228,226)]">
          <div className="bg-blue-50 rounded-lg p-4 text-center relative overflow-hidden">
            <div className="relative z-10">
              <UserContent />
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
