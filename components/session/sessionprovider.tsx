"use client";
import AuthorizedContextProvider from "@/context/authorized";
import { SessionProvider } from "next-auth/react";
import React from "react";

function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthorizedContextProvider>{children}</AuthorizedContextProvider>
    </SessionProvider>
  );
}

export default SessionProviderWrapper;
