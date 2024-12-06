import DashboardSidebar from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TinyLink",
  description: "TinyLink: Free URL Shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen mx-auto  tracking-wide">
        <DashboardSidebar />
        <main className="flex-1 p-4 md:p-6 ">
          {children}
          <Toaster />
        </main>
      </div>
    </SidebarProvider>
  );
}
