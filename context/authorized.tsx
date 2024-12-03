"use client";

import { useSession } from "next-auth/react";
import React, { createContext } from "react";
import type { Session } from "next-auth";
const AuthorizedContext = createContext<{
  data: Session | null;
  update: () => void;
}>({
  data: null,
  update: () => {},
});

function AuthorizedContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, update } = useSession();
  const user = data?.user;

  const sessionData: Session | null = user
    ? {
        ...data,
        user: {
          id: user.id!,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      }
    : null;

  return (
    <AuthorizedContext.Provider value={{ data: sessionData, update }}>
      {children}
    </AuthorizedContext.Provider>
  );
}

export { AuthorizedContext };
export default AuthorizedContextProvider;
