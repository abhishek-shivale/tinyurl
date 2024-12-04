"use client";

import React, { createContext } from "react";
import { getUserInfo } from "@/app/api/api_user";

interface AuthorizedContext {
  email: string;
  id: string;
  isVerified: boolean;
  name: string | null;
  profileImage: string | null;
  role: string;
  _count: {
    shortUrls: number;
  };
}

const AuthorizedContext = createContext<{
  info: AuthorizedContext | null;
  setInfo: React.Dispatch<React.SetStateAction<AuthorizedContext | null>>;
  clearUserInfo: () => void;
  revalidateUserInfo: () => Promise<void>;
}>({
  info: null,
  setInfo: () => {},
  clearUserInfo: () => {},
  revalidateUserInfo: async () => {},
});

function AuthorizedContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [info, setInfo] = React.useState<AuthorizedContext | null>(() => {
    if (!window) {
      return null;
    }
    const storedInfo = localStorage.getItem("userInfo");
    return storedInfo ? JSON.parse(storedInfo) : null;
  });

  const fetchUserInfo = async () => {
    try {
      const res = await getUserInfo();
      const userInfo = res as AuthorizedContext;

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setInfo(userInfo);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  React.useEffect(() => {
    if (!info) {
      fetchUserInfo();
    }
  }, [info]);

  function clearUserInfo() {
    localStorage.removeItem("userInfo");
    setInfo(null);
  }

  const revalidateUserInfo = async () => {
    await fetchUserInfo();
  };

  if (!info) return null;

  return (
    <AuthorizedContext.Provider
      value={{ info, setInfo, clearUserInfo, revalidateUserInfo }}
    >
      {children}
    </AuthorizedContext.Provider>
  );
}

export { AuthorizedContext };
export default AuthorizedContextProvider;
