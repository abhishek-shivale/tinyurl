"use client";
import React, { createContext, useEffect, useState } from "react";
import { getUserInfo } from "@/app/api/api_user";
import { toast } from "@/hooks/use-toast";
import {signOut} from "next-auth/react"
import { useRouter } from "next/navigation";

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
  revalidateUserInfo: () => Promise<boolean>;
}>({
  info: null,
  setInfo: () => {},
  clearUserInfo: () => {},
  revalidateUserInfo: async () => false,
});

function AuthorizedContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [info, setInfo] = useState<AuthorizedContext | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setInfo(JSON.parse(userInfo));
    } else {
      async function fetchUserInfo() {
        await revalidateUserInfo();
      }
      fetchUserInfo();
    }
  }, []);

  const revalidateUserInfo = async () => {
    try {
      const userInfo = await getUserInfo();
      if (userInfo && userInfo.id) {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setInfo(userInfo);
        return true;
      }
      toast({
        title: "Failed to fetch user information",
        description: "User not found",
        variant: "destructive",
      });
      return false;
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Failed to fetch user information",
          description: error.message,
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const clearUserInfo = async () => {
    localStorage.removeItem("userInfo");
    await signOut();
    router.push("/");
    setInfo(null);
  };

  return (
    <AuthorizedContext.Provider
      value={{
        info,
        setInfo,
        clearUserInfo,
        revalidateUserInfo,
      }}
    >
      {children}
    </AuthorizedContext.Provider>
  );
}

export { AuthorizedContext };
export default AuthorizedContextProvider;
