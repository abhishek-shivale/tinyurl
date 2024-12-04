import SessionProviderWrapper from "@/components/session/sessionprovider";
import { ToastProvider } from "@/components/ui/toast";
import type { Metadata } from "next";
import { fontParagraph } from "./font";
import "./globals.css";

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
    <SessionProviderWrapper>
      <html lang="en">
        <body className={` ${fontParagraph} antialiased`}>
          <ToastProvider>
            {children}
            </ToastProvider>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
