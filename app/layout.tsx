import SessionProviderWrapper from "@/components/session/sessionprovider";
import { ToastProvider } from "@/components/ui/toast";
import type { Metadata } from "next";
import { fontParagraph } from "./font";
import "./globals.css";
import AuthorizedContextProvider from "@/context/authorized";

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
    <html lang="en">
      <body className={` ${fontParagraph} antialiased`}>
            <AuthorizedContextProvider>
        <SessionProviderWrapper>
          <ToastProvider>
              {children}
          </ToastProvider>
        </SessionProviderWrapper>
              </AuthorizedContextProvider>
      </body>
    </html>
  );
}
